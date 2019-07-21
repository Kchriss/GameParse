var CurrentPlayer;
var HealType = "";
var FilePath;
var files;
var tabFile;
var logHeal=[];
var timeFilter=[];
var dropper = document.querySelector('#dropper');
//drop zone for file event dragover and drop needed to get file data
dropper.addEventListener('dragover', function (e) {
    e.preventDefault(); // allow  "drop"  fonction
}, false);

dropper.addEventListener('drop', function (e) {
    e.preventDefault(); // allow  "drop"  fonction
    // data file
    files = e.dataTransfer.files[0];
    //get player name through file name
    let PlayerFileName = (files.name).split('_');
    CurrentPlayer = PlayerFileName[1];
    // "show must go on "
    document.getElementById('dropper').innerText = PlayerFileName[1];// +" file vs item " + text[1];

    // file reading and loading
    let reader = new FileReader();
    reader.onload = function (e) {
        // split by line in tab
        tabFile = e.target.result.toString().split(/\r\n|\r|\n/);


        // "show must go on " a to do .... split data form each line .... get name player list( check for another way) //  postion after date log
        for (var i = 0; i < tabFile.length; i++) {
            readerdigest(tabFile, i);
            // note faire une recherche sur healed => pour determiner sa presence et ca position ...
            // pour faire les substring et le check de la ligne renvoie des donnees extraite dans le tableau
            // a etudier une tableau par type ??? ... mot cle : healed , slashes , pierces , begins,crushes,backstabs,frenzies,shoots,hits,taken//indexOf('Video' | 'Audio' )
            // piste a suivre.... cree un fonction du nommer du nom "trouver" pour la gestion du log ...
            // inserer une pause ?!!
            // https://codeburst.io/javascript-array-distinct-5edc93501dc4
            //https://openclassrooms.com/forum/sujet/lecture-d-un-fichier-sequentiel-avec-filereader-64413 ..."java"
            //>>>>>>>>>>>>>>>>>>>>>>>https://medium.com/@dalaidunc/fs-readfile-vs-streams-to-read-text-files-in-node-js-5dd0710c80ea<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            //>>>>>>>>>>>>>>>>>>>>>>>https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/async_function<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        }
    };
    reader.readAsText(files);
    // "show must go on "


}, false);
var k=0;

function readerdigest(tabFile, i) {
    let curserTag = tabFile[i].match(/backstabs|begins|crushes|frenzies|healed|hits|pierces|shoots|slashes|taken/gi);//test le mot cle et recupere sa valeur ! :p
    let curser = tabFile[i].indexOf(curserTag, 0);
    if (curserTag !== null) {// sorting by key word with indexof ....
        switch (curserTag.toString().trim()) {
            case "backstabs":
                let LogBackstabs = new Backstabs(i, curser, tabFile);
                break;
            case "begins":
                let LogBegins = new Begins(i, curser, tabFile);
                break;
            case "crushes":
                let LogCrushes = new Crushes(i, curser, tabFile);
                break;
            case "frenzies":
                let LogFrenzies = new Frenzies(i, curser, tabFile);
                break;
            case "healed":

                let logHealed = new Healed(i, curser, tabFile);
                /*    document.getElementById('header1').innerText += logHealed.PlayerHealer() + " -+- " + curserTag + " -+- "
                        + logHealed.TargedHealed() + " -+- " + logHealed.TypeOfHeal()
                        +" -+- "+ logHealed.HealAmount()+" -+- "+logHealed.OverHeal()+" -+- "+logHealed.SpellsUsed()+" -+- "+logHealed.CriticalHitMessage()+ " -+- "+logHealed.Logtime()+"\n";*/
                logHeal[k]={"id":k,"healer":logHealed.PlayerHealer(),"healed":logHealed.TargedHealed()
                                    ,"type":logHealed.TypeOfHeal(),"Heal":logHealed.HealAmount(),"overheal":logHealed.OverHeal()
                                    ,'spell':logHealed.SpellsUsed(),"crit":logHealed.CriticalHitMessage(),"logDate":logHealed.Logtime()};
                //let btn = document.getElementById('btn');
                //btn.style.visibility="visible";
                k++;
                break;
            case "hits":
                let LogHits = new Hits(i, curser, tabFile);
                break;
            case "pierces":
                let LogPierces = new Pierces(i, curser, tabFile);
                break;
            case "shoots":
                let LogShoots = new Shoots(i, curser, tabFile);
                break;
            case "slashes":
                let LogSlashes = new Slashes(i, curser, tabFile);
                break;
            case "taken" :
                let LogTaken = new Taken(i, curser, tabFile);
                break;


        }
    }
}

class Taken {
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
        this.playerDmged = "";
    };

    PlayerDmged() {
        let curser_1;
        let curser_2;
        let curser_3;
        curser_1 = this.tabFile[this.i].lastIndexOf(' ', this.curser);
        curser_2 = this.tabFile[this.i].lastIndexOf(' ', curser_1 - 1);
        curser_3 = this.tabFile[this.i].lastIndexOf(' ', curser_2 - 1);
        this.playerDmged = this.tabFile[this.i].substr(curser_3, curser_2 - curser_3);//extraction du nom du joueur
        if (this.playerDmged.trim() == "you") {
            this.playerDmged = CurrentPlayer;
        }
        return this.playerDmged;
    }

}

