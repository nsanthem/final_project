firebase.auth().onAuthStateChanged(async function(user){
  let db = firebase.firestore()

    if (user){
      // Set User Details
      db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email
      })

      // Signed in
      document.querySelector('.sign-in-or-sign-out').innerHTML = `<h3>Hi ${user.displayName}!</h3> <a href="#" class="sign-out text-green-500 underline">Sign Out</a>`

      document.querySelector('.sign-out').addEventListener('click', function(event){
          event.preventDefault()
          firebase.auth().signOut()
          document.location.href = 'admin.html'
      })
      //console.log('signed in') 

      //Listen for form submission and set new quantity & price
      document.querySelector('.updateButton').addEventListener('click', async function(event){
        event.preventDefault()
        let price = document.querySelector('#price').value
        let quantity = document.querySelector('#quantity').value
        console.log('submitted')//NOTE for Vesper & Tim: console is not showing that the form is submitted so something is wrong....
      })

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