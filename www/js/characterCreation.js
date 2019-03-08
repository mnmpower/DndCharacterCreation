$(document).ready(function () {
    //initializeren materialize
    let elem = $('.collapsible.expandable');
    let instanceCollapsible = M.Collapsible.init(elem, {
        accordion: false,
        onOpenStart: function () {
            let el = $('.tabs');
            let instanceTabs = M.Tabs.init(el, {});
            //$('.tabs').tabs('select','Melee');
        }
    });

    database.leesClassesIn();
    database.leesRacesIn();
    database.plaatsClassTabs();;
    database.init();

    $('#naarCharacterCreationDeel2').click(function (e) {
        e.preventDefault();
        database.hide('#deel1CharacterCreation');
        database.show('#deel2CharacterCreation');
    });
    $('#knop2').click(function (e) {
        e.preventDefault();
        database.hide('#deel2CharacterCreation');
        database.show('#deel1CharacterCreation');
    });

    database.hide('#deel2CharacterCreation');

    $('.statDown').click(function () {
        var stat = $(this).attr('id').substr(0,3);
        console.log(stat);
        database.statOmlaag(stat)
    });

    $('.statUp').click(function () {
        var stat = $(this).attr('id').substr(0,3);
        console.log(stat);
        database.statOmhoog(stat)
    });







});