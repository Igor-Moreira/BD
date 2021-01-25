const admin = require('firebase-admin');

const serviceAccount = require('../firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-1c8c5.firebaseio.com"
});

const db = admin.firestore()

const pageSize = 1

const categories = db
                    .collection('categories')
                    .orderBy('category')
                    .limit(pageSize  + 1)
                    .startAfter('Eletronics')
                    .get()
categories.then(snapshot => {
    console.log('is empty', snapshot.empty)
    let total = 0
    snapshot.forEach(doc => {  
        if(total < pageSize){
            console.log(doc.idm, '=>', doc.data())
        }     
        total++      
    })
    if(total > pageSize){
        console.log('hasNext')
    }else{
        console.log('does not have Next')
    }   
})