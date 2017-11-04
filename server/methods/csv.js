
import {Clients} from "../database/clients";

Meteor.methods({

	'csv::upsert': (json) => {
		let csv  = JSON.parse(json);
		for (let i = 0; i != csv.length; i++) {
			let obj = {};
			obj['post_like'] = csv[i]['post_like'];
			obj['post_comment'] = csv[i]['post_comment'];
			obj['shopping_average'] = csv[i]['shopping_average'];
			obj['platform_follow'] = csv[i]['platform_follow'];
			obj['income'] = csv[i]['income'];
			obj['job_exp'] = csv[i]['job_exp'];
			obj['follow_comp'] = csv[i]['follow_comp'];
			obj['term_life'] = csv[i]['term_life'];
			obj['loan_size'] = csv[i]['loan_size'];
			obj['credibility'] = csv[i]['credibility'];
			console.log(obj);
			Clients.insert(obj);
		}
	},

	'csv::dump': () => {
		return Clients.find().fetch();
	}

});
