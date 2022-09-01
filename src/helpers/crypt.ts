import { prepForStorage, readFromStorage } from '@/helpers/util'

const keyAlgo = {
  name: 'AES-GCM',
  length: 256
}
const ivLen = 16

async function genPBKDF2 (password: string): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  const iterations = 100000
  const hash = 'SHA-256'

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode(password.slice(2, 10)),
      iterations,
      hash
    },
    keyMaterial,
    keyAlgo,
    false,
    ['encrypt', 'decrypt']
  )
}

export async function aesCrypt (data: ArrayBuffer, iv: Uint8Array, key: CryptoKey, mode?: 'encrypt' | 'decrypt'): Promise<ArrayBuffer> {
  const algo = {
    name: 'AES-GCM',
    iv
  }
  if (data.byteLength < 1) {
    return new ArrayBuffer(0)
  } else if (mode?.toLowerCase() === 'encrypt') {
    return await crypto.subtle.encrypt(algo, key, data)
      .catch(err => {
        throw new Error(err)
      })
  } else {
    return await crypto.subtle.decrypt(algo, key, data)
      .catch(err => {
        throw new Error(err)
      })
  }
}

export async function encryptSeed (password: string, seed: string): Promise<string> {
  const key = await genPBKDF2(password)
  const encoder = new TextEncoder()
  const iv = crypto.getRandomValues(new Uint8Array(ivLen))
  const cypher = await aesCrypt(encoder.encode(seed), iv, key, 'encrypt')
  return prepForStorage(iv, cypher)
}
export async function decryptSeed (password: string, storedSeed: string): Promise<string> {
  const key = await genPBKDF2(password)
  const decoder = new TextDecoder()
  const ready = await readFromStorage(ivLen, storedSeed)
  const data = await aesCrypt(ready.seed, ready.iv, key, 'decrypt')
  return decoder.decode(data)
}
