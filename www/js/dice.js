$( document ).ready(function() {
    $('.dice').click(function () {

        // Declareren
        var resultaat="";
        var dropbox;
        var aantalDice;
        var i;
        var nummer;

        // Inlezen dropbox
        var rolldXid= $(this).attr('id');

        var getalvanklickedid = rolldXid.substr(5,2);

        var dropboxid = "amountD"+ getalvanklickedid;

        dropbox = document.getElementById(dropboxid);
        aantalDice = dropbox.options[dropbox.selectedIndex].value;

        // Rollen simuleren
        for (i = 1; i <= aantalDice; i++) {
            nummer = Math.floor(Math.random() * getalvanklickedid) + 1;

            // Resultaat opvullen
            if (!(i == aantalDice)){
                resultaat += nummer + ", ";
            } else {
                resultaat += nummer;
            }

        }
        // Juiste ID maken voor het inputfield
        var inputid = "input"+getalvanklickedid;

        // Inputfield inlezen
        $('#'+inputid).val(resultaat);

    });
});