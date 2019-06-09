var config = {
    apiKey: "AIzaSyA0ZK9_FTSjahwFm-4wjJRuCa3a-DsskFI",
    authDomain: "uyaweb-4b3be.firebaseapp.com",
    databaseURL: "https://uyaweb-4b3be.firebaseio.com",
    projectId: "uyaweb-4b3be",
    storageBucket: "uyaweb-4b3be.appspot.com",
    messagingSenderId: "201927923295"
};

firebase.initializeApp(config);
var inject = false;
var rent = false;
var refund = false;

function inject_rent()
{
    var box = document.getElementById("box");
    box.style.display = "block";
    if(box.textContent === "" || (inject === true && rent === false))
    {
        var focus_out = 'this.type="text"';
        var focus = 'this.type="date"';
        box.innerHTML = "<h1 tabindex='0' aria-label='Campo de alquiler de libros'>Alquilar libro</h1><div class='row'><form role='form' class='col s12'><div class='row'><div class='input-field col s12'><input id='book_name' type='text' class='validate'><label for='book_name' aria-label='Campo de título'>Título</label></div></div><div class='row'><div class='input-field col s6'><input name='date' type='text' onfocus='(" + focus + ")' onfocusout='(" + focus_out + ")' id='rent_date' ><label for='rent_date' aria-label='Campo de fecha de recogida'>Fecha de recogida</label></div><div class='input-field col s6'><input id='name' type='text' class='validate'><label for='name' aria-label='Campo nombre de la reserva'>Nombre Reserva</label></div></div></form><div class='col s12'><a onclick='validate_rent()' id='rent_button' class='waves-effect waves-light btn col s12' tabindex='0' aria-label='Alquilar' role='button'>Alquilar</a></div></div>";

        box.style.width = "450px";
        box.style.height = "350px";
        inject = true;
        rent = true;
        refund = false;
    }
    else
    {
        box.innerHTML = "";
        box.style.width = "0px";
        box.style.height = "0px";
        inject_false_boolean_values();
    }
}


function inject_refund()
{
    var box = document.getElementById("box");
    box.style.display = "block";

    if(box.textContent === "" || (inject === true && refund === false))
    {
        var focus_out = 'this.type="text"';
        var focus = 'this.type="date"';
        box.innerHTML = "<h1 tabindex='0' aria-label='Campo de devolución de libros'>Devolver libro</h1><div class='row'><form role='form' class='col s12'><div class='row'><div class='input-field col s12'><input id='book_refund_name' type='text' class='validate'><label for='book_refund_name' aria-label='Campo de título' >Título</label></div></div><div class='row'><div class='input-field col s6'><input name='date' type='text' onfocus='(" + focus + ")' onfocusout='(" + focus_out + ")' id='refund_date' ><label for='refund_date' aria-label='Campo de fecha de devolución' >Fecha de devolución</label></div><div class='input-field col s6'><input id='book_number' type='text' class='validate'><label for='book_number' aria-label='Campo número de libro'>Número de Libro</label></div></div></form><div class='col s12'><a onclick='validate_refund()' id='refund_button' class='waves-effect waves-light btn col s12' role='button' aria-label='Planificar Devolución' tabindex='0'>Planificar Devolución</a></div></div>";

        box.style.width = "450px";
        box.style.height = "350px";
        inject = true;
        refund = true;
        rent = false;
    }
    else
    {
        box.innerHTML = "";
        box.style.width = "0px";
        box.style.height = "0px";
        inject_false_boolean_values();
    }
}

function inject_false_boolean_values()
{
    rent = false;
    refund = false;
    inject = false;
}


function slider_images()
{
    firebase.database().ref('libros_destacados/').once('value').then(function(snapshot){

        var slider = document.getElementById('rent_slider');
        for(var object in snapshot.val())
        {
            firebase.database().ref('libros_destacados/' + object).once('value').then(function(snapshot_in){
                slider.innerHTML += '<li><img class="responsive.img" src="' + snapshot_in.val().image + '"><div class="caption left-align slider-text-1"><h1>' + snapshot_in.val().title + '</h1><h2 class="slider-color-1">' + snapshot_in.val().author + '</h2></div></li>';
            });
        }
    });
}