class Backstabs {
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}

class Begins {
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}

class Crushes {
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}

class Frenzies {
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}

class Hits {
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}

class Pierces {
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}

class Shoots {
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}

class Slashes {
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}

class Healed {
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
        this.playerHealer = "";
        this.playerHealed = "";
        this.curser_1 = null;
        this.curser_2 = null;
        this.curser_3 = null;
        this.curser_4 = null;
        this.curser_5 = null;
        this.curser_6 = null;
        this.curser_7 = null;
        this.curser_8 = null;
        this.curser_9 = null;
        this.curser_10 = null;
        this.curser_11 = null;
        this.curser_12 = null;
        this.curser_13 = null;
        this.curser_14 = null;
    };

    PlayerHealer() {
        this.curser_1 = this.tabFile[this.i].lastIndexOf(' ', this.curser);
        this.curser_2 = this.tabFile[this.i].lastIndexOf(' ', this.curser_1 - 1);
        this.playerHealer = this.tabFile[this.i].substr(this.curser_2, this.curser_1 - this.curser_2).trim();//extraction du nom du joueur
        if (this.playerHealer.trim().toLowerCase() == "you") {
            this.playerHealer = CurrentPlayer;
        }
        return this.playerHealer;
    }

    TargedHealed() {
        this.curser_3 = this.tabFile[this.i].indexOf(' ', this.curser + 1);
        this.curser_4 = this.tabFile[this.i].indexOf(' ', this.curser_3 + 1);
        this.playerHealed = this.tabFile[this.i].substr(this.curser_3, this.curser_4 - this.curser_3).trim();//extraction du nom du joueur
        if (this.playerHealed.trim() == "himself" || this.playerHealed.trim() == "itself" || this.playerHealed.trim() == "herself") {
            this.playerHealed = this.playerHealer;
        } else if (this.playerHealed.trim().toLowerCase() == "you") {
            this.playerHealed = CurrentPlayer;
        }
        return this.playerHealed;
    }

    TypeOfHeal() {
        this.curser_5 = this.tabFile[this.i].indexOf('for', this.curser_4 + 1);
        this.curser_6 = this.tabFile[this.i].indexOf(' ', this.curser_5 + 1);
        if (this.curser_5 > 60) { // trouver une meilleur "solution
            HealType = this.tabFile[this.i].substr(this.curser_4, this.curser_6 - this.curser_4).trim();
        }//extraction du nom du joueur
        else {
            HealType = this.tabFile[this.i].substr(this.curser_5, this.curser_6 - this.curser_5).trim();
        }////extraction du nom du joueur
        return HealType;
    }

    HealAmount() {
        this.curser_7 = this.tabFile[this.i].indexOf(' ', this.curser_6 + 1);
        let HealOfHeal = this.tabFile[this.i].substr(this.curser_6, this.curser_7 - this.curser_6).trim();//extraction du nom du joueur
        return parseInt(HealOfHeal);
    }

    OverHeal() {
        this.curser_8 = this.tabFile[this.i].indexOf(' ', this.curser_7 + 1);
        let OverHealAmount = this.tabFile[this.i].substr(this.curser_7, 2).trim();//extraction du nom du joueur
        if (OverHealAmount !== null && OverHealAmount == "(") {
            OverHealAmount = this.tabFile[this.i].substr(this.curser_7+2, this.curser_8-3 - this.curser_7).trim()
        } else {
            OverHealAmount = 0;
        }
        return parseInt(OverHealAmount);
    }

    SpellsUsed() {
        let SpellsCasted = "";
        this.curser_9 = this.tabFile[this.i].indexOf('by', this.curser_8);

        if (this.curser_9 > 0 && this.curser_9 !== null) {
            this.curser_10 = this.tabFile[this.i].indexOf(' ', this.curser_9);
            this.curser_11 = this.tabFile[this.i].indexOf('.', this.curser_10);
            let spellrankchecking = this.tabFile[this.i].substr(this.curser_10, this.curser_11 - this.curser_10).match(/rk/gi);
            if (spellrankchecking !== null && spellrankchecking == "Rk") {
                this.curser_12 = this.tabFile[this.i].indexOf('.', this.curser_11 + 1);
                SpellsCasted = this.tabFile[this.i].substr(this.curser_10, this.curser_12 - this.curser_10).trim();
            } else {
                SpellsCasted = this.tabFile[this.i].substr(this.curser_10, this.curser_11 - this.curser_10).trim();
            }

        } else {
            SpellsCasted = ""
        }
        return SpellsCasted;
    }

    CriticalHitMessage() {
        let Critmess = "";
        if (this.curser_10 !== null) {
            this.curser_13 = this.tabFile[this.i].indexOf('(', this.curser_10);

            if (this.curser_13 !== null && this.curser_13 > 0) {
                this.curser_14 = this.tabFile[this.i].indexOf(')', this.curser_13);
                Critmess = this.tabFile[this.i].substr(this.curser_13, this.curser_14 + 1 - this.curser_13).trim();
            } else {
                Critmess = ""
            }
        }
        return Critmess;
    }

    Logtime() {

        let logtimer = this.tabFile[this.i].substr(this.tabFile[this.i].indexOf('[') + 1, this.tabFile[this.i].indexOf(']') - this.tabFile[this.i].indexOf('[') - 1).trim();
        return new Date(logtimer).getTime();
    }
}

