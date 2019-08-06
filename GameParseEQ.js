let CurrentPlayer;
let HealType = "";
let files;
let tabFile;
let logHeal = [];
let timeFilter = [];
let text1, text2, text3 = 0, text6 = 0;
let dropper = document.querySelector('#dropper');
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
                    "healer": logHealed.PlayerHealer(),
                    "healed": logHealed.TargedHealed()
                    ,
                    "type": logHealed.TypeOfHeal(),
                    "Heal": logHealed.HealAmount(),
                    "overheal": logHealed.OverHeal()
                    ,
                    'spell': logHealed.SpellsUsed(),
                    "crit": logHealed.CriticalHitMessage(),
                    "logDate": logHealed.Logtime()
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

    PlayerHealer() {
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

    TargedHealed() {
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

    TypeOfHeal() {
        this.curser_5 = this.tabFile[this.i]
            .indexOf('for', this.curser_4 + 1);
        this.curser_6 = this.tabFile[this.i]
            .indexOf(' ', this.curser_5 + 1);
        if (this.curser_5 > 60) { // trouver une meilleur "solution
            HealType = this.tabFile[this.i]
                .substr(this.curser_4, this.curser_6 - this.curser_4)
                .trim();
        }//extraction du nom du joueur
        else {
            HealType = this.tabFile[this.i]
                .substr(this.curser_5, this.curser_6 - this.curser_5)
                .trim();
        }////extraction du nom du joueur
        return HealType;
    }

    HealAmount() {
        this.curser_7 = this.tabFile[this.i]
            .indexOf(' ', this.curser_6 + 1);
        let HealOfHeal = this.tabFile[this.i]
            .substr(this.curser_6, this.curser_7 - this.curser_6)
            .trim();//extraction du nom du joueur
        return parseInt(HealOfHeal);
    }

    OverHeal() {
        this.curser_8 = this.tabFile[this.i]
            .indexOf(' ', this.curser_7 + 1);
        let OverHealAmount = this.tabFile[this.i]
            .substr(this.curser_7, 2)
            .trim();//extraction du nom du joueur
        if (OverHealAmount !== null && OverHealAmount === "(") {
            OverHealAmount = this.tabFile[this.i]
                .substr(this.curser_7 + 2, this.curser_8 - 3 - this.curser_7)
                .trim()
        } else {
            OverHealAmount = 0;
        }
        return parseInt(OverHealAmount);
    }

    SpellsUsed() {
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
            SpellsCasted = "NaS";
        }
        return SpellsCasted;
    }

    CriticalHitMessage() {
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

    Logtime() {
        let logtimer = this.tabFile[this.i]
            .substr(this.tabFile[this.i]
                .indexOf('[') + 1
                , this.tabFile[this.i]
                .indexOf(']') - this.tabFile[this.i]
                .indexOf('[') - 1)
            .trim();
        return new Date(logtimer)
            .getTime();
    }
}

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
    //>>>>> reduction de la taille du tableau en fonction d'un temp a choisir ... derniere heure.. derniere 6 heure... fichier "entier ... etc....
    let timeToCheck = 0;
    let startCheck = 0;
    let lastentry = logHeal.length - 1;
    let logTimerLastEntry = logHeal[lastentry].logDate;
    if (this.value === "0" || this.value === 0) {
        timeToCheck = logHeal[0].logDate;
    } else if (this.id === 'Choice5') {
        let onChoice = parseFloat(document.getElementById('radioInputChoice').value);
        timeToCheck = logTimerLastEntry - (3600000 * onChoice);
    } else {
        //let test =;
        timeToCheck = logTimerLastEntry - (3600000 * this.value);
    }

    for (let j = 0; j < lastentry; j++) {  //loop through the array

        if (logHeal[j].logDate >= timeToCheck) {
            startCheck = j;
            break;
        }
    }
    timeFilter = logHeal.slice(startCheck, lastentry + 1);
    let listOfPlayerhealed = [...new Set(timeFilter.map(x => x.healed))].sort();
    let listOfPlayershealer = [...new Set(timeFilter.map(y => y.healer))].sort();
    menudropplayers('healed', listOfPlayerhealed);
    menudropplayers('healer', listOfPlayershealer);
}

function menudropplayers(players, playersList) {
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
    text3 = 0;
    text6 = 0;
    let e = element;
    let mySet;
    let mySet2;
    let targed = e.options[e.selectedIndex].value;
    if (e.id === 'healer-dropdown') {
        mySet = timeFilter.filter(it => new RegExp(targed).test(it.healer));
        mySet2 = [...new Set(mySet.map(x => x.healed))].sort();
    } else if (e.id === 'healed-dropdown') {
        mySet = timeFilter.filter(it => new RegExp(targed).test(it.healed));
        mySet2 = [...new Set(mySet.map(x => x.healer))].sort();
    }
    text2 = targed;
    document.getElementById('containertb2').innerText = "";
    document.getElementById('containertb3').innerText = "";
    document.getElementById('containertb4').innerText = "";
    document.getElementById('containertb5').innerText = "";
    document.getElementById('containertb7').innerText = "";
    document.getElementById('Tpl').innerText = "";
    let total = 0, total2 = 0, counter = 0, total3 = 0, total4 = 0, counterSpell = 0, counterspelltotal = 0;
    let playerTargetByHealer = "";
    let spellUsed = "";
    mySet2.forEach(function (el) {//par joueur
        let mySet3;
        if (e.id === 'healer-dropdown') {
            mySet3 = mySet.filter(it => new RegExp(el).test(it.healed));
        } else if (e.id === 'healed-dropdown') {
            mySet3 = mySet.filter(it => new RegExp(el).test(it.healer));
        }
        let mySet4 = [...new Set(mySet3.map(x => x.spell))].sort();
        mySet4.forEach(function (elmnt) {//par spell
            let mySet5 = mySet3.filter(it => new RegExp(elmnt).test(it.spell));
            for (let i = 0; i < mySet5.length; i++) {
                total += mySet5[i].Heal;  //Do the math!
                text3 += mySet5[i].Heal;
                text6 += (mySet5[i].overheal - mySet5[i].Heal);
                total2 += mySet5[i].overheal;
                counterspelltotal++;
                counterSpell++;
                spellUsed = elmnt;
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
            containerPlayer("", playerTargetByHealer, total3, total4, counter, "", counterspelltotal, e)
        }
        total3 = 0;
        total4 = 0;
        counterspelltotal = 0;
    });
}

function containerPlayer(spellUsed, playerTargetByHealer, total, total2, counter, counterSpell, counterspelltotal, e) {
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
            innerTab(div0, div10, div1, div2, div3, div4, 'tb2', playerTargetByHealer, "", total, total2, counter, "", counterspelltotal, e);
        }
    } else if (counter >= 17 && counter < 35) {
        let div10 = tagTb('tb3', playerTargetByHealer);
        if (spellUsed !== "")
            innerTab(div0, div10, div1, div2, div3, div4, 'tb3', playerTargetByHealer, spellUsed, total, total2, counter, counterSpell, "", e);
        else {
            innerTab(div0, div10, div1, div2, div3, div4, 'tb3', playerTargetByHealer, "", total, total2, counter, "", counterspelltotal, e);
        }
    } else if (counter >= 35 && counter < 53) {
        let div10 = tagTb('tb4', playerTargetByHealer);
        if (spellUsed !== "")
            innerTab(div0, div10, div1, div2, div3, div4, 'tb4', playerTargetByHealer, spellUsed, total, total2, counter, counterSpell, "", e);
        else {
            innerTab(div0, div10, div1, div2, div3, div4, 'tb4', playerTargetByHealer, "", total, total2, counter, "", counterspelltotal, e);
        }
    } else if (counter >= 53 && counter < 71) {
        let div10 = tagTb('tb5', playerTargetByHealer);
        if (spellUsed !== "")
            innerTab(div0, div10, div1, div2, div3, div4, 'tb5', playerTargetByHealer, spellUsed, total, total2, counter, counterSpell, "", e);
        else {
            innerTab(div0, div10, div1, div2, div3, div4, 'tb5', playerTargetByHealer, "", total, total2, counter, "", counterspelltotal, e);
        }
    } else if (counter >= 71 && counter < 89) {
        let div10 = tagTb('tb7', playerTargetByHealer);
        if (spellUsed !== "")
            innerTab(div0, div10, div1, div2, div3, div4, 'tb7', playerTargetByHealer, spellUsed, total, total2, counter, counterSpell, "", e);
        else {
            innerTab(div0, div10, div1, div2, div3, div4, 'tb7', playerTargetByHealer, "", total, total2, counter, "", counterspelltotal, e);
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
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(Name).style.display = "block";
    e.currentTarget.className += " active";
}

/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content
- This allows the user to have multiple dropdowns without any conflict */
function innerTab(div0, div10, div1, div2, div3, div4, tb, playerTargetByHealer, spellUsed, total, total2, counter, counterSpell, counterspelltotal, e) {
    if (counterSpell !== "") {
        div1.innerText = spellUsed + " " + counterSpell;
        div1.style.backgroundColor = "#ffc8c8";
        div2.innerText = " Heal : " + total;
        div2.style.backgroundColor = "#ffbebe";
        if ((parseInt(total2)) > (parseInt(total))) {
            div3.innerText = " Overheal : " + (parseInt(total2) - parseInt(total));
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
        div1.innerText = playerTargetByHealer + " | heal received : " + counterspelltotal;
        div1.style.backgroundColor = "#b4b4ff";
        div2.innerText = " Heal : " + total;
        div2.style.backgroundColor = "#bebeff";
        if ((parseInt(total2)) > (parseInt(total))) {
            div3.innerText = " Overheal : " + (parseInt(total2) - parseInt(total));
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
        div10 = document.createElement('div');
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
