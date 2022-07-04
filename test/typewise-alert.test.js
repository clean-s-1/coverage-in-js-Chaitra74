const alerts = require('../typewise-alert');
const {expect} = require('chai');

it('infers a value lower than the minimum as TOO_LOW', () => {
  expect(alerts.inferBreach(20, 50, 100)).equals('TOO_LOW');
});
