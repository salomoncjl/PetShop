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
  let color = element.disponibles < 5 ? "red" : "green";
  return `
    <div class="card producto" id="card" style="width: 18rem;" data-bs-toggle="modal" data-bs-target="#${element._id}">
      <div>
        <img src="${element.imagen}"class="card-img-top tam_img_card" alt="${element.producto}">
        <button class="favorite-btn"><img src="../img/heart.png" class="img-heart" alt="heart"></button>
      </div>
      <div class="card-body ">
        <div class="cont-stock d-flex flex-column">
          <p class="card-text"><b>Precio: $${element.precio}</b></p>
          <p class=" ${color} text-center stock"><b>Stock</b></p>
          <h5 >${element.producto}</h5>
        </div>
        <div class="cont-unidad d-flex justify-content-end align-items-end">
          <p>${element.disponibles} Unidades</p>
        </div>
      </div>
    </div>

    <div class="modal fade modal-container" id="${element._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content w-100 mx-auto">
          <div class="modal-body d-flex justify-content-center gap-3">
            <div class="card" style="width: 25rem;">
              <div>
                <img src="${element.imagen}"class="card-img-top tam_img_card" alt="${element.producto}">
                <button class="favorite-btn"><img src="../img/heart.png" class="img-heart" alt="heart"></button>
              </div>
              <div class="card-body">
                <div class="cont-stock d-flex flex-column">
                  <p class="card-text"><b>Precio: $${element.precio}</b></p>
                  <p class=" ${color} text-center stock"><b>Stock</b></p>
                  <h5 >${element.producto}</h5>
                </div>
                <div class="cont-unidad d-flex justify-content-end align-items-end">
                  <p id="unidades-${element._id}">${element.disponibles} Unidades</p>
                </div>
              </div>
            </div>
            <div class="d-flex flex-column justify-content-center" style="width: 25rem;">
              <p>${element.descripcion}</p>
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
          <img src="../img/${list[i]}" alt="">
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

export function createShopping(list,container){
  let template = ""
  let contPrecio = 0
  list.forEach( (element,i) => {
    contPrecio += element.precio
    template +=`
      <div class="d-flex venta my-2" id="${i}">
        <img class= "img-cart" src="${element.imagen}" alt="ball">
        <div class="shopping-info">
          <div class="cart-info">
            <b>${element.producto}</b>
            <p>Precio: ${element.precio}</p>
          </div>
          <div class="cart-delete">
            <button class="btn-delete"><img src="../img/shopping-cart.png" class="garbage" alt="garbage" id="${element._id}"></button>
            <p>${element.disponibles} Unidades</p>
          </div>
        </div>
      </div>
    `
  })
  template += `
    <div class="d-flex cart-pago my-3" style="width: 25rem;">
      <p class="m-0">Total: $${contPrecio}</p>
      <div class="btn-pago">
      <button type="button" class="btn btn-danger" ">Eliminar todo</button>
        <button type="button" class="btn btn-primary" ">Comprar</button>
      </div>
    </div>
  `
  container.innerHTML = template
}



