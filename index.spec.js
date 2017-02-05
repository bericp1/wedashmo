var chai = require('chai'),
  expect = chai.expect;

describe('A test that shouldn\'t exist', function() {
  it('doesn\'t exist', function() {
    expect(false).to.be.not.ok;
  });
});