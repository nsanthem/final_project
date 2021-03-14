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
      console.log('signed in') 

      //Edit quantity
      document.querySelector('.editPrice').addEventListener()
      
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