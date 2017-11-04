import { Template } from 'meteor/templating';

import './index.html';

Router.route('/admin/index', function() {
    this.render('index');
});

Template.index.onCreated(() => {
    this.showDB = new ReactiveVar([]);
});

Template.index.onRendered(() => {
    Meteor.call('csv::dump', (err, res) => {
        this.showDB.set(res);
    });
});

Template.index.helpers({
    'getDB': () => {
        return this.showDB.get();
    }
});

Template.index.events({
    'click #id_index_uploadButton': (event) => {
        console.log("bye");
        var fileToLoad = document.getElementById("id_index_chooseFile").files[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent){
            var textFromFileLoaded = fileLoadedEvent.target.result;
            var json = csvJSON(textFromFileLoaded);

        };
        fileReader.readAsText(fileToLoad, "UTF-8");

    },

    'click #id_index_newButton': (event) => {
            window.location.assign("new");
    }

});


function csvJSON(csv){
    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}