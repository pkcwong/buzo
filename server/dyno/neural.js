let synaptic = require('synaptic');
let math = require('mathjs');

import { Clients } from "../database/clients";

let Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;

let sub = {};

sub['post_like'] = new Neuron();
sub['post_comment'] = new Neuron();
sub['shopping_average'] = new Neuron();
sub['platform_follow'] = new Neuron();
sub['income'] = new Neuron();
sub['job_exp'] = new Neuron();
sub['follow_comp'] = new Neuron();
sub['term_life'] = new Neuron();
sub['loan_size'] = new Neuron();

let credibility = new Neuron();

sub.post_like.project(credibility); sub.post_like.bias = 0;
sub.post_comment.project(credibility); sub.post_comment.bias = 0;
sub.shopping_average.project(credibility); sub.shopping_average.bias = 0;
sub.platform_follow.project(credibility); sub.platform_follow.bias = 0;
sub.income.project(credibility); sub.income.bias = 0;
sub.job_exp.project(credibility); sub.job_exp.bias = 0;
sub.follow_comp.project(credibility); sub.follow_comp.bias = 0;
sub.term_life.project(credibility); sub.term_life.bias = 0;
sub.loan_size.project(credibility); sub.loan_size.bias = 0;

let Data = Clients.find().fetch();

export function train() {
	let error = 0;
	for (let i = 0; i != Data.length; i++) {
		let test = Data[i];
		const predict = run(test);
		error += Math.abs(predict - test.credibility) / test.credibility;
		console.log('\t' + parseFloat(predict).toFixed(3) + '\t=>\t' + parseFloat(test.credibility).toFixed(3) + '\t(' + Math.abs(predict - test.credibility) / test.credibility + ')');
		credibility.propagate(0.3, (test.credibility));
	}
	console.log('average error:\t' + error / Data.length);
}

export function run(test) {
	sub.post_like.activate(normalize(Data, "post_like", test.post_like));
	sub.post_comment.activate(normalize(Data, "post_comment", test.post_comment));
	sub.shopping_average.activate(normalize(Data, "shopping_average", test.shopping_average));
	sub.platform_follow.activate(normalize(Data, "platform_follow", test.platform_follow));
	sub.income.activate(normalize(Data, "income", test.income));
	sub.job_exp.activate(normalize(Data, "job_exp", test.job_exp));
	sub.follow_comp.activate(normalize(Data, "follow_comp", test.follow_comp));
	sub.term_life.activate(normalize(Data, "term_life", test.term_life));
	sub.loan_size.activate(normalize(Data, "loan_size", test.loan_size));
	return credibility.activate();
}

export function prediction(test) {
	let social = [normalize(Data, "post_like", test.post_like), normalize(Data, "post_comment", test.post_comment)];
	let fame = [normalize(Data, "post_like", test.post_like), normalize(Data, "post_comment", test.post_comment), normalize(Data, "platform_follow", test.platform_follow)];
	let finance = [normalize(Data, "shopping_average", test.shopping_average), normalize(Data, "income", test.income), normalize(Data, "job_exp", test.job_exp)];
	let education = [normalize(Data, "job_exp", test.job_exp), normalize(Data, "follow_comp", test.follow_comp)];
	return {
		credibility: run(test),
		social: math.mean(social),
		fame: math.mean(fame),
		finance: math.mean(finance),
		education: math.mean(education)
	}
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
