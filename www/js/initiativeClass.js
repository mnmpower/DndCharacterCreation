var initiative = function () {
    var _getCharacters = function() {
        $('div.characterList').empty();
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var character = JSON.parse(localStorage.getItem(key));

            var item =
                `<p>
                    <label>
                        <input type="checkbox" value="${character.qr}"/>
                        <span>${character.firstName} ${character.lastName}</span>
                    </label>
                </p>`;
            $('div.characterList').append(item);
        }
    };
    var init = function () {
        _getCharacters()
    };

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