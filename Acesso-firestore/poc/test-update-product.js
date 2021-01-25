const admin = require('firebase-admin');

const serviceAccount = require('../firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-1c8c5.firebaseio.com"
});

const db = admin.firestore()

const cat1 = 'jQixm4zoAzDkvZt4A9r'
const catRef = db.collection('categories').doc(cat1)

const doc = db.collection('Products').doc('Ck6RG2kxFSkIO8MIdqSs')
doc.update({
    produtc: 'Nome product',
    price:2000,
    categories: admin.firestore.FieldValue.arrayUnion(catRef),
    categories2: admin.firestore.FieldValue.arrayUnion(cat1)
})
.then( snap => {
    console.log(snap)
})