Meteor.methods({

	'csv::upsert': (json) => {
		return Clients.insertMany(json);
	},

	'csv::dump': () => {
		return Clients.find().fetch();
	}

});
