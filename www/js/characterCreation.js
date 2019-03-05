$(document).ready(function () {
    //initializeren materialize
    let elem = $('.collapsible.expandable');
    let instanceCollapsible = M.Collapsible.init(elem, {
        accordion: false,
        onOpenStart: function(){
            let el = $('.tabs');
            let instanceTabs = M.Tabs.init(el, {});
           //$('.tabs').tabs('select','Melee');
        }
    });
    //alles met de CLASSES
    var jsonclasses = leesJsonIn("../data/classes.json");
    console.log(jsonclasses);

    var classNames = Object.keys(jsonclasses);
    console.log(classNames);

    var melee=[];
    var specialist=[];
    var spellcaster=[];

    sortClassByStyle(classNames,jsonclasses,melee,specialist,spellcaster);

    $('a.selectFightingStyle').click(function () {
        var selectedType = $(this).text();
        leesClassTabIn(jsonclasses,melee,specialist,spellcaster,selectedType);
    });



    //alles met de RACES
    var jsonRaces = leesJsonIn("../data/races.json");
    console.log(jsonRaces);

    var raceNames = Object.keys(jsonRaces);
    console.log(raceNames);

    leesRaceTabsIn(raceNames,jsonRaces);

    var gekozenRace="Human";
    var gekozenClass="Barbarian";

    $('.race').click(function () {
        gekozenRace = $(this).text();
        console.log(gekozenRace);
        console.log(gekozenClass);
    });
    $('.class').click(function () {
        gekozenClass = $(this).text();
        console.log(gekozenRace);
        console.log(gekozenClass);
    });
    console.log(gekozenRace);
    console.log(gekozenClass);
});

function leesJsonIn(url) {
    var json = null;
    $.ajax({
        "async": false,
        "global": false,
        "url": url,
        "dataType": "json",
        "success": function (data) {
            json = data;
        }
    });
    return json;
}

function sortClassByStyle(classNames,jsonclasses,melee,specialist,spellcaster) {

    for ( var i = 0; i < classNames.length; i++) {

        var fightingstyle = jsonclasses[classNames[i]]["ClassFeatures"]["FightingStyle"];

        console.log(fightingstyle);

        if (fightingstyle =="Melee"){
            melee.push(classNames[i]);
        } else if (fightingstyle =="Specialist") {
            specialist.push(classNames[i]);
        } else if (fightingstyle =="Spellcaster") {
            spellcaster.push(classNames[i]);
        }
    }
    console.log(melee);
    console.log(specialist);
    console.log(spellcaster);
}

function leesClassTabIn(jsonclasses,melee,specialist,spellcaster,selectedType) {
    var tabstitles = [];
    console.log(selectedType);
    //nakijken welke tab geklikt is + jusite date doorgeven
    switch (selectedType) {
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
    console.log(tabstitles);

    // //inlezen tabs
    // for (var i = 0; i < tabstitles.length; i++) {
    //     $('#class'+(i+1)).html(tabstitles[i]);
    //     $('#class'+(i+1)+"uitleg").html(jsonclasses[tabstitles[i]]["ClassFeatures"]["Class Description"]);
    //     console.log(tabstitles[i]);
    // }
    var resultaat="<div class=\"col s12\">\n<ul class=\"tabs\">\n";

    for (var i = 0; i < tabstitles.length; i++) {

        resultaat+="<li class=\"tab\"><a href=\"#class"+(i+1)+"uitleg\" id=\"class"+(i+1)+"\" class='class'>"+tabstitles[i]+"</a></li>\n";

    }

    resultaat+="</ul></div>";

    for (var i = 0; i < tabstitles.length; i++) {

        resultaat+="<div id=\"class"+(i+1)+"uitleg\" class=\"col s12\">"+jsonclasses[tabstitles[i]]["ClassFeatures"]["Class Description"]+"</div>\n\n";
    }
    resultaat+="</div>";
    console.log(resultaat);
    $('div.tabsClassesAfdrukken').html(resultaat);

    let el = $('.tabs');
    let instanceTabs = M.Tabs.init(el, {});

}


//werkt perfect maar ff test
// function leesRaceTabsIn(racenames,jsonRaces) {
//     for (var i = 1; i <= racenames.length; i++) {
//         $('#race'+(i)).html(racenames[i]);
//         $('#race'+(i)+"uitleg").html(jsonRaces[racenames[i]][racenames[i]+" Traits"]["content"]);
//         console.log(racenames[i]);
//     }
// }

//afdrukken zonder iets nodig te hebbe in HTML :D
function leesRaceTabsIn(racenames,jsonRaces) {
    var resultaat="<div class=\"col s12\">\n<ul class=\"tabs\">\n";


    for (var i = 1; i < racenames.length; i++) {

        resultaat+="<li class=\"tab\"><a href=\"#race"+i+"uitleg\" id=\"race"+i+"\" class='race'>"+racenames[i]+"</a></li>\n";

    }

    resultaat+="</ul></div>";

    // for (var i = 1; i < racenames.length; i++) {
    //
    //     resultaat+="<div id=\"race"+i+"uitleg\" class=\"col s12\">"+jsonRaces[racenames[i]][racenames[i]+" Traits"]["content"]+"</div>\n\n";
    // }

    for (var i = 1; i < racenames.length; i++) {

        resultaat+="<div id=\"race"+i+"uitleg\" class=\"col s12\">";

        for (var j = 1; j < jsonRaces[racenames[i]][racenames[i]+" Traits"]["content"].length; j++) {
            var content = jsonRaces[racenames[i]][racenames[i]+" Traits"].content[j];

            if (typeof content === "string"){
                if (content.includes('*') === true){
                    var content1 = content.replace("***","<h2>");
                    var content2 = content1.replace("***","</h2>");
                    var content3 = content2.replace(".","");

                    // console.log(content3);
                    resultaat+="<p>"+content3+"</p>";
                }
            }else if (typeof content === "object" && content["table"]["**Dragon**"] != null) {

                console.log(Object.keys(content.table));

                dragonTableKeys =Object.keys(content.table);
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
    console.log(resultaat);
    $('div.tabsRacesAfdrukken').html(resultaat);

}



