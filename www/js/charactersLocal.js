var local = function () {

    // Sla het karakter op in Local Storage
    var saveCharacter = function (character) {
        localStorage.setItem(character.qr, JSON.stringify(character));
        alert('Your character: ' + character.firstName + ', has been saved successfully');
        location.reload();
    };

    // Verwijder het karakter uit de Local Storage
    var deleteCharacter = function (qr) {
        localStorage.removeItem(qr);
        alert('Your character has been removed successfully');
        location.reload();
    };

    return {
        saveCharacter: saveCharacter,
        deleteCharacter: deleteCharacter
    }
}();