import { Template } from 'meteor/templating';

import './new.html';

Router.route('/admin/new', function() {
    this.render('new');
});

Template.new.onCreated(() => {
    this.credibility = new ReactiveVar(0);
    this.social = new ReactiveVar(0);
    this.fame = new ReactiveVar(0);
    this.finance = new ReactiveVar(0);
    this.education = new ReactiveVar(0);
});

Template.new.onRendered(() => {
    $('#id_new_credibility').progress({
        percent: this.credibility.get()
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
        let test = {
            post_like: $('input[id = "postLikeValue"]').val(),
            post_comment: $('input[id = "postCommentValue"]').val(),
            shopping_average: $('input[id = "shoppingAverageValue"]').val(),
            platform_follow: $('input[id = "platformFollowValue"]').val(),
            income: $('input[id = "incomeValue"]').val(),
            job_exp: $('input[id = "jobExperienceValue"]').val(),
            follow_comp: $('input[id = "followCompanyValue"]').val(),
            term_life: $('input[id = "termLifeValue"]').val(),
            loan_size: $('input[id = "loanSizeValue"]').val()
           // edu: $('input[id = "educationYearValue"]').val()
        }
        console.log(test);
        Meteor.call('trainer::prediction', test, (err, res) => {
            console.log(res);
            console.log(res.credibility);
            console.log(res.credibility*100);
            var newCredibility = res.credibility*100;
            var newSocial = res.social*100;
            var newFame = res.fame*100;
            var newFinance = res.finance*100;
            var newEducation = res.education*100;
            $('#id_new_credibility').progress({
                percent: newCredibility
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
        });
    }
});