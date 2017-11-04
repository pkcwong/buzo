import {train} from "./neural";

Meteor.setInterval(() => {
	console.log("dyno restarted");
	train();
}, 20);
