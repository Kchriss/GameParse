
var CurrentPlayer;
var HealType="";
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
    files = e.dataTransfer.files[0];
    //get player name through file name
    let PlayerFileName = (files.name).split('_');
    CurrentPlayer = PlayerFileName[1];
    // "show must go on "
    document.getElementById('dropper').innerText= PlayerFileName[1];// +" file vs item " + text[1];
    document.getElementById('header1').innerText= "";
    // file reading and loading
    let reader = new FileReader();
    reader.onload = function(e) {
        // split by line in tab
        tabFile = e.target.result.toString().split(/\r\n|\r|\n/);
        // "show must go on " a to do .... split data form each line .... get name player list( check for another way) //  postion after date log
        for (var i=0; i<tabFile.length; i++)
        // note faire une recherche sur healed => pour determiner sa presence et ca position ...
            // pour faire les substring et le check de la ligne renvoie des donnees extraite dans le tableau
                // a etudier une tableau par type ??? ... mot cle : healed , slashes , pierces , begins,crushes,backstabs,frenzies,shoots,hits,taken//indexOf('Video' | 'Audio' )
                    // piste a suivre.... cree un fonction du nommer du nom "trouver" pour la gestion du log ...

        {
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
                        let LogHealed = new Healed(i, curser, tabFile);
                        document.getElementById('header1').innerText += LogHealed.PlayerHealer() + " -+- " + curserTag + " -+- "
                            + LogHealed.TargedHealed() + " -+- " + LogHealed.TypeOfHeal()
                            + "\n";//+" -+- "+ AmountOfHeal+" -+- "+OverHeal+" -+- "+SpellCasted+" -+- "+CritMessage+" -+- "+curserOnDate+"\n";
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

        }//tabFile[i] ;document.getElementById('header1').innerText +" " +};
        };
    reader.readAsText(files);
    // "show must go on "

}, false);

/*
[Mon Jul 08 22:21:03 2019] Katercat healed Douxreve for 0 (5) hit points by Spiritual Squall Rk. III.
[Mon Jul 08 22:21:03 2019] Xabober is surrounded by a holy light. Elocin healed Xabober for 1200 (24048) hit points by Hand of Holy Wrath VI Recourse. (Critical)
[Mon Jul 08 22:21:03 2019] Venedar healed Folkken over time for 1128 hit points by Prophet's Gift of the Ruchu. (Lucky Critical)
[Mon Jul 08 22:21:03 2019] Djess healed Wulerdar over time for 15758 (22116) hit points by Abundant Healing XLIX. (Lucky Critical)
[Sun Jun 30 16:17:09 2019] Balthus healed Uaru for 0 (14323) hit points by Divine Rain III.
[Mon Jul 08 22:21:03 2019] Katercat healed Anlak for 48008 (63059) hit points by Spiritual Squall Rk. III. (Critical)
[Mon Jul 08 22:21:03 2019] Venedar healed Folkken over time for 1128 hit points by Prophet's Gift of the Ruchu. (Lucky Critical)
*/
class Taken {
    constructor(i,curser,tabFile){
        this.i=i;
        this.curser=curser;
        this.tabFile=tabFile;
        this.playerDmged="";
    };
    PlayerDmged(){
        let curser_1;
        let curser_2;
        let curser_3;
        curser_1 = this.tabFile[this.i].lastIndexOf(' ',this.curser);
        curser_2 = this.tabFile[this.i].lastIndexOf(' ',curser_1-1);
        curser_3 = this.tabFile[this.i].lastIndexOf(' ',curser_2-1);
        this.playerDmged= this.tabFile[this.i].substr(curser_3,curser_2-curser_3);//extraction du nom du joueur
        if (this.playerDmged.trim()=="you")
        {
            this.playerDmged= CurrentPlayer;
        }
        return this.playerDmged;
    }

}
class Backstabs{
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}
class Begins{
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}
class Crushes{
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}
class Frenzies{
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}
class Hits{
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}
class Pierces{
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}
class Shoots{
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}
class Slashes{
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}
class Healed {
    constructor(i,curser,tabFile){
        this.i=i;
        this.curser=curser;
        this.tabFile=tabFile;
        this.playerHealer="";
        this.playerHealed="";
        this.curser_3 =0;
        this.curser_4 =0;
        this.curser_5=0;
        this.curser_6=0;

    };

