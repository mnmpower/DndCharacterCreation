$(document).ready(function () {
    // Lees de bestaande karakters in
    initiative.init();
    $('.modal').modal();

    // Bereken van elk aangevinkt karakter de initiative
    $('#calculateInit').click(function (e) {
        var participants = [];

        e.preventDefault();
        $('.characterList input').each(function () {
            if (this.checked) {
                participants.push($(this).val());
            }
        });

        // Effective berekening
        initiative.calculateInit(participants);
    })
});