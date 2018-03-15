const resolverMap = {
	Mutation: {
		ping(obj, args, context, info) {
			return 'Pong!';
		},
	},
	Query: {
		ping(obj, args, context, info) {
			return 'Pong!';
		},
	},
	Subscription: {
		ping: {
			resolve: (payload, args, context, info) => {
				console.log(payload);
				return 'Pong!';
			  },
		},
	},
};

export = resolverMap;
