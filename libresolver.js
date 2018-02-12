let UportLite = require('uport-lite')
const uportLiteGet = UportLite({
  ipfsGw: 'https://ipfs.infura.io/ipfs/',
  infuraKey: 'INFURA_API_KEY',
  networks: {
    '0x4': {
      rpcUrl: 'https://rinkeby.infura.io',
      address: '0x2cc31912b2b0f3075a87b3640923d45a26cef3ee'
    }
  }
})*/
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
