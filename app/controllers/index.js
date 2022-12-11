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

$.nameInput.addEventListener("change", function(e){
	if($.nameInput.value != ""){
		$.nextPage.backgroundColor = "#186c46";
		$.nextPage.borderColor = "#186c46";
	}else{
		$.nextPage.backgroundColor = "grey";
		$.nextPage.borderColor = "grey";
	}
});
