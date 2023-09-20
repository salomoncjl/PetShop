import { createCards, filterProducts, writeSponsors, createCarru, createShopping, fillHeart } from "./module/functions.js";

const container = document.getElementById("card-container")
const searchBar = document.getElementById("search-bar")
const shopping = document.getElementById("cart")
const carrito = document.getElementById("btn-car")
const modalCarrito = document.getElementById("modal-content")
const btnHeart = document.getElementsByClassName("btn-heart")
const form = document.getElementById("form")
const favorito = document.getElementById("fav")

let products = JSON.parse(localStorage.getItem("products")) || [] // trae del local storage los productos que fueron agregados al carrito
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []

localStorage.setItem("products", JSON.stringify(products))

let precioTotal = 0
createShopping(products,shopping,precioTotal,true)

let toys = JSON.parse(localStorage.getItem("toys")) || [] // toma el value de la key "toys" en el localStorage y lo guarda en la variable toys
let pharmacyProducts = JSON.parse(localStorage.getItem("pharmacyProducts")) || []
let cartProducts = toys.concat(pharmacyProducts)

createCards(toys, container, "")
fillHeart(toys,favoritos,btnHeart)

searchBar.addEventListener("keyup", (e) => {
    if(favorito.checked){
        let filteredFavourites = filterProducts(favoritos, e.target.value.toLowerCase()).filter(product => product.categoria === "jugueteria")
        createCards(filteredFavourites, container, e.target.value.toLowerCase())
        fillHeart(filteredFavourites,favoritos,btnHeart)
    }else{
        let filteredToys = filterProducts(toys, e.target.value.toLowerCase())
        createCards(filteredToys, container, e.target.value.toLowerCase())
        fillHeart(filteredToys,favoritos,btnHeart)
    }
})

favorito.addEventListener("click", (e) =>{
    if(favorito.checked){
        let filteredToys = filterProducts(favoritos, searchBar.value).filter(product => product.categoria === "jugueteria")
        createCards(filteredToys, container, searchBar.value)
        fillHeart(filteredToys,favoritos,btnHeart)
    }else{
        let filteredToys = filterProducts(toys, searchBar.value).filter(product => product.categoria === "jugueteria")
        createCards(filteredToys, container, searchBar.value)
        fillHeart(filteredToys,favoritos,btnHeart)
    }
})

container.addEventListener("click", (e) => {
    if (e.target.localName === "button") {
        let pressToy = toys.find(toy => toy._id == e.target.id)
        if (pressToy.disponibles > 0) {

            for (let toy of toys) {
               if (toy == pressToy) {
                   let i = toys.indexOf(toy)
                   pressToy.disponibles--
                   toys[i] = pressToy
                   localStorage.setItem("toys", JSON.stringify(toys)) // se actualiza la propiedad del localStorage, para que cuando recargues la pag no se vuelva a la info antigua
                   let unidades = document.getElementById(`unidades-${pressToy._id}`)
                   unidades.textContent = `${pressToy.disponibles} Unidades` // toma el id de <p> y le cambia el textContent
                   let stock = document.getElementById(`modalStock-${pressToy._id}`)
                   if(pressToy.disponibles < 5){
                    stock.classList.replace("bg-success", "bg-danger")
                    stock.innerHTML = '<b>Ultimas Unidades</b>'
                   }
                   if(pressToy.disponibles === 0){
                    stock.innerHTML = '<b>Sin Unidades</b>'
                   }
                }
            }
            let cartProduct = {
                ...pressToy,
                disponibles: pressToy.disponibles,
                stock: 1
            }
            let some = products.find(product => product._id == cartProduct._id)
            if (some) {
                products.forEach(product => {
                    if (some._id == product._id) {
                        product.stock += 1
                    }
                })
            } else {
                products.push(cartProduct)
            }
            localStorage.setItem("products", JSON.stringify(products)) // actualiza el valor de la key "products" en el localStorage
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ya no hay stock disponible',
            })
        }
    }
    else if (e.target.offsetParent && e.target.offsetParent.className == "card producto") { //si existe un parent y ese parent tiene className card y producto
        let modal = e.target.offsetParent.nextElementSibling // el elemento que le sigue al parent, en este caso el modal
        modal.addEventListener("click", (e) => {
            if (e.target.className.includes("modal-container")) {
                createCards(toys, container, "") //cuando se clickee afuera del modal se actualizan las cards
                
                fillHeart(toys,favoritos,btnHeart)

            }
        })
    }
    else if(e.target.localName == "path"){
        if(favoritos.some( fav => fav.producto == e.target.id) ){
            favoritos = favoritos.filter( fav => fav.producto != e.target.id )
            e.target.classList.replace("redPath", "black")
            localStorage.setItem( 'favoritos', JSON.stringify( favoritos ) )
        }else{
            favoritos.push(toys.find( producto => producto.producto == e.target.id ))
            e.target.classList.replace("black", "redPath")
            localStorage.setItem( 'favoritos', JSON.stringify( favoritos ) )
        }
    }
})

carrito.addEventListener("click", (e) => {
    precioTotal = 0
    products.forEach(product => precioTotal += product.precio)
    createShopping(products,shopping,precioTotal,true) // actualiza el modal del carrito
})

