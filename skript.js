
// piilotetaan tarvittavat tavarat
$("#peli").hide();
$("#p2").hide();
$("#voittajaKortti").hide();
$("#lopetus").hide();
$("#alkOtsikko").hide();
$("#alkText").hide();
$("#asetusKortti").hide();


// Liu'utetaan alku elementit esiin
$('#alkOtsikko').slideDown(1000, function() {
    $('#alkText').slideDown(1000, function() {
        $('#asetusKortti').slideDown(2000);
    });
});

// luodaan heittohistorialistat
let p1Heitot = ["-", "-", "-"];
let p2Heitot = ["-", "-", "-"];

// kun asetukset hyväksytään ja form lähetetään niin suoritetaan aloitus funktio
$("#asetukset").on("submit", aloitus)

// Kun heitetty piste kirjataan suoritetaan funktio player
$("#heitto").on("submit", player)


// Tällä funktiolla lisätään oikea määrä pelaajia ja aoituspistemäärät
function aloitus(e){
     e.preventDefault(); // estetään sivun uudelleen lataaminen

     // Lisätään emoji sade
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

        // lasketaan heitetyt pisteet jäljellä olevista pisteistä
        let p1Kokonaispisteet = parseInt($("#p1Pisteet").text(), 10);
        p1Kokonaispisteet -= heitPisteet;

        // jos tulos menee yli -> annetaan ilmoitus ja merkataan piste historiaan nolla (ei vähennetä pisteitä)
        if (p1Kokonaispisteet < 0) {
            alert("Over");
            p1Heitot.unshift(0);
            return;
        }

        // jos pelaaja saa 0 -> lopetetaan peli
        else if (p1Kokonaispisteet === 0){

            // näytetään lopetus osio ja piilotetaan peli osio
            $("#lopetus").show();
            $("#peli").hide().removeClass("d-flex");
            // merkataan voittaja lopetusosioon
            $("#voittaja").html("Player 1");
            // Liu'utetaan korttinäkyviin
            $('#voittajaKortti').slideDown(2000);
            // lisätään konfettisade
            setInterval(() => {jsConfetti.addConfetti();}, 1250); 
        }

        // jos pisteitää jää jäljelle -> jatketaan peliä
        else{
            // jos pelaaja heittää 180 -> tehdään animaatio
            if (heitPisteet === 180){
            jsConfetti.addConfetti({emojis: ['180'],}).then(() => jsConfetti.addConfetti());
            }

            // päivitetään pisteet ja lisätään heitetty pistemäärä listaan
            $("#p1Pisteet").html(p1Kokonaispisteet);
            p1Heitot.unshift(heitPisteet);
        };
    }
    // Pelaaja 2 pisteiden lakeminen
    else{
        // lasketaan heitetyt pisteet jäljellä olevista pisteistä
        let p2Kokonaispisteet = parseInt($("#p2Pisteet").text(), 10);
        p2Kokonaispisteet -= heitPisteet;

        // jos tulos menee yli -> annetaan ilmoitus ja merkataan piste historiaan nolla (ei vähennetä pisteitä)
        if (p2Kokonaispisteet < 0) {
            alert("Over");
            p2Heitot.unshift(0);
            return;
        }

        // jos pelaaja saa 0 -> lopetetaan peli
        else if (p2Kokonaispisteet === 0){

            // näytetään lopetus osio ja piilotetaan peli osio
            $("#lopetus").show();
            $("#peli").hide().removeClass("d-flex");
            // merkataan voittaja lopetusosioon
            $("#voittaja").html("Player 2");
            // Liu'utetaan korttinäkyviin
            $('#voittajaKortti').slideDown(2000);
            // lisätään konfettisade
            setInterval(() => {jsConfetti.addConfetti();}, 1250); 
        }

        // jos pisteitää jää jäljelle -> jatketaan peliä
        else{
            // jos pelaaja heittää 180 -> tehdään animaatio
            if (heitPisteet === 180){
                jsConfetti.addConfetti({emojis: ['180'],}).then(() => jsConfetti.addConfetti());
            };

            // päivitetään pisteet ja lisätään heitetty pistemäärä listaan
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

// luodaan uusi olio confetti kirjastoa varten
const jsConfetti = new JSConfetti();

// jos halutaan pelata uusi peli -> ladataan sivu uudelleen
$("#uusipeli").on("click", function(){
    location.reload();
})


  