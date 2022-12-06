$.intro.open();

$.nextPage.addEventListener("click", function(){
    Alloy.createController("questions").getView().open();
});

$.video.addEventListener("complete", function(){
    $.nextPage.backgroundColor = "green";
    $.nextPage.touchEnabled = true;
});