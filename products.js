let db = firebase.firestore()

async function renderProduct(productName, productPrice, productQuantity, productUrl) {
  document.querySelector('.products').insertAdjacentHTML('beforeend',`
  <div class="m-12 md:flex text-white text-md text-left">
      <div>
          <img class="w-full" src=${productUrl}></p>
      </div>
      <div>
          <p class="font-bold">${productName}</p>
          <p class=" font-bold">Price: $${productPrice}</p>
          <p class=" font-bold">Quantity: ${productQuantity}</p>
  </div>
`)
}

window.addEventListener('DOMContentLoaded', async function(event) {
  event.preventDefault()

let querySnapshot = await db.collection('products').get()
let products = querySnapshot.docs

console.log(products)

for (let i=0; i<products.length; i++) {  
    let productData = products[i].data()
    let productName = productData.itemName
    let productPrice = productData.priceData
    let productQuantity = productData.quantityData
    let productUrl = productData.imgUrl

    renderProduct(productName, productPrice, productQuantity, productUrl)
    
}
})
