
function inferBreach(value, lowerLimit, upperLimit) {
  if (value < lowerLimit) {
    return 'TOO_LOW';
  }
  if (value > upperLimit) {
    return 'TOO_HIGH';
  }
  return 'NORMAL';
}

function classifyTemperatureBreach(coolingType, temperatureInC) {
  let lowerLimit = 0;
  let upperLimit = 0;
  if (coolingType == 'PASSIVE_COOLING') {
    lowerLimit = 0;
    upperLimit = 35;
  } else if (coolingType == 'HI_ACTIVE_COOLING') {
    lowerLimit = 0;
    upperLimit = 45;
  } else if (coolingType == 'MED_ACTIVE_COOLING') {
    lowerLimit = 0;
    upperLimit = 40;
  }
  return inferBreach(temperatureInC, lowerLimit, upperLimit);
}

function checkAndAlert(alertTarget, batteryChar, temperatureInC) {
  const breachType = classifyTemperatureBreach(batteryChar['coolingType'], temperatureInC);
  if (alertTarget == 'TO_CONTROLLER') {
    sendToController(breachType);
  } else if (alertTarget == 'TO_EMAIL') {
    sendToEmail(breachType);
  }
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
  }
}

module.exports =
    {inferBreach, classifyTemperatureBreach, checkAndAlert, sendToController, sendToEmail};