//let btn = document.querySelector('input');
//btn.addEventListener('click', updateBtn);
let input =document.getElementById('radioInputChoice');
input.step=0.1;
let choice1 = document.getElementById('Choice1')
choice1.addEventListener('click', updateBtn);
var choice2 = document.getElementById('Choice2');
choice2.addEventListener('click', updateBtn);
var choice3 = document.getElementById('Choice3');
choice3.addEventListener('click', updateBtn);
var choice4 = document.getElementById('Choice4');
choice4.addEventListener('click', updateBtn);
var choice5 = document.getElementById('Choice5');
choice5.addEventListener('click', updateBtn);
var choice6 = document.getElementById('Choice6');
choice6.addEventListener('click', updateBtn);









function updateBtn() {
    //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/parse
    //https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
    //>>>>> reduction de la tailler du tableau en fonction d'un temp a choisir ... derniere heure.. derniere 6 heure... fichier "entier ... etc....
    ///// a mettre en place
    let timeToCheck=0;
    let startCheck=0;
    var test =this.value;
    let lastentry =logHeal.length-1;
    let logTimerLastEntry =logHeal[lastentry].logDate;
   if (this.id =='Choice5')
    {
        let onChoice = parseFloat(document.getElementById('radioInputChoice').value);
        timeToCheck = logTimerLastEntry-(3600000*onChoice);
        console.log(onChoice)
    }



    if (test>0){
     timeToCheck = logTimerLastEntry-(3600000*test);
    }
    else if (test ===0 || test =="click to show"){

        let logTimer1stEntry =logHeal[0].logDate;
        timeToCheck=logTimer1stEntry;

        }

    for (let j = 1; j < lastentry; j++)
    {  //loop through the array

        if(logHeal[j].logDate>=timeToCheck)
        {
            startCheck=j;
            break;
        }
    }

    timeFilter = logHeal.slice(startCheck,lastentry);

    let listOfPlayerhealed = [...new Set(timeFilter.map(x => x.healed))].sort();
    let listOfPlayershealer = [...new Set(timeFilter.map(y => y.healer))].sort();

    menudropplayers('healed',listOfPlayerhealed);
    menudropplayers('healer',listOfPlayershealer);

}


