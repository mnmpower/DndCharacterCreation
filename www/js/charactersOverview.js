$(document).ready(function () {

    // Initialiseer de pagina
    overview.init();
    $('.collapsible').collapsible();

    // Toon de QR code van het karakter
    $('a.showqr').click(function (e) {
        e.preventDefault();
        overview.encodeQR();
    });

    // Verwijder het lokaal opgeslagen karakter
    $('a.delete').click(function (e) {
        e.preventDefault();
        var qr = $(this).attr('qr');
        local.deleteCharacter(qr);
    });

    // Sla het lokaal opgeslagen karakter op in de database
    $('a.backup').click(function (e) {
        e.preventDefault();
        var qr = $(this).attr('qr');
        database.saveCharacter(qr);
    });

    // Importeer een karakter mbv een QR code
    $('a.qrscan').click(function (e) {
        e.preventDefault();
        overview.scanQR();
    });

});