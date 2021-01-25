const sqlite = require ('sqlite3').verbose()

// inicio o banco(initDB), databasefile = banco.sqlite3, crio uma nova promeça de 
// resolver ou rejeitar a criação de db 
const initDB = databasefile => new Promise((resolve, reject) => {
    const db = new sqlite.Database(databasefile, (err) => {
        if(err){
            reject(err)
        }else{
            resolve(db)
        }
    })
})


const run = (db, query) => new Promise((resolve,reject) =>{
    db.all(query, (err, rows) => {
        if(err){
            reject(err)
        }else{
            resolve(rows)
        }
    })
})

const listProducts = async() => {
    const db = await initDB('banco.sqlite3')
    const products = await run(db,  `select * from products`,)
    console.log('Products list!', products)

    }
    
listProducts().catch(err => {
    console.log(err)
})


