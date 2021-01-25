// versão sem promisse, no qual o banco não interrompe a a conexão
/*
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost', 
    user:  'root',
    database: 'cat-products'
})
//query de conexão com o banco 
connection.query('select * from categories', (err, results, fields) =>{
    console.log(err, results, fields)
})
*/

// versão promissificada
const mysql = require('mysql2/promise')

const run = async() => {
    try{
        const connection = await mysql.createConnection({
            host: 'localhost', 
            user:  'root',
            database: 'cat-products'
        })
        // filds --> campos  ;  try --> tentar ; catch --> pegar
        try{
            const [results, fields] = await connection.query('select * from categories')
            console.log(results, fields)
        }catch(err){
            console.log(err)
        }
    }catch(err){
        console.log(err)
    }
}
run()