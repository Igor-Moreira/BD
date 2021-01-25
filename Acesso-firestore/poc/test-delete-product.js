const admin = require('firebase-admin');

const serviceAccount = require('../firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-1c8c5.firebaseio.com"
});

const db = admin.firestore()

const productId = 'DZlNhtowc13IpxT2i2qn'

const productRef = db.collection('Products').doc(productId)

db
    .collection('products')
    .doc(productId)
    .collection('images')
    .get()
    .then(imgSnapshot => { 
        const exclusoes = [] 
        imgSnapshot.forEach(img => {
            exclusoes.push(img.delete())
        })
        return Promise.all(exclusoes)    
    })
    .then(() => {
        return productRef.delete()
    })
    .then(() => {
        console.log('everything was deleted')
    })