var config = {
    apiKey: "AIzaSyA0ZK9_FTSjahwFm-4wjJRuCa3a-DsskFI",
    authDomain: "uyaweb-4b3be.firebaseapp.com",
    databaseURL: "https://uyaweb-4b3be.firebaseio.com",
    projectId: "uyaweb-4b3be",
    storageBucket: "uyaweb-4b3be.appspot.com",
    messagingSenderId: "201927923295"
};

firebase.initializeApp(config);


function introducir()
{
    var database = firebase.database();
    var name = document.getElementById("name").value;
    var referencia = database.ref(name);

    var user = firebase.auth().currentUser;

    if(user != null)
    {
        referencia.set({
            author: document.getElementById("author").value,
            tittle: document.getElementById("tittle").value,
            year: document.getElementById("year").value,
            user: user.uid
        })
            .then(function(){
            document.getElementById("change").style.display = "flex";
            document.getElementById("change").style.justifyContent = "center";
            document.getElementById("change").innerHTML = "";
            document.getElementById("change").innerHTML = "<h1>Libro Introducido Correctamente</h1>"
            document.getElementById("reload_button").innerHTML = "<div id='button_div'><a class='waves-effect button waves-light btn' onclick='document.location.reload()'><i class='material-icons right'>cloud</i>Click Me!</a></div>"

        })
            .catch(function(error){
            document.getElementById("change").style.display = "flex";
            document.getElementById("change").style.justifyContent = "center";
            document.getElementById("change").innerHTML = "";
            document.getElementById("change").innerHTML = "<h1>Fallo en la introducción del libro</h1>"
            document.getElementById("reload_button").innerHTML = "<div id='button_div'><a class='waves-effect button waves-light btn' onclick='document.location.reload()' alt='refrescar la página'><i class='material-icons right'>cloud</i>Click Me!</a></div>"
        });
    }
    else
    {
        document.getElementById("change").style.display = "flex";
        document.getElementById("change").style.justifyContent = "center";
        document.getElementById("change").innerHTML = "";
        document.getElementById("change").innerHTML = "<h1>Fallo en la introducción del libro</h1>"
        document.getElementById("reload_button").innerHTML = "<div id='button_div'><a class='waves-effect button waves-light btn' onclick='document.location.reload()' alt='refrescar la página'><i class='material-icons right'>cloud</i>Click Me!</a></div>";

    }
}

function login()
{
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;


    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {

        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error: " + errorMessage);
    });
}

firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        document.getElementById("box").style.display = "none";
        var user = firebase.auth().currentUser;

        if(user != null){
            firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot){
                document.getElementById("access").innerHTML = '<div class="container"><div class="row"><div class="card" id="card_profile" tabindex="0" aria-label="Campo de Información del Usuario"><div class="card-header" id="card_header_user"><img tabindex="0" alt="Foto de Perfil del Usuario" class="responsive-img" src="' + snapshot.val().user_image + '" style="object-fit: scale-down"/></div><div class="card-content" id="card_content_user"><div class="upload_button"><label class="file-upload-container" for="file-upload-profile"><div class="button green" role="button" aria-label="Cambiar Foto de Perfil" tabindex="0"><input tabindex="0" type="file" id="file-upload-profile" style="display:none" onclick="profile_picture()" aria-label="Cambiar Foto de Perfil" role="button">Profile Picture</div></label></div><h3>' + snapshot.val().name + '</h3><p>' + snapshot.val().email + '</p></div><div class="card-footer"><button class="btn amber" onclick="logout()" aria-label="Cerrar Sesión" role="button" >Logout</button></div></div></div></div>';          
            });
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

    } else {
        document.getElementById("access").innerHTML = "";
        document.getElementById("logout").innerHTML = "";
        document.getElementById("box").style.display = "block";
        document.getElementById("slide-nav").innerHTML = '<li class="sidenav-header white"><div class="row"><div class="col s4"><img src="https://www.nicepng.com/png/detail/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png" width="48px" height="48px" alt="" class="circle responsive-img valign profile-image"></div><div class="col s4">User</div></div></li><li><a href="books.html">Libros</a></li><li><a href="debates.html">Debates</a></li><li><a href="alquiler.html">Alquiler</a></li><li><a href="login.html">Identificación</a></li>';
        document.getElementById("nav-mobile").innerHTML = '<li><a href="books.html">Libros</a></li><li><a href="debates.html">Debates</a></li><li><a href="alquiler.html">Alquiler</a></li><li><a href="login.html">Identificación</a></li>';

    }
});

function signup(){

    var userEmail = document.getElementById("email_register").value;
    var userPass = document.getElementById("password_register").value;
    var userName = document.getElementById("name_register").value;

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
    }).then(function() {
        var database = firebase.database();
        var user = firebase.auth().currentUser.uid;

        var referencia = database.ref("users/" + user);

        referencia.set({
            name: userName,
            email: userEmail,
            user_image: "https://res.cloudinary.com/dtrk8j2x1/image/upload/v1558455020/uya_web/profile_ukwngv.png",
        }).catch(function(err){
            console.log(err);
        }).then(function(){
            location.href = "https://uyaweb-4b3be.firebaseapp.com/login.html"
        });
    });
}

