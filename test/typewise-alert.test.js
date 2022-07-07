const alerts = require('../typewise-alert');
const { expect } = require('chai');
const chai = require('chai'),
	spy = require('chai-spies');

chai.use(spy);
const should = chai.should();

it('inferBreach func infers a value lower than the minimum as TOO_LOW', () => {
	expect(alerts.inferBreach(20, 50, 100)).equals('TOO_LOW');
});

it('inferBreach func infers a value greater than the maximum as TOO_HIGH', () => {
	expect(alerts.inferBreach(120, 50, 100)).equals('TOO_HIGH');
});

it('inferBreach func infers a value within the range as NORMAL', () => {
	expect(alerts.inferBreach(60, 50, 100)).equals('NORMAL');
});

it('coolingTypeRange func should give lowerlimit=0 and upperlimit=35 for PASSIVE_COOLING', () => {
	expect(alerts.coolingTypeRange('PASSIVE_COOLING').lowerLimit).equals(0);
	expect(alerts.coolingTypeRange('PASSIVE_COOLING').upperLimit).equals(35);
});

it('coolingTypeRange func should give lowerlimit=0 and upperlimit=45 for HI_ACTIVE_COOLING', () => {
	expect(alerts.coolingTypeRange('HI_ACTIVE_COOLING').lowerLimit).equals(0);
	expect(alerts.coolingTypeRange('HI_ACTIVE_COOLING').upperLimit).equals(45);
});

it('coolingTypeRange func should give lowerlimit=0 and upperlimit=40 for MED_ACTIVE_COOLING', () => {
	expect(alerts.coolingTypeRange('MED_ACTIVE_COOLING').lowerLimit).equals(0);
	expect(alerts.coolingTypeRange('MED_ACTIVE_COOLING').upperLimit).equals(40);
});

it('coolingTypeRange func should give lowerlimit=Not in limits and upperlimit=Not in limits for Invalid cooling type', () => {
	expect(alerts.coolingTypeRange('OUT_OF_RANGE').lowerLimit).equals(
		'Not in limits'
	);
	expect(alerts.coolingTypeRange('OUT_OF_RANGE').upperLimit).equals(
		'Not in limits'
	);
});

it('classifyTemperatureBreach func for TOO_LOW', () => {
	expect(alerts.classifyTemperatureBreach('HI_ACTIVE_COOLING', -5)).equals(
		'TOO_LOW'
	);
});

it('classifyTemperatureBreach func for TOO_HIGH', () => {
	expect(alerts.classifyTemperatureBreach('PASSIVE_COOLING', 40)).equals(
		'TOO_HIGH'
	);
});

it('classifyTemperatureBreach func for NORMAL', () => {
	expect(alerts.classifyTemperatureBreach('MED_ACTIVE_COOLING', 35)).equals(
		'NORMAL'
	);
});

it('classifyTemperatureBreach func for Invalid Cooling type', () => {
	expect(alerts.classifyTemperatureBreach('MEDI_ACTIVE_COOLING', 35)).equals(
		'WARNING'
	);
});

it('sendToController basic functionality', () => {
	var spy = chai.spy(alerts.sendToController);
	spy('TOO_LOW');
	expect(spy).to.have.been.called();
	spy.should.have.been.called.with('TOO_LOW');
});

it('sendToEmail basic functionality', () => {
	var spy = chai.spy(alerts.sendToEmail);
	spy('TOO_LOW');	
	spy.should.have.been.called.with('TOO_LOW');

	spy('TOO_HIGH');
	expect(spy).to.have.been.called();
	spy.should.have.been.called.with('TOO_HIGH');

	spy('NORMAL');
	expect(spy).to.have.been.called();
	spy.should.have.been.called.with('NORMAL');
});

it('checkAndAlert basic functionality', () => {
	var spy = chai.spy(alerts.checkAndAlert);
	spy('TO_CONTROLLER', 'PASSIVE_COOLING', -5);
	expect(spy).to.have.been.called();
	spy.should.have.been.called.with('TO_CONTROLLER', 'PASSIVE_COOLING', -5);

	spy('TO_EMAIL', 'MED_ACTIVE_COOLING', 34);
	expect(spy).to.have.been.called();
	spy.should.have.been.called.with('TO_EMAIL', 'MED_ACTIVE_COOLING', 34);

	expect(
		alerts.checkAndAlert('INAVLID_ALERTTARGET', 'MED_ACTIVE_COOLING', 34)
	).equals('NOT_APPLICABLE');
});
