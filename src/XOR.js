const B64 = require('./utils').B64;

 class XORCipher {
  
  constructor() {
    //
    // check if custom implementation is needed
    // if node
    this.b64 = new B64();
  }

  encrypt(data, key) {
    const bytes = this.xor_encrypt(data.split(''), key);
    return this.b64.encode(bytes);
  }

  decrypt(data, key) {
    const bytes = this.b64.decode(data);
    return this.xor_decrypt(bytes, key);
  }

  keyCharAt(key, i) {
    return key.charCodeAt( Math.floor(i % key.length) );
  }

  xor_encrypt(data, key) {
    return data.map((c, i) => {
      return (c.charCodeAt(0) ^ this.keyCharAt(key, i));
    });
  }

  xor_decrypt(data, key) {    
    if(typeof data == "string") {
      data = data.split('').map(c => c.charCodeAt(0));
    }
    return data.map((c, i) => {
      return String.fromCharCode( c ^ this.keyCharAt(key, i) );
    }).join('');
  }

}


exports.XORCipher = XORCipher; 