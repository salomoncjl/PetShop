import { getData, createCards, filterProducts, writeSponsors, createCarru } from "./module/functions.js";

const container = document.getElementById("card-container")
const searchBar = document.getElementById("search-bar")

let products = JSON.parse(localStorage.getItem("products")) || [] // trae del local storage los productos que fueron agregados al carrito

let data = getData()
data.then((response) => {
    if (!JSON.parse(localStorage.getItem("pharmacyProducts"))) {
        let items = response.filter((product) => product.categoria === "farmacia") // guarda en items los productos con categoria "jugueteria" traidos del fetch
        localStorage.setItem("pharmacyProducts", JSON.stringify(items)) // crea una propiedad en localStorage donde la key es "pharmacyProducts" y el value son todos los items
    }

    let pharmacyProducts = JSON.parse(localStorage.getItem("pharmacyProducts")) || [] // toma el value de la key "pharmacyProducts" en el localStorage y lo guarda en la variable pharmacyProducts
    createCards(pharmacyProducts, container, "")

    searchBar.addEventListener("keyup", (e) => {
        let filteredpharmacyProducts = filterProducts(pharmacyProducts, e.target.value.toLowerCase())
        createCards(filteredpharmacyProducts, container, e.target.value.toLowerCase())
    })

    container.addEventListener("click", (e) => {
        if (e.target.localName === "button") {
            let pressToy = pharmacyProducts.find(toy => toy._id == e.target.id)
            if (pressToy.disponibles > 0) {
                products.push(pressToy)
                localStorage.setItem("products", JSON.stringify(products))
                for (let toy of pharmacyProducts) {
                    if (toy == pressToy) {
                        let i = pharmacyProducts.indexOf(toy)
                        pressToy.disponibles--
                        pharmacyProducts[i] = pressToy
                        localStorage.setItem("pharmacyProducts", JSON.stringify(pharmacyProducts)) // se actualiza la propiedad del localStorage, para que cuando recargues la pag no se vuelva a la info antigua

                        let unidades = document.getElementById(`unidades-${pressToy._id}`) 
                        unidades.textContent = `${pressToy.disponibles} unidades` // toma el id de <p> y le cambia el textContent
                    }
                }
            }
        }
        else if (e.target.offsetParent && e.target.offsetParent.className == "card producto") { //si existe un parent y ese parent tiene className card y producto
            let modal = e.target.offsetParent.nextElementSibling // el elemento que le sigue al parent, en este caso el modal
            modal.addEventListener("click", (e) => {
                if (e.target.className.includes("modal-container")) {
                    createCards(pharmacyProducts, container, "") //cuando se clickee afuera del modal se actualizan las cards
                }
            })
        }
    })

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













// import { getData, createCards, filterProducts,writeSponsors,createCarru} from "./module/functions.js";

// const container = document.getElementById("card-container")
// const searchBar = document.getElementById("search-bar")

// let data = getData()
// data.then( (response) => {
//     let pharmacyProducts = response.filter( (product) => product.categoria === "farmacia")
//     createCards(pharmacyProducts,container,"")

//     searchBar.addEventListener( "keyup", (e) => {
//         let filteredPharmacyProducts = filterProducts(pharmacyProducts, e.target.value.toLowerCase())
//         createCards(filteredPharmacyProducts,container,e.target.value.toLowerCase())
//     })
// })

// let slideTrack = document.getElementById("slide-track")

// let array = ["dog-chow.png","dog-selection.png","dogui.png","kongo.jpg","pedigree.png","proplan.png","royal-canin.png","sabrocitos.png","whiscas.png","dog-chow.png","dog-selection.png","dogui.png","kongo.jpg","pedigree.png","proplan.png","royal-canin.png","sabrocitos.png","whiscas.png"]

// writeSponsors(array, slideTrack)

// let slide = document.getElementById("slide")

// let array2 = ["dog.jpg","pexels-adam-kontor-333083.jpg","pexels-kat-smith-551628.jpg","dog-ball.jpg","carpincho.jpg"]

// createCarru(array2,slide)