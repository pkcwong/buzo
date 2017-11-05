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
    this.details = new ReactiveVar([]);
});

Template.uid.onRendered(() => {
    Meteor.call("csv::dump", (err, res)=>{
        console.log(res);
        for(var i = 0; i < res.length; i++){
            console.log(res[i].credibility);
            if(res[i]._id == pathID){
                this.details.set(res[i]);
                $('#id_uid_credibility').progress({
                    percent: res[i].credibility*100
                });
                break;
            }
        }
    });
});

Template.uid.helpers({
    'getUserID': () =>{
        return this.userID.get();
    },
    'getDetails': () =>{
        return this.details.get();
    }
});

Template.uid.events({
    'click #id_uid_back':(event) =>{
        window.location.assign("/admin/index");
    }
});