

//
// private function
function b64_decode(b64) {
  if((typeof window === 'undefined') || !window.atob) {
    return Buffer.from(b64,'base64').toString();
  }
  return window.atob(b64);
}

function b64_encode(str) {
  if((typeof window === 'undefined') || !window.btoa) {
    return Buffer.from(str).toString('base64');
  }
  return window.btoa(str);
}


class B64 {
  encode(data) {
    return b64_encode(data);
  }

  decode(data) {
    return b64_decode(data);
  }

}

//
// Convert HEX to String
function hextoa(hex) {
  return Buffer.from(hex, 'hex').toString('base64');
}

//
// Greater common divisor (gcd) of two BigInt
// https://en.wikipedia.org/wiki/Greatest_common_divisor#Lehmer's_GCD_algorithm
function gcd(a, b) {
  while (b > 0n) {
    const q = (a / b);
    const r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function convert(value, radix) {
  return [...value.toString()]
      .reduce((r, v) => r * BigInt(radix) + BigInt(parseInt(v, radix)), 0n);
}

//
// e is relatively Prime of ϕ(n) if PGCD(e,ϕ(n)) = 1
// https://mathworld.wolfram.com/RelativelyPrime.html
function relativelyPrime(a,b) {
  while(gcd(a,b)!=1n){
    a++;
  }
  return a;
}

function xgcd(a, b) { 

  if (b == 0n) {
    return [1n, 0n, a];
  }

  const temp = xgcd(b, a % b);
  let x = temp[0];
  let y = temp[1];
  let d = temp[2];
  return [y, x-y*(a/b), d];
}

//
// de ≡ 1 (mod ϕ(n)) (HAC 14.61)
// d = e ϕ(n) + 1
// is the reverse modulo
// https://stackoverflow.com/a/26986636
function inverseMod(mod, e) { 
  const d = xgcd(mod,e)[1];
  return (d<0)? (d+mod):d;
}

//
// Modular_exponentiation 
// a^e % m (HAC 14.85)
// https://en.wikipedia.org/wiki/Modular_exponentiation#Pseudocode
// base, exp, modulo
function modPow(b, e, m) {
  if(m == 1n) {
    return 0n;
  }
  let r = 1n;
  b = b % m;
  while (e > 0n) {
    if (e % 2n == 1n) {
      r = (r * b) % m;
    }
    b = (b*b) % m;
    //
    // e = (e / 2)' 
    e = e >> 1n;  
  }
  return r;
}

//
// simple hash function with SDBM algo
// https://www.partow.net/programming/hashfunctions/
function hacha(str) {
  const hash = Array.from(str).reduce((hash, char) => {
    return (hash << 6n) + BigInt(char.charCodeAt(0)) + (hash << 16n) - hash ;
  }, 0n);
  // return 8 bytes!
  return (hash & 0xffffffffffffffffn).padStart(16, '0') ;  
}

//
// FNV-1a
function FNV1a(str) {
  let hash = 0x811c9dc5n;
  for (let i = 0; i < str.length; i++) {
    hash ^= BigInt(str.charCodeAt(i));
    hash *= 0x01000193n;
  }
  
  return hash.toString(16).padStart(16, '0');
}

function requiresWork(string, difficulty) {
  for (let index = 0n;; index++) {
    const work = hacha(string+index);
    // if(work % 0xfffn == 0n) {
    //   console.log('---',index,work.toString(16), '----',(work & 0xffn), (work % 0xfffn))
    // }
    if((work % difficulty)  == 0n) {
      return [work,index];
    }    
    // if((work & difficulty)  == 0n) {
    //   return [work,index];
    // }    

  }
}

function proofOfWork(string, hash, nonce) {
  return (hacha(string+nonce) == hash);
}

exports.B64 = B64;
exports.hacha = hacha;
exports.FNV1a = FNV1a;
exports.convert = convert;
exports.gcd = gcd;
exports.relativelyPrime = relativelyPrime;
exports.inverseMod = inverseMod;
exports.modPow = modPow;
exports.requiresWork = requiresWork;
exports.proofOfWork = proofOfWork;
