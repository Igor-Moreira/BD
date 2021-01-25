const sqlite = require ('sqlite3').verbose()

const openDatabase = databasefile =>  new Promise((resolve, reject) => {
    const db = new sqlite.Database(databasefile, (err) => {
        if(err){
            reject(err)
        }else{
            resolve(db)
        }
    })
})

const run = (db, query) => new Promise((resolve,reject) =>{
    db.run(query, err => {
        if(err){
            reject(err)
        }else{
            resolve()
        }
    })
})

const init = async(databasefile) => {
    //"esperar a conexação com o banco ficar pronta"
    const db = await openDatabase(databasefile)
    //checar se o banco já está criado
    const exists = await query (db, `SELECT name from sqlite_master where type = 'table' and name = 'categories'`)
    if(exists.length === 0){
        await run(db, `
            CREATE TABLE categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                category TEXT
            );
        `)
        console.log('categories table created!')


        await run(db, `
            CREATE TABLE products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product TEXT,
                price REAL
            );
        `)
        console.log('products table created!')

        await run(db, `
            CREATE TABLE images (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                description TEXT,
                url TEXT,
                product_id INTEGER REFERENCES products(id)
            ); 
        `)
        console.log('images table created!')

        await run(db, `
            CREATE TABLE categories_products (
                product_id INTEGER REFERENCES products(id),
                category_id INTEGER REFERENCES categories(id)
            ); 
        `)    
        console.log('categories_products table created!')
    }  
    return db
}



// inicio o banco(initDB), databasefile = banco.sqlite3, crio uma nova promeça de 
// resolver ou rejeitar a criação de db 
/*
const init = databasefile => new Promise((resolve, reject) => {
    const db = new sqlite.Database(databasefile, (err) => {
        if(err){
            reject(err)
        }else{
            resolve(db)
        }
    })
})
*/
const queryWithParams = (db, query, values) => new Promise((resolve, reject) =>{
    db.run(query, values, err => {
        if(err){
            reject(err)
        }else{
            resolve()
        }
    })
})

const query = (db, query) => new Promise((resolve,reject) =>{
    db.all(query, (err, rows) => {
        if(err){
            reject(err)
        }else{
            resolve(rows)
        }
    })
})

module.exports = {
    init,
    queryWithParams,
    query
}