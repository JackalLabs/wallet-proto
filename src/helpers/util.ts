import StoredSeed from '@/interfaces/IStoredSeed'

function arrayBufferToBase64 (arrBuf: ArrayBuffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(new Blob([arrBuf]))
    reader.onload = () => {
      const ret = (reader.result as string || '')
        .replace(/^data:.+;base64,/, '')
      resolve(ret)
    }
    reader.onerror = (error) => {
      reject(error)
    }
  })
}

async function base64ToArrayBuffer (b64: string): Promise<ArrayBuffer> {
  return (await fetch(`data:application/octet;base64,${b64}`)).arrayBuffer()
}

export async function prepForStorage (iv: Uint8Array, storeValue: ArrayBuffer): Promise<string> {
  const tmp = new Uint8Array(iv.byteLength + storeValue.byteLength)
  tmp.set(new Uint8Array(iv), 0)
  tmp.set(new Uint8Array(storeValue), iv.byteLength)

  return arrayBufferToBase64(tmp.buffer)
}

export async function readFromStorage (ivLen: number, storeValue: string): Promise<StoredSeed> {
  const source = new Uint8Array(await base64ToArrayBuffer(storeValue))
  const iv = source.slice(0, ivLen)
  const seed = source.slice(ivLen)

  return { iv, seed }
}
