$.questions.open();

var screenWidth = Ti.Platform.displayCaps.platformWidth;
var maxWidth = 0.7*screenWidth;

const answers = {
    "teste1": "resposta à primeira pergunta",
    "teste2": "resposta à segunda pergunta"
};

$.question1.addEventListener("click", function(e){
    var sizeView = Ti.UI.createView({
        width: "70%",
        height: Ti.UI.SIZE,
        left: 0
    });
    //ToDo: change background and border color
    var answer = Ti.UI.createLabel({
        text: $.question1.title,
        backgroundColor: "blue",
        color: "black",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        left: 0,
        top: "10px",
        font: {
            fontFamily: "Arial",
            fontSize: 40
        },
        borderWidth: "2px",
        borderRadius: "10px",
        borderColor: "black"
    });
    sizeView.add(answer);
    $.chat.add(sizeView);
    makeChanges($.question1.title);
})

$.question2.addEventListener("click", function(e){
    var sizeView = Ti.UI.createView({
        width: "70%",
        height: Ti.UI.SIZE,
        left: 0
    });
    //ToDo: change background and border color
    var answer = Ti.UI.createLabel({
        text: $.question2.title,
        backgroundColor: "green",
        color: "black",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        left: 0,
        top: "10px",
        font: {
            fontFamily: "Arial",
            fontSize: 40
        },
        borderWidth: "2px",
        borderRadius: "10px",
        borderColor: "black"
    });
    sizeView.add(answer);
    $.chat.add(sizeView);
    makeChanges($.question2.title);
})

function makeChanges(question){
    //change questions on buttons and add the questions already made into an array to track what is missing
    $.chat.scrollToBottom();
    var sizeView = Ti.UI.createView({
        width: "70%",
        height: Ti.UI.SIZE,
        right: 0
    });
    //ToDo: change background and border color
    var answer = Ti.UI.createLabel({
        text: answers[question],
        backgroundColor: "yellow",
        color: "black",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        right: 0,
        top: "10px",
        font: {
            fontFamily: "Arial",
            fontSize: 40
        },
        borderWidth: "2px",
        borderRadius: "10px",
        borderColor: "black"
    });
    sizeView.add(answer);
    $.chat.add(sizeView);
    //Alloy.createController("postExp").getView().open();
}

//ToDo: after a certain number of questions are made change the button to next to open the postExp page