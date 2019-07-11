var ListPlayers;
var ListClass;
var ListSpells;
var Heals;
var HealsRecived;
var HealsGiven;
var Logfile;
var HealsByspells;
var CurrentPlayer;

var dropper = document.querySelector('#dropper');

dropper.addEventListener('dragover', function(e) {
    e.preventDefault(); // Annule l'interdiction de "drop"
}, false);

dropper.addEventListener('drop', function(e) {
    e.preventDefault();

    var files = e.dataTransfer.files ;
    CurrentPlayer = (files[0].name).split('_');
    document.getElementById('dropper').innerText=CurrentPlayer[1];

}, false);
//https://openclassrooms.com/forum/sujet/lire-un-fichier-texte-en-javascript-33614