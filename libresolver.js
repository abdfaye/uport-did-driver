let UportLite = require('uport-lite')
const uportLiteGet = UportLite({
  ipfsGw: 'http://10.112.50.153:5001',
  infuraKey: 'INFURA_API_KEY',
  networks: {
    '0x5': {
      rpcUrl: 'http://10.112.50.153:22000',
      address: '0x11f29ef6366c0e69898a5b91c3238a391162e3de'
    }
  }
})
let didDocumentTemplate = {
  "authenticationCredential": [{
    "id": "",
    "type": ["CryptographicKey", "EcdsaPublicKey"],
    "curve": "secp256k1",
    "publicKeyHex":  ""
  }]
}

let uportResolveLegacy = (did, callback) => {

  if (did.length < 9 || did.slice(0,10) !== 'did:uport:') {
    throw(new Error('Not a uport DID'))
  }
  let mnid = did.slice(10)

  uportLiteGet(mnid, (err, doc) => {
    console.log(doc)
    let pubKey = doc.publicKey.slice(2)
    let name = doc.name
    var didDoc = didDocumentTemplate
    didDoc.authenticationCredential[0].id = did + "#auth"
    didDoc.authenticationCredential[0].publicKeyHex = pubKey
    callback(null, didDoc)
  })
}

// let did = 'did:uport:2ok9oMAM54TeFMfLb3ZX4i9Qu6x5pcPA7nV'
// uportResolveLegacy(did, (err, doc) => {
//   console.log(doc)
// })

module.exports = {uportResolveLegacy}