function login_google(){
    var provider = new firebase.auth.GoogleAuthProvider(); 
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
    })    
}

function logout(){
    firebase.auth().signOut();
}
/*-----------------------------------------------------------------------------------*/
function setrole(id)
{
    var introduce = "help_field_" + id;
    document.getElementById(introduce).innertHTML = "role='alert'";

}

function quitrole(id)
{
    var introduce = "help_field_" + id;
    document.getElementById(introduce).innertHTML = "role=''";

}

/*---------------------------------------------------------------------------*/
function inject_books()
{
    return firebase.database().ref('books/').once('value').then(function(snapshot){

        var container = document.getElementById("container_books");
        var book = "";

        var count = 0;
        var contador = 0;

        var fields = [];
        var field_number = 0;

        for(var object in snapshot.val())
        {   
            fields.push(object);

            firebase.database().ref('books/' + object).once('value').then(function(snapshot_in){

                book = snapshot_in.val().image;

                if(count == 0)
                {
                    contador += 1;
                    container.innerHTML += '<div class="row margen"><div id="div_' + contador + '" class="col s12 div_books">';   
                }

                var field = "'" + fields[field_number] + "'";
                field_number += 1;

                document.getElementById("div_" + contador).innerHTML += '<span class="books"><img tabindex="0" role="button" class="responsive-img" alt="Portada del libro ' + snapshot_in.val().title + '" onclick="select_book(' + field + ')" src="' + book + '"></span>';
                count += 1;

                if(count == 3 && document.documentElement.clientWidth >= 1200)
                {
                    count = 0;
                }
                else if(count == 1 && document.documentElement.clientWidth < 1200)
                {
                    count = 0;
                }
            });
        }
    });
}

function select_book(book_field)
{
    return firebase.database().ref('books/' + book_field).once('value').then(function(snapshot){

        var book_name = snapshot.val().title;

        book_name = book_name.replace(/\s/g,"+");
        book_name += "+Libro";

        location.href="https://www.amazon.es/s?k=" + book_name + "&__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&ref=nb_sb_noss_2";
    });

}  


function search_book(search_string)
{
    var search_array = [];
    var coincidence_array = [];
    var pos = 0;
    var field_number = 0;

    var count = 0;
    var contador = 0;
    var container = document.getElementById("container_books");
    container.innerHTML = "";

    firebase.database().ref('books/').once('value').then(function(snapshot){

        if(search_string == "")
        {
            inject_books();
        }
        else
        {
            for(var object in snapshot.val())
            {
                search_array.push(object);

                firebase.database().ref('books/' + object).once('value').then(function(snapshot_in){
                    var title = snapshot_in.val().title.toLowerCase();

                    if(title.includes(search_string.toLowerCase()))  
                    {
                        book = snapshot_in.val().image;

                        if(count == 0)
                        {
                            contador += 1;
                            container.innerHTML += '<div class="row margen"><div id="div_' + contador + '" class="col s12 div_books">';   
                        }

                        var field = "'" + search_array[field_number] + "'";
                        field_number += 1;

                        document.getElementById("div_" + contador).innerHTML += '<span class="books"><img tabindex="0" role="button" class="responsive-img" alt="Portada del libro ' + snapshot_in.val().title + '" onclick="select_book(' + field + ')" src="' + book + '"></span>';
                        count += 1;

                        if(count == 3 && document.documentElement.clientWidth >= 1200)
                        {
                            count = 0;
                        }
                        else if(count == 1 && document.documentElement.clientWidth < 1200)
                        {
                            count = 0;
                        }
                    }
                    else
                    {
                        field_number += 1;
                    }
                });

            }
        }

    }); 

}

function carousel_script()
{
    var container = document.getElementById("carousel_slider");
    var fields = [];
    var fields_number = 0;
    var counter = 0;
    firebase.database().ref('books/').once('value').then(function(snapshot){
        for(var object in snapshot.val())
        {
            if(counter === 20) break;
            fields.push(object);
            firebase.database().ref('books/' + object).once('value').then(function(snapshot_in){
                var field_filter = "'" + fields[fields_number] + "'";
                fields_number += 1;
                container.innerHTML += '<img tabindex="0" role="button" class="responsive.img" src="' + snapshot_in.val().image + '" onclick="select_book(' + field_filter + ')" alt="Portada del libro ' + snapshot_in.val().title + '">';
            });
            counter += 1;
        }
    });
}


function validate_register()
{
    var name = document.getElementById("name_register").value;
    var email = document.getElementById("email_register").value;
    var password = document.getElementById("password_register").value;
    
    document.getElementById("register_error").innerHTML = "";
    document.getElementById("register_error").display = "none";
    
    if(name === "" || password === "" || email === "")
    {
        document.getElementById("register_error").innerHTML += "<div class='col s12 m12 error-text' tabindex='0'>Debe Introducir Todos Los Parametros. Campos Obligatorios</div>";
        document.getElementById("register_error").style.display = "block";
        document.getElementById("register_error").focus();
    }
    else
    {
        document.getElementById("register_error").style.display = "none";
        signup();
    }
    
}
