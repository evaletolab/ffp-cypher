
# XOR cypher (symmetric)

![theorem](https://miro.medium.com/max/656/0*jGUk7VT47UuS0rhi.png)

Let `m` be a plaintext message, `k` be the encryption key, and `c` be the encrypted message.

* source [The making of the XOR cipher
](https://infosecwriteups.com/the-making-of-the-xor-cipher-794d2e6c964f)


# Simple RSA  (asymmetric)


* We use 1024-bit (309 digits) keys even if they are considered risky
* Half of the public key `N=pq`, `e = seed`
* compute the encrypted message,  `c ≡ m^e(mod N)`
* compute the original message  `c^d ≡ m (mod N)`


# Documentation
* https://brilliant.org/wiki/rsa-encryption/

## modular inverse
If a aa and NNN are integers such that gcd⁡(a,N)=1, then there exists an integer x xx such that ax≡1(modN). Example:

```
 x≡a⁻¹ (mod N)
 x≡3⁻¹ (mod 11)
 3x≡1 (mod 11)
 3 * 4 = 12 % 11 = 1
```

## Modulo operation
* a² % n = [(a mod n)²] mod n.
* (a + b) mod n = [(a mod n) + (b mod n)] mod n.
* ab mod n = [(a mod n)(b mod n)] mod n.
* https://en.wikipedia.org/wiki/Modulo_operation#Properties_(identities)

## Modulo Power
* https://en.wikipedia.org/wiki/Modular_exponentiation#Right-to-left_binary_method
## Reference

* a^x % n (HAC 14.79) (HAC 14.85)
* x = x/R mod m (HAC 14.32)
* https://gist.github.com/jimklo/3036199#file-openpgp-js-L171