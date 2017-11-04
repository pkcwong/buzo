import { Template } from 'meteor/templating';

import './new.html';

Router.route('/admin/new', function() {
    this.render('new');
});

Template.new.onCreated(() => {
});

Template.new.onRendered(() => {
});

Template.new.helpers({
});

Template.new.events({
    'click #id_new_back': (event) => {
        window.location.assign("index");
    }
});