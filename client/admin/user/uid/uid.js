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
    this.credibility = new ReactiveVar(50);
    this.social = new ReactiveVar(20);
    this.fame = new ReactiveVar(30);
    this.finance = new ReactiveVar(40);
    this.education = new ReactiveVar(90);
});

Template.uid.onRendered(() => {
    $('#id_uid_credibility').progress({
        percent: this.credibility.get()
    });
    $('#id_uid_social').progress({
        percent: this.social.get()
    });
    $('#id_uid_fame').progress({
        percent: this.fame.get()
    });
    $('#id_uid_finance').progress({
        percent: this.finance.get()
    });
    $('#id_uid_education').progress({
        percent: this.education.get()
    });
});

Template.uid.helpers({
    'getUserID': () =>{
        return this.userID.get();
    }
});

Template.uid.events({
    'click #id_uid_back':(event) =>{
        window.location.assign("/admin/index");
    }
});