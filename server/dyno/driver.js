import {run} from "./neural";

Meteor.setInterval(() => {
	console.log("dyno restarted");
	run();
}, 3000);
