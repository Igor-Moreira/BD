const admin = require('firebase-admin');

const serviceAccount = require('../firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-1c8c5.firebaseio.com"
});

const db = admin.firestore()

const doc = db.collection('categories').doc('jQixm4zoAzDkvZt4A9r9')
doc
    .update({
        category: 'Novo nome com update'
})
.then( snap => {
    console.log(snap)
})