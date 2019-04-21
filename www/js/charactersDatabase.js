var database = function () {

    // Sla het karakter op in de database
    var saveCharacter = function (key) {

        // Lees het geselecteerde karakter in
        var character = JSON.parse(localStorage.getItem(key));

        // zet het karakterobject om naar een data string voor de database
        var dataString=
            "voornaam="+character.firstName
            +"&achternaam="+ character.lastName
            +"&geslacht=" + character.sex
            +"&alignment=" + character.alignment
            +"&race=" + character.race
            +"&class=" + character.class
            +"&strength=" + character.stats.strength
            +"&dexterity=" + character.stats.dexterity
            +"&constitution=" + character.stats.constitution
            +"&intelligence=" + character.stats.intelligence
            +"&wisdom=" + character.stats.wisdom
            +"&charisma=" + character.stats.charisma
            +"&qr=" + character.qr
            +"&insert=";

        // Controleer op valsspelen
        if(
            $.trim(character.firstName).length>0
            && $.trim(character.lastName).length>0
            && $.trim(character.sex).length>0
            && $.trim(character.alignment).length>0
            && $.trim(character.race).length>0
            && $.trim(character.class).length>0
            && $.trim(character.stats.strength).length>0
            && $.trim(character.stats.dexterity).length>0
            && $.trim(character.stats.constitution).length>0
            && $.trim(character.stats.intelligence).length>0
            && $.trim(character.stats.wisdom).length>0
            && $.trim(character.stats.charisma).length>0
            && $.trim(character.qr).length>0
        )
        {
            // Sla de data op in de database
            $.ajax({
                type: "POST",
                url:"http://r0672905.sinners.be/DndCharacterCreation/insert.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                success: function () {
                    alert('Your character has been uploaded successfully');
                },
                error: function () {
                    alert('Saving failed');
                }
            });
        } else {
            location.reload();
        }
    };

    // Maak van de array van variabelen een JSON object
    var _maakCharacterJSON = function (characterArray) {
        return {
            qr: characterArray["qr"],
            firstName: characterArray["voornaam"],
            lastName: characterArray["achternaam"],
            sex: characterArray["geslacht"],
            alignment: characterArray["alignment"],
            race: characterArray["race"],
            class: characterArray["class"],
            stats: {
                strength: characterArray["strength"],
                dexterity: characterArray["dexterity"],
                constitution: characterArray["constitution"],
                intelligence: characterArray["intelligence"],
                wisdom: characterArray["wisdom"],
                charisma: characterArray["charisma"]
            }
        }
    };

    // Lees een karakter in vanuit de database
    var loadCharacter = function (qrString) {
        var url = "http://r0672905.sinners.be/DndCharacterCreation/json.php";
        var qr = "qr=" + qrString;
        console.log('test 1: ' + qr);
        $.getJSON(url, qr, function (result) {
            if (result==null) {
                console.log("null");
            } else {
                console.log("non null");
                var character = _maakCharacterJSON(result[0]);
                local.saveCharacter(character);
            }
        });
    };

    return {
        saveCharacter: saveCharacter,
        loadCharacter: loadCharacter
    }

}();