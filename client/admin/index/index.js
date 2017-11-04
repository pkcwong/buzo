import { Template } from 'meteor/templating';

import './index.html';

Router.route('/admin/index', function() {
	this.render('index');
});

Template.index.onCreated(() => {

});

Template.index.onRendered(() => {

});

Template.index.helpers({});

Template.index.events({
	'click #id_index_uploadButton': (event) => {
		console.log("bye");
		var fileToLoad = document.getElementById("id_index_chooseFile").files[0];
		var fileReader = new FileReader();
		fileReader.onload = function(fileLoadedEvent) {
			var textFromFileLoaded = fileLoadedEvent.target.result;
			console.log(textFromFileLoaded);
			var json = csvJSON(textFromFileLoaded);
			console.log(json);
			Meteor.call('csv::upsert', json, (err, res) => {

			});
		};
		fileReader.readAsText(fileToLoad, "UTF-8");
	},
	'click #id_index_newButton': (event) => {
		console.log("hi");
	}
});


function csvJSON(csv) {
	var lines = csv.split("\n");
	var result = [];
	var headers = lines[0].split(",");
	for (var i = 1; i < lines.length - 1; i++) {
		var obj = {};
		var currentline = lines[i].split(",");
		for (var j = 0; j < headers.length; j++) {
			obj[headers[j]] = currentline[j];
		}
		result.push(obj);
	}
	//return result; //JavaScript object
	return JSON.stringify(result); //JSON
}