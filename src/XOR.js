const B64 = require('./utils').B64;

 class XORCipher {
  
  constructor() {
    //
    // check if custom implementation is needed
    // if node
    this.b64 = new B64();
  }

  encrypt(key, data) {
    data = this.xor_encrypt(key, data.split(''));
    return this.b64.encode(data);
  }

  decrypt(key, data) {
    data = this.b64.decode(data).split('');
    return this.xor_decrypt(key, data);
  }

  keyCharAt(key, i) {
    return key.charCodeAt( Math.floor(i % key.length) );
  }

  xor_encrypt(key, data) {
    return data.map((c, i) => {
      return c.charCodeAt(0) ^ this.keyCharAt(key, i);
    });
  }

  xor_decrypt(key, data) {
    
    return data.map((c, i) => {
      return String.fromCharCode( c ^ this.keyCharAt(key, i) );
    }).join('');
  }

}


exports.XORCipher = XORCipher; 