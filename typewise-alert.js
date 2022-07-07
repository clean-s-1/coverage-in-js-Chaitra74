const COOLING_TYPES_LIMIT = {
	PASSIVE_COOLING: { lowerLimit: 0, upperLimit: 35 },
	HI_ACTIVE_COOLING: { lowerLimit: 0, upperLimit: 45 },
	MED_ACTIVE_COOLING: { lowerLimit: 0, upperLimit: 40 },
};

function inferBreach(value, lowerLimit, upperLimit) {
	if (value < lowerLimit) {
		return 'TOO_LOW';
	}
	if (value > upperLimit) {
		return 'TOO_HIGH';
	}
	return 'NORMAL';
}

function coolingTypeRange(coolingType) {
	if (COOLING_TYPES_LIMIT[coolingType]) {
		let coolingLimit = {
			lowerLimit: COOLING_TYPES_LIMIT[coolingType].lowerLimit,
			upperLimit: COOLING_TYPES_LIMIT[coolingType].upperLimit,
		};
		return coolingLimit;
	} else {
		const notInLimits = {
			lowerLimit: 'Not in limits',
			upperLimit: 'Not in limits',
		};
		return notInLimits;
	}
}

function classifyTemperatureBreach(coolingType, temperatureInC) {
	let coolingLimits = coolingTypeRange(coolingType);
	let breach = inferBreach(
		temperatureInC,
		coolingLimits.lowerLimit,
		coolingLimits.upperLimit
	);
	if (
		coolingLimits.lowerLimit === 'Not in limits' ||
		coolingLimits.upperLimit === 'Not in limits'
	) {
		return 'WARNING';
	} else return breach;
}

function checkAndAlert(alertTarget, batteryChar, temperatureInC) {
	const breachType = classifyTemperatureBreach(batteryChar, temperatureInC);
	if (alertTarget == 'TO_CONTROLLER') {
		sendToController(breachType);
	} else if (alertTarget == 'TO_EMAIL') {
		sendToEmail(breachType);
	} else return 'NOT_APPLICABLE';
}

function sendToController(breachType) {
	const header = 0xfeed;
	console.log(`${header}, ${breachType}`);
}

function sendToEmail(breachType) {
	const recepient = 'a.b@c.com';
	if (breachType == 'TOO_LOW') {
		console.log(`To: ${recepient}`);
		console.log('Hi, the temperature is too low');
	} else if (breachType == 'TOO_HIGH') {
		console.log(`To: ${recepient}`);
		console.log('Hi, the temperature is too high');
	} else {
		console.log(`To: ${recepient}`);
		console.log('Not applicable');
	}
}

module.exports = {
	inferBreach,
	coolingTypeRange,
	classifyTemperatureBreach,
	checkAndAlert,
	sendToController,
	sendToEmail,
	COOLING_TYPES_LIMIT,
};
