

$("#p2").hide();

let p1Heitot = ["-", "-", "-"];
let p2Heitot = ["-", "-", "-"];

// kun asetukset hyväksytään ja form lähetetään niin suoritetaan aloitus funktio
$("#asetukset").on("submit", aloitus)

// Kun heitetty piste kirjataan suoritetaan funktio player
$("#heitto").on("submit", player)


// Tällä funktiolla lisätään oikea määrä pelaajia ja aoituspistemäärät
function aloitus(e){
     e.preventDefault(); // estetään sivun uudelleen lataaminen

     // Näytetään pelitila ja piilotetaan aloitus
      $("#peli").show();
      $("#aloitus").hide();

    // Tallennetaan pelaajien määrä ja valittu pistemäärä jota halutaan pelata
    pelaajia = $("#pelaajia").val();
    const pistemaara = parseInt($("#pistemaara").val(), 10);

    // Lisätään oikea määrä pelaajia ja valitus aloituspisteet
    if (pelaajia === "2"){
        $("#p2").show();
        $("#p1Pisteet").html(pistemaara);
        $("#p2Pisteet").html(pistemaara);
    }
    else {
        $("#p1Pisteet").html(pistemaara);
    };
};


function laskuri(pelaaja, heitPisteet){

    // Pelaaja 1 pisteiden lakeminen
    if (pelaaja === "1"){

        let p1Kokonaispisteet = parseInt($("#p1Pisteet").text(), 10);
        p1Kokonaispisteet -= heitPisteet;
        if (p1Kokonaispisteet < 0) {
            alert("Over");
            p1Heitot.unshift(0);
            return;
        }
        else if (p1Kokonaispisteet === 0){
            $("#lopetus").show();
            $("#peli").hide();
        }

        else{
            $("#p1Pisteet").html(p1Kokonaispisteet);
            p1Heitot.unshift(heitPisteet);
        };
    }
    // Pelaaja 2 pisteiden lakeminen
    else{
        let p2Kokonaispisteet = parseInt($("#p2Pisteet").text(), 10);
        p2Kokonaispisteet -= heitPisteet;
        if (p2Kokonaispisteet < 0) {
            alert("Over");
            p2Heitot.unshift(0);
            return;
        }
        else if (p2Kokonaispisteet === 0){
            $("#lopetus").show();
            $("#peli").hide();
        }

        else{
            $("#p2Pisteet").html(p2Kokonaispisteet);
            p2Heitot.unshift(heitPisteet);
        };
    };
};



// Tällä funktiolla valitaan kummanpelaajan pisteitä vähennetään
function player(e){
    e.preventDefault(); // estetään sivun uudelleen lataaminen

    const heitonpisteet = parseInt($("#heitonpisteet").val(), 10);

    $("#heitto")[0].reset(); // Resetoidaan formin syöttökenttä

    // Tarkistetaan monta pelaajaa on
    // Jos 2 --> vuorotellaan heitto vuoroa
    if (pelaajia === "2"){

        if (p1Heitot.length === p2Heitot.length){
            laskuri("1", heitonpisteet);
            
            $("#heittovuoro").html("Player 2 throws");
        }
        else {
            laskuri("2", heitonpisteet);
            $("#heittovuoro").html("Player 1 throws");
        };
    }
    // Jos 1 --> ei vuorotella
    else {
        p1Heitot.unshift(heitonpisteet);
        laskuri("1", heitonpisteet);
    };
};
