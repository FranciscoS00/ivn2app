$.questions.open();

var screenWidth = Ti.Platform.displayCaps.platformWidth;
var maxWidth = 0.7*screenWidth;

var nextQuestions;

//answer to question, "question": "answer"
const answers = {
    "Quem és?": "Sou o Lourenço, sou um rapaz do futuro e preciso da tua ajuda.",
    "O que é isto?": "É uma aplicação para que possamos comunicar entre o teu presente e o meu presente.",
    "Do futuro?": "Sim, envei-te o postal para começarmos a comunicar e para que me possas ajudar.",
    "Da minha ajuda?": "Sim, o meu futuro foi estragado por causa da ganancia das pessoas que destruiram o nosso planeta. Nunca cheguei a ter um contacto e conexão com a natureza.",
    "Como é que é possivel?": "Sou do ano 2567, a nossa tecnologia é bastante avançada mas só conseguimos enviar pequenos objectos para o passado e não com muita frequência.",
    "O que pretendes com esta aplicação?": "Queria te pedir ajuda com uma experiencia que estamos a desenvolver no futuro.",
    "Para que precisas da minha ajuda?": "Preciso da tua ajuda para que possamos corrigir alguns problemas que estamos a ter no meu presente.",
    "Como é que conheces a Madeira?": "As gerações anteriores da minha familia viveram na Madeira durante muitos anos, os meus bisavós viveram no Santo da Serra durante toda a sua vida.",
    "Que problemas?": "No meu presente toda a natureza foi destruida e apenas temos algumas espécies disponiveis e não são suficientes para nos manter a todos.",
    "Como posso ajudar?": "Preciso que coletes informação sobre mais espécies para que possamos replica-lás e consigamos a voltar a ter uma natureza como antes. A quinta do Santo da Serra tem as espécies que precisamos.",
    "Porquê uma criança?": "Os adultos no meu passado estragaram a nossa natureza, acredito que tens a capacidade para ser melhor do que eles foram.",
    "O que aconteceu?": "Destruiram a natureza no nosso planeta por causa da sua ganancia mas esqueceram-se o quão importante a natureza é para nós."
};

//"answer": ["question1 to come", "question2 to come"]
/* const questions = {
    "Sou o Lourenço, sou um rapaz do futuro e preciso da tua ajuda.": ["Do futuro?", "Da minha ajuda?"],
    "Sim, envei-te o postal para começarmos a comunicar e para que me possas ajudar.": ["Para que precisas da minha ajuda?","Como é que conheces a Madeira?"],
    "Preciso da tua ajuda para que possamos corrigir alguns problemas que estamos a ter no meu presente.": ["Que problemas?","Como posso ajudar?"],
    "As gerações anteriores da minha familia viveram na Madeira durante muitos anos, os meus bisavós viveram no Santo da Serra durante toda a sua vida.": ["Para que precisas da minha ajuda?","Da minha ajuda?"],
    "No meu presente toda a natureza foi destruida e apenas temos algumas espécies disponiveis e não são suficientes para nos manter a todos.": ["Como posso ajudar?","Da minha ajuda?"],
    "Preciso que coletes informação sobre mais espécies para que possamos replica-lás e consigamos a voltar a ter uma natureza como antes. A quinta do Santo da Serra tem as espécies que precisamos.": ["Da minha ajuda?","Que problemas?"],
    "Sim, o meu futuro foi estragado por causa da ganancia das pessoas que destruiram o nosso planeta. Nunca cheguei a ter um contacto e conexão com a natureza.": ["Porquê uma criança?", "O que aconteceu?"],
    "Os adultos no meu passado estragaram a nossa natureza, acredito que tens a capacidade para ser melhor do que eles foram.": ["O que aconteceu?", "Do futuro?"],
    "Destruiram a natureza no nosso planeta por causa da sua ganancia mas esqueceram-se o quão importante a natureza é para nós.": ["Porquê uma criança?", "Do futuro?"],
    "É uma aplicação para que possamos comunicar entre o teu presente e o meu presente.": ["Como é que é possivel?", "O que pretendes com esta aplicação?"],
    "Sou do ano 2567, a nossa tecnologia é bastante avançada mas só conseguimos enviar pequenos objectos para o passado e não com muita frequência.": ["O que pretendes com esta aplicação?", "Quem és?"],
    "Queria te pedir ajuda com uma experiencia que estamos a desenvolver no futuro.": ["Como é que é possivel?", "Quem és?"]
}; */

