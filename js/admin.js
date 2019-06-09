var config = {
    apiKey: "AIzaSyA0ZK9_FTSjahwFm-4wjJRuCa3a-DsskFI",
    authDomain: "uyaweb-4b3be.firebaseapp.com",
    databaseURL: "https://uyaweb-4b3be.firebaseio.com",
    projectId: "uyaweb-4b3be",
    storageBucket: "uyaweb-4b3be.appspot.com",
    messagingSenderId: "201927923295"
};

firebase.initializeApp(config);  



function admin_account()
{ 
    firebase.database().ref('users/admin/').once('value').then(function(snapshot){
        for(var object in snapshot.val())
        {
            if(object === firebase.auth().currentUser.uid)
            {
                document.getElementById("slide-nav").innerHTML += '<li><a href="admin_form.html">Admin</a></li>';
                document.getElementById("nav-mobile").innerHTML += '<li><a href="admin_form.html">Admin</a></li>';
            }
        }
    });
}



