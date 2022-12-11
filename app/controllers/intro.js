$.intro.open();

$.nextPage.addEventListener("click", function(){
    Alloy.createController("questions").getView().open();
});

$.video.addEventListener("complete", function(){
    $.nextPage.backgroundColor = "#83d6a9";
    $.nextPage.touchEnabled = true;
});