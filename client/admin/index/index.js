import { Template } from 'meteor/templating';
import './index.html';

Router.route('/admin', function() {
    this.render('index');
});

Template.index.onCreated(() => {

});

Template.index.onRendered(() => {

});

Template.index.helpers({});

Template.index.events({});