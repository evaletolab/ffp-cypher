
const crypto = require('crypto');
const utils = require('./utils');
function generateKeys(bits) {
  const DHp = crypto.createDiffieHellman(bits); 
  const DHq = crypto.createDiffieHellman(bits); 
  
  
  const seed = BigInt('0x'+crypto.randomBytes(32).toString('hex'));
  const p = BigInt('0x'+DHp.getPrime('hex'));
  const q = BigInt('0x'+DHq.getPrime('hex'));

  // const seed=2n;//
  // const p=11n;//
  // const q=17n;//
  
  
  //
  // n=pq
  const n = p*q;
  
  
  //
  // ϕ(n)=(p−1)(q−1)
  const on = (p-1n)*(q-1n);
  
  
  const e = utils.relativelyPrime(seed,on);
  
  
  //const d = (e*on+1n)/e;
  const d = utils.inverseMod(on,e);
  
  
  // console.log('debug -->n   ',n);
  // console.log('debug -->ϕ(n)',on);
  // console.log('debug -->e   ',e);
  // console.log('debug -->d   ',d);

  // const cyph = utils.modPow(72n,e, n);
  // console.log('debug -->encrypt H(72)',cyph);
  // console.log('debug -->decrypt',utils.modPow(cyph,d,n));

  return {
    bits:bits,
    publicKey:((n).toString(36)+'/'+(e).toString(36)),
    privateKey: ((d).toString(36))
  };
}


exports.generateKeys = generateKeys;
