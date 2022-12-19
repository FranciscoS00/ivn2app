$.index.open();

if(Ti.App.Properties.hasProperty("post")){
    Alloy.createController("postExp").getView().open();
}

$.videoPlayer.addEventListener("complete", function(e){
    $.videoPlayer.hide();
    $.hiddenView.show();
});

$.chatButton.addEventListener("click", function(e){
	Alloy.createController("questions").getView().open();
});

//Alloy.createController("questions").getView().open();
