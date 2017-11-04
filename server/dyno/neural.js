let synaptic = require('synaptic');
let math = require('mathjs');

import {Clients} from "../database/clients";

let Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;

let sub = {};
let cat = {};

sub['post_like'] = new Neuron();
sub['post_comment'] = new Neuron();
sub['shopping_average'] = new Neuron();
sub['platform_follow'] = new Neuron();
sub['income'] = new Neuron();
sub['job_exp'] = new Neuron();
sub['follow_comp'] = new Neuron();
sub['term_life'] = new Neuron();
sub['loan_size'] = new Neuron();

cat['social'] = new Neuron();
cat['fame'] = new Neuron();
cat['finance'] = new Neuron();
cat['education'] = new Neuron();

let credibility = new Neuron();

sub.post_like.project(cat.social); sub.post_like.squash = Neuron.squash.IDENTITY;
//sub.post_like.project(cat.fame);
/*
sub.post_comment.project(cat.social);
sub.post_comment.project(cat.fame);

sub.shopping_average.project(cat.finance);

sub.platform_follow.project(cat.social);
sub.platform_follow.project(cat.fame);

sub.income.project(cat.finance);

sub.job_exp.project(cat.finance);
sub.job_exp.project(cat.education);

sub.follow_comp.project(cat.education);

sub.term_life.project(cat.finance);

sub.loan_size.project(cat.finance);
*/
cat.social.project(credibility); cat.social.squash = Neuron.squash.IDENTITY
//cat.fame.project(credibility);
/*
cat.finance.project(credibility);
cat.education.project(credibility);
*/

credibility.squash = Neuron.squash.IDENTITY;

export function run() {
	let Data = Clients.find().fetch();
	let error = 0;
	//for (let i = 0; i != Data.length; i++) {
		let obj = Data[0];
		console.log(sub.post_like.activate(normalize(Data, "post_like", obj.post_like)));
		/*
		sub.post_comment.activate(normalize(Data, "post_comment", obj.post_comment));
		sub.shopping_average.activate(normalize(Data, "shopping_average", obj.shopping_average));
		sub.platform_follow.activate(normalize(Data, "platform_follow", obj.platform_follow));
		sub.income.activate(normalize(Data, "income", obj.income));
		sub.job_exp.activate(normalize(Data, "job_exp", obj.job_exp));
		sub.follow_comp.activate(normalize(Data, "follow_comp", obj.follow_comp));
		sub.term_life.activate(normalize(Data, "term_life", obj.term_life));
		sub.loan_size.activate(normalize(Data, "loan_size", obj.loan_size));
		*/
		const social = cat.social.activate();
		//const fame =  cat.fame.activate();
		/*
		const finance = cat.finance.activate();
		const education = cat.education.activate();
		*/
		const predict = credibility.activate();
		error += Math.abs(predict - obj.credibility) / obj.credibility;
		//console.log('\t' + parseFloat(social).toFixed(3) + '\t' + parseFloat(fame).toFixed(3) + '\t' + parseFloat(finance).toFixed(3) + '\t' + parseFloat(education).toFixed(3) + '\t=>\t' + parseFloat(predict).toFixed(3) + '\t<=\t' + parseFloat(obj.credibility).toFixed(3) + '\t(' + Math.abs(predict - obj.credibility) / obj.credibility + ')');
		console.log('\t' + parseFloat(social).toFixed(3) + '\t=>\t' + parseFloat(predict).toFixed(3) + '\t<=\t' + parseFloat(obj.credibility).toFixed(3) + '\t(' + Math.abs(predict - obj.credibility) / obj.credibility + ')');
		credibility.propagate(0.3, (obj.credibility));
	//}
	console.log('average error:\t' + error / Data.length);
}

function sd(array, attribute) {
	let data = [];
	for (let i = 0; i != array.length; i++) {
		data.push(array[i][attribute]);
	}
	return math.std(data);
}

function mean(array, attribute) {
	let data = [];
	for (let i = 0; i != array.length; i++) {
		data.push(array[i][attribute]);
	}
	return math.mean(data);
}

function normalize(array, attribute, value) {
	return (Math.tanh((value - mean(array, attribute)) / sd(array, attribute)) + 1) / 2;
}
