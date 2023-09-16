import { writeSponsors } from './module/functions.js'

const form = document.getElementById('form')

import { getData, createCarruHome,writeSponsorsHome, createShopping} from './module/functions.js'

const carrito = document.getElementById("btn-car")
const shopping = document.getElementById("cart")
const modalCarrito = document.getElementById("modal-content")

let products = JSON.parse(localStorage.getItem("products")) || [] // trae del local storage los productos que fueron agregados al carrito
let precioTotal = 0
createShopping(products,shopping,true)

let toys = JSON.parse(localStorage.getItem("toys")) || [] // toma el value de la key "toys" en el localStorage y lo guarda en la variable toys
let pharmacyProducts = JSON.parse(localStorage.getItem("pharmacyProducts")) || []
let cartProducts = toys.concat(pharmacyProducts)

let data = getData()
data.then((response) => {
    if (!JSON.parse(localStorage.getItem("toys"))) {
        let toys = response.filter((product) => product.categoria === "jugueteria") // guarda en toys los productos con categoria "jugueteria" traidos del fetch
        localStorage.setItem("toys", JSON.stringify(toys)) // crea una propiedad en localStorage donde la key es "toys" y el value son todos los items
        let pharmacyProducts = response.filter((product) => product.categoria === "farmacia")
        localStorage.setItem("pharmacyProducts", JSON.stringify(pharmacyProducts))
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
                        if (pharmacyProduct._id == e.target.id) {
                            pharmacyProduct.disponibles += 1
                        }
                    })
                    toys.forEach(toy => {
                        if (toy._id == e.target.id) {
                            toy.disponibles += 1
                        }
                    })
                } else {
                    product.stock -= 1
                    product.disponibles += 1
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
                    product.disponibles -= 1
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
                let finalProduct = products.find(product => product._id == cartProduct._id)
                let position = products.findIndex(product => product == finalProduct)
                products.splice(position, 1)
                localStorage.setItem("products", JSON.stringify(products))
                cartProduct.disponibles += finalProduct.stock
            }
        })

        localStorage.setItem("toys", JSON.stringify(cartProducts.filter(product => product.categoria == "jugueteria")))
        localStorage.setItem("pharmacyProducts", JSON.stringify(cartProducts.filter(product => product.categoria == "farmacia")))

        precioTotal = 0
        products.forEach(product => precioTotal += product.precio)
        createShopping(products, shopping, precioTotal, true)

    }
    else if (e.target.id == "eliminar") {
        cartProducts.forEach(cartProduct => {
            products.forEach(product => {
                if (product._id == cartProduct._id) {
                    cartProduct.disponibles += product.stock
                }
            })
        })
        localStorage.setItem("toys", JSON.stringify(cartProducts.filter(product => product.categoria == "jugueteria")))
        localStorage.setItem("pharmacyProducts", JSON.stringify(cartProducts.filter(product => product.categoria == "farmacia")))
        products = []
        localStorage.setItem("products", JSON.stringify(products))
        precioTotal = 0
        createShopping(products, shopping, precioTotal, true)

    }
    else if (e.target.id == "comprar") {
        products = []
        localStorage.setItem("products", JSON.stringify(products))
        precioTotal = 0
        createShopping(products, shopping, precioTotal, true)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada con exito',
            showConfirmButton: false,
            timer: 1500
        })
    }
})

form.addEventListener("submit", (e) => {
    console.log(form[0].value)
    e.preventDefault()
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${form[0].value}, enviamos tu mensaje`,
        showConfirmButton: false,
        timer: 1500
      })
    // form.reset()
} );

let slideTrack = document.getElementById("slide-track")

let array = ["dog-chow.png", "dog-selection.png", "dogui.png", "kongo.jpg", "pedigree.png", "proplan.png", "royal-canin.png", "sabrocitos.png", "whiscas.png", "dog-chow.png", "dog-selection.png", "dogui.png", "kongo.jpg", "pedigree.png", "proplan.png", "royal-canin.png", "sabrocitos.png", "whiscas.png"]

writeSponsors(array, slideTrack)