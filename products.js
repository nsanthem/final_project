// let db = firebase.firestore()

// start js function to pull products from firebase and display on products html
async function renderProduct(productName, productPrice, productQuantity, productUrl) {
  document.querySelector('.products').insertAdjacentHTML('beforeend',`
  <div class="text-white">
      <div class="productListing mx-4">
          <img src=${productUrl}>
          <p class="font-bold mt-4 text-xl font-serif md:text-2xl">${productName}</p>
          <p class="font-bold">Price: $${productPrice}</p>
          <p class="font-bold mb-4">Quantity left: ${productQuantity}</p>
      </div>
  </div>
`)
}
window.addEventListener('DOMContentLoaded', async function(event) {
  event.preventDefault()

// let querySnapshot = await db.collection('products').get()
// let products = querySnapshot.docs

let response = await fetch('/.netlify/functions/get_products')
console.log(response)
let products = await response.json()
console.log(products)

for (let i=0; i<products.length; i++) { 
  let productName = products[i].name
  let productPrice = products[i].price
  let productQuantity = products[i].quantity
  let productUrl = products[i].image 
    // let productData = products[i].data()
    // let productName = productData.itemName
    // let productPrice = productData.priceData
    // let productQuantity = productData.quantityData
    // let productUrl = productData.imgUrl
    renderProduct(productName, productPrice, productQuantity, productUrl)

}
})
// end javascript function to display products