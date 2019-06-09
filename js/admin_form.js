$('.contact-form').find('.form-control').each(function() {
    var targetItem = $(this).parent();
    if ($(this).val()) {
        $(targetItem).find('label').css({
            'top': '10px',
            'fontSize': '14px'
        });
    }
})
$('.contact-form').find('.form-control').focus(function() {
    $(this).parent('.input-block').addClass('focus');
    $(this).parent().find('label').animate({
        'top': '10px',
        'fontSize': '14px'
    }, 300);
})
$('.contact-form').find('.form-control').blur(function() {
    if ($(this).val().length == 0) {
        $(this).parent('.input-block').removeClass('focus');
        $(this).parent().find('label').animate({
            'top': '25px',
            'fontSize': '18px'
        }, 300);
    }
})


var config = {
    apiKey: "AIzaSyA0ZK9_FTSjahwFm-4wjJRuCa3a-DsskFI",
    authDomain: "uyaweb-4b3be.firebaseapp.com",
    databaseURL: "https://uyaweb-4b3be.firebaseio.com",
    projectId: "uyaweb-4b3be",
    storageBucket: "uyaweb-4b3be.appspot.com",
    messagingSenderId: "201927923295"
};

firebase.initializeApp(config);

function introduce_book_database()
{
    var database = firebase.database();

    var author = document.getElementById('author_value').value;
    var book = document.getElementById('book_value').value;
    var year = document.getElementById('year_value').value;
    var image = document.getElementById('url_image').value;

    var database_name = book.replace(/\s/g,"_");

    var entrada = 'books/' + database_name;


    var referencia = database.ref(entrada);

    referencia.set({
        author: author,
        image: image,
        title: book,
        year: year
    }).then(function(){
        document.getElementById("div_contact_wrap").style.display = "flex";
        document.getElementById("div_contact_wrap").style.justifyContent = "center";
        document.getElementById("div_contact_wrap").innerHTML = "";
        document.getElementById("div_contact_wrap").innerHTML = "<h1>Libro Introducido Correctamente</h1>";
        document.getElementById("reload_button").innerHTML += "<div class='button green' onclick='document.location.reload()'>Click Me!</div>";

    })
        .catch(function(error){
        document.getElementById("div_contact_wrap").style.display = "flex";
        document.getElementById("div_contact_wrap").style.justifyContent = "center";
        document.getElementById("div_contact_wrap").innerHTML = "";
        document.getElementById("div_contact_wrap").innerHTML = "<h1>Fallo en la introducción del libro</h1>";
        document.getElementById("reload_button").innerHTML += "<div class='button green' onclick='document.location.reload()'>Click Me!</div>";
    });

}

function validate_admin_form()
{
    var author = document.getElementById("author_value").value;
    var book_name = document.getElementById("book_value").value;
    var year = document.getElementById("year_value").value;
    var image = document.getElementById("url_image").value;
    var error = 0;

    document.getElementById("admin_error").innerHTML = "";
    document.getElementById("admin_error").display = "none";
    
    if(author === "" || book_name === "" || year === "")
    {
        document.getElementById("admin_error").innerHTML += "<div class='col s8 m12 error-text' tabindex='0'>Debe Rellenar Todos Los Campos. Campos Obligatorios.</div>";
        error += 1;
    }
    if (year !== "")
    {
        var date_var = (new Date);
        var month = date_var.getMonth();
        month += 1;
        if(month < 10)
            month = '0' + month;
        var day = date_var.getDay();
        if(day < 10)
            day = '0' + day;
        
        var compare_var = date_var.getFullYear() + '-' + month + '-' + day;
        if(year > compare_var)
        {
            document.getElementById("admin_error").innerHTML += "<div class='col s12 m12 error-text' tabindex='0'>La Fecha Introducida Es Superior Al Día Actual.</div>";
            error += 1;
        }
    }
    if (image === "")
    {
        document.getElementById("admin_error").innerHTML += "<div class='col s12 m12 error-text' tabindex='0'>Debe Subir La Portada Del Libro. Campo Obligatorio</div>";
        error += 1;
    }
    if(error !== 0)
    {
        document.getElementById("admin_error").style.display = "block";
        document.getElementById("admin_error").focus();
    }
    if(error === 0)
    {
        document.getElementById("admin_error").style.display = "none";
        introduce_book_database();
    }
}
