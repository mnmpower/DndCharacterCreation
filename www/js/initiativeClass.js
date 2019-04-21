var initiative = function () {

    // Haal de bestaande karakters op uit de Local Storage en toon deze in een checkbox list
    var _getCharacters = function() {

        // Maak de lijst leeg
        $('div.characterList').empty();

        // Doorloop karakterlijst
        for (var i = 0; i < localStorage.length; i++) {

            // Lees karakter gegevens
            var key = localStorage.key(i);
            var character = JSON.parse(localStorage.getItem(key));

            // Zet om naar checkbox
            var item =
                `<p class="left-align">
                    <label>
                        <input type="checkbox" value="${character.qr}"/>
                        <span>${character.firstName} ${character.lastName}</span>
                    </label>
                </p>`;

            // Voeg toe aan de lijst
            $('div.characterList').append(item);
        }
    };

    // Initialiseer de pagina
    var init = function () {
        _getCharacters()
    };

    // Bereken per karakter de initiative door middel van zijn stats en een willekeurige d20 rol
    var calculateInit = function (participants) {
        $('ul.initiatives').empty();
        participants.forEach(function (participant) {
            var participantObject = JSON.parse(localStorage.getItem(participant));
            var initiative = Math.floor(Math.random()*Math.floor(20))+1+Math.floor((participantObject.stats.dexterity-10)/2);
            var item = `<li>${participantObject.firstName} ${participantObject.lastName}: ${initiative}</li>`;
            $('ul.initiatives').append(item);
        });
        $('#resultsInit').modal('open');
    };

    return {
        init: init,
        calculateInit: calculateInit
    }
}();