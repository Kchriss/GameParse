var ListPlayers;
var ListClass;
var ListSpells;
var Heals;
var HealsRecived;
var HealsGiven;
var Logfile;
var HealsByspells;
var CurrentPlayer;
var FilePath;
var files;
var tabFile;

var dropper = document.querySelector('#dropper');
//drop zone for file event dragover and drop needed to get file data
dropper.addEventListener('dragover', function(e) {
    e.preventDefault(); // allow  "drop"  fonction
}, false);

dropper.addEventListener('drop', function(e) {
    e.preventDefault(); // allow  "drop"  fonction
    // data file
    var files = e.dataTransfer.files[0];
    //get player name through file name
    CurrentPlayer = (files.name).split('_');
    // "show must go on "
    document.getElementById('dropper').innerText= CurrentPlayer[1];// +" file vs item " + text[1];
    document.getElementById('header1').innerText= "ddd";
    // file reading and loading
    reader = new FileReader();
    reader.onload = function(e) {
        // split by line in tab
        tabFile = e.target.result.toString().split(/\r\n|\r|\n/);
        // "show must go on " a to do .... split data form each line .... get name player list( check for another way)
        for (var i=0; i<tabFile.length; i++)
           { document.getElementById('header1').innerText = tabFile[i]};
        };
    reader.readAsText(files);
    // "show must go on "
    console.log(files.type)
}, false);



//https://openclassrooms.com/forum/sujet/lire-un-fichier-texte-en-javascript-33614
//https://openclassrooms.com/fr/courses/1916641-dynamisez-vos-sites-web-avec-javascript/1922300-lapi-file
//http://www.script-tutorials.com/html5-drag-and-drop-multiple-file-uploader/
//http://www.maximechaillou.com/simple-upload-en-drag-and-drop-avec-html5-jquery-php/
//https://openclassrooms.com/fr/courses/1916641-dynamisez-vos-sites-web-avec-javascript/1922300-lapi-file
//  extraire les données et les placer dans un tableau ... nom (ou you) heal ... overheal ... nom player healer '(ou myself... himself...) etc....
