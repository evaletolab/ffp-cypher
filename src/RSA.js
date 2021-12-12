const utils = require('./utils');

const blockSz = 32;

class RSA {
  constructor(bitLength) {
    this.bitLength = bitLength;    
  }

  extractK(pk) {
    let [n,e] = pk.split('/');
    if(!e || !n) throw new Error('Invalid format (1)');
    e=utils.convert(e,36);
    n=utils.convert(n,36);
    if(!e || !n) throw new Error('Invalid format (2)');
    return {n,e};
  }

  blockToBigInt(block) {
    const bytes = [];
    for(let i = block.length - 1;i>=0;i--){
      bytes.push(block.charCodeAt(i).toString(16).padStart(2,'0'));
    }

    //
    // padding with 0x00
    const pad = Math.max((blockSz) - bytes.length,0);
    for(let i = 0;i<pad;i++){
      bytes.unshift('00');
    }
    return BigInt('0x' + bytes.join(''));
  }



  //
  // https://github.com/travist/jsencrypt/blob/a993acf21d595e4183d27edf1390339708b2585e/lib/lib/jsbn/jsbn.js#L401
  decrypt(message,pub,pk) {
    const vector = this.extractK(pub);
    const code= utils.modPow(message,utils.convert(pk,36),vector.n).toString(16);
    let str="";
    for(let i =(code.length-2); i >= 0; i -=2) {
      str += String.fromCharCode(parseInt((code[i]+code[i+1]), 16));
    }
    return str;
  }

  //
  // encrypt message,  
  // c ≡ m[i]^seed(mod pub)
  encrypt(message,pub){
    const bInt = this.blockToBigInt(message);
    const vector = this.extractK(pub);
    return utils.modPow(bInt,vector.e,vector.n);
  }

}


exports.RSA = RSA;