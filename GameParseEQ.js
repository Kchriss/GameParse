let CurrentPlayer;
let healType = "";
let files;
let tabFile;
let logHeal = [];
let timeFilter = [];
let text1, text2, text3 = 0, text6 = 0;

let dropper = document.querySelector('#dropper');

//drop zone for file event dragover and drop needed to get file data
dropper.addEventListener('dragover', function (e) {
    e.preventDefault(); // allow  "drop"  fonction
    /**
     * needed for drag and drop
     * @param {HTMLElement} e
     * @returns {boolean}
     **/
}, false);
dropper.addEventListener('drop', function (e) {
    e.preventDefault(); // allow  "drop"  fonction
    /**
     * needed for drag and drop
     * read file from drag and drop and put it in a table split on end sentence of each log
     * @param {HTMLElement} e
     * @returns {boolean}
     **/
    // data file
    files = e.dataTransfer.files[0];
    //get player name through file name
    let PlayerFileName = (files.name).split('_');
    CurrentPlayer = PlayerFileName[1];
    // "show must go on " user name in drop aera
    document.getElementById('dropper').innerText = PlayerFileName[1];
    // file reading and loading
    //TODO: check name file to avoid putting it twice time...
    let reader = new FileReader();
    reader.onload = function (e) {
        // split by line in tab
        tabFile = e.target.result.toString().split(/\r\n|\r|\n/);
        // "show must go on "
        for (let i = 0; i < tabFile.length; i++) {
            // read result .. catch key word ... and split it to apply right treatment function
            readerdigest(tabFile, i);
        }
    };
    reader.readAsText(files);
}, false);
// variable index in readerdigest
let k = 0;

function readerdigest(tabFile, i) {
    /**
     * here is 1st step of log treatment split log with key word to right Class ... for next treatment
     * @param {tabFileabFile}
     * @param {i} index of line log
     * @returns {curser,i,tabFile}
     **/
    // key word for function
    let curserTag = tabFile[i].match(/backstabs|begins|crushes|frenzies|healed|hits|pierces|shoots|slashes|taken/gi); //check for key word and catch it..
    let curser = tabFile[i].indexOf(curserTag, 0); // key word index
    if (curserTag !== null) {// sorting by key word with indexof ....
        //switch case on key word.... them fonction treatment
        switch (curserTag.toString().trim()) {
            case "backstabs":
                let logBackstabs = new Backstabs(i, curser, tabFile);
                //TODO: to dev
                break;
            case "begins":
                let logBegins = new Begins(i, curser, tabFile);
                //TODO: to dev
                break;
            case "crushes":
                let logCrushes = new Crushes(i, curser, tabFile);
                //TODO: to dev
                break;
            case "frenzies":
                let logFrenzies = new Frenzies(i, curser, tabFile);
                //TODO: to dev
                break;
            case "healed":
                let logHealed = new Healed(i, curser, tabFile);
                logHeal[k] = {// return fonction treatment to logHeal table ... with new index line k
                    "id": k,
                    "healer": logHealed.getPlayerHealer(),
                    "healed": logHealed.getTargedHealed()
                    ,
                    "type": logHealed.getTypeOfHeal(),
                    "Heal": logHealed.getHealAmount(),
                    "overheal": logHealed.getSpellHealAmount()
                    ,
                    'spell': logHealed.getSpellsUsed(),
                    "crit": logHealed.getCriticalHitMessage(),
                    "logDate": logHealed.getLogTime()
                };
                k++;
                break;
            case "hits":
                let logHits = new Hits(i, curser, tabFile);
                //TODO: to dev
                break;
            case "pierces":
                let logPierces = new Pierces(i, curser, tabFile);
                //TODO: to dev
                break;
            case "shoots":
                let logShoots = new Shoots(i, curser, tabFile);
                //TODO: to dev
                break;
            case "slashes":
                let logSlashes = new Slashes(i, curser, tabFile);
                //TODO: to dev
                break;
            case "taken" :
                let logTaken = new Taken(i, curser, tabFile);
                //TODO: to dev
                break;
        }
    }
}
/**
 * here is 2nd step of log treatment log splited from previous function into each Class ... for next treatment
 * @param {curser} and more..
 * @param {i} index of line log
 * @param {tabFile} and more..
 * @returns  @returns get method
 **/
