const categories = require('./categories')('./banco.sqlite3')
const products = require('./products')('./banco.sqlite3')

//função de teste assincrona q ira aguardar para executar a criação do categories, id = 1 e string = opa
const test = async() => {
   /* await categories.create([1, 'cat 1'])
    await categories.create([2, 'cat 2'])
    await categories.create([3, 'cat 3'])
    await categories.create([4, 'cat 4'])*/
    //await categories.remove(1)
    //await categories.update(8, ['categoria atualizada'])
    /*
    console.log(await categories.findAll())
    console.log('cp: 0', await categories.findAllPaginated( {pageSize: 2, currentPage: 0}))
    console.log('cp: 1', await categories.findAllPaginated( {pageSize: 2, currentPage: 1}))
    console.log('cp: 2', await categories.findAllPaginated( {pageSize: 2, currentPage: 2}))
    */
    //await products.create([2,'dfdf', 90])
    //await products.addImage(2, [3, '<url3>', '<desc>'])
    //await products.update(1, ['new prod', 89] )
    //await products.remove(1)
    // console.log(await products.findAll())
    //console.log('cp: 0', await products.findAllPaginated( {pageSize: 1, currentPage: 0}))
    //await products.updateCategories(1, [2,3] )
    console.log(await products.findAllByCategory(2))
}
test()