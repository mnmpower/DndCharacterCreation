$(document).ready(function () {

    charactersLocal.init();
    $('.collapsible').collapsible();

    $('a.showqr').click(function () {
        cordova.plugins.barcodeScanner.encode(
            cordova.plugins.barcodeScanner.Encode.TEXT_TYPE,
            $(this).attr('qr'),
            function (success) {
                console.log(success);
            }, function (fail) {
                console.log(fail);
            });
    });

    $('a.deleteqr').click(function () {
        var qr = $(this).attr('qr');
        charactersLocal.deleteCharacter(qr);
    });

    $('a#qrscan').click(function () {
        console.log('SCAN!!!');
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                console.log(result.text);
                database.loadCharacterFromDatabase(result.text);
                charactersLocal.init();
            },
            function (error) {
                alert("Scanning failed: " + error);
            },
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
    });

    $('a#readsql').click(function () {
        console.log("click");
        var url = "http://r0672905.sinners.be/DndCharacterCreation/json.php";
        var qr = "qr=" + "TEST";
        $.getJSON(url, qr, function (result) {
            if (result==null) {
                console.log("null");
            } else {
                console.log("non null");
                var voornaam = result[0]["voornaam"];
            }
            console.log(voornaam);
        });
    });

});