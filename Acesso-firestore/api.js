const categories = require('./categories')
const products = require('./products')
const testes = async() => {
/*
    await categories.create({
        category: 'Nova categoria organizada'
    })
    await categories.update('Hme6hpWPoojEcwKpipFQ', {category: 'Categoria atualizada'})
    await categories.remove('')
*/

    // const cats = await categories.findAll()
    // console.log(cats)
/*
    await products.create({
        products: 'product 2',
        price: 200,
        categories: ['Hme6hpWPoojEcwKpipFQ']
    }) 
*/

   // await products.remove('0iTfPcQRQ0ynaUWE8e35')

/*
    await products.update('GP5zvbtwmBjanoZluqOl', {
        product: 'New name',
        categories: ['0iTfPcQRQ0ynaUWE8e35']
    })
*/
    // const cats = await categories.findAllPaginated({
    //     pageSize: 1, 
    //     startAfter: 'Electronics'
    // }) 
    // console.log(cats) 

    //await products.addImage('GP5zvbtwmBjanoZluqOl', {description: 'new image', url: 'url'})
    // const prods = await products.findAll()
    // console.log(prods)
    const prods2 = await products.findAllPaginated({ pageSize: 1, startAfter: ''})
    console.log(prods2.data[0].imgs)
}

testes()