modalCarrito.addEventListener("click", (e) => {
    if (e.target.className.includes("handleLessStock")) {
        let deleteProduct = 0
        products.forEach(product => {
            if (product._id == e.target.id) {
                if (product.stock == 1) {
                    deleteProduct = 1
                    pharmacyProducts.forEach(pharmacyProduct => {
                        if(pharmacyProduct._id == e.target.id){
                            pharmacyProduct.disponibles += 1
                        }
                    })
                    toys.forEach(toy => {
                        if(toy._id == e.target.id){
                            toy.disponibles += 1
                        }
                    })
                } else {
                    product.stock -= 1
                    product.disponibles +=1
                    pharmacyProducts.forEach(pharmacyProduct => {
                        if (pharmacyProduct._id == e.target.id) {
                            pharmacyProduct.disponibles += 1
                        }
                    })
                    toys.forEach(toy => {
                        if (toy._id == e.target.id) {
                            toy.disponibles += 1
                        }
                    })
                }
            }
        })
        if (deleteProduct == 1) {

            if (products.some(product => product._id == e.target.id)) {
                products = products.filter((product) => product._id != e.target.id)
                localStorage.setItem("products", JSON.stringify(products))
            }
        }
        createShopping(products, shopping, precioTotal, true)
        localStorage.setItem("products", JSON.stringify(products))
        localStorage.setItem('toys', JSON.stringify(toys))
        localStorage.setItem('pharmacyProducts', JSON.stringify(pharmacyProducts))
    }

    if (e.target.className.includes("handleMoreStock")) {
        products.forEach(product => {
            if (product._id == e.target.id) {
                if (product.disponibles !== 0) {
                    product.stock += 1
                    product.disponibles -=1
                    pharmacyProducts.forEach(pharmacyProduct => {
                        if (pharmacyProduct._id == e.target.id) {
                            pharmacyProduct.disponibles -= 1
                        }
                    })
                    toys.forEach(toy => {
                        if (toy._id == e.target.id) {
                            toy.disponibles -= 1
                        }
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ya tenes el maximo disponible',
                    })
                }
            }
        })
        createShopping(products, shopping, precioTotal, true)
        localStorage.setItem("products", JSON.stringify(products))
    }

    if (e.target.className.includes("garbage")) {
        let id = e.target.id

        cartProducts.forEach(cartProduct => {
            if (cartProduct._id == id) {        
                let finalProduct = products.find( product => product._id == cartProduct._id)           
                let position = products.findIndex( product => product == finalProduct )         
                products.splice(position,1)
                localStorage.setItem("products", JSON.stringify(products))
                cartProduct.disponibles += finalProduct.stock
            }
        })

        localStorage.setItem("toys", JSON.stringify(cartProducts.filter(product => product.categoria == "jugueteria")))
        localStorage.setItem("pharmacyProducts", JSON.stringify(cartProducts.filter(product => product.categoria == "farmacia")))

        precioTotal = 0
        products.forEach(product => precioTotal += product.precio)
        createShopping(products,shopping,precioTotal,true)

    }else if(e.target.id == "eliminar"){
        cartProducts.forEach(cartProduct => {
            products.forEach(product => {
                if(product._id == cartProduct._id){
                    cartProduct.disponibles += product.stock
                }
            })
        })
        localStorage.setItem("toys", JSON.stringify(cartProducts.filter(product => product.categoria == "jugueteria")))
        localStorage.setItem("pharmacyProducts", JSON.stringify(cartProducts.filter(product => product.categoria == "farmacia")))
        products = []
        localStorage.setItem("products", JSON.stringify(products))
        precioTotal = 0
        createShopping(products,shopping,precioTotal,true)

    }else if(e.target.id == "comprar"){
        products = []
        localStorage.setItem("products", JSON.stringify(products))
        precioTotal = 0
        createShopping(products,shopping,precioTotal,true)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada con exito',
            showConfirmButton: false,
            timer: 1500
        })
    }
})

let modal = document.getElementById("staticBackdrop") // el elemento que le sigue al parent, en este caso el modal
modal.addEventListener("click", (e) => {
    if (e.target.className.includes("modal-container")) {
        createCards(toys, container, "") //cuando se clickee afuera del modal se actualizan las cards
        fillHeart(toys,favoritos,btnHeart)
    }
    
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
})

let slideTrack = document.getElementById("slide-track")

let array = ["dog-chow.png", "dog-selection.png", "dogui.png", "kongo.jpg", "pedigree.png", "proplan.png", "royal-canin.png", "sabrocitos.png", "whiscas.png", "dog-chow.png", "dog-selection.png", "dogui.png", "kongo.jpg", "pedigree.png", "proplan.png", "royal-canin.png", "sabrocitos.png", "whiscas.png"]

writeSponsors(array, slideTrack)

let slide = document.getElementById("slide")

let array2 = ["dog.jpg", "pexels-adam-kontor-333083.jpg", "pexels-kat-smith-551628.jpg", "dog-ball.jpg", "carpincho.jpg"]

createCarru(array2, slide)



// PARA BORRAR ITEMS DEL CARRITO
// if( products.some( product => product._id == e.target.id) ){
//     products = products.filter( (product) => product._id != e.target.id)
//     localStorage.setItem("products", JSON.stringify(products))
// }