const questions = {
    "Sou o Lourenço, sou um rapaz do futuro e preciso da tua ajuda.": ["Do futuro?", "Da minha ajuda?"],
    "Sim, envei-te o postal para começarmos a comunicar e para que me possas ajudar.": ["Para que precisas da minha ajuda?", "Como é que conheces a Madeira?"],
    "Preciso da tua ajuda para que possamos corrigir alguns problemas que estamos a ter no meu presente.": ["Que problemas?", "Como posso ajudar?"],
    "No meu presente toda a natureza foi destruida e apenas temos algumas espécies disponiveis e não são suficientes para nos manter a todos.": ["Como posso ajudar?", "Da minha ajuda?"],
    "Preciso que coletes informação sobre mais espécies para que possamos replica-lás e consigamos a voltar a ter uma natureza como antes. A quinta do Santo da Serra tem as espécies que precisamos.": ["Que problemas?", "Da minha ajuda?"],
    "Sim, o meu futuro foi estragado por causa da ganancia das pessoas que destruiram o nosso planeta. Nunca cheguei a ter um contacto e conexão com a natureza.": ["Porquê uma criança?", "O que aconteceu?"],
    "Os adultos no meu passado estragaram a nossa natureza, acredito que tens a capacidade para ser melhor do que eles foram.": ["O que aconteceu?", "O que é isto?"],
    "Destruiram a natureza no nosso planeta por causa da sua ganancia mas esqueceram-se o quão importante a natureza é para nós.": ["Porquê uma criança?", "O que é isto?"],
    "É uma aplicação para que possamos comunicar entre o teu presente e o meu presente.": ["Como é que é possivel?", "O que pretendes com esta aplicação?"],
    "Sou do ano 2567, a nossa tecnologia é bastante avançada mas só conseguimos enviar pequenos objectos para o passado e não com muita frequência.": ["O que pretendes com esta aplicação?", "Quem és?"],
    "Queria te pedir ajuda com uma experiencia que estamos a desenvolver no futuro.": ["Como é que é possivel?", "Quem és?"],
    "As gerações anteriores da minha familia viveram na Madeira durante muitos anos, os meus bisavós viveram no Santo da Serra durante toda a sua vida.": ["Para que precisas da minha ajuda?", "Da minha ajuda?"]
}

const backTo1 = ["Do futuro?","Para que precisas da minha ajuda?","Que problemas?","Como posso ajudar?","Como é que conheces a Madeira?","Da minha ajuda?","Porquê uma criança?","O que aconteceu?"];

//tracker of what questions where asked
var questionsAsked = [];

//initial questions
$.question1.title = "Quem és?";
$.question2.title = "O que é isto?";

//add questions to the chat view
$.question1.addEventListener("click", function(e){
    if($.question1.title == "Ajudar"){
        Alloy.createController("postExp").getView().open();
    }
    var sizeView = Ti.UI.createView({
        width: "70%",
        height: Ti.UI.SIZE,
        right: 0
    });
    var question = Ti.UI.createLabel({
        text: $.question1.title,
        backgroundColor: "green",
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
    sizeView.add(question);
    $.chat.add(sizeView);
    makeChanges($.question1.title);
})

$.question2.addEventListener("click", function(e){
    var sizeView = Ti.UI.createView({
        width: "70%",
        height: Ti.UI.SIZE,
        right: 0
    });
    var question = Ti.UI.createLabel({
        text: $.question2.title,
        backgroundColor: "green",
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
    sizeView.add(question);
    $.chat.add(sizeView);
    makeChanges($.question2.title);
})

//add answer to the chat view. Change questions on buttons and add the questions already made into an array to track what is missing
function makeChanges(question){
    //adding answer to the question into the chat view
    var sizeView = Ti.UI.createView({
        width: "70%",
        height: Ti.UI.SIZE,
        left: 0
    });
    var answer = Ti.UI.createLabel({
        text: answers[question],
        backgroundColor: "yellow",
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
    //check next questions
    if(!questionsAsked.includes(question)){
        questionsAsked.push(question);
    }
    if(questionsAsked.length == 12){
        setTimeout(() => {
            $.chat.scrollToBottom();
        }, 500)
        $.question1.title = "Ajudar";
        $.question2.visible = false;
        //Alloy.createController("postExp").getView().open();
    }else{
        nextQuestions = questions[answers[question]];
        console.log(questionsAsked);
        $.question1.title = nextQuestions[0];
        $.question2.title = nextQuestions[1];
        setTimeout(() => {
            $.chat.scrollToBottom();
        }, 500)
    }
/*     if(multipleExist(questionsAsked, backTo1)){
        $.question1.title = "Quem és?";
        $.question2.title = "O que é isto?";
        $.chat.scrollToBottom();
        return;
    } */
    
}
/* 
function multipleExist(arr, values) {
    return values.every(value => {
        return arr.includes(value);
    });
} */

//ToDo: after a certain number of questions are made change the button to next to open the postExp page