
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
                            +" -+- "+ LogHealed.HealAmount()+" -+- "+LogHealed.OverHeal()+" -+- "+LogHealed.SpellsUsed()+" -+- "+LogHealed.CriticalHitMessage()+ " -+- "+LogHealed.Logtime()+"\n";
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
        };
    reader.readAsText(files);
    // "show must go on "

}, false);


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
        this.curser_1=null;
        this.curser_2=null;
        this.curser_3=null;
        this.curser_4=null;;
        this.curser_5=null;
        this.curser_6=null;
        this.curser_7=null;
        this.curser_8=null;
        this.curser_9=null;
        this.curser_10=null;
        this.curser_11=null;
        this.curser_12=null;
        this.curser_13=null;
        this.curser_14=null;
    };

     PlayerHealer(){
        this.curser_1;
        this.curser_2;
        this.curser_1 = this.tabFile[this.i].lastIndexOf(' ',this.curser);
        this.curser_2 = this.tabFile[this.i].lastIndexOf(' ',this.curser_1-1);
        this.playerHealer= this.tabFile[this.i].substr(this.curser_2,this.curser_1-this.curser_2);//extraction du nom du joueur
        if (this.playerHealer.trim().toLowerCase()=="you")
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
        else if(this.playerHealed.trim().toLowerCase()=="you")
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
    HealAmount(){
        this.curser_7 = this.tabFile[this.i].indexOf(' ',this.curser_6+1);
        let HealOfHeal= this.tabFile[this.i].substr(this.curser_6,this.curser_7-this.curser_6);//extraction du nom du joueur
        return HealOfHeal;
    }
    OverHeal(){
        this.curser_8 = this.tabFile[this.i].indexOf(' ',this.curser_7+1);
        let OverHealAmount= this.tabFile[this.i].substr(this.curser_7,2).trim();//extraction du nom du joueur
        if (OverHealAmount!==null&&OverHealAmount=="(")
        {
            OverHealAmount =this.tabFile[this.i].substr(this.curser_7,this.curser_8-this.curser_7)
        }
        else{
            OverHealAmount ="pas d'over heal"
        }
            return OverHealAmount;
    }
    SpellsUsed(){
        let SpellsCasted="pas d'indication de spells";
        this.curser_9 = this.tabFile[this.i].indexOf('by',this.curser_8);

        if (this.curser_9>0&&this.curser_9!==null)
        {
            this.curser_10= this.tabFile[this.i].indexOf(' ',this.curser_9);
            this.curser_11 = this.tabFile[this.i].indexOf('.',this.curser_10);
            let spellrankchecking =this.tabFile[this.i].substr(this.curser_10,this.curser_11-this.curser_10).match(/rk/gi);
            if(spellrankchecking!==null&&spellrankchecking=="Rk"){
                this.curser_12 = this.tabFile[this.i].indexOf('.',this.curser_11+1);
                SpellsCasted= this.tabFile[this.i].substr(this.curser_10,this.curser_12-this.curser_10);
            }
            else{
                SpellsCasted= this.tabFile[this.i].substr(this.curser_10,this.curser_11-this.curser_10);
            }

        }
        else{
            SpellsCasted ="pas d'indication de spells"
        }
        return SpellsCasted;
    }
    CriticalHitMessage(){
        let Critmess="pas de critique !!! ca change";
        if(this.curser_10!==null){
        this.curser_13 = this.tabFile[this.i].indexOf('(',this.curser_10);

        if (  this.curser_13!==null&&this.curser_13>0)
        {
            this.curser_14= this.tabFile[this.i].indexOf(')',this.curser_13);
               Critmess= this.tabFile[this.i].substr(this.curser_13,this.curser_14+1-this.curser_13);
        }
        else{
            Critmess ="pas de critique !!! ca change"
        }
    }
        return Critmess;
    }
    Logtime() {

        let logtimer = this.tabFile[this.i].substr(this.tabFile[this.i].indexOf('[')+1, this.tabFile[this.i].indexOf(']') - this.tabFile[this.i].indexOf('[')-1);
        return logtimer;
    }
}
/*
[Mon Jul 08 22:20:43 2019] Bellower healed itself for 0 (76) hit points.
[Mon Jul 08 22:21:03 2019] Katercat healed Douxreve for 0 (5) hit points by Spiritual Squall Rk. III.
[Mon Jul 08 22:21:03 2019] Xabober is surrounded by a holy light. Elocin healed Xabober for 1200 (24048) hit points by Hand of Holy Wrath VI Recourse. (Critical)
[Mon Jul 08 22:21:03 2019] Venedar healed Folkken over time for 1128 hit points by Prophet's Gift of the Ruchu. (Lucky Critical)
[Mon Jul 08 22:21:03 2019] Djess healed Wulerdar over time for 15758 (22116) hit points by Abundant Healing XLIX. (Lucky Critical)
[Sun Jun 30 16:17:09 2019] Balthus healed Uaru for 0 (14323) hit points by Divine Rain III.
[Mon Jul 08 22:21:03 2019] Katercat healed Anlak for 48008 (63059) hit points by Spiritual Squall Rk. III. (Critical)
[Mon Jul 08 22:21:03 2019] Venedar healed Folkken over time for 1128 hit points by Prophet's Gift of the Ruchu. (Lucky Critical)
*/
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
