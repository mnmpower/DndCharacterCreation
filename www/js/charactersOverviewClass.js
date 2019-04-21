var overview = function () {

    // Zet gegevens om naar een accordeon
    var _charactersList = function () {
        console.log('list of characters');
        $('ul').empty();
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var character = JSON.parse(localStorage.getItem(key));

            var item =
                `<li>
                    <div class="collapsible-header">${character.firstName + " " + character.lastName}</div>
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
                        <p><a class="waves-effect waves-light btn-small showqr" qr="${character.qr}" href="#">Show QR</a></p>
                        <p><a class="waves-effect waves-light btn-small delete" qr="${character.qr}" href="#">Delete</a></p>
                        <p><a class="waves-effect waves-light btn-small backup" qr="${character.qr}" href="#">Save online</a></p>
                    </div>`;
            $('ul#charactersList').append(item);
        }
    };

    // Initialiseer de pagina
    var init = function () {
        _charactersList();
    };

    // Open de camera van het toestel voor het scannen van een QR code
    var scanQR = function () {
        cordova.plugins.barcodeScanner.scan(

            // Indien successvol: lees het karakter in
            function (result) {
                database.loadCharacter(result.text);
            },

            // Indien er een fout optreed: toon een foutmelding
            function (error) {
                alert("Scanning failed: " + error);
            },

            // Eigenschappen van de scanner
            {
                preferFrontCamera : false, // iOS and Android
                showFlipCameraButton : true, // iOS and Android
                showTorchButton : true, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                saveHistory: true, // Android, save scan history (default false)
                prompt : "Place a barcode inside the scan area", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations : true, // iOS
                disableSuccessBeep: false // iOS and Android
            }
        );
    };

    // Genereer de QR code van het karakter
    var encodeQR = function () {
        cordova.plugins.barcodeScanner.encode(
            cordova.plugins.barcodeScanner.Encode.TEXT_TYPE,
            $(this).attr('qr'),

            // Indien successvol: toon een melding met QR code
            function (success) {
                alert(success);
                location.reload();
            },

            // Indien er een fout optreed: toon een foutmelding
            function (fail) {
                alert(fail);
            }
        );
    };

    return {
        init: init,
        scanQR: scanQR,
        encodeQR: encodeQR
    }
}();