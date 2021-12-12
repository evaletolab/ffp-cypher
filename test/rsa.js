const assert = require('chai').assert;
const should = require("chai").should();

const RSA = require('../src/RSA').RSA;
const utils = require('../src/utils');


describe('rsa', function() {
  let keys;
  let cypher;
  it('rsa keys', (done) => {
    const rsa = require('../src/RSAKeys');
    const BITs = 128;
    keys = rsa.generateKeys(BITs);

    should.exist(keys);
    should.exist(keys.bits);
    should.exist(keys.publicKey);
    should.exist(keys.privateKey);

    console.log('debug --> pk',keys.publicKey)

    done();
  });

  it('rsa decode keys', (done) => {
    const rsa = new RSA(keys.bits);
    //
    // extract public key
    const vector = rsa.extractK(keys.publicKey);

    const cypher = utils.modPow(72n,vector.e, vector.n);

    //
    // extract private key
    const PK = utils.convert(keys.privateKey,36);
    utils.modPow(cypher,PK,vector.n).should.equal(72n);

    // console.log('debug -->decrypt',utils.modPow(cypher,PK,vector.n));
    done();
  });

  it('rsa blockToBigInt', (done) => {
    const rsa = new RSA(keys.bits);
    const block = rsa.blockToBigInt("olivier!");
    console.log('----debug',block);
    done();
  });

  it('rsa encrypt/decript', (done) => {
    const rsa = new RSA(keys.bits);
    cypher = rsa.encrypt("olivier!",keys.publicKey);
    const message = rsa.decrypt(cypher,keys.publicKey,keys.privateKey);
    console.log('----debug--> cypher, message',cypher,message);
    done();
  });
  xit('rsa decrypt', (done) => {
    const rsa = new RSA(keys.bits);
    message.should.equal('livier!')
    console.log('----debug',message);
    done();
  });

});
