import {prediction} from "../dyno/neural";

Meteor.methods({

	'trainer::prediction': (client) => {
		return prediction(client);
	}

});