     PlayerHealer(){
        let curser_1;
        let curser_2;
        curser_1 = this.tabFile[this.i].lastIndexOf(' ',this.curser);
        curser_2 = this.tabFile[this.i].lastIndexOf(' ',curser_1-1);
        this.playerHealer= this.tabFile[this.i].substr(curser_2,curser_1-curser_2);//extraction du nom du joueur
        if (this.playerHealer.trim()=="you")
        {
             this.playerHealer= CurrentPlayer;
        }
        return this.playerHealer;
    }
    TargedHealed(){
        this.curser_3 = this.tabFile[this.i].indexOf(' ',this.curser+1);
        this.curser_4 = this.tabFile[this.i].indexOf(' ',this.curser_3+1);
        this.playerHealed= this.tabFile[this.i].substr(this.curser_3,this.curser_4-this.curser_3);//extraction du nom du joueur
        if (this.playerHealed.trim()=="himself"||this.playerHealed.trim()=="itself"||this.playerHealed.trim()=="herself")
        {
            this.playerHealed= this.playerHealer;
        }
        else if(this.playerHealed.trim()=="you")
        {
            this.playerHealed= CurrentPlayer;
        }
        return this.playerHealed;
    }
    TypeOfHeal(){
        this.curser_5 = this.tabFile[this.i].indexOf('for',this.curser_4+1);
        this.curser_6 = this.tabFile[this.i].indexOf(' ',this.curser_5+1);
        HealType= this.tabFile[this.i].substr(this.curser_4,this.curser_6-this.curser_4);//extraction du nom du joueur
        return HealType;
    }
}

//https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/JSON
//https://openclassrooms.com/forum/sujet/lire-un-fichier-texte-en-javascript-33614
//https://openclassrooms.com/fr/courses/1916641-dynamisez-vos-sites-web-avec-javascript/1922300-lapi-file
//http://www.script-tutorials.com/html5-drag-and-drop-multiple-file-uploader/
//http://www.maximechaillou.com/simple-upload-en-drag-and-drop-avec-html5-jquery-php/
//https://openclassrooms.com/fr/courses/1916641-dynamisez-vos-sites-web-avec-javascript/1922300-lapi-file
//  extraire les données et les placer dans un tableau ... nom (ou you) heal ... overheal ... nom player healer '(ou myself... himself...) etc....
/*
{
    "squadName": "Super hero squad",
    "homeTown": "Metro City",
    "formed": 2016,
    "secretBase": "Super tower",
    "active": true,
    "playerLog": [
    {
        "PlayerName": "Hygie",
        "Action": "healed",
        "TargetHealed": [ heal,overheal],
        "SpellUsed": "spellname",
        "critical" : "luckycritical"
    },
    {
        "name": "Madame Uppercut",
        "age": 39,
        "secretIdentity": "J......*/
