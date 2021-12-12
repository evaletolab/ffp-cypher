
# XOR cypher (symmetric)

![theorem](https://miro.medium.com/max/656/0*jGUk7VT47UuS0rhi.png)

Let `m` be a plaintext message, `k` be the encryption key, and `c` be the encrypted message.

* source [The making of the XOR cipher
](https://infosecwriteups.com/the-making-of-the-xor-cipher-794d2e6c964f)


# Simple RSA  (asymmetric)

* https://brilliant.org/wiki/rsa-encryption/

* Half of the public key `N=pq`, `e = seed`
* compute the encrypted message,  `c ≡ m^e(mod N)`
* compute the original message  `c^d ≡ m (mod N)`


# Documentation

## relatively Prime
*  e is relatively Prime of a if PGCD(e,a) = 1

## modular inverse
If a aa and NNN are integers such that gcd⁡(a,N)=1, then there exists an integer x xx such that ax≡1(modN). 
* x≡a⁻¹ (mod N) 
* (a * X) % N = 1

### Modulo operation
* a² % n = [(a mod n)²] mod n.
* (a + b) mod n = [(a mod n) + (b mod n)] mod n.
* ab mod n = [(a mod n)(b mod n)] mod n.
* https://en.wikipedia.org/wiki/Modulo_operation#Properties_(identities)


## Modular exponentiation 
* a^e % m (HAC 14.85)
* https://en.wikipedia.org/wiki/Modular_exponentiation#Pseudocode


## Reference

* a^x % n (HAC 14.79) (HAC 14.85)
* x = x/R mod m (HAC 14.32)
* https://gist.github.com/jimklo/3036199#file-openpgp-js-L171