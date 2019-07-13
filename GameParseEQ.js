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
        // "show must go on " a to do .... split data form each line .... get name player list( check for another way) //  postion after date log
        for (var i=0; i<tabFile.length; i++)
        // note faire une recherche sur healed => pour determiner sa presence et ca position ...
            // pour faire les substring et le check de la ligne renvoie des donnees extraite dans le tableau
                // a etudier une tableau par type ??? ... mot cle : healed , slashes , pierces , begins//indexOf('Video' | 'Audio' )


        {   var curser1 = tabFile[i].indexOf(']')+2;
            var curser2 = tabFile[i].indexOf(' ', curser1);
            var playerName= tabFile[i].substr(curser1,curser2-curser1);
            var curser3 = tabFile[i].indexOf(' ', curser2+1);
            var Actionheroes = tabFile[i].substr(curser2,curser3-curser2);
            var curser4 = tabFile[i].indexOf(' ', curser3+1);
            var PlayerHealed = tabFile[i].substr(curser3,curser4-curser3)=="himself"&&"itself"&&"herself"?tabFile[i].substr(curser3,curser4-curser3):playerName;
            var curser5 = tabFile[i].indexOf(' ', curser4+1);
            var NextWord = tabFile[i].substr(curser4,curser5-curser4)// =="for"?a finir;
            var curser6 = tabFile[i].indexOf(' ', curser5+1);
            var heal = tabFile[i].substr(curser5,curser6-curser5);
            var curser7 = tabFile[i].indexOf(' ', curser6+1);
            var Overheal = tabFile[i].substr(curser6,curser7-curser6);
            document.getElementById('header1').innerText = curser4 +" "+ curser5 +" "+ curser6 +" "+ playerName+" "
                + Actionheroes+ " "+ PlayerHealed +" "+ heal +" "+ Overheal};//tabFile[i] ;document.getElementById('header1').innerText +" " +};
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
