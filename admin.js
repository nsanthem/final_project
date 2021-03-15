firebase.auth().onAuthStateChanged(async function(user){
  let db = firebase.firestore()

    if (user){
      // Set User Details
      db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email
      })
      //End of Set User Details

      // Signed in
      document.querySelector('.sign-in-or-sign-out').innerHTML = `<h3 class="text-3xl font-serif text-left">Hi ${user.displayName}!</h3> <a href="#" class="sign-out text-green-500 underline font-serif"><p class="text-left mt-2">Sign Out</p></a>`

      document.querySelector('.sign-out').addEventListener('click', function(event){
          event.preventDefault()
          firebase.auth().signOut()
          document.location.href = 'admin.html'
      })
      // End of Sign in

      //Listen for form submission and set new quantity & price
      document.querySelector('.updateButton').addEventListener('click', async function(event){
        event.preventDefault()

        let price = document.querySelector('#price').value
        let quantity = document.querySelector('#quantity').value
        console.log(`submitted new price of ${price} and ${quantity}!`)//This worked! 
        
        // Tim Step: 3/14/21 Adding form information to firebase
        let docRef = await db.collection('thisher').add({
          priceData: price,
          quantityData: quantity
        })
        // End of adding quantity and price data to firebase

        //Remove old entry
        let thisherId = docRef.id
        console.log(`new input with ID ${thisherId} created`)

      })
      // End of form submission

    }else{
      //Hide data
      document.querySelector('.admin-view').classList.add('hidden')

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