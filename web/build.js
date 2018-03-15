const config = {
	templatesDir: 'src/templates/', 
	templatesDest: 'src/scripts/_generated/templates.ts',
	eViewNamesDest: 'src/scripts/_generated/eViewNames.ts',
	eExceptionTypesDir: '../server/src/exception.ts',
	eExceptionTypesDest: 'src/scripts/_generated/eExceptionTypes.ts',
	eViewRootsDir: '../server/src/dal/models/user.ts',
	eViewRootsDest: 'src/scripts/_generated/eViewRoots.ts',
	serverSchemasDir: '../server/src/api/schemas/',
	clientSchemaDir: 'src/scripts/api/',
	connectionObject: 'window.__fetch',
	connectionObjectQueryMethod: 'query',
	gqlApiDest: 'src/scripts/_generated/api/',
	gqlTypesDest: 'src/scripts/_generated/gqlTypes.d.ts', 
	gqlNamespace: 'GqlTypes',
	gqlNamespacePath: 'gqlTypes',
	configFileDest: 'src/scripts/_generated/configuration.ts',
};

const fs = require('fs');
const schema = getGQLSchemaFromServer();
generateConfigurationFile();
generateTemplatesObject();
generateViewNamesEnum();
generateExceptionTypesEnum();
generateViewRootsEnum();
generateGQLTypes();
generateGQlApi();

function generateConfigurationFile() {
	const webClientConfig = require('config').get('PROJECT_NAME.webClientConfig');
	let configStr = 'export default class Configuration {\n';
	for(let property in webClientConfig){
		if(webClientConfig.hasOwnProperty(property)) {
			configStr += 'public static ' + property + ' = \'' + webClientConfig[property] + '\';\n';
		}
	}
	configStr  +=  '}\n';
	fs.writeFileSync(config.configFileDest, configStr);
}
function generateViewNamesEnum() {
	let viewNamesStr = 'enum eViewNames {\n';
	fs.readdirSync(config.templatesDir, {}).forEach((dir) => {
		fs.readdirSync(config.templatesDir + dir, {}).forEach((file) => {
			let viewName = file.substring(0, file.indexOf('.html'));
			viewNamesStr += capitalizeString(viewName) +  ' = \'' + viewName + '\',\n';
		});
	});
	viewNamesStr  +=  '}\nexport {eViewNames};\n';
	fs.writeFileSync(config.eViewNamesDest, viewNamesStr);
}

function generateTemplatesObject(){
	const templates = [];
	fs.readdirSync(config.templatesDir, {}).forEach((dir) => {
		fs.readdirSync(config.templatesDir + dir, {}).forEach((file) => {
			let f = fs.readFileSync(config.templatesDir + dir + '/' + file, 'utf8');
			let varAccess = 'public static ' + file.substring(0, file.indexOf('.html')) + ' = ';
			f = f.replace('`', '\\`');
			f = varAccess + '`' + f + '`';
			templates.push(f);
		});
	});
	templates.push(`public static getTemplate(template) {
		return this[template];
	}`);

	fs.writeFileSync(config.templatesDest, 'export default class Templates {\n ' + templates.join(';\n') + '\n}\n');
}
function generateExceptionTypesEnum(){
	let f = fs.readFileSync(config.eExceptionTypesDir, 'utf8');
	let exceptionTypesStr = f.split('export')[0] + '\nexport {eExceptionTypes};\n';
	fs.writeFileSync(config.eExceptionTypesDest, exceptionTypesStr);
}
function generateViewRootsEnum(){
	let f = fs.readFileSync(config.eViewRootsDir, 'utf8');
	let viewRootsStr = 'enum ' + f.split('class')[0].split('enum')[1] + '\nexport {eViewRoots};\n';
	fs.writeFileSync(config.eViewRootsDest, viewRootsStr);
}
function generateGQLTypes(){
	const fromSchema = require('@gql2ts/from-schema');
	let gqlTypes = fromSchema.generateNamespace(config.gqlNamespace, schema);
	gqlTypes +='\n export default ' + config.gqlNamespace + ';';
	fs.writeFile(config.gqlTypesDest, gqlTypes);
}
function getGQLSchemaFromServer(){
	const tools = require('graphql-tools');
	const typeDefinitionsArray = [];
	fs.readdirSync(config.serverSchemasDir, {}).forEach((file) => {
		const f = fs.readFileSync(config.serverSchemasDir + file, 'utf8');
		typeDefinitionsArray.push(f);
	});
	return tools.makeExecutableSchema({ typeDefs: [...typeDefinitionsArray] });
}
function createMethods(queryJson,fileNameUpper,allDefinitions){

	let methods = '';
	for (var key in queryJson) {
		const haveInput = allDefinitions.indexOf((capitalizeString(key))+'Input')>-1;
		methods += `public static async {{KEY}}({{INPUT}}): Promise<{{GQL_NAMESPACE}}.{{RETURN_TYPE}}> {
			const query = {{QUERY}};
			const res:{{GQL_NAMESPACE}}.IGraphQLResponseRoot = await {{CONN_OBJ}}.{{CONN_OBJ_METHOD}}({ query, variables: {{ARGS}} });
			return res.data as {{GQL_NAMESPACE}}.{{RETURN_TYPE}};
		}
		`.replace(/{{KEY}}/g, key)
			.replace(/{{FILE}}/g, fileNameUpper)
			.replace(/{{RETURN_TYPE}}/g, queryJson[key].toLowerCase().startsWith('query')?'IQuery':'IMutation')
			.replace(/{{INPUT}}/g, haveInput?'args: inter.{{KEY_UPPER}}Input':'')
			.replace(/{{ARGS}}/g, haveInput?'args':'{}')
			.replace(/{{KEY_UPPER}}/g, (capitalizeString(key)))
			.replace(/{{CONN_OBJ}}/g, config.connectionObject)
			.replace(/{{CONN_OBJ_METHOD}}/g, config.connectionObjectQueryMethod)
			.replace(/{{GQL_NAMESPACE}}/g, config.gqlNamespace)
			.replace(/{{QUERY}}/g, JSON.stringify(queryJson[key]));		
	}
	return methods;
}
function getApiFileStructure(methods, fileNameUpper){
	const fileString = `
	// tslint:disable
	declare var window: any;
	import * as inter from './i{{FILE}}';
	import {{GQL_NAMESPACE}} from '../{{GQL_NAMESPACE_PATH}}';
	export default class {{FILE}} {
		{{METHODS}}
	}
	// tslint:enable
	`
		.replace(/{{METHODS}}/g, methods)
		.replace(/{{FILE}}/g, fileNameUpper)
		.replace(/{{GQL_NAMESPACE}}/g, config.gqlNamespace)
		.replace(/{{GQL_NAMESPACE_PATH}}/g, config.gqlNamespacePath);
	return fileString;
}
function generateGQlApi() {
	const fromQuery = require('@gql2ts/from-query');
	fs.readdirSync(config.clientSchemaDir, {}).forEach((file) => {
		if(file.indexOf('.js') > -1) {
			let queryJson = require('./'+ config.clientSchemaDir + file);
			let fileName = file.replace('.js', '');
			const fileNameUpper = capitalizeString(fileName);
			const typescriptDefinitions = fromQuery.default(schema, Object.keys(queryJson).map(x=> queryJson[x]).join('\n'));
			const allDefinitions = typescriptDefinitions.map(({ result }) => result).join('\n');
			fs.writeFile(config.gqlApiDest + 'i' + fileNameUpper + '.d.ts', allDefinitions);
			fs.writeFile(config.gqlApiDest + fileName + '.ts', getApiFileStructure(createMethods(queryJson,fileNameUpper,allDefinitions), fileNameUpper));
		}
	});
}
function capitalizeString(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

