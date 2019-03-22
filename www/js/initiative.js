$(document).ready(function () {
    initiative.init();
    $('.modal').modal();

    $('#calculateInit').click(function (e) {
        var participants = [];

        e.preventDefault();
        $('.characterList input').each(function () {
            if (this.checked) {
                participants.push($(this).val());
            }
        });
        console.log(participants);
        initiative.calculateInit(participants);
    })
});