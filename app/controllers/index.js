$.index.open();

if(Ti.App.Properties.getString("post")=="true"){
    Alloy.createController("postExp").getView().open();
}
console.log(Ti.App.Properties.getString("post"));

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
