const admin = require('firebase-admin');

const serviceAccount = require('../firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-1c8c5.firebaseio.com"
});
//A constante db chama a função admin que retorna o firestore
const db = admin.firestore()

//add um documento, cria uma referencia para para um documento novo 
// db
const doc = db.collection('categories').doc()
// set é uma promisse que escreve algo no qual está referenciando (nesse caso doc)
//quando não tem nenhum documento pronto ele cria, caso contrario sobrescreve. (setar) 
doc.set({
    category: 'Categoria criada via codigo'
})
// quando a promisse for resolvida irá rotornar um snap(foto) do resultado!
.then( snap => {
    //exibe uma mensagem do que é referenciado
    console.log(snap)
})