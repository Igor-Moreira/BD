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
    db.run(query, err => {
        if(err){
            reject(err)
        }else{
            resolve()
        }
    })
})

const createdTables = async() => {
    const db = await initDB('banco.sqlite3')

    await run(db, `
        CREATE TABLE categories (
            id INTEGER PRIMARY KEY NOT NULL,
            category TEXT
        );
    `)
    console.log('categories table created!')


    await run(db, `
        CREATE TABLE products (
            id INTEGER PRIMARY KEY NOT NULL,
            product TEXT,
            price REAL
        );
     `)
     console.log('products table created!')

    await run(db, `
            CREATE TABLE images (
                id INTEGER PRIMARY KEY NOT NULL,
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
    
createdTables().catch(err => {
    console.log(err)
})


