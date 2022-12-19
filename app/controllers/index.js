$.index.open();

if(Ti.App.Properties.getBool("post")==true){
    Alloy.createController("postExp").getView().open();
}

var audioPlayer = Ti.Media.createAudioPlayer({
    url: "introSound.mp3",
    allowBackground: true
});

audioPlayer.start();

audioPlayer.addEventListener("complete", function(e){
	$.hiddenView.show();
});

$.chatButton.addEventListener("click", function(e){
	Alloy.createController("questions").getView().open();
});

//Alloy.createController("questions").getView().open();