function rent_function()
{
    if(firebase.auth().currentUser !== null)
    {
        firebase.database().ref('rent/' + firebase.auth().currentUser.uid + '/' + document.getElementById('name').value + '_rent').set({
            name: document.getElementById('name').value,
            title: document.getElementById('book_name').value,
            rent_day: document.getElementById('rent_date').value
        }).then(function(){
            var box = document.getElementById("box");
            box.innerHTML = "";
            box.style.width = "0px";
            box.style.height = "0px";
            inject_false_boolean_values(); 
        });
    }
    else
    {
        alert("Debe Estar Logueado.");
    }
}

function refund_function()
{
    if(firebase.auth().currentUser !== null)
    {
        var book_database = document.getElementById('book_refund_name').value.replace(/\s/g,"_");
        firebase.database().ref('refund/' + firebase.auth().currentUser.uid + '/' + book_database + '_' + document.getElementById('book_number').value + '_refund').set({
            title: document.getElementById('book_refund_name').value,
            refund_day: document.getElementById('refund_date').value
        }).then(function(){
            var box = document.getElementById("box");
            box.innerHTML = "";
            box.style.width = "0px";
            box.style.height = "0px";
            inject_false_boolean_values(); 
        });
    }
    else
    {
        alert("Debe Estar Logueado.");
    }
}

function validate_rent()
{
    var book = document.getElementById("book_name").value;
    var day_value = document.getElementById("rent_date").value;
    var name = document.getElementById("name").value;

    var date_var = (new Date);
    var month = date_var.getMonth();
    month += 1;
    if(month < 10)
        month = '0' + month;
    var day = date_var.getDay();
    if(day < 10)
        day = '0' + day;

    var compare_var = date_var.getFullYear() + '-' + month + '-' + day;

    var error = 0;

    document.getElementById("rent_error").innerHTML = "";
    document.getElementById("rent_error").display = "none";

    if(book === "" || day_value === "" || name === "")
    {
        document.getElementById("rent_error").innerHTML += "<div class='col s8 m12 error-text' tabindex='0'>Debe Rellenar Todos Los Campos. Campos Obligatorios.</div>";
        error += 1;
    }
    else if(day_value < compare_var)
    {
        document.getElementById("rent_error").innerHTML += "<div class='col s8 m12 error-text' tabindex='0'>La Fecha Introducida Es Inferior Al Día Actual.</div>";
        error += 1;
    }
    if(error !== 0)
    {
        document.getElementById("rent_error").style.display = "block";
        document.getElementById("rent_error").focus();
    }
    else if(error === 0)
    {
        document.getElementById("rent_error").style.display = "none";
        rent_function();
    }
}

function validate_refund()
{
    var book = document.getElementById("book_refund_name").value;
    var day_value = document.getElementById("refund_date").value;
    var book_number = document.getElementById("book_number").value;

    var date_var = (new Date);
    var month = date_var.getMonth();
    month += 1;
    if(month < 10)
        month = '0' + month;
    var day = date_var.getDay();
    if(day < 10)
        day = '0' + day;

    var compare_var = date_var.getFullYear() + '-' + month + '-' + day;

    var error = 0;

    if(book === "" || day_value === "" || book_number === "")
    {
        document.getElementById("rent_error").innerHTML += "<div class='col s8 m12 error-text' tabindex='0'>Debe Rellenar Todos Los Campos. Campos Obligatorios.</div>";
        error += 1;
    }
    else if(day_value < compare_var)
    {
        document.getElementById("rent_error").innerHTML += "<div class='col s8 m12 error-text' tabindex='0'>La Fecha Introducida Es Inferior Al Día Actual.</div>";
        error += 1;
    }
    else if (isNaN(book_number))
    {
        document.getElementById("rent_error").innerHTML += "<div class='col s8 m12 error-text' tabindex='0'>El Campo Número De Libro Debe Ser Un Número.</div>";
        error += 1;
    }
    if(error !== 0)
    {
        document.getElementById("rent_error").style.display = "block";
        document.getElementById("rent_error").focus();
    }
    else if(error === 0)
    {
        document.getElementById("rent_error").style.display = "none";
        refund_function();
    }
}