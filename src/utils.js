

//
// private function
function b64_decode(b64) {
  if((typeof window === 'undefined') || !window.btoa) {
    return Buffer.from(b64,'base64').toString();
  }
  return window.btoa(b64);
}

function b64_encode(str) {
  if((typeof window === 'undefined') || !window.atob) {
    return Buffer.from(str).toString('base64');
  }
  return window.atob(str);
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

exports.B64 = B64;
exports.convert = convert;
exports.gcd = gcd;
exports.relativelyPrime = relativelyPrime;
exports.inverseMod = inverseMod;
exports.modPow = modPow;