$.questions.open();

$.question1.addEventListener("click", function(e){
    var answer = Ti.UI.createLabel({
        text: $.question1.title,
        backgroundColor: "blue",
        color: "black",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        left: 0,
        font: {
            fontFamily: "Arial",
            fontSize: 40
        }
    });
    $.chat.add(answer);
    makeChanges();
})

$.question2.addEventListener("click", function(e){
    var answer = Ti.UI.createLabel({
        text: $.question2.title,
        backgroundColor: "green",
        color: "black",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        right: 0,
        font: {
            fontFamily: "Arial",
            fontSize: 40
        }
    });
    $.chat.add(answer);
    makeChanges();
})

function makeChanges(){
    //change questions on buttons and add the questions already made into an array to track what is missing
    //$.chat.scrollToBottom();
    Alloy.createController("postExp").getView().open();
}

//ToDo: after a certain number of questions are made change the button to next to open the postExp page