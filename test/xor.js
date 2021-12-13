const assert = require('chai').assert;
const should = require("chai").should();

const XORCipher = require('../src/XOR').XORCipher;


describe('xor', function() {

  it('xor encrypt/decript', (done) => {
    const xor = new XORCipher();
    cypher = xor.xor_encrypt("olivier!".split(''),'_private_key_');
    xor.xor_decrypt(cypher,'_private_key_').should.equal('olivier!');    
    done();
  });

  it('xor encrypt/decript with b64', (done) => {
    const xor = new XORCipher();
    cypher = xor.encrypt("olivier!",'_private_key_');
    xor.decrypt(cypher,'_private_key_').should.equal('olivier!');    
    done();
  });

});
