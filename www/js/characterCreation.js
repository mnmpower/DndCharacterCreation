$(document).ready(function () {

    // Initializeer materialize
    let elem = $('.collapsible.expandable');
    let instanceCollapsible = M.Collapsible.init(elem, {
        accordion: false,
        onOpenStart: function () {
            let el = $('.tabs');
            let instanceTabs = M.Tabs.init(el, {});
            //$('.tabs').tabs('select','Melee');
        }
    });

    // Lees de data in
    creation.leesClassesIn();
    creation.leesRacesIn();

    // Vul de pagina
    creation.plaatsClassTabs();
    creation.init();
    creation.vulAlignmentDropdown();

    // Verloop van de Character Creation
    $('#naarCharacterCreationDeel2').click(function (e) {
        e.preventDefault();
        creation.hide('#deel1CharacterCreation');
        creation.show('#deel2CharacterCreation');
        creation.hide('#deel3CharacterCreation');
    });
    $('#naarCharacterCreationDeel3').click(function (e) {
        e.preventDefault();
        if (creation.checkPointsAvailible()){
            creation.hide('#deel1CharacterCreation');
            creation.hide('#deel2CharacterCreation');
            creation.show('#deel3CharacterCreation');
        }else {
            $("#notaDeel2").html("Spend all your available points before proceeding!!")
        }
    });

    // Sla karakter op
    $('#saveCharacter').click(function (e) {
        var voornaam;
        var achternaam;
        var geslacht;
        var sex = 0;
        var alignment;
        var nota="";
        var bool = false;
        var allowLocalWriting = false;

        voornaam = $('#voornaamvak').val();
        achternaam = $('#achternaamvak').val();
        geslacht = $('#sexDropDown').val();
        alignment = $('#alignmentDropDown').val();

        if (voornaam === ""){
            e.preventDefault();
            nota+= "fill in the First name!!!<br>";
            bool = true;
        }

        if (achternaam === ""){
            e.preventDefault();
            nota+= "fill in the Last name!!!";
            bool = true;
        }

        if (geslacht ==='male'){
            sex = 1
        }

        if (bool){
            $('#notaDeel3').html(nota);
        } else{
            creation.slaagLaatsteGegevensOp(voornaam,achternaam,alignment,sex);
            allowLocalWriting = true;
        }

        if (allowLocalWriting){
            creation.saveCharacter();
        }
    });
    creation.hide('#deel2CharacterCreation');
    creation.hide('#deel3CharacterCreation');

    // Pas de stats aan
    $('.statDown').click(function () {
        var stat = $(this).attr('id').substr(0,3);
        creation.statOmlaag(stat)
    });

    $('.statUp').click(function () {
        var stat = $(this).attr('id').substr(0,3);
        creation.statOmhoog(stat)
    });

    // Selecteer de alignment
    $("#alignmentDropDown").change(function () {
        var alignmentName = this.value;
        creation.setAlignmentContent(alignmentName);
    });
});