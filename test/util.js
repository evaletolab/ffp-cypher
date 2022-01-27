const assert = require('chai').assert;
const should = require("chai").should();

const { B64, gcd, relativelyPrime, inverseMod, hacha, requiresWork, proofOfWork } = require('../src/utils');

describe('util', function() {
  it('B64', (done) => {
    const b64 = new B64();
    const encoded = b64.encode('hello world!');
    b64.decode(encoded).should.equal('hello world!')
    done();
  });



  it('gcd', (done) => {
    gcd(160,187).should.equal(1);
    gcd(3000n,197n).should.equal(1n);
    gcd(16,4).should.equal(4);
    done();
  });


  it('relative prime', (done) => {
    const rp = relativelyPrime(132n,18n);
    gcd(rp,18n).should.equal(1n);
    gcd(rp,132n).should.equal(1n);
    // console.log('invertMod (on,e)   ',xgcd(3000n,197n)[1]);

    done();
  });


  it('inverse Modular, de ≡ 1 (mod ϕ(n))', (done) => {
    inverseMod(160n,3n).should.equal(107n);
    done();
  });

  it('hacha', (done) => {
    const hex = hacha('oliviertest');
    hex.toString(16).should.equal('a723a194e674');
    done();
  });

  it('requiresWork low difficulty and long str', (done) => {
    const string = 'So.. I can see that there is some kind of number size issue happening but do not know how to force JS to treat this number as a long.';
    const difficulty = 0x9999n;
    const work = requiresWork(string,difficulty);
    proofOfWork(string,work[1],difficulty).should.equal(true);
    // console.log(work);
    done();
  });

  it('requiresWork low difficulty short str', (done) => {
    const difficulty = 0x9999n;
    const string = 'Olivier is learning something here';
    const work = requiresWork(string,difficulty);
    proofOfWork(string,work[1],difficulty).should.equal(true);
    // console.log(work[0].toString(16));
    // console.log(work[1].toString(16));
    done();
  });

});