/*if(curser>45){
                            //cas des "log a rallonge"
                            curser1 = tabFile[i].indexOf('.')+2;
                            curser2 = tabFile[i].indexOf(' ', curser1);
                            playerName= tabFile[i].substr(curser1,curser2-curser1);//extraction du nom du joueur
                            curser3 = tabFile[i].indexOf(' ', curser)+1;
                            curser4 = tabFile[i].indexOf(' ', curser3)+1;
                            PlayerHealed = tabFile[i].substr(curser3,curser4-curser3);//extraction du nom du joueur healer
                            PlayerHealedStr = PlayerHealed.toString().trim();
                            if(PlayerHealedStr=="himself"||PlayerHealedStr=="itself"||PlayerHealedStr=="herself"){ // traitement par pronom remplacement par nom du joueur
                                PlayerHealed = playerName;
                            }
                            //[Mon Jul 08 22:21:03 2019] Xabober is surrounded by a holy light. Elocin healed Xabober for 1200 (24048) hit points by Hand of Holy Wrath VI Recourse. (Critical)
                            curser5 = tabFile[i].indexOf(' ', curser4)+1;
                            curser6 = tabFile[i].indexOf('for', curser4);
                            HealType = tabFile[i].substr(curser4,curser5-curser6); // heal type ... direct ... over time

                        }
                        else{
                            // text "court"
                            curser1 = tabFile[i].indexOf(']')+2;
                            curser2 = tabFile[i].indexOf(' ', curser1);
                            playerName= tabFile[i].substr(curser1,curser2-curser1);//extraction du nom du joueur
                            curser3 = tabFile[i].indexOf(' ', curser)+1;
                            curser4 = tabFile[i].indexOf(' ', curser3)+1;
                            PlayerHealed = tabFile[i].substr(curser3,curser4-curser3);
                            PlayerHealedStr = PlayerHealed.toString().trim();
                            if(PlayerHealedStr=="himself"||PlayerHealedStr=="itself"||PlayerHealedStr=="herself"){// traitement par pronom remplacement par nom du joueur
                                PlayerHealed = playerName;
                            }

                            // heal type ... direct ... over time
                            curser5 = tabFile[i].indexOf(' ', curser4)+1;
                            curser6 = tabFile[i].indexOf('for', curser4);
                            if(curser5>curser6){//heal direct
                                HealType = tabFile[i].substr(curser4,curser5-curser6);
                                curser6_1=tabFile[i].indexOf(' ', curser5)+1;
                                AmountOfHeal = tabFile[i].substr(curser5,curser6_1-curser5);
                                curser6_2=tabFile[i].indexOf(' ', curser6_1)+1;
                                if ( tabFile[i].substr(curser6_1,1) =="("){
                                    OverHeal = tabFile[i].substr(curser6_1+1,curser6_2-curser6_1-3);
                                }
                                else{
                                    OverHeal=" over heal null !!! a changer en >>0<< heal direct";
                                }
                                curser6_3 = tabFile[i].indexOf('by', curser6_1);
                                if (curser6_3>0){
                                    curser6_4 = tabFile[i].indexOf('.', curser6_3);
                                    curser6_5 = tabFile[i].indexOf('.', curser6_4+1);
                                    SpellCasted = tabFile[i].substr(curser6_3+2,curser6_5-(curser6_3))
                                }
                                else{
                                    SpellCasted ="spell null heal direct";
                                }
                                 curser6_6 = tabFile[i].indexOf('(', curser6_5);
                                if (curser6_6>0){
                                    curser6_7 = tabFile[i].indexOf(')', curser6_6);
                                    CritMessage = tabFile[i].substr(curser6_6,curser6_7-curser6_6+1);
                                }
                                else
                                {
                                    CritMessage =" crit null heal direct";
                                }


                            }
                            else{//heal over time
                                var curser7 = tabFile[i].indexOf('over', curser4);
                                HealType = tabFile[i].substr(curser7,curser6-curser7)
                                curser6_1=tabFile[i].indexOf(' ', curser6)+4;
                                AmountOfHeal = tabFile[i].substr(curser6+3,curser6_1-curser6);
                                curser6_2=tabFile[i].indexOf(' ', curser6_1);
                                if (tabFile[i].substr(curser6_2+1,1)=="(")
                                {
                                    curser6_8=tabFile[i].indexOf(' ', curser6_2+1);
                                    OverHeal = tabFile[i].substr(curser6_2+2,curser6_8-curser6_2-3);
                                }
                                else{
                                    OverHeal=" over heal null !!! a changer en >>0<< over time ";
                                }
                                curser6_3 = tabFile[i].indexOf('by', curser6_8);
                                if (curser6_3>0){
                                    curser6_4 = tabFile[i].indexOf('.', curser6_3);
                                    curser6_5 = tabFile[i].indexOf('.', curser6_4+1);
                                    SpellCasted = tabFile[i].substr(curser6_3+2,curser6_5-(curser6_3))
                                }
                                else{
                                    SpellCasted ="spell null over time";
                                }
                                curser6_6 = tabFile[i].indexOf('(', curser6_5);
                                if (curser6_6>0){
                                    curser6_7 = tabFile[i].indexOf(')', curser6_6);
                                    CritMessage = tabFile[i].substr(curser6_6,curser6_7-curser6_6+1);
                                }
                                else
                                {
                                    CritMessage =" crit null over time";
                                }


                            }
                            var curserOnDate = tabFile[i].substr(0,26)
                        }*/