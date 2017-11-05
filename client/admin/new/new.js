import { Template } from 'meteor/templating';

import './new.html';

Router.route('/admin/new', function() {
    this.render('new');
});

Template.new.onCreated(() => {
    this.credability = new ReactiveVar(0);
    this.social = new ReactiveVar(0);
    this.fame = new ReactiveVar(0);
    this.finance = new ReactiveVar(0);
    this.education = new ReactiveVar(0);
});

Template.new.onRendered(() => {
    $('#id_new_credability').progress({
        percent: this.credability.get()
    });
    $('#id_new_social').progress({
        percent: this.social.get()
    });
    $('#id_new_fame').progress({
        percent: this.fame.get()
    });
    $('#id_new_finance').progress({
        percent: this.finance.get()
    });
    $('#id_new_education').progress({
        percent: this.education.get()
    });
});

Template.new.helpers({
});

Template.new.events({
    'click #id_new_back': (event) => {
        window.location.assign("index");
    },
    'click #id_new_submit': (event) => {
        var newCredability = 100;
        var newSocial = 100;
        var newFame = 50;
        var newFinance = 74;
        var newEducation = 35;
        $('#id_new_credability').progress({
            percent: newCredability
        });
        $('#id_new_social').progress({
            percent: newSocial
        });
        $('#id_new_fame').progress({
            percent: newFame
        });
        $('#id_new_finance').progress({
            percent: newFinance
        });
        $('#id_new_education').progress({
            percent: newEducation
        });
    }
});