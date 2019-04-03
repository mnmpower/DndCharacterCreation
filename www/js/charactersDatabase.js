var database = function () {

    var saveCharacter = function (key) {

        var character = JSON.parse(localStorage.getItem(key));

        console.log('Character read from local storage');

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

        console.log(dataString);

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
            console.log('Uploading ...');
            $.ajax({
                type: "POST",
                url:"http://r0672905.sinners.be/DndCharacterCreation/insert.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                success: function () {
                    console.log('something went right');
                    alert('Your character has been uploaded successfully');
                },
                error: function () {
                    console.log('something went wrong');
                    alert('Saving failed');
                }
            });
        } else {
            console.log('Error in character creation!');
            location.reload();
        }
    };

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