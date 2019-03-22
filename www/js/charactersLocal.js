var charactersLocal = function () {

    var _charactersList = function () {
        console.log('lijst van characters');
        $('ul').empty();
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var character = JSON.parse(localStorage.getItem(key));

            var item =
                `<li>
                    <div class="collapsible-header">${character.firstName + character.lastName}</div>
                    <div class="collapsible-body">
                        <div class="row">
                            <div class="col s6">sex: </div>
                            <div class="col s6">${(character.sex)?"Male":"Female"}</div>
                        </div>
                        <div class="row">
                            <div class="col s6">alignment: </div>
                            <div class="col s6">${character.alignment}</div>
                        </div>
                        <div class="row">
                            <div class="col s6">race: </div>
                            <div class="col s6">${character.race}</div>
                        </div>
                        <div class="row">
                            <div class="col s6">class: </div>
                            <div class="col s6">${character.class}</div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Ability</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Strength:</td>
                                    <td>${character.stats.strength}</td>
                                </tr>
                                <tr>
                                    <td>Dexterity:</td>
                                    <td>${character.stats.dexterity}</td>
                                </tr>
                                <tr>
                                    <td>Constitution:</td>
                                    <td>${character.stats.constitution}</td>
                                </tr>
                                <tr>
                                    <td>Intelligence:</td>
                                    <td>${character.stats.intelligence}</td>
                                </tr>
                                <tr>
                                    <td>Wisdom:</td>
                                    <td>${character.stats.wisdom}</td>
                                </tr>
                                <tr>
                                    <td>Charisma:</td>
                                    <td>${character.stats.charisma}</td>
                                </tr>
                            </tbody>
                        </table>
                        <a class="waves-effect waves-light btn-small showqr" qr="${character.qr}" href="#">Show QR</a>
                        <a class="waves-effect waves-light btn-small deleteqr" qr="${character.qr}" href="#">Delete</a>
                    </div>`;
            $('ul#charactersList').append(item);
        }
    };

    var init = function () {
        console.log('local character data wordt gebruikt');
        _charactersList();
    };

    var saveCharacter = function (character) {
        console.log('characters aan het bewaren');
        localStorage.setItem(character.qr, JSON.stringify(character));
    };

    var deleteCharacter = function (qr) {
        console.log('character aan het verwijderen');
        localStorage.removeItem(qr);
        _charactersList();
    };

    return {
        init: init,
        saveCharacter: saveCharacter,
        deleteCharacter: deleteCharacter
    }
}();