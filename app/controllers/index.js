$.index.open();

if(Ti.App.Properties.getBool("post") == true){
	Alloy.createController("postExp").getView().open();
}

$.nextPage.addEventListener("click", function(e){
	if($.nameInput.value != ""){
		Ti.App.Properties.setString("name", $.nameInput.value);
		Alloy.createController("intro").getView().open();
	}
});
