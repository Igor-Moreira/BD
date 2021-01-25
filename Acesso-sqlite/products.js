const db = require('./db')

const init = database => {

    const create = async(data) =>{
        const dbCon = await db.init(database)
        await db.queryWithParams(dbCon, `insert into products (id, product, price) values (?,?,?)`, data) 
    }

    const findAll = async() => {
        //dbCon espera e inicia o banco
        const dbCon = await db.init(database)
        //retorna a solicitação no banco de uma seleção de tdos os produtos, juntando ao lado tabelas com imagens que tenham o mesmo id de produtos, agrupando de acordo com o id de produtos na tabela imagem
        //return await db.query(dbCon, `select * from products left join images on products.id = images.product_id group by images.product_id`) 
        // função que solicita a seleção de todos os registros dentro da tabela produtos
        const products = await db.query(dbCon, `select * from products`)
        //função de condição para extair via id de cada produto agupando em uma string por separand cada elemento por virgula
        const condition = products.map(produto => produto.id).join(',')
        // função para buscar as imagens
        // imagens espera para solicitar no banco a seleção de todas a imagens quando o product_id estiver em tal condição agrupando esse resultado de acordo com seu produto_id
        const images = await db.query(dbCon,'select * from images where product_id in ('+condition+') group by product_id')
        // buscar as imagens de cada produto e coloca nos lugares corretos(função de mapeando que dado o id de produto retora uma imagem)
        // reduce((função),{objeto}->pega um valor inicial no qual é passado para uma função para utilizar esse valor
        const mapImages = images.reduce((antigo, atual) =>{
            return{
                ...antigo,
                [atual.product_id]: atual
            }
        }, {})
        return products.map(product => {
            return {
                ...product,
                image: mapImages[product.id]
            }
        })
    }

    const findAllByCategory = async(categoryid) => {
        const dbCon = await db.init(database)
        const products = await db.query(dbCon, `select * from products where id in (select product_id from categories_products where category_id = ${categoryid})`)
        const condition = products.map(produto => produto.id).join(',')
        const images = await db.query(dbCon,'select * from images where product_id in ('+condition+') group by product_id')
        const mapImages = images.reduce((antigo, atual) =>{
            return{
                ...antigo,
                [atual.product_id]: atual
            }
        }, {})
        return products.map(product => {
            return {
                ...product,
                image: mapImages[product.id]
            }
        })
    }


    const remove = async(id) =>{
        const dbCon = await db.init(database)
        await db.queryWithParams(dbCon, `delete from products where id =? `, [id]) 
        await db.queryWithParams(dbCon, `delete from images where product_id =? `, [id])
        await db.queryWithParams(dbCon, `delete from categories_products where product_id =? `, [id])
    }

    const update = async(id, data) => {
        const dbCon = await db.init(database)
        await db.queryWithParams(dbCon, `update products set product=?, price=? where id =?`, [...data, id])    
    }

    //gestão das categorias
    const updateCategories = async(id, categories) =>{
        const dbCon = await db.init(database)
        await db.queryWithParams(dbCon, `delete from categories_products where product_id = ?`,[id])
        for await(const category of categories){
            await db.queryWithParams(dbCon, `insert into categories_products(product_id, category_id) values (?,?)`, [id, category])
        } 
    }

    const addImage = async(product_id, data) => {
        const dbCon = await db.init(database)
        await db.queryWithParams(dbCon, `insert into images (id, url, description, product_id) values(?,?,?,?)`, [...data, product_id])    
    }

    const findAllPaginated = async({pageSize = 1, currentPage = 0 }) => {
        const dbCon = await db.init(database)
        const records = await db.query(dbCon, `select * from products limit ${currentPage*pageSize}, ${pageSize+1}`) 
        const hasNext = records.length > pageSize
        if(records.length > pageSize){
            records.pop()
        }
        const condition = records.map(produto => produto.id).join(',')
        const images = await db.query(dbCon,'select * from images where product_id in ('+condition+') group by product_id')
        const mapImages = images.reduce((antigo, atual) =>{
            return{
                ...antigo,
                [atual.product_id]: atual
            }
        }, {})

      
        return{
            data: records.map(product => {
                return {
                    ...product,
                    image: mapImages[product.id]
                }
            }),
            hasNext
        }
    }
    return{
        findAll,
        findAllPaginated,
        remove, 
        create,
        update,
        addImage,
        updateCategories,
        findAllByCategory 
    }
}

module.exports = init
