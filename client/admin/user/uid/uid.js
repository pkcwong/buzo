import { Template } from 'meteor/templating';

import './uid.html';
let pathID = null;

Router.route('/admin/user/:_id', function() {
    var params = this.params; // { _id: "5" }
    pathID = params._id; // "5"
    this.render('uid');
});

Template.uid.onCreated(() => {
    this.userID = new ReactiveVar(pathID);
});

Template.uid.onRendered(() => {
});

Template.uid.helpers({
    'getUserID': () =>{
        return this.userID.get();
    }
});

Template.uid.events({

});