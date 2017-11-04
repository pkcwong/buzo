import { Template } from 'meteor/templating';

import './main.html';

Router.route('/', function() {
	this.render('main');
});

Template.main.onCreated(() => {

});

Template.main.onRendered(() => {

});

Template.main.helpers({});

Template.main.events({});