class Taken {
    //TODO: to dev
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
        if (this.playerDmged.trim() === "you") {
            this.playerDmged = CurrentPlayer;
        }
        return this.playerDmged;
    }
}

class Backstabs {
    //TODO: to dev
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}

class Begins {
    //TODO: to dev
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}

class Crushes {
    //TODO: to dev
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}

class Frenzies {
    //TODO: to dev
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}

class Hits {
    //TODO: to dev
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}

class Pierces {
    //TODO: to dev
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}

class Shoots {
    //TODO: to dev
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}

class Slashes {
    //TODO: to dev
    constructor(i, curser, tabFile) {
        this.i = i;
        this.curser = curser;
        this.tabFile = tabFile;
    };
}

class Healed {
    /**
     * here is 2nd step of log treatment on "healed" key word
     * @param {curser}
     * @param {i} index of line log
     * @param {tabFile} and more..
     * @returns  @returns param through get method
     **/
    //fonction to treat healing case key word "healed"
    constructor(i, curser, tabFile) { // i = line index, curser = indew of key word and tabFile as table ...
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

    getPlayerHealer() {
        /**
         * here is 2nd step treatment return healer player name
         * @param {i} index of line log
         * @param {tabFile}
         * @returns  {playerHealer}
         **/
        this.curser_1 = this.tabFile[this.i]
            .lastIndexOf(' ', this.curser);
        this.curser_2 = this.tabFile[this.i]
            .lastIndexOf(' ', this.curser_1 - 1);
        this.playerHealer = this.tabFile[this.i]
            .substr(this.curser_2, this.curser_1 - this.curser_2)
            .trim();//extraction du nom du joueur
        if (this.playerHealer.trim()
            .toLowerCase() === "you") {
            this.playerHealer = CurrentPlayer;
        }
        return this.playerHealer;
    }

    getTargedHealed() {
        /**
         * here is 2nd step treatment return healed player name "player receiving heal"
         * @param {i} index of line log
         * @param {tabFile}
         * @returns  {playerHealed}
         **/
        this.curser_3 = this.tabFile[this.i]
            .indexOf(' ', this.curser + 1);
        this.curser_4 = this.tabFile[this.i]
            .indexOf(' ', this.curser_3 + 1);
        this.playerHealed = this.tabFile[this.i]
            .substr(this.curser_3, this.curser_4 - this.curser_3).trim();//extraction du nom du joueur
        if (this.playerHealed
            .trim() === "himself" || this.playerHealed
            .trim() === "itself" || this.playerHealed
            .trim() === "herself") {
            this.playerHealed = this.playerHealer;
        } else if (this.playerHealed
            .trim()
            .toLowerCase() === "you") {
            this.playerHealed = CurrentPlayer;
        }
        return this.playerHealed;
    }

    getTypeOfHeal() {
        /**
         * here is 2nd step treatment return type of heal ... direct heal or heal over time
         * @param {i} index of line log
         * @param {tabFile}
         * @returns  {healType}
         **/
        this.curser_5 = this.tabFile[this.i]
            .indexOf('for', this.curser_4 + 1);
        this.curser_6 = this.tabFile[this.i]
            .indexOf(' ', this.curser_5 + 1);
        if (this.curser_5 > 60) { // trouver une meilleur "solution
            healType = this.tabFile[this.i]
                .substr(this.curser_4, this.curser_6 - this.curser_4)
                .trim();
        }//extraction du nom du joueur
        else {
            healType = this.tabFile[this.i]
                .substr(this.curser_5, this.curser_6 - this.curser_5)
                .trim();
        }////extraction du nom du joueur
        return healType;
    }

    getHealAmount() {
        /**
         * here is 2nd step treatment return heal amount
         * @param {i} index of line log
         * @param {tabFile}
         * @returns  {amountOfHeal}
         **/
        this.curser_7 = this.tabFile[this.i]
            .indexOf(' ', this.curser_6 + 1);
        let amountOfHeal = this.tabFile[this.i]
            .substr(this.curser_6, this.curser_7 - this.curser_6)
            .trim();//extraction du nom du joueur
        return parseInt(amountOfHeal);
    }

        getSpellHealAmount() {
        /**
         * here is 2nd step treatment return spell efficient healing
         * @param {i} index of line log
         * @param {tabFile}
         * @returns  {spellHealAmount}
         **/
        this.curser_8 = this.tabFile[this.i]
            .indexOf(' ', this.curser_7 + 1);
        let spellHealAmount = this.tabFile[this.i]
            .substr(this.curser_7, 2)
            .trim();//extraction du nom du joueur
        if (spellHealAmount !== null && spellHealAmount === "(") {
            spellHealAmount = this.tabFile[this.i]
                .substr(this.curser_7 + 2, this.curser_8 - 3 - this.curser_7)
                .trim()
        } else {
            spellHealAmount = 0;
        }
        return parseInt(spellHealAmount);
    }

    getSpellsUsed() {
        /**
         * here is 2nd step treatment return spell used
         * @param {i} index of line log
         * @param {tabFile}
         * @returns  {SpellsCasted}
         **/
        let SpellsCasted = "";
        this.curser_9 = this.tabFile[this.i]
            .indexOf('by', this.curser_8);

        if (this.curser_9 > 0 && this.curser_9 !== null) {
            this.curser_10 = this.tabFile[this.i]
                .indexOf(' ', this.curser_9);
            this.curser_11 = this.tabFile[this.i]
                .indexOf('.', this.curser_10);
            this.curser_12 = this.tabFile[this.i]
                .indexOf('.', this.curser_11 + 1);
            if (this.curser_12 !== -1) {

                SpellsCasted = this.tabFile[this.i]
                    .substr(this.curser_10, this.curser_12 - this.curser_10)
                    .trim();
            } else {
                SpellsCasted = this.tabFile[this.i]
                    .substr(this.curser_10, this.curser_11 - this.curser_10)
                    .trim();
            }
        } else {
            // if no spell used "NaS" meaning ... Not a Spell
            SpellsCasted = "NaS";
        }
        return SpellsCasted;
    }

    getCriticalHitMessage() {
        /**
         * here is 2nd step treatment return critical spell message also lucky and any end sentence between ()
         * @param {i} index of line log
         * @param {tabFile}
         * @returns  {messCrtHeal}
         **/
        let messCrtHeal = "";
        if (this.curser_10 !== null) {
            this.curser_13 = this.tabFile[this.i]
                .indexOf('(', this.curser_10);

            if (this.curser_13 !== null && this.curser_13 > 0) {
                this.curser_14 = this.tabFile[this.i]
                    .indexOf(')', this.curser_13);
                messCrtHeal = this.tabFile[this.i]
                    .substr(this.curser_13, this.curser_14 + 1 - this.curser_13)
                    .trim();
            } else {
                messCrtHeal = ""
            }
        }
        return messCrtHeal;
    }

    getLogTime() {
        /**
         * here is 2nd step treatment return log timer
         * @param {i} index of line log
         * @param {tabFile}
         * @returns  {Date(logtimer)}
         **/
        let logTimer = this.tabFile[this.i]
            .substr(this.tabFile[this.i]
                .indexOf('[') + 1
                , this.tabFile[this.i]
                .indexOf(']') - this.tabFile[this.i]
                .indexOf('[') - 1)
            .trim();
        return new Date(logTimer)
            .getTime();
    }
}
/**
 * catch et add listener to some html element here listener is a time selecter
 * @param {HTMLElement}
 **/
document.getElementById('radioInputChoice').step = 0.1;
document.getElementById('Choice1')
    .addEventListener('click', updateBtn);
document.getElementById('Choice2')
    .addEventListener('click', updateBtn);
document.getElementById('Choice3')
    .addEventListener('click', updateBtn);
document.getElementById('Choice4')
    .addEventListener('click', updateBtn);
document.getElementById('Choice5')
    .addEventListener('click', updateBtn);
document.getElementById('Choice6')
    .addEventListener('click', updateBtn);

function updateBtn() {
    /**
     * time choice on log treatment 1 hour ,
     * 6 hours, whole file, free setting time .. 7 days ... based on log date time ... not current time
     **/

    let timeToCheck = 0;
    let startCheck = 0;
    // getting time of last log file
    let lastentry = logHeal.length - 1;
    let logTimerLastEntry = logHeal[lastentry].logDate;
    // free setting check and other based on check button value
    if (this.value === "0" || this.value === 0) {
        timeToCheck = logHeal[0].logDate;
    } else if (this.id === 'Choice5') {
        let onChoice = parseFloat(document.getElementById('radioInputChoice').value);
        timeToCheck = logTimerLastEntry - (3600000 * onChoice);
    } else {
        timeToCheck = logTimerLastEntry - (3600000 * this.value);
    }
    // check to find 1st log to treat for next step treatment
    for (let j = 0; j < lastentry; j++) {  //loop through the array

        if (logHeal[j].logDate >= timeToCheck) {
            startCheck = j;
            break;
        }
    }
    // list of player sorted for next step treatment
    timeFilter = logHeal.slice(startCheck, lastentry + 1);
    let listOfPlayerHealed = [...new Set(timeFilter.map(x => x.healed))].sort();
    let listOfPlayersHealer = [...new Set(timeFilter.map(y => y.healer))].sort();
    //treatment call and both player list
    menuDropPlayers('healed', listOfPlayerHealed);
    menuDropPlayers('healer', listOfPlayersHealer);
}

function menuDropPlayers(players, playersList) {
    /**
     * create list choice from previous function updateBtn()
     * @param {listOfPlayerHealed}
     * @param {listOfPlayersHealer}
     * @returns  {HTMLElement} with listener addActivityItem() on change
     **/
    let dropdown = document.getElementById(players + '-dropdown');
    dropdown.length = 0;
    dropdown.innerText = "";
    let Option = document.createElement('option');
    Option.text = 'Players ' + players;
    dropdown.add(Option);
    dropdown.style.visibility = "visible";
    dropdown.selectedIndex = 0;
    dropdown.addEventListener("change", function () {
        addActivityItem(dropdown)
    }, false);
    // list of player
    for (let i = 0; i < playersList.length; i++) {
        if (!RegExp("`s").test(playersList[i])) {
            let option = document.createElement('option');
            option.text = playersList[i];
            option.value = playersList[i];
            dropdown.add(option);
        }

    }
}

function addActivityItem(element) {
    /**
     * here start front traitment this fonction does :
     * healer and healed traitment
     * put log traitment in page element
     * calculate healing for each player as healer and as healed also on the whole raid.. or from all healer...
     * split also those calcul in spell used
     * count log of heal receive .. doing it also by spell used
     * filter player's pet
     * @param {element}
     * @returns  {containerPlayer(spellUsed, playerTargetByHealer, total, total2, counter, counterSpell, counterSpellTotal, e)}
     **/
    text3 = 0;
    text6 = 0;
    let e = element;
    let mySet;
    let mySet2;
    let targed = e.options[e.selectedIndex].value;
    //check player selected from list used
    if (e.id === 'healer-dropdown') {
        mySet = timeFilter.filter(it => new RegExp(targed).test(it.healer));
        mySet2 = [...new Set(mySet.map(x => x.healed))];
    } else if (e.id === 'healed-dropdown') {
        mySet = timeFilter.filter(it => new RegExp(targed).test(it.healed));
        mySet2 = [...new Set(mySet.map(x => x.healer))];
    }
    text2 = targed;
    // cleat tab element on page
    document.getElementById('containertb2').innerText = "";
    document.getElementById('containertb3').innerText = "";
    document.getElementById('containertb4').innerText = "";
    document.getElementById('containertb5').innerText = "";
    document.getElementById('containertb7').innerText = "";
    document.getElementById('Tpl').innerText = "";
    let total = 0, total2 = 0, counter = 0, total3 = 0, total4 = 0, counterSpell = 0, counterSpellTotal = 0;
    let playerTargetByHealer = "";
    let spellUsed = "";

    mySet2.forEach(function (el) {//by player
        let mySet3;
        if (e.id === 'healer-dropdown') {
            mySet3 = mySet.filter(it => new RegExp(el).test(it.healed));
        } else if (e.id === 'healed-dropdown') {
            mySet3 = mySet.filter(it => new RegExp(el).test(it.healer));
        }
        let mySet4 = [...new Set(mySet3.map(x => x.spell))].sort();
        mySet4.forEach(function (elMnt) {//par spell
            let mySet5 = mySet3.filter(it => new RegExp(elMnt).test(it.spell));
            for (let i = 0; i < mySet5.length; i++) {
                total += mySet5[i].Heal;  //Do the math!
                text3 += mySet5[i].Heal;
                text6 += (mySet5[i].overheal - mySet5[i].Heal);
                total2 += mySet5[i].overheal;
                counterSpellTotal++;
                counterSpell++;
                spellUsed = elMnt;
            }
            playerTargetByHealer = el;
            if (!RegExp("`s").test(el)) {
                containerPlayer(spellUsed, playerTargetByHealer, total, total2, counter, counterSpell, "", e);
                total3 += total;
                total4 += total2;
            }
            counterSpell = 0;
            total = 0;
            total2 = 0;
        });
        playerTargetByHealer = el;
        if (!RegExp("`s").test(el)) {
            counter++;
            text1 = counter;
            containerPlayer("", playerTargetByHealer, total3, total4, counter, "", counterSpellTotal, e)
        }
        total3 = 0;
        total4 = 0;
        counterSpellTotal = 0;
    });
}

function containerPlayer(spellUsed, playerTargetByHealer, total, total2, counter, counterSpell, counterSpellTotal, e) {
    let div0 = document.createElement('div');
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');
    if (counter < 17) {
        let div10 = tagTb('tb2', playerTargetByHealer);
        if (spellUsed !== "")
            innerTab(div0, div10, div1, div2, div3, div4, 'tb2', playerTargetByHealer, spellUsed, total, total2, counter, counterSpell, "", e);
        else {
            innerTab(div0, div10, div1, div2, div3, div4, 'tb2', playerTargetByHealer, "", total, total2, counter, "", counterSpellTotal, e);
        }
    } else if (counter >= 17 && counter < 35) {
        let div10 = tagTb('tb3', playerTargetByHealer);
        if (spellUsed !== "")
            innerTab(div0, div10, div1, div2, div3, div4, 'tb3', playerTargetByHealer, spellUsed, total, total2, counter, counterSpell, "", e);
        else {
            innerTab(div0, div10, div1, div2, div3, div4, 'tb3', playerTargetByHealer, "", total, total2, counter, "", counterSpellTotal, e);
        }
    } else if (counter >= 35 && counter < 53) {
        let div10 = tagTb('tb4', playerTargetByHealer);
        if (spellUsed !== "")
            innerTab(div0, div10, div1, div2, div3, div4, 'tb4', playerTargetByHealer, spellUsed, total, total2, counter, counterSpell, "", e);
        else {
            innerTab(div0, div10, div1, div2, div3, div4, 'tb4', playerTargetByHealer, "", total, total2, counter, "", counterSpellTotal, e);
        }
    } else if (counter >= 53 && counter < 71) {
        let div10 = tagTb('tb5', playerTargetByHealer);
        if (spellUsed !== "")
            innerTab(div0, div10, div1, div2, div3, div4, 'tb5', playerTargetByHealer, spellUsed, total, total2, counter, counterSpell, "", e);
        else {
            innerTab(div0, div10, div1, div2, div3, div4, 'tb5', playerTargetByHealer, "", total, total2, counter, "", counterSpellTotal, e);
        }
    } else if (counter >= 71 && counter < 89) {
        let div10 = tagTb('tb7', playerTargetByHealer);
        if (spellUsed !== "")
            innerTab(div0, div10, div1, div2, div3, div4, 'tb7', playerTargetByHealer, spellUsed, total, total2, counter, counterSpell, "", e);
        else {
            innerTab(div0, div10, div1, div2, div3, div4, 'tb7', playerTargetByHealer, "", total, total2, counter, "", counterSpellTotal, e);
        }
    }
}

document.getElementById('tb2')
    .addEventListener('click', function (e) {
        openCity(e, 'containertb2')
    });
document.getElementById('tb3')
    .addEventListener('click', function (e) {
        openCity(e, 'containertb3')
    });
document.getElementById('tb4')
    .addEventListener('click', function (e) {
        openCity(e, 'containertb4')
    });
document.getElementById('tb5')
    .addEventListener('click', function (e) {
        openCity(e, 'containertb5')
    });
document.getElementById('tb7')
    .addEventListener('click', function (e) {
        openCity(e, 'containertb7')
    });

function openCity(e, Name) {
    let i, tabContent, tabLinks;
    tabContent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("tabLinks");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }
    document.getElementById(Name).style.display = "block";
    e.currentTarget.className += " active";
}

/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content
- This allows the user to have multiple dropdowns without any conflict */
function innerTab(div0, div10, div1, div2, div3, div4, tb, playerTargetByHealer, spellUsed, total, total2, counter, counterSpell, counterSpellTotal, e) {
    if (counterSpell !== "") {
        div1.innerText = spellUsed + " " + counterSpell;
        div1.style.backgroundColor = "#ffc8c8";
        div2.innerText = " Heal : " + total;
        div2.style.backgroundColor = "#ffbebe";
        if ((parseInt(total2)) > (parseInt(total))) {
            div3.innerText = " OverHeal : " + (parseInt(total2) - parseInt(total));
        }
        div3.style.backgroundColor = "#ffb4b4";
        div4.innerText = " HA : " + total2;
        div4.style.backgroundColor = "#ffaaaa";
        document.getElementById(playerTargetByHealer).appendChild(div0);
        div0.appendChild(div1);
        div0.appendChild(div2);
        div0.appendChild(div3);
        div0.appendChild(div4);
        div0.style.display = "none"
    } else {//if(test!==1)
        div1.innerText = playerTargetByHealer + " | heal received : " + counterSpellTotal;
        div1.style.backgroundColor = "#b4b4ff";
        div2.innerText = " Heal : " + total;
        div2.style.backgroundColor = "#bebeff";
        if ((parseInt(total2)) > (parseInt(total))) {
            div3.innerText = " OverHeal : " + (parseInt(total2) - parseInt(total));
        }
        div3.style.backgroundColor = "#c8c8ff";
        div4.innerText = " HA : " + total2;
        div4.style.backgroundColor = "#d2d2ff";
        document.getElementById(playerTargetByHealer).insertAdjacentElement("afterbegin", div0);
        div0.appendChild(div1);
        div0.appendChild(div2);
        div0.appendChild(div3);
        div0.appendChild(div4);
    }
    let text4 = new Intl.NumberFormat().format(text3);
    let text7 = new Intl.NumberFormat().format(text6);
    document.getElementById('Tpl').innerText = "THE PLAYER " + text2.toUpperCase() + " HEALED " + text1 + " PLAYERS FOR " + text4;

    if (e.id === 'healer-dropdown') {
        document.getElementById('Tpl').innerText = "THE PLAYER " + text2.toUpperCase() + " HEALED " + text1 + " PLAYERS FOR " + text4 + " OVERHEAL " + text7;
    } else if (e.id === 'healed-dropdown') {
        document.getElementById('Tpl').innerText = "THE PLAYER " + text2.toUpperCase() + " HAS BEEN HEALED BY " + text1 + " PLAYERS FOR " + text4 + " OVERHEAL " + text7;
    }
}

function tagTb(tb, playerTargetByHealer) {

    if (document.getElementById(playerTargetByHealer) == null) {
        let div10 = document.createElement('div');
        div10.id = playerTargetByHealer;
        div10.className = 'dropdown-btn';
        document.getElementById('container' + tb).appendChild(div10);
        div10.addEventListener('click', function (e) {
            e.preventDefault();
            for (let i = 0; i < this.children.length; i++) {
                DOMAnimations.slideToggle(this.children[i]);
            }
        });
    }

}

class DOMAnimations {
    /**
     * Masque un élément avec un effet de repli source du code https://www.grafikart.fr/tutoriels/slide-javascript-1016
     * @param {HTMLElement} element
     * @param {Number} duration
     * @returns {Promise<boolean>}
     **/
    static slideUp(element, duration = 500) {
        return new Promise(function (resolve, reject) {
            element.style.height = element.offsetHeight + 'px';
            element.style.transitionProperty = `height, margin, padding`;
            element.style.transitionDuration = duration + 'ms';
            element.offsetHeight;// eslint-disable-line no-unused-expressions
            element.style.overflow = 'hidden';
            element.style.height = 0;
            element.style.paddingTop = 0;
            element.style.paddingBottom = 0;
            element.style.marginTop = 0;
            element.style.marginBottom = 0;
            window.setTimeout(function () {
                element.style.display = 'none';
                element.style.removeProperty('height');
                element.style.removeProperty('padding-top');
                element.style.removeProperty('padding-bottom');
                element.style.removeProperty('margin-top');
                element.style.removeProperty('margin-bottom');
                element.style.removeProperty('overflow');
                element.style.removeProperty('transition-duration');
                element.style.removeProperty('transition-property');
                resolve(false)
            }, duration)
        })
    }

    /**
     * Affiche un élément avec un effet de dépliement
     * @param {HTMLElement} element
     * @param {Number} duration
     * @returns {Promise<boolean>}
     **/
    static slideDown(element, duration = 500) {
        return new Promise(function (resolve, reject) {
            element.style.removeProperty('display');
            let display = window.getComputedStyle(element).display;
            if (display === 'none') display = 'block';
            element.style.display = display;
            let height = element.offsetHeight;
            element.style.overflow = 'hidden';
            element.style.height = 0;
            element.style.paddingTop = 0;
            element.style.paddingBottom = 0;
            element.style.marginTop = 0;
            element.style.marginBottom = 0;
            element.offsetHeight;// eslint-disable-line no-unused-expressions
            element.style.transitionProperty = `height, margin, padding`;
            element.style.transitionDuration = duration + 'ms';
            element.style.height = height + 'px';
            element.style.removeProperty('padding-top');
            element.style.removeProperty('padding-bottom');
            element.style.removeProperty('margin-top');
            element.style.removeProperty('margin-bottom');
            window.setTimeout(function () {
                element.style.removeProperty('height');
                element.style.removeProperty('overflow');
                element.style.removeProperty('transition-duration');
                element.style.removeProperty('transition-property');
            }, duration)
        })
    }

    /**
     * Affiche ou Masque un élément avec un effet de repli
     * @param {HTMLElement} element
     * @param {Number} duration
     * @returns {Promise<boolean>}
     **/
    static slideToggle(element, duration = 500) {
        if (window.getComputedStyle(element).display === 'none') {
            return this.slideDown(element, duration)
        } else {
            return this.slideUp(element, duration)
        }
    }
}

/*to do clear memory ... on load another file .. or adding it...
 *TODO: copy to clip board
 *TODO:  list of mob for timer select
 *TODO:  compilation mob for timer select
 *TODO:  "asynchrone fonction" reading new log entries...
 *TODO:  mass player upload
 *TODO:  add loading file option
 */

/*

 !!!!!!! Tabs,pills, dropdown ... asynchrone utiliser des cookies pour eviter d additioner 2 fois le meme fichier... !!!!!
 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!https://www.w3schools.com/howto/howto_js_tabs.asp
 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

 !!!!!!! stream et map a voir !!!!!
 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

*/
