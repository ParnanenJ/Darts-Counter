
$("#peli").hide();
$("#p2").hide();
$("#lopetus").hide();

let p1Heitot = ["-", "-", "-"];
let p2Heitot = ["-", "-", "-"];

// kun asetukset hyväksytään ja form lähetetään niin suoritetaan aloitus funktio
$("#asetukset").on("submit", aloitus)

// Kun heitetty piste kirjataan suoritetaan funktio player
$("#heitto").on("submit", player)


// Tällä funktiolla lisätään oikea määrä pelaajia ja aoituspistemäärät
function aloitus(e){
     e.preventDefault(); // estetään sivun uudelleen lataaminen

     jsConfetti.addConfetti({emojis: ['🎯'],})

     // Näytetään pelitila ja piilotetaan aloitus
      $("#peli").addClass("d-flex").show();
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

// Tällä funktiolla lasketaan pistemäärä oikealle pelaajalle
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
            $("#peli").hide().removeClass("d-flex");
            $("#voittaja").html("Player 1");
            setInterval(() => {jsConfetti.addConfetti();}, 1250); 
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
            $("#peli").hide().removeClass("d-flex");
            $("#voittaja").html("Player 2");
            setInterval(() => {jsConfetti.addConfetti();}, 1250); 
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

            // Laketaan p1 pisteet
            laskuri("1", heitonpisteet);

            // lisätään edelliset heitot näkyviin
            $("#p1EdlH1").html(p1Heitot[0]);
            $("#p1EdlH2").html(p1Heitot[1]);
            $("#p1EdlH3").html(p1Heitot[2]);

            // Muutetaan heittovototeksti
            $("#heittovuoro").html("Player 2 throws");
        }
        else {

            // Laketaan p1 pisteet
            laskuri("2", heitonpisteet);

            // lisätään edelliset heitot näkyviin
            $("#p2EdlH1").html(p2Heitot[0]);
            $("#p2EdlH2").html(p2Heitot[1]);
            $("#p2EdlH3").html(p2Heitot[2]);

            // Muutetaan heittovototeksti
            $("#heittovuoro").html("Player 1 throws");
        };
    }
    // Jos 1 --> ei vuorotella
    else {
        // Lasketaan p1 pisteet
        laskuri("1", heitonpisteet);

        // lisätään edelliset heitot näkyviin
            $("#p1EdlH1").html(p1Heitot[0]);
            $("#p1EdlH2").html(p1Heitot[1]);
            $("#p1EdlH3").html(p1Heitot[2]);
    };
};


const jsConfetti = new JSConfetti();

// 
$("#uusipeli").on("click", function(){
    location.reload();
})
  