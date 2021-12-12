const assert = require('chai').assert;
const should = require("chai").should();

const XORCipher = require('../src/XOR').XORCipher;


describe('xor', function() {

  it('xor encrypt/decript', (done) => {
    const xor = new XORCipher();
    cypher = xor.encrypt("olivier!",'_private_key_');
    const message = xor.decrypt(cypher,'_private_key_');
    message.should.equal('olivier!')
    done();
  });

});
