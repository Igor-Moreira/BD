const admin = require('firebase-admin');

const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-1c8c5.firebaseio.com"
});

const db = admin.firestore()

const cat1 = '0iTfPcQRQ0ynaUWE8e35'
const catRef = db.collection('categories').doc(cat1)

const doc = db.collection('Products').doc()
doc.set({
    produtc: 'Nome product',
    price:2000,
    categories: [catRef],
    categories2: [cat1]
})
.then( snap => {
    console.log(snap)
})