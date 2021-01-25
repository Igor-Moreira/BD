const admin = require('firebase-admin');

const serviceAccount = require('../firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-1c8c5.firebaseio.com"
});

const db = admin.firestore()

const productID = 'Ck6RG2kxFSkIO8MIdqSs'
const imageRef = db
  .collection('Products')
  .doc(productID).collection('images')
  .doc()

imageRef.set({
    description: 'my description',
    url: 'my image url'
})
.then(res => {
    console.log(res)
})

