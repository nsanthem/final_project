firebase.auth().onAuthStateChanged(async function(user){
    if (user){
    // Signed in
    document.querySelector('.sign-in-or-sign-out').innerHTML = '<h3>Hi there USER</h3><a href="#" class="sign-out text-green-500-underline">Sign Out</a>'
    console.log('signed in')

    }else{
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