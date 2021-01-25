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


const run = (db, query, values) => new Promise((resolve,reject) =>{
    db.run(query, values, err => {
        if(err){
            reject(err)
        }else{
            resolve()
        }
    })
})

const updateProducts = async() => {
    const db = await initDB('banco.sqlite3')
    await run(db,  `update products set product =? where id=?`, ['prod atualizado', 8])
    console.log('Products update!')

    }
    
updateProducts().catch(err => {
    console.log(err)
})


