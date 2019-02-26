$( document ).ready(function() {
    console.log('dice funtion rolls started');

    $('.dice').click(function () {

        //DECLAREREN
        var resultaat="";
        var dropbox;
        var aantalDice;
        var i;
        var nummer;

        //INLEZEN DROPBOX
        var rolldXid= $(this).attr('id');
        console.log(rolldXid);

        var getalvanklickedid = rolldXid.substr(5,2);
        console.log(getalvanklickedid);

        var dropboxid = "amountD"+ getalvanklickedid;
        console.log(dropboxid);

        dropbox = document.getElementById(dropboxid);
        aantalDice = dropbox.options[dropbox.selectedIndex].value;
        console.log(aantalDice + " dices");

        //ROLLS SIMULEREN
        for (i = 1; i <= aantalDice; i++) {
            nummer = Math.floor(Math.random() * getalvanklickedid) + 1;
            console.log("roll: "+nummer);

            //resultaat opvullen
            if (!(i == aantalDice)){
                resultaat += nummer + ", ";
            } else {
                resultaat += nummer;
            }

        }
        //JUISTE ID MAKEN VOOR INPUTFIELD
        var inputid = "input"+getalvanklickedid;
        console.log(inputid);

        //INPUTFIELD INLIEZE
        $('#'+inputid).val(resultaat);
        //document.getElementById(inputid);

    });
});