import { Template } from 'meteor/templating';

import './index.html';
Router.route('/admin/index', function() {
	this.render('index');
});
let dbID = [];
let dbLength = 0;
Template.index.onCreated(() => {
    this.showDB = new ReactiveVar([]);
});

Template.index.onRendered(() => {
    Meteor.call('csv::dump', (err, res) => {
        console.log(res);
        console.log(res.length);
        dbID = [];
        dbLength = res.length;
        for(var i = 0; i < res.length; i++){
			dbID[i] = res[i]._id;
		}
        console.log(dbID);
        this.showDB.set(dbID);
    });
});

Template.index.helpers({
    'getDB': () => {
        return this.showDB.get();
    }
});

Template.index.events({
	'click #id_index_uploadButton': (event) => {
		var fileToLoad = document.getElementById("id_index_chooseFile").files[0];
		var fileReader = new FileReader();
		fileReader.onload = function(fileLoadedEvent) {
			var textFromFileLoaded = fileLoadedEvent.target.result;
			var json = csvJSON(textFromFileLoaded);
			Meteor.call('csv::upsert', json, (err, res) => {

			});
		};
		fileReader.readAsText(fileToLoad, "UTF-8");
	},
	'click #id_index_newButton': (event) => {
     	window.location.assign("new");
	},
	'click #id_index_searchButton': (event) =>{
		if($('input[id = "id_index_uid').val() != ""){
            var url = "/admin/user/" + $('input[id = "id_index_uid"]').val()
            window.location.assign(url);
		}
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

Handlebars.registerHelper('link', function(text, url) {
    url = Handlebars.escapeExpression(url);
    text = Handlebars.escapeExpression(text);
    return new Handlebars.SafeString(
        "<a href='" + url + "'>" + text + "</a>"
    );
});