function menudropplayers(players,playersList) {

    let dropdown = document.getElementById(players + '-dropdown');
    dropdown.length = 0;
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Players ' + players;
    dropdown.add(defaultOption);
    dropdown.style.visibility = "visible";
    dropdown.innerText="";
    dropdown.addEventListener("change", addActivityItem, false)
    dropdown.selectedIndex = 0;
    for (let i = 0; i < playersList.length; i++) {
        option = document.createElement('option');
        option.text = playersList[i];
        option.value = playersList[i];
        dropdown.add(option);

    }
    //dropdown.options[dropdown.selectedIndex].value = CurrentPlayer; /// option de value preselesctionner

}
function addActivityItem(){
    let e = document.getElementById('healer-dropdown');
    let targedhealer = e.options[e.selectedIndex].value;
    let mySet= timeFilter.filter(it => new RegExp(targedhealer).test(it.healer));
    let mySet2= [...new Set(mySet.map(x => x.healed))];
    if (document.getElementById('parseview')!=null){

        let div = document.getElementById('parseview');
        div.innerText = "";
    }
    let total = 0;
    let total2 = 0;
    let playerTargetByHealer="";
    mySet2.forEach(function(element) {
        let mySet3= mySet.filter(it => new RegExp(element).test(it.healed));
        for (let i = 0; i < mySet3.length; i++) {  //loop through the array
            total += mySet3[i].Heal;  //Do the math!
            total2+= mySet3[i].overheal;

        }
        playerTargetByHealer=element;
        containerPlayer(targedhealer,playerTargetByHealer,total,total2)
    });
}
function containerPlayer(targedhealer,playerTargetByHealer,total,total2) {

        if (document.getElementById('parseview')==null){
            let div = document.createElement('div');
            div.name=targedhealer;
            div.id="parseview";
            div.innerText =playerTargetByHealer+" | "+" Heal : "+total +" |  HA : "+total2 +"\n";
            document.body.appendChild(div);
        }
        else{
            let div = document.getElementById('parseview');
            div.innerText += playerTargetByHealer+" | "+" Heal : "+total +" |  HA : "+total2 + "\n";
        }
}
/*
 !!!!!!! stream et map a voir !!!!!
 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 http://cryto.net/~joepie91/blog/2015/05/04/functional-programming-in-javascript-map-filter-reduce/
 logHeal[i]={"id":i,"healer":logHealed.PlayerHealer(),"healed":logHealed.TargedHealed()
                                    ,"type":logHealed.TypeOfHeal(),"Heal":logHealed.HealAmount(),"overheal":logHealed.OverHeal()
                                    ,'spell':logHealed.SpellsUsed(),"crit":logHealed.CriticalHitMessage(),"logDate":logHealed.Logtime()};

[Mon Jul 08 22:20:43 2019] Ginormus healed Yashoor`s warder for 0 (69543) hit points by Spiritual Squall Rk. III. (Critical)
[Mon Jul 08 22:20:43 2019] Bellower healed itself for 0 (76) hit points.
[Mon Jul 08 22:21:03 2019] Katercat healed Douxreve for 0 (5) hit points by Spiritual Squall Rk. III.
[Mon Jul 08 22:21:03 2019] Xabober is surrounded by a holy light. Elocin healed Xabober for 1200 (24048) hit points by Hand of Holy Wrath VI Recourse. (Critical)
[Mon Jul 08 22:21:03 2019] Venedar healed Folkken over time for 1128 hit points by Prophet's Gift of the Ruchu. (Lucky Critical)
[Mon Jul 08 22:21:03 2019] Djess healed Wulerdar over time for 15758 (22116) hit points by Abundant Healing XLIX. (Lucky Critical)
[Sun Jun 30 16:17:09 2019] Balthus healed Uaru for 0 (14323) hit points by Divine Rain III.
[Mon Jul 08 22:21:03 2019] Katercat healed Anlak for 48008 (63059) hit points by Spiritual Squall Rk. III. (Critical)
[Mon Jul 08 22:21:03 2019] Venedar healed Folkken over time for 1128 hit points by Prophet's Gift of the Ruchu. (Lucky Critical)

//https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/JSON
//https://openclassrooms.com/forum/sujet/lire-un-fichier-texte-en-javascript-33614
//https://openclassrooms.com/fr/courses/1916641-dynamisez-vos-sites-web-avec-javascript/1922300-lapi-file
//http://www.script-tutorials.com/html5-drag-and-drop-multiple-file-uploader/
https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
    https://stackoverflow.com/questions/40774697/how-to-group-an-array-of-objects-by-key/40774906
        https://www.freecodecamp.org/news/15-useful-javascript-examples-of-map-reduce-and-filter-74cbbb5e0a1f/
            https://codeburst.io/grouping-array-data-json-ef96b438b927
                https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
                http://www.supportduweb.com/scripts_tutoriaux-code-source-48-systeme-d-039-onglets-en-javascript-x-html-et-css-dans-la-meme-page.html
//http://www.maximechaillou.com/simple-upload-en-drag-and-drop-avec-html5-jquery-php/
//https://openclassrooms.com/fr/courses/1916641-dynamisez-vos-sites-web-avec-javascript/1922300-lapi-file

//  extraire les données et les placer dans un tableau ... nom (ou you) heal ... overheal ... nom player healer '(ou myself... himself...) etc....

https://stackoverflow.com/questions/11199653/javascript-sum-and-group-by-of-json-data
http://learnjsdata.com/group_data.html

*/
// let logSubTime1=logTimerLastEntry.indexOf(' ')+1;
// let logSubTime2=logTimerLastEntry.indexOf(' ',logSubTime1)+1;
// let logSubTime3=logTimerLastEntry.indexOf(' ',logSubTime2)+1;
// let subTimeStr = logTimerLastEntry.substring(logSubTime3,logSubTime3+2);
// if (subTimeStr>0){
//     logTimerLastEntry=logTimerLastEntry.replace(subTimeStr,subTimeStr-1)
// }
// else{
//     logTimerLastEntry=logTimerLastEntry.replace(subTimeStr,checkitme-1)
// }




/*console.log(subTimeStr);
console.log(logTimerLastEntry);*/