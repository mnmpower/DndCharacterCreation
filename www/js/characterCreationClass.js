var creation = function () {

    // Declareren
    var races;
    var classes;

    var classNames;
    var raceNames;

    var melee=[];
    var specialist=[];
    var spellcaster=[];

    var selectedStyle;
    var selectedRace="Human";
    var selectedClass="Barbarian";
    var selectedAlignment="Lawful good";
    var firstName;
    var lastName;
    var sex;
    var qr;

    var availablePoints;
    var strPunten;
    var dexPunten;
    var conPunten;
    var intPunten;
    var wisPunten;
    var chaPunten;
    var strteller = 0;
    var dexteller = 0;
    var conteller = 0;
    var intteller = 0;
    var wisteller = 0;
    var chateller = 0;

    var alignmentNames = [
        "Lawful good","Neutral good", "Chaotic good",
        "Lawful neutral","Neutral", "Chaotic neutral",
        "Lawful evil","Neutral evil", "Chaotic evil"
    ];
    var alignmentContents =[
        "creatures can be counted on to do the right thing as expected by society. Gold dragons, paladins, and most dwarves are lawful good.",
        "folk do the best they can to help others according to their needs. Many celestials, some cloud giants, and most gnomes are neutral good.",
        "creatures act as their conscience directs, with little regard for what others expect. Copper dragons, many elves, and unicorns are chaotic good.",
        "individuals act in accordance with law, tradition, or personal codes. Many monks and some wizards are lawful neutral.",
        "is the alignment of those who prefer to steer clear of moral questions and don’t take sides, doing what seems best at the time. Lizardfolk, most druids, and many humans are neutral.",
        "creatures follow their whims, holding their personal freedom above all else. Many barbarians and rogues, and some bards, are chaotic neutral.",
        "creatures methodically take what they want, within the limits of a code of tradition, loyalty, or order. Devils, blue dragons, and hobgoblins are lawful evil.",
        "is the alignment of those who do whatever they can get away with, without compassion or qualms. Many drow, some cloud giants, and goblins are neutral evil.",
        "creatures act with arbitrary violence, spurred by their greed, hatred, or bloodlust. Demons, red dragons, and orcs are chaotic evil."
    ];


    // Initialiseer de pagina
    var init = function () {
        _updateGekozenRace(selectedRace);
        _updateGekozenClass(selectedClass);
        availablePoints = _getPointsAvailableOnLoad();
        strPunten = _getStatTotalPointsOnLoad('str');
        dexPunten = _getStatTotalPointsOnLoad('dex');
        conPunten = _getStatTotalPointsOnLoad('con');
        intPunten = _getStatTotalPointsOnLoad('int');
        wisPunten = _getStatTotalPointsOnLoad('wis');
        chaPunten = _getStatTotalPointsOnLoad('cha');
    };

    // Haal de mogelijke Races op uit de externe opslag
    var leesRacesIn = function () {

        // Locatie externe opslag
        var url = 'http://r0672905.sinners.be/DndCharacterCreation/races.json';

        // Haal de Races op
        $.getJSON(url, function (data) {
            races = data;
        }).done( function () {
            raceNames = Object.keys(races);

            var resultaat="<div class=\"col s12\">\n<ul class=\"tabs\">\n";
            var i;


            for (i = 1; i < raceNames.length; i++) {

                resultaat+="<li class=\"tab\"><a href=\"#race"+i+"uitleg\" id=\"race"+i+"\" class='race'>"+raceNames[i]+"</a></li>\n";

            }

            resultaat+="</ul></div>";

            for (i = 1; i < raceNames.length; i++) {

                resultaat+="<div id=\"race"+i+"uitleg\" class=\"col s12\">";

                for (var j = 1; j < races[raceNames[i]][raceNames[i]+" Traits"]["content"].length; j++) {
                    var content = races[raceNames[i]][raceNames[i]+" Traits"].content[j];

                    if (typeof content === "string"){
                        if (content.includes('*') === true){
                            var title1 = content.replace("***","<h2>");
                            var title2 = title1.replace("***","</h2><p class='justify-text'>");
                            var title3 = title2.replace(".","");

                            // console.log(content3);
                            resultaat+= title3+"</p>";
                        }
                    }else if (typeof content === "object" && content["table"]["**Dragon**"] != null) {

                        // console.log(Object.keys(content.table));

                        var dragonTableKeys =Object.keys(content.table);
                        var table ="<table>";
                        for (var k = 0; k < dragonTableKeys[0].length; k++){
                            table += "<tr><td>"+content["table"][dragonTableKeys[0]][k]+"</td>";
                            table += "<td>"+content["table"][dragonTableKeys[1]][k]+"</td>";
                            table += "<td>"+content["table"][dragonTableKeys[2]][k]+"</td></tr>";
                        }
                        table +="</table>";
                        resultaat+=table;
                    }
                }
                resultaat+="</div>\n\n";
            }



            resultaat+="</div>";
            $('div.tabsRacesAfdrukken').html(resultaat);

            let el = $('.tabs');
            let instanceTabs = M.Tabs.init(el, {});

            $('a.race').click(function () {
                selectedRace = $(this).text();
                _updateGekozenRace(selectedRace);


            });

        });
    };

    // Haal de mogelijke Classes op uit de externe opslag
    var leesClassesIn = function () {

        // Locatie externe opslag
        var url = 'http://r0672905.sinners.be/DndCharacterCreation/classes.json';

        // Haal de Classes op
        $.getJSON(url, function (data) {
            classes = data;
        }).done( function () {
            classNames = Object.keys(classes);

            for ( var i = 0; i < classNames.length; i++) {

                var fightingstyle = classes[classNames[i]]["ClassFeatures"]["FightingStyle"];

                if (fightingstyle =="Melee"){
                    melee.push(classNames[i]);
                } else if (fightingstyle =="Specialist") {
                    specialist.push(classNames[i]);
                } else if (fightingstyle =="Spellcaster") {
                    spellcaster.push(classNames[i]);
                }
            }
        });
    };

    // Bepaal welke Classes getoond worden naargelang de Fighting Style
    var plaatsClassTabs = function () {
        $('a.selectFightingStyle').click(function () {
            selectedStyle = $(this).text();
            var tabstitles = [];

            // Nakijken welke tab geklikt is + jusite date doorgeven
            switch (selectedStyle) {
                case "Specialist":
                    tabstitles = specialist;
                    break;

                case "Spellcaster":
                    tabstitles = spellcaster;
                    break;

                default:
                    tabstitles = melee;
                    break;
            }

            var resultaat="<div class=\"col s12\">\n<ul class=\"tabs\">\n";

            for (var i = 0; i < tabstitles.length; i++) {

                resultaat+="<li class=\"tab\"><a href=\"#class"+(i+1)+"uitleg\" id=\"class"+(i+1)+"\" class='class'>"+tabstitles[i]+"</a></li>\n";

            }

            resultaat+="</ul></div>";

            for (var i = 0; i < tabstitles.length; i++) {

                resultaat+="<p id=\"class"+(i+1)+"uitleg\" class=\"col s12 justify-text\">"+classes[tabstitles[i]]["ClassFeatures"]["Class Description"]+"</p>\n\n";
            }
            resultaat+="</div>";

            $('div.tabsClassesAfdrukken').html(resultaat);

            let el = $('.tabs');
            let instanceTabs = M.Tabs.init(el, {});

            $('a.class').click(function () {
                selectedClass = $(this).text();
                _updateGekozenClass(selectedClass);
            });
        });
    };

    // Pas gegvens aan naargelang de Race
    var _updateGekozenRace = function (selectedRace) {
        $('#gekozenRace').html("Race: "+selectedRace);
        updateRacialStatPoints(selectedRace);
    };

    // Pas gegevens aan naargelang de Class
    var _updateGekozenClass = function (selectedClass) {
        $('#gekozenClass').html("Class: "+selectedClass);
    };

    // Laat een blok verdwijnen
    var hide = function (selector) {
        $(selector).hide();
    };

    // Toont een blok
    var show = function (selector) {
        $(selector).show();
    };

    // Pas de stat aan en houd rekening met het maximum
    var statOmhoog = function (stat) {
        var statPointCost = _getPointCost(stat);
        var statTotal;
        var statTeller;

        switch (stat) {
            case 'str':
                statTotal = strPunten;
                statTeller = strteller;
                break;
            case 'dex':
                statTotal = dexPunten;
                statTeller = dexteller;
                break;
            case 'con':
                statTotal = conPunten;
                statTeller = conteller;
                break;
            case 'int':
                statTotal = intPunten;
                statTeller = intteller;
                break;
            case 'wis':
                statTotal = wisPunten;
                statTeller = wisteller;
                break;
            case 'cha':
                statTotal = chaPunten;
                statTeller = chateller;
                break;
        }

        if (availablePoints >= statPointCost && statTeller < 10){
            availablePoints -= statPointCost;
            switch (stat) {
                case 'str':
                    strPunten++;
                    strteller++;
                    statTotal = strPunten;
                    break;
                case 'dex':
                    dexPunten++;
                    dexteller++;
                    statTotal = dexPunten;
                    break;
                case 'con':
                    conPunten++;
                    conteller++;
                    statTotal = conPunten;
                    break;
                case 'int':
                    intPunten++;
                    intteller++;
                    statTotal = intPunten;
                    break;
                case 'wis':
                    wisPunten++;
                    wisteller++;
                    statTotal = wisPunten;
                    break;
                case 'cha':
                    chaPunten++;
                    chateller++;
                    statTotal = chaPunten;
                    break;
            }

            statPointCost = _getPointCost(stat);

            _setPointsAvailableInHtml(availablePoints);
            _setStatTotalPointsInHtml(stat,statTotal);
            _setModifierInHtml(stat);
            _setPointCostInHtml(stat,statPointCost);
        }
    };

    // Pas de stat aan en houd rekening met het minimum
    var statOmlaag = function (stat) {
        var statPointRefund = _getPointRefund(stat);
        var statTotal;
        var statTeller;

        switch (stat) {
            case 'str':
                statTotal = strPunten;
                statTeller = strteller;
                break;
            case 'dex':
                statTotal = dexPunten;
                statTeller = dexteller;
                break;
            case 'con':
                statTotal = conPunten;
                statTeller = conteller;
                break;
            case 'int':
                statTotal = intPunten;
                statTeller = intteller;
                break;
            case 'wis':
                statTotal = wisPunten;
                statTeller = wisteller;
                break;
            case 'cha':
                statTotal = chaPunten;
                statTeller = chateller;
                break;
        }

        if (availablePoints+statPointRefund <= 32 && statTeller > 0){
            availablePoints += statPointRefund;
            switch (stat) {
                case 'str':
                    strPunten--;
                    strteller--;
                    statTotal = strPunten;
                    break;
                case 'dex':
                    dexPunten--;
                    dexteller--;
                    statTotal = dexPunten;
                    break;
                case 'con':
                    conPunten--;
                    conteller--;
                    statTotal = conPunten;
                    break;
                case 'int':
                    intPunten--;
                    intteller--;
                    statTotal = intPunten;
                    break;
                case 'wis':
                    wisPunten--;
                    wisteller--;
                    statTotal = wisPunten;
                    break;
                case 'cha':
                    chaPunten--;
                    chateller--;
                    statTotal = chaPunten;
                    break;
            }

            var statPointCost = _getPointCost(stat);

            _setPointsAvailableInHtml(availablePoints);
            _setStatTotalPointsInHtml(stat,statTotal);
            _setModifierInHtml(stat);
            _setPointCostInHtml(stat,statPointCost);
        }
    };

    // Toont de modifier van de stat
    var _setModifierInHtml = function (stat) {
        var modifier;
        switch (stat) {
            case 'str':
                modifier = Math.floor((strPunten-10)/2);
                break;
            case 'dex':
                modifier = Math.floor((dexPunten-10)/2);
                break;
            case 'con':
                modifier = Math.floor((conPunten-10)/2);
                break;
            case 'int':
                modifier = Math.floor((intPunten-10)/2);
                break;
            case 'wis':
                modifier = Math.floor((wisPunten-10)/2);
                break;
            case 'cha':
                modifier = Math.floor((chaPunten-10)/2);
                break;
        }

        $('#'+stat+'4').text(modifier);

        console.log('modifier',modifier);
    };

    var _getStatTotalPointsOnLoad = function (stat) {
        var statTotal = $('#'+stat+'Total').text();
        console.log(stat, statTotal);
        return statTotal;
    };

    var _getPointCost = function (stat) {
        var statpuntenteller;
        var cost = 0;

        switch (stat) {
            case 'str':
                statpuntenteller = strteller;
                break;
            case 'dex':
                statpuntenteller = dexteller;
                break;
            case 'con':
                statpuntenteller = conteller;
                break;
            case 'int':
                statpuntenteller = intteller;
                break;
            case 'wis':
                statpuntenteller = wisteller;
                break;
            case 'cha':
                statpuntenteller = chateller;
                break;
        }
        console.log('spt:', statpuntenteller);

        switch (true) {
            case (statpuntenteller < 6):
                cost = 1;
                break;
            case (statpuntenteller < 8):
                cost = 2;
                break;
            case (statpuntenteller < 11):
                cost = 3;
                break;

        }
        console.log('cost:',cost);
        return cost;
    };

    var _getPointRefund = function (stat) {
        var statpuntenteller;
        var refund = 0;

        switch (stat) {
            case 'str':
                statpuntenteller = strteller;
                break;
            case 'dex':
                statpuntenteller = dexteller;
                break;
            case 'con':
                statpuntenteller = conteller;
                break;
            case 'int':
                statpuntenteller = intteller;
                break;
            case 'wis':
                statpuntenteller = wisteller;
                break;
            case 'cha':
                statpuntenteller = chateller;
                break;
        }
        console.log('spt:', statpuntenteller);

        switch (true) {
            case (statpuntenteller < 7):
                refund = 1;
                break;
            case (statpuntenteller < 9):
                refund = 2;
                break;
            case (statpuntenteller < 12):
                refund = 3;
                break;

        }
        console.log('refund:',refund);
        return refund;
    };

    var _setPointCostInHtml = function (stat,cost) {
        $('#'+stat+'3').text(cost);
    };

    var _setStatTotalPointsInHtml = function (stat,totalStatPoints) {
        $('#'+stat+'Total').text(totalStatPoints);
        console.log('totalStatPoints set to: ',totalStatPoints);
    };

    var _getPointsAvailableOnLoad = function () {
        var availablePoints = $('#pointsAvailable').text();
        console.log('availablePoints',availablePoints);
        return availablePoints;
    };

    var _setPointsAvailableInHtml = function (pointsAvailable) {
        $('#pointsAvailable').text(pointsAvailable);
        console.log('pointsAvailable set to: ',pointsAvailable);
    };

    var updateRacialStatPoints = function (selectedRace) {
        console.log(selectedRace);
        switch (selectedRace) {
            case 'Human':
                strPunten = 9;
                dexPunten = 9;
                conPunten = 9;
                intPunten = 9;
                wisPunten = 9;
                chaPunten = 9;
                _setStatTotalPointsInHtml('str',strPunten);
                _setStatTotalPointsInHtml('dex',dexPunten);
                _setStatTotalPointsInHtml('con',conPunten);
                _setStatTotalPointsInHtml('int',intPunten);
                _setStatTotalPointsInHtml('wis',wisPunten);
                _setStatTotalPointsInHtml('cha',chaPunten);
                break;
            case 'Dwarf':
                strPunten = 8;
                dexPunten = 8;
                conPunten = 10;
                intPunten = 8;
                wisPunten = 8;
                chaPunten = 8;
                _setStatTotalPointsInHtml('str',strPunten);
                _setStatTotalPointsInHtml('dex',dexPunten);
                _setStatTotalPointsInHtml('con',conPunten);
                _setStatTotalPointsInHtml('int',intPunten);
                _setStatTotalPointsInHtml('wis',wisPunten);
                _setStatTotalPointsInHtml('cha',chaPunten);
                break;
            case 'Elf':
                strPunten = 8;
                dexPunten = 10;
                conPunten = 8;
                intPunten = 8;
                wisPunten = 8;
                chaPunten = 8;
                _setStatTotalPointsInHtml('str',strPunten);
                _setStatTotalPointsInHtml('dex',dexPunten);
                _setStatTotalPointsInHtml('con',conPunten);
                _setStatTotalPointsInHtml('int',intPunten);
                _setStatTotalPointsInHtml('wis',wisPunten);
                _setStatTotalPointsInHtml('cha',chaPunten);
                break;
            case 'Halfling':
                strPunten = 8;
                dexPunten = 10;
                conPunten = 8;
                intPunten = 8;
                wisPunten = 8;
                chaPunten = 8;
                _setStatTotalPointsInHtml('str',strPunten);
                _setStatTotalPointsInHtml('dex',dexPunten);
                _setStatTotalPointsInHtml('con',conPunten);
                _setStatTotalPointsInHtml('int',intPunten);
                _setStatTotalPointsInHtml('wis',wisPunten);
                _setStatTotalPointsInHtml('cha',chaPunten);
                break;
            case 'Dragonborn':
                strPunten = 10;
                dexPunten = 8;
                conPunten = 8;
                intPunten = 8;
                wisPunten = 8;
                chaPunten = 9;
                _setStatTotalPointsInHtml('str',strPunten);
                _setStatTotalPointsInHtml('dex',dexPunten);
                _setStatTotalPointsInHtml('con',conPunten);
                _setStatTotalPointsInHtml('int',intPunten);
                _setStatTotalPointsInHtml('wis',wisPunten);
                _setStatTotalPointsInHtml('cha',chaPunten);
                break;
            case 'Gnome':
                strPunten = 8;
                dexPunten = 8;
                conPunten = 8;
                intPunten = 10;
                wisPunten = 8;
                chaPunten = 9;
                _setStatTotalPointsInHtml('str',strPunten);
                _setStatTotalPointsInHtml('dex',dexPunten);
                _setStatTotalPointsInHtml('con',conPunten);
                _setStatTotalPointsInHtml('int',intPunten);
                _setStatTotalPointsInHtml('wis',wisPunten);
                _setStatTotalPointsInHtml('cha',chaPunten);
                break;
            case 'Half-Elf'://BIJWERKENI888888
                strPunten = 8;
                dexPunten = 8;
                conPunten = 8;
                intPunten = 8;
                wisPunten = 8;
                chaPunten = 10;
                _setStatTotalPointsInHtml('str',strPunten);
                _setStatTotalPointsInHtml('dex',dexPunten);
                _setStatTotalPointsInHtml('con',conPunten);
                _setStatTotalPointsInHtml('int',intPunten);
                _setStatTotalPointsInHtml('wis',wisPunten);
                _setStatTotalPointsInHtml('cha',chaPunten);
                break;
            case 'Half-Orc':
                strPunten = 10;
                dexPunten = 8;
                conPunten = 9;
                intPunten = 8;
                wisPunten = 8;
                chaPunten = 8;
                _setStatTotalPointsInHtml('str',strPunten);
                _setStatTotalPointsInHtml('dex',dexPunten);
                _setStatTotalPointsInHtml('con',conPunten);
                _setStatTotalPointsInHtml('int',intPunten);
                _setStatTotalPointsInHtml('wis',wisPunten);
                _setStatTotalPointsInHtml('cha',chaPunten);
                break;
            case 'Tiefling':
                strPunten = 8;
                dexPunten = 8;
                conPunten = 8;
                intPunten = 9;
                wisPunten = 8;
                chaPunten = 10;
                _setStatTotalPointsInHtml('str',strPunten);
                _setStatTotalPointsInHtml('dex',dexPunten);
                _setStatTotalPointsInHtml('con',conPunten);
                _setStatTotalPointsInHtml('int',intPunten);
                _setStatTotalPointsInHtml('wis',wisPunten);
                _setStatTotalPointsInHtml('cha',chaPunten);
                break;
        }

        _setModifierInHtml('str');
        _setModifierInHtml('dex');
        _setModifierInHtml('con');
        _setModifierInHtml('int');
        _setModifierInHtml('wis');
        _setModifierInHtml('cha');
    };

    var vulAlignmentDropdown = function () {
        var resultaat ="";


        alignmentNames.forEach(function(alignmentName){
           resultaat += "<option value='" + alignmentName + "'>"+ alignmentName +"</option>";
        });

        $('#alignmentDropDown').html(resultaat);
    };

    var setAlignmentContent = function (alignmentName) {
        var resultaat="";
        selectedAlignment = alignmentName;
        switch (alignmentName) {
            case "Lawful good":
                resultaat = alignmentContents[0];
                break;
            case "Neutral good":
                resultaat = alignmentContents[1];
                break;
            case "Chaotic good":
                resultaat = alignmentContents[2];
                break;
            case "Lawful neutral":
                resultaat = alignmentContents[3];
                break;
            case "Neutral":
                resultaat = alignmentContents[4];
                break;
            case "Chaotic neutral":
                resultaat = alignmentContents[5];
                break;
            case "Lawful evil":
                resultaat = alignmentContents[6];
                break;
            case "Neutral evil":
                resultaat = alignmentContents[7];
                break;
            case "Chaotic evil":
                resultaat = alignmentContents[8];
                break;

        }

        $("#alignmentContent").html(resultaat);
    };

    var checkPointsAvailible = function () {
        if (availablePoints == 0){
            return true
        } else {
            return false
        }
    };

    var slaagLaatsteGegevensOp = function (naam, achternaam, alignment, geslacht) {
        firstName = naam;
        lastName = achternaam;
        selectedAlignment = alignment;
        sex = geslacht;
        qr = firstName+lastName+sex;
    };

    var _maakCharacterJSON = function () {
        return {
            qr: qr,
            firstName: firstName,
            lastName: lastName,
            sex: sex,
            alignment: selectedAlignment,
            race: selectedRace,
            class: selectedClass,
            stats: {
                strength: strPunten,
                dexterity: dexPunten,
                constitution: conPunten,
                intelligence: intPunten,
                wisdom: wisPunten,
                charisma: chaPunten
            }
        }
    };

    var saveCharacter = function () {
        var character = _maakCharacterJSON();
        local.saveCharacter(character);
    };

    return {
        init: init,
        leesRacesIn: leesRacesIn,
        leesClassesIn: leesClassesIn,
        plaatsClassTabs: plaatsClassTabs,
        show: show,
        hide: hide,
        statOmhoog: statOmhoog,
        statOmlaag: statOmlaag,
        updateRacialStatPoints: updateRacialStatPoints,
        vulAlignmentDropdown: vulAlignmentDropdown,
        setAlignmentContent: setAlignmentContent,
        checkPointsAvailible: checkPointsAvailible,
        slaagLaatsteGegevensOp: slaagLaatsteGegevensOp,
        saveCharacter: saveCharacter,
    }

}();