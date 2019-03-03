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

    var json = leesJsonIn();
    console.log(json);

    var classNames = Object.keys(json);
    console.log(classNames);

    var melee=[];
    var specialist=[];
    var spellcaster=[];

    sortClassByStyle(classNames,json,melee,specialist,spellcaster);
    leesTab2In(json,melee,specialist,spellcaster);


});

function leesJsonIn() {
    var json = null;
    $.ajax({
        "async": false,
        "global": false,
        "url": "../data/classes.json",
        "dataType": "json",
        "success": function (data) {
            json = data;
        }
    });
    return json;
}

function sortClassByStyle(classNames,json,melee,specialist,spellcaster) {

    for ( var i = 0; i < classNames.length; i++) {

        var fightingstyle = json[classNames[i]]["ClassFeatures"]["FightingStyle"];

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

function leesTab2In(json,melee,specialist,spellcaster) {
    $('a.selectFightingStyle').click(function () {
        var selectedType = $(this).text();
        var tabs2titles = [];
        console.log(selectedType);
        //nakijken welke tab geklikt is + jusite date doorgeven
        switch (selectedType) {
            case "Specialist":
                tabs2titles = specialist;
                break;

            case "Spellcaster":
                tabs2titles = spellcaster;
                break;

            default:
                tabs2titles = melee;
                break;
        }
        console.log(tabs2titles);

        //inlezen tabs
        for (var i = 0; i < tabs2titles.length; i++) {
            $('#class'+(i+1)).html(tabs2titles[i]);
            $('#class'+(i+1)+"uitleg").html(json[tabs2titles[i]]["ClassFeatures"]["Class Description"]);
            console.log(tabs2titles[i]);
        }
    });
}



