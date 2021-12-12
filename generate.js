const generateKeys = require('./src/RSAKeys').generateKeys;
const BITs = 512;

const keys = generateKeys(BITs);

console.log('-------------------------------------------');
console.log('Generate Random public key,');
console.log('ffp_'+keys.publicKey);

console.log('-------------------------------------------');

console.log('Generate private key,');
console.log('PK_'+keys.privateKey);
console.log('-------------------------------------------');
