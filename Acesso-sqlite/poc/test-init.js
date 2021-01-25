const sqlite = require ('sqlite3').verbose()

// inicio o banco(initDB), databasefile = banco.sqlite3, crio uma nova promeça de 
// resolver ou rejeitar a criação de db 
const db = new sqlite.Database(databasefile, (err) => {
    console.log(err, 'init')
})
