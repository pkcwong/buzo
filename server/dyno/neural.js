let synaptic = require('synaptic');

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

sub.post_like.project(cat.social);
sub.post_like.project(cat.fame);

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

cat.social.project(credibility);
cat.fame.project(credibility);
cat.finance.project(credibility);
cat.education.project(credibility);

export function run() {
	let Data = Clients.find().fetch();
	for (let i = 0; i != Data.length; i++) {
		let obj = Data[i];
		console.log(obj);
		sub.post_like.activate(obj.post_like);
		sub.post_comment.activate(obj.post_comment);
		sub.shopping_average.activate(obj.shopping_average);
		sub.platform_follow.activate(obj.platform_follow);
		sub.income.activate(obj.income);
		sub.job_exp.activate(obj.job_exp);
		sub.follow_comp.activate(obj.follow_comp);
		sub.term_life.activate(obj.term_life);
		sub.loan_size.activate(obj.loan_size);
		cat.social.activate();
		cat.fame.activate();
		cat.finance.activate();
		cat.education.activate();
		credibility.activate();
		credibility.propagate(0.3, obj.credibility);
	}
}
