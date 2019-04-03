$(document).ready(function () {

    overview.init();
    $('.collapsible').collapsible();

    $('a.showqr').click(function (e) {
        e.preventDefault();
        overview.encodeQR();
    });

    $('a.delete').click(function (e) {
        e.preventDefault();
        console.log('Deleting the character ...');
        var qr = $(this).attr('qr');
        local.deleteCharacter(qr);
    });

    $('a.backup').click(function (e) {
        e.preventDefault();
        console.log('Uploading the character');
        var qr = $(this).attr('qr');
        database.saveCharacter(qr);
    });

    $('a.qrscan').click(function (e) {
        e.preventDefault();
        console.log('Scanning QR code');
        overview.scanQR();
    });

});