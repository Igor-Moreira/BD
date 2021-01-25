const admin = require('firebase-admin');

const serviceAccount = require('../firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-1c8c5.firebaseio.com"
});

const db = admin.firestore()

const categories = db.collection('categories').get()
categories.then(snapshot => {
    console.log('is empty', snapshot.empty)
    snapshot.forEach(doc => {
        console.log(doc.idm, '=>', doc.data())
    })    
})