const db = require('./db')

const init = database => {

    // asyncc-> assim q a ram estiver livre de processos executará o create, enviando dados
    const create = async(data) =>{
        //await -> espera o banco (bd) estar pronto, assim que confirmado ele é iniciado(init)
        const dbCon = await db.init(database)
        await db.queryWithParams(dbCon, `insert into categories (id, category) values (?,?)`, data) 
    }

    const findAll = async() => {
        const dbCon = await db.init(database)
        return await db.query(dbCon, `select * from categories `) 
    }

    const remove = async(id) =>{
        const dbCon = await db.init(database)
        await db.queryWithParams(dbCon, `delete from categories where id =? `, [id]) 
    }

    const update = async(id, data) => {
        const dbCon = await db.init(database)
        await db.queryWithParams(dbCon, `update categories set category =? where id =?`, [...data, id])    
    }


    const findAllPaginated = async({pageSize = 1, currentPage = 0 }) => {
        //tamanho da pagina const pageSize =1
        // página atual const currentPage = 0 
        const dbCon = await db.init(database)
        // retorna apos aguardar a query do banco, selecionando td que vem de categories, porém pulando 1 registro, limitando 1 (forma de caminhar no banco)
        // return await db.query(dbCon, `select * from categories limit 1, 1`) 
        const records = await db.query(dbCon, `select * from categories limit ${currentPage*pageSize}, ${pageSize+1}`) 
        const hasNext = records.length > pageSize
        if(records.length > pageSize){
            records.pop()
        }
        return{
            data: records,
            hasNext
        }
    }
    return{
        findAll,
        findAllPaginated,
        remove, 
        create,
        update   
    }
}

module.exports = init
