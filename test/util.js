const assert = require('chai').assert;
const should = require("chai").should();

const { B64, gcd, relativelyPrime, inverseMod } = require('../src/utils');

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


});
