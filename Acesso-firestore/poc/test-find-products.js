const admin = require('firebase-admin');

const serviceAccount = require('../firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-1c8c5.firebaseio.com"
});

const db = admin.firestore()

const cat1 = '0iTfPcQRQ0ynaUWE8e35'
const catRef = db.collection('categories').doc(cat1)

const products = db
    .collection('Products')
    .where('categories', 'array-contains', catRef)
    .get()


products.then(snapshot => {
    console.log('is empty', snapshot.empty)
    snapshot.forEach(doc => {
        console.log(doc.idm, '=>', doc.data())
        db
        .collection('Products')
        .doc(doc.id)
        .collection('images')
        .get()
        .then(imgSnapshot => {  
            imgSnapshot.forEach(img => {
                console.log(' img ==> ', img.id, '=>', img.data())
            })          
        })
    })    
})