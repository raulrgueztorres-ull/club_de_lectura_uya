$(document).ready(function(){

    $('.datepicker').pickadate({

        selectMonths: true,
        selectYears: 15    

    });
});

var config = {
    apiKey: "AIzaSyA0ZK9_FTSjahwFm-4wjJRuCa3a-DsskFI",
    authDomain: "uyaweb-4b3be.firebaseapp.com",
    databaseURL: "https://uyaweb-4b3be.firebaseio.com",
    projectId: "uyaweb-4b3be",
    storageBucket: "uyaweb-4b3be.appspot.com",
    messagingSenderId: "201927923295"
};

firebase.initializeApp(config);

function introduce_debate()
{
    var box = document.getElementById("tablon");

    var date = document.getElementById("date_field").value;

    var hour = document.getElementById("time_field").value;

    var name = document.getElementById("first_name").value;

    var book = document.getElementById("book_name").value;

    var place = document.getElementById("place_name").value;

    var room = document.getElementById("room_field");
    var strRoom = room.options[room.selectedIndex].text;

    var database = firebase.database();

    var database_name = name.replace(/\s/g,"_") + "_" + book;

    var entrada = "debates/" + database_name;

    var referencia = database.ref(entrada);

    referencia.set({
        date: date,
        hour: hour,
        name: name,
        book: book,
        place: place,
        room: strRoom
    }).catch(function(err){
        console.log(err);
    });


    box.innerHTML += '<div tabindex="0" class="col s12" style="border-bottom: 2px #f4b241 solid;"><div id="debate_1_text">El día ' + date + ' a las ' + hour + ' se ha organizado un debate por parte de D./Dña. ' + name + ' en ' + place + ' , concretamente en la ' + strRoom + '.</div><div style="font-style: italic;color: black;display: flex;justify-content: flex-end;font-family: monospace;margin-right: 12px;"> "' + book + '" </div></div>';
}

function load_debates()
{
    var box = document.getElementById("tablon");
    firebase.database().ref('debates/').once('value').then(function(snapshot){
        for(var object in snapshot.val())
        {
            firebase.database().ref("debates/" + object).once('value').then(function(snapshot_in){
                box.innerHTML += '<div tabindex="0" id="col s12" style="border-bottom: 2px #f4b241 solid;"><div id="debate_1_text">El día ' + snapshot_in.val().date + ' a las ' + snapshot_in.val().hour + ' se ha organizado un debate por parte de D./Dña. ' + snapshot_in.val().name + ' en ' + snapshot_in.val().place + ' , concretamente en la ' + snapshot_in.val().room + '.</div><div style="font-style: italic;color: black;display: flex;justify-content: flex-end;font-family: monospace;margin-right: 12px;"> "' + snapshot_in.val().book + '" </div></div>';
            });
        }
    });
}

function validate_debates_form()
{
    var day = document.getElementById("date_field").value;
    var hour = document.getElementById("time_field").value;
    var name = document.getElementById("first_name").value;
    var book = document.getElementById("book_name").value;
    var place = document.getElementById("place_name").value;
    var room = document.getElementById("room_field");
    var strRoom = room.options[room.selectedIndex].text;

    var error = 0;
    document.getElementById("debates_error").innerHTML = "";
    document.getElementById("debates_error").display = "none";

    if(firebase.auth().currentUser === null)
    {
        document.getElementById("debates_error").innerHTML += "<div class='col s8 m12 error-text' tabindex='0'>Debe iniciar sesión para poder planificar un debate.</div>";
        document.getElementById("debates_error").style.display = "block";
        document.getElementById("debates_error").focus();
    }
    else
    {
        if(day === "" || hour === "" || name === "" || book === "" || place === "" || strRoom === "Elija la sala del debate")
        {
            document.getElementById("debates_error").innerHTML += "<div class='col s8 m12 error-text' tabindex='0'>Debe Rellenar Todos Los Campos. Campos Obligatorios.</div>";
            error += 1;
        }
        if(error !== 0)
        {
            document.getElementById("debates_error").style.display = "block";
            document.getElementById("debates_error").focus();
        }
        if(error === 0)
        {
            document.getElementById("debates_error").style.display = "none";
            introduce_debate();
        }
    }
}