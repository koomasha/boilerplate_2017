const config = {
	serverSchemasDir: 'src/api/schemas/',
	gqlTypesDest: 'src/api/_generated/gqlTypes.d.ts', 
	gqlNamespace: 'GqlTypes',
};

const fs = require('fs');
const schema = getGQLSchemaFromServer();


createGQLTypes();

function createGQLTypes(){
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


