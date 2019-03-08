$(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    $('#dicebutton').click(function () {
        Dice.init();
        console.log('Dice.js is loaded');
    })
});

function onDeviceReady() {
    console.log('Device is ready');
}

