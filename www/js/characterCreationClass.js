var database = function () {

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

    var leesRacesIn = function () {
        var url = 'http://r0672905.sinners.be/DndCharacterCreation/races.json';
        $.getJSON(url, function (data) {
            races = data;
            // console.log('races',races);
        }).done( function () {
            raceNames = Object.keys(races);
            // console.log('raceNames',raceNames);

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
            // console.log(resultaat);
            $('div.tabsRacesAfdrukken').html(resultaat);

            let el = $('.tabs');
            let instanceTabs = M.Tabs.init(el, {});

            $('a.race').click(function () {
                selectedRace = $(this).text();
                _updateGekozenRace(selectedRace);
            });

        });
    };

    var leesClassesIn = function () {
        var url = 'http://r0672905.sinners.be/DndCharacterCreation/classes.json';
        $.getJSON(url, function (data) {
            classes = data;
            // console.log('classes',classes);
        }).done( function () {
            classNames = Object.keys(classes);
            // console.log('classNames',classNames);

            for ( var i = 0; i < classNames.length; i++) {

                var fightingstyle = classes[classNames[i]]["ClassFeatures"]["FightingStyle"];

                // console.log(fightingstyle);

                if (fightingstyle =="Melee"){
                    melee.push(classNames[i]);
                } else if (fightingstyle =="Specialist") {
                    specialist.push(classNames[i]);
                } else if (fightingstyle =="Spellcaster") {
                    spellcaster.push(classNames[i]);
                }
            }
            // console.log('melee',melee);
            // console.log('specialist',specialist);
            // console.log('spellcaster',spellcaster);
        });
    };

    var plaatsClassTabs = function () {
        $('a.selectFightingStyle').click(function () {
            selectedStyle = $(this).text();
            var tabstitles = [];
            // console.log('selectedStyle',selectedStyle);
            //nakijken welke tab geklikt is + jusite date doorgeven
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
            // console.log('tabstitles',tabstitles);

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

    var _updateGekozenRace = function (selectedRace) {
        // console.log(selectedRace);
        $('#gekozenRace').html("Race: "+selectedRace);
    };

    var _updateGekozenClass = function (selectedClass) {
        // console.log(selectedClass);
        $('#gekozenClass').html("Class: "+selectedClass);
    };

    var hide = function (selector) {
        $(selector).hide();
    };

    var show = function (selector) {
        $(selector).show();
    };

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



    return {
        init: init,
        leesRacesIn: leesRacesIn,
        leesClassesIn: leesClassesIn,
        plaatsClassTabs: plaatsClassTabs,
        show: show,
        hide: hide,
        statOmhoog: statOmhoog,
        statOmlaag: statOmlaag
    }

}();