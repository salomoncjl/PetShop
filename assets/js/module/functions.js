export async function getData() {
  try {
    const response = await fetch("https://mindhub-xj03.onrender.com/api/petshop")
    const data = await response.json()
    return data
  }
  catch (error) {
    console.log(`Error: ${error}`)
  }
}

export function createCards(list, container, formulario) {
  container.innerHTML = ""
  let aux = ""
  if (list.length === 0) {
    noEncontrado(container, formulario)
  } else {
    for (let element of list) {
      aux += writeCard(element)
    }
    container.innerHTML += aux
  }
}

function writeCard(element) {
  let stock
  if(element.disponibles === 0){
    stock = '<p class="text-center stock bg-danger"><b>Sin Unidades</b></p>'
  }else if(element.disponibles < 5){
    stock = '<p class="text-center stock bg-danger"><b>Ultimas Unidades</b></p>'
  }else{
    stock = '<p class="text-center stock bg-success"><b>Unidades Disponibles</b></p>'
  }
  
  let modalStock
  if(element.disponibles === 0){
    modalStock = `<p class="text-center stock bg-danger" id='modalStock-${element._id}'><b>Sin Unidades</b></p>`
  }else if(element.disponibles < 5){
    modalStock = `<p class="text-center stock bg-danger" id="modalStock-${element._id}"><b>Ultimas Unidades</b></p>`
  }else{
    modalStock = `<p class="text-center stock bg-success" id="modalStock-${element._id}"><b>Unidades Disponibles</b></p>`
  }
  

  return `
    <div class="card producto" id="card" style="width: 18rem;" data-bs-toggle="modal" data-bs-target="#card-${element._id}">
      <div class="card-img">
        <img src="${element.imagen}"class="card-img-top tam-img-card" alt="${element.producto}">
        <button type= "" class="btn-heart">
        <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="black" id="${element.producto}" d="M12.39 20.87a.696.696 0 0 1-.78 0C9.764 19.637 2 14.15 2 8.973c0-6.68 7.85-7.75 10-3.25 2.15-4.5 10-3.43 10 3.25 0 5.178-7.764 10.664-9.61 11.895z" fill="#000000"/></svg>
        </button>
      </div>
      <div class="card-body">
        <div class="cont-stock d-flex flex-column">
          ${stock}
          <p class="card-text"><b>Precio: $${element.precio}</b></p>
          <h5 class="fw-bold">${element.producto}</h5>
        </div>
        <div class="cont-unidad d-flex justify-content-end align-items-end">
          <p class="m-0">${element.disponibles} Unidades</p>
        </div>
      </div>
    </div>

    <div class="modal fade modal-container" id="card-${element._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content mx-auto">
          <div class="modal-body d-flex justify-content-center align-items-center gap-3">
            <div class="card" style="width: 25rem;">
              <div class="card-img">
                <img src="${element.imagen}"class="card-img-top tam-img-card" alt="${element.producto}">
              </div>
              <div class="card-body">
                <div class="cont-stock d-flex flex-column align-items-center">
                  ${modalStock}
                  <p class="card-text"><b>Precio: $${element.precio}</b></p>
                  <h5 class="fw-bold text-center">${element.producto}</h5>
                </div>
                <div class="cont-unidad d-flex justify-content-center align-items-end">
                  <p id="unidades-${element._id}">${element.disponibles} Unidades</p>
                </div>
              </div>
            </div>
            <div class="card-description" style="width: 25rem;">
              <p class="text-center">${element.descripcion}</p>
              <button type="button" class="btn btn-primary" id="${element._id}">Agregar Al Carrito</button>
            </div>      
          </div>
        </div>
      </div>
    </div>
  `
}

export function filterProducts(products, value) {
  return products.filter((product) => product.producto.toLowerCase().includes(value))
}

export function writeSponsors(list, container) {
  for (let i = 0; i < 18; i++) {
    container.innerHTML += `
        <div class="cont-slide">
          <img class="border2" src="../img/${list[i]}" alt="">
        </div>
      `
  }
}

export function writeSponsorsHome(list, container) {
  for (let i = 0; i < 18; i++) {
    container.innerHTML += `
      <div class="cont-slide">
        <img src="./Assets/img/${list[i]}" alt="">
      </div>
    `
  }
}

export function createCarru(list, container) {

  container.innerHTML += `
      <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img src="../img/${list[0]}" class="d-block w-100 border1" alt="${list[0]}">
                      </div>
                      <div class="carousel-item">
                        <img src="../img/${list[1]}" class="d-block w-100 border1" alt="${list[1]}">
                      </div>
                      <div class="carousel-item">
                        <img src="../img/${list[2]}" class="d-block w-100 border1" alt="${list[2]}">
                      </div>
                      <div class="carousel-item">
                        <img src="../img/${list[3]}" class="d-block w-100 border1" alt="${list[3]}">
                      </div>
                    </div>
    `

}
export function createCarruHome(list, container) {

  container.innerHTML += `
    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img src="./Assets/img/${list[0]}" class="d-block w-100 m-0 border1" alt="${list[0]}">
                      </div>
                      <div class="carousel-item">
                        <img src="./Assets/img/${list[1]}" class="d-block w-100 m-0 border1" alt="${list[1]}">
                      </div>
                      <div class="carousel-item">
                        <img src="./Assets/img/${list[2]}" class="d-block w-100 m-0 border1" alt="${list[2]}">
                      </div>
                      <div class="carousel-item">
                        <img src="./Assets/img/${list[3]}" class="d-block w-100 m-0 border1" alt="${list[3]}">
                      </div>
                    </div>
  `
}

export function noEncontrado(container, formulario) {
  container.innerHTML = `<div class="style-mens">
  <h5>No ha sido posible encontrar nada para "${formulario}".</h5>
  <h5>Prueba a detallar tu búsqueda.</h5>
  <img src="../img/cinnamon.png" alt="perro">
  </div>`

}
//
/* <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg> */
export function createShopping(list,container,precioTotal=0,bool){
  let src = bool ? "../img/garbage.png" : "./Assets/img/garbage.png"
  let template = ""
  list.forEach( (element,i) => {
    template +=`
      <div class="d-flex venta my-2" id="${i}">
        <img class= "img-cart" src="${element.imagen}" alt="ball">
        <div class="shopping-info">
          <div class="cart-info">
            <b>${element.producto}</b>
            <p class="m-0">Precio: ${element.precio}</p>
            <div class="d-flex gap-3 justify-content-start align-items-center">
              <p class="font-weight-bold h4 m-0 handleLessStock" id="${element._id}">-</p>
              <p class="m-0">${element.stock}</p>
              <p class="font-weight-bold h4 m-0 handleMoreStock" id="${element._id}">+</p>
            </div>
          </div>
          <div class="cart-delete">
            <button class="btn-delete"> 
              <img src="${src}" class="garbage" alt="garbage" id="${element._id}"></img>
            </button>
          </div>
        </div>
      </div>
    `
  })
  template += `
    <div class="d-flex cart-pago my-3" style="width: 25rem;">
      <p class="m-0">Total: $${precioTotal}</p>
      <div class="btn-pago">
      <button type="button" class="btn btn-danger" id="eliminar">Eliminar todo</button>
        <button type="button" class="btn btn-primary" id="comprar">Comprar</button>
      </div>
    </div>
  `
  container.innerHTML = template
}

export function fillHeart(toys,favoritos,btn){
  toys.forEach(toy => {
    favoritos.forEach(fav => {
        if(toy._id == fav._id){
            let asd = Array.from(btn).filter(e => e.firstElementChild.children[0].id == toy.producto)
            asd[0].children[0].children[0].classList.replace("black", "redPath")
        }
    })
})
}
