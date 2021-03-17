let firebase = require('./firebase')

exports.handler = async function(event) {
  let queryStringUserId = event.queryStringParameters.queryStringUserId

  let data = [] // sample only...
  let db = firebase.firestore()
  let querySnapshot = await db.collection('products').get()
  console.log(`number of products is ${querySnapshot.size}`)

  let products = querySnapshot.docs
  
  for (let i=0; i<products.length; i++){
    let productData = products[i].data()
      let productId = products[i].id
      let productName = productData.itemName
      let productPrice = productData.priceData
      let productQuantity = productData.quantityData
      let productUrl = productData.imgUrl

    data.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      image: productUrl
    })

  }
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}