let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function (user) {
  if (user) {
    // Set User Details
    db.collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email
    })
    //End of Set User Details

    // Signed in
    document.querySelector('.sign-in-or-sign-out').innerHTML = `<h3 class="text-3xl font-serif text-left">Hi ${user.displayName}!</h3> <a href="#" class="sign-out text-green-500 underline font-serif"><p class="text-left mt-2">Sign Out</p></a>`

    document.querySelector('.sign-out').addEventListener('click', function (event) {
      event.preventDefault()
      firebase.auth().signOut()
      document.location.href = 'admin.html'
    })
    // End of Sign in

    // start loop connected to js function at the bottom to pull products

    let querySnapshot = await db.collection('products').get()
    let products = querySnapshot.docs

    console.log(products)

    for (let i = 0; i < products.length; i++) {
      let productData = products[i].data()
      let productId = products[i].id
      // console.log(productData)
      // console.log(productId)
      let productName = productData.itemName
      let productPrice = productData.priceData
      let productQuantity = productData.quantityData
      let productUrl = productData.imgUrl
      

      renderProduct(productId, productName, productPrice, productQuantity, productUrl)
    }
    // end loop

  } else {
    //Hide data
    document.querySelector('.products').classList.add('hidden')

    // Signed out
    console.log('signed out')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'admin.html'
    }
    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)

  }
})

// start function to pull products from firebase 
async function renderProduct(productId, productName, productPrice, productQuantity, productUrl) {
  document.querySelector('.products').insertAdjacentHTML('beforeend', `
    <div class="text-white">
        <div class="productListing-${productId} mx-4">
            <img src=${productUrl}>
            <p class="font-bold mt-4 text-xl font-serif md:text-2xl">${productName}</p>
            <p class="font-bold">Price: $${productPrice}</p>
            <p class="font-bold mb-4">Quantity: ${productQuantity}</p>
            <div class ="productDetails">
                  <form class="form">
                      <div class="price">
                          <p class="mt-4 priceLabel">Price</p>
                          <input type="number" id="price" name="price" min="00.00" step="00.01" class="editPrice text-black" value="00.00">
                      </div>
                      <div class="quantity mt-8">
                          <p class="mt-4 quantityLabel">Qty</p>
                          <input type="number" id="quantity" name="quantity" min="0" step="1" class="editQuantity text-black" value="1">
                      </div>
                      <div class="mt-8 mb-8 button">
                          <input type="submit" value="Update" class="updateButton bg-green-400 text-white py-2 px-8 hover:bg-green-600 rounded-xl">
                      </div>
            </div>
        </div>
    </div>
  `)
  // end function to pull products 

  //Listen for form submission and set new quantity & price table in firebase
  document.querySelector(`.productListing-${productId} .updateButton`).addEventListener('click', async function (event) {
    event.preventDefault()
    console.log(`product ${productId} update button clicked!`)
    let currentUser = firebase.auth().currentUser

    // Struggling here to see how I can get this to update the existing fields in our products collection in firebase
    let querySnapshot = await db.collection('products')
                                .where('productId', '==', productId)
                                .get()
    console.log(querySnapshot)

    let price = document.querySelector(`.productListing-${productId} .editPrice`).value
    let quantity = document.querySelector(`.productListing-${productId} .editQuantity`).value
    console.log(`submitted new price of ${price} and ${quantity}!`)

    //Adding form information to firebase and updating for new price and quantity in firebase

      let response = await db.collection('products').doc(productId).set({
        itemName: productName,
        imgUrl: productUrl,
        priceData: price,
        quantityData: quantity
      })
        console.log(response)
    // End of adding quantity and price data to firebase

    //Remove old entry
    // let thisherId = docRef.id
    // console.log(`new input with ID ${thisherId} created`)

  })
  // End of form submission
}