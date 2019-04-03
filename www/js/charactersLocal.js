var local = function () {

    var saveCharacter = function (character) {
        console.log('characters aan het bewaren');
        localStorage.setItem(character.qr, JSON.stringify(character));
        alert('Your character: ' + character.firstName + ', has been saved successfully');
        location.reload();
    };

    var deleteCharacter = function (qr) {
        console.log('character aan het verwijderen');
        localStorage.removeItem(qr);
        location.reload();
    };

    return {
        saveCharacter: saveCharacter,
        deleteCharacter: deleteCharacter
    }
}();