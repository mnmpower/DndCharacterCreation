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
    database.vulAlignmentDropdown();

    $('#naarCharacterCreationDeel2').click(function (e) {
        e.preventDefault();
        database.hide('#deel1CharacterCreation');
        database.show('#deel2CharacterCreation');
        database.hide('#deel3CharacterCreation');
    });
    $('#naarCharacterCreationDeel3').click(function (e) {
        e.preventDefault();
        if (database.checkPointsAvailible()){
            database.hide('#deel1CharacterCreation');
            database.hide('#deel2CharacterCreation');
            database.show('#deel3CharacterCreation');
        }else {
            $("#notaDeel2").html("Spend all your available points before proceeding!!")
        }
    });

    $('#saveCharacter').click(function (e) {
        var voornaam;
        var achternaam;
        var geslacht;
        var alignment;
        var nota="";
        var bool = false;

        voornaam = $('#voornaamvak').val();
        achternaam = $('#achternaamvak').val();
        geslacht = $('#sexDropDown').val();
        alignment = $('#alignmentDropDown').val();

        if (voornaam === ""){
            e.preventDefault();
            nota+= "fil in the First name!!!<br>";
            bool = true;
        }

        if (achternaam === ""){
            e.preventDefault();
            nota+= "fil in the Last name!!!";
            bool = true;
        }

        if (bool){
            $('#notaDeel3').html(nota);
        } else{
            database.slaagLaatsteGegevensOp(voornaam,achternaam,alignment,geslacht);
        }


    });


    database.hide('#deel2CharacterCreation');
    database.hide('#deel3CharacterCreation');

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

    $("#alignmentDropDown").change(function () {
        var alignmentName = this.value;
        database.setAlignmentContent(alignmentName);
    });






});