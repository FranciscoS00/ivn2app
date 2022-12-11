$.intro.open();

$.nextPage.addEventListener("click", function(){
    Alloy.createController("questions").getView().open();
});

$.video.addEventListener("complete", function(){
    $.nextPage.backgroundColor = "#186c46";
    $.nextPage.borderColor = "#186c46";
    $.nextPage.touchEnabled = true;
});