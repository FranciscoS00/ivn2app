$.questions.open();

var screenWidth = Ti.Platform.displayCaps.platformWidth;
var maxWidth = 0.7*screenWidth;

var nextQuestions;

var lourencoName = "???";
var initialPath;

firstToRun("Aqui o sinal está fraco, neste momento só consigo comunicar por mensagem");

//answer to question, "question": ["answer1", "answer2", ...]
const answers = {
    "Quem és?": ["Sei que vais achar estranho, mas não estou no mesmo tempo que tu, aqui estou mais avançado.", "Estou no espaço, o futuro não é nada bom... Preciso da tua ajuda."],
    "Como te chamas?": ["Ohhh desculpa... já devia ter me apresentado... Chamo-me Lourenço, vivo no espaço."], 
    "No espaço?": ["Sim, é possível, para ti pode ser difícil acreditar, mas no ano 2653 temos essa tecnologia."],
    "O futuro é como nos filmes?": ["Os filmes são ficção, mas o que vai acontecer é real e não é nada bom"], 
    "Isso é muito estranho": ["Os filmes são ficção, mas o que vai acontecer é real e não é nada bom"], 
    "O que vai acontecer?": ["O planeta Terra já não é o que era. Posso mostrar-te o que aconteceu... Estou a enviar te um video", "video"], //if == video add the button for the video
    "Isso é mesmo verdade?": ["Infelizmente é verdade, mas ainda há tempo, o vosso futuro pode ser diferente, pode ser melhor.", "Mas preciso da tua ajuda, tens que resolver um mistério num certo sitio"],
    "Não vai acontecer": ["Infelizmente é verdade, mas ainda há tempo, o vosso futuro pode ser diferente, pode ser melhor.", "Mas preciso da tua ajuda, tens que resolver um mistério num certo sitio"],
    "Qual sitio?": ["Perto de ti existe um lugar incrível, mágico, preciso que vás lá e lá irás saber o que fazer", "É este o lugar, Quinta do Santo da Serra", "foto quinta"], //if == "foto livro" add the photo of the quinta
    "O que tenho que fazer?": ["Existe um livro mágico, que era dos meus antepassados quando viviam na terra, mas está incompleto...", "Eu consegui teletransportar o livro... É este o livro", "foto livro"], //if == "foto livro" add the photo of the book
    "E depois? O que faço?": ["Acho que estou a perder a ligação, fala com os teus colegas, vão saber o que fazer. Espero por vocês no dia 25 de Dezembro ás 10:00.", "Irei voltar a falar contigo assim que for possível... E não te esqueças, a NATUREZA É VIDA"]   
};

//next questions based on the previously asked question, "question": ["question1", "question2"]
const questions = {
    "Quem és?": ["Como te chamas?", "No espaço?"],
    "Como te chamas?": ["No espaço?", "hide"], //Como te chamas goes to the space question and asks to introduce your name
    "No espaço?": ["O futuro é como nos filmes?", "Isso é muito estranho"],
    "O futuro é como nos filmes?": ["O que vai acontecer?", "hide"], //this questions should send to the "Como te chamas?" depending on first question asked
    "Isso é muito estranho": ["O que vai acontecer?", "hide"], //this questions should send to the "Como te chamas?" depending on first question asked
    "O que vai acontecer?": ["Isso é mesmo verdade?", "Não vai acontecer"],
    "Isso é mesmo verdade?": ["Qual sitio?", "O que tenho que fazer?"],
    "Não vai acontecer": ["Qual sitio?", "O que tenho que fazer?"],
    "Qual sitio?": ["E depois? O que faço?", "hide"],
    "O que tenho que fazer?": ["E depois? O que faço?", "hide"]
}

//based on the question it sends the actual speech, "question": "questionText"
const questionToSend = {
    "Quem és?": "Quem és?",
    "Como te chamas?": "Espera, calma... Como te chamas?",
    "No espaço?": "Como assim? Como é que tas no espaço? Isso é possível?",
    "O futuro é como nos filmes?": "Uau, o futuro é como nos filmes? Robôs, naves espáciais, todas essas coisas incriveis?",
    "Isso é muito estranho.": "Isso é estranho, já vi isso em filmes, mas é tudo ficção, não é possível",
    "O que vai acontecer?": "O que vai acontecer?",
    "Isso é mesmo verdade?": "Isso é mesmo verdade?",
    "Não vai acontecer.": "Não vai acontecer.",
    "Qual sitio?": "Lourenço, que sitio é esse? Eu vou ajudar-te",
    "O que tenho de fazer?": "Eu quero ajudar, mas o que tenho de fazer?",
    "E depois? O que faço?": "E depois? O que faço?"
}

//const backTo1 = ["Do futuro?","Para que precisas da minha ajuda?","Que problemas?","Como posso ajudar?","Como é que conheces a Madeira?","Porque precisas de ajuda?","Porquê uma criança?","O que aconteceu?"];

//tracker of what questions where asked
var questionsAsked = [];

//initial questions
$.question1.title = "Quem és?";
$.question2.title = "";
$.question2.hide();

//add questions to the chat view
$.question1.addEventListener("click", function(e){
    //Alloy.createController("postExp").getView().open(); //delete
    if($.question1.title == "Ajudar"){
        Alloy.createController("postExp").getView().open();
        return;
    }
    //pergunta, direita 
    var wholeView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        right: 0,
        layout: "horizontal",
        top: "10px",
        layout: "vertical"
    });
    var nameTag = Ti.UI.createLabel({
        text: "Eu",
        font:{
            fontFamily: "GoodTimesRg-Regular",
            fontSize: 30,
            fontWeight: "bold"
        },
        right: "10px",
        top: 0,
        color: "white"
    })
    wholeView.add(nameTag);
    var sizeView = Ti.UI.createView({
        width: "70%",
        height: Ti.UI.SIZE,
        right: "10px"
    });
    var answerView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        backgroundGradient: {
            type: 'linear',
            colors: [
                '#2d198f', '#135d9c'
            ],
            startPoint: {
                x: '0%',
                y: '0%'
            },
            endPoint: {
                x: '0%',
                y: '100%'
            },
            backFillStart: true
        },
        right: 0
    });
    var answer = Ti.UI.createLabel({
        text: questionToSend[$.question1.title],
        color: "white",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        right: "10px",
        left: "10px",
        top: "10px",
        font: {
            fontFamily: "GoodTimesRg-Regular",
            fontSize: 30
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT
    });
    answerView.add(answer)
    sizeView.add(answerView);
    wholeView.add(sizeView);
    $.chat.add(wholeView);
    makeChanges($.question1.title);
})

$.question2.addEventListener("click", function(e){
    //pergunta, direita 
    var wholeView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        right: 0,
        layout: "horizontal",
        top: "10px",
        layout: "vertical"
    });
    var nameTag = Ti.UI.createLabel({
        text: "Eu",
        font:{
            fontFamily: "GoodTimesRg-Regular",
            fontSize: 30,
            fontWeight: "bold"
        },
        right: "10px",
        top: 0,
        color: "white"
    });
    wholeView.add(nameTag);
    var sizeView = Ti.UI.createView({
        width: "70%",
        height: Ti.UI.SIZE,
        right: "10px"
    });
    var answerView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        backgroundGradient: {
            type: 'linear',
            colors: [
                '#2d198f', '#135d9c'
            ],
            startPoint: {
                x: '0%',
                y: '0%'
            },
            endPoint: {
                x: '0%',
                y: '100%'
            },
            backFillStart: true
        },
        right: 0
    });
    var answer = Ti.UI.createLabel({
        text: questionToSend[$.question2.title],
        color: "white",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        right: "10px",
        left: "10px",
        top: "10px",
        font: {
            fontFamily: "GoodTimesRg-Regular",
            fontSize: 30
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT
    });
    answerView.add(answer)
    sizeView.add(answerView);
    wholeView.add(sizeView);
    $.chat.add(wholeView);
    makeChanges($.question2.title);
});

var firstRun = true;
//add answer to the chat view. Change questions on buttons and add the questions already made into an array to track what is missing
function makeChanges(question){
    //Alloy.createController("postExp").getView().open();
    //Lourenço, esquerda, adding answer to the question into the chat view
    if (question=="Como te chamas?" && firstRun){
        initialPath = 0;
        firstRun = false;
    }else if(question =="No espaço?" && firstRun){
        initialPath = 1;
        firstRun = false;
    }
    //foreach loop because some questions have more than 1 text bubble answer
    answers[question].forEach(function(element){
        var wholeView = Ti.UI.createView({
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            left: 0,
            layout: "vertical",
            top: "10px",
        });
        var nameTag = Ti.UI.createLabel({
            text: lourencoName,
            font:{
                fontFamily: "GoodTimesRg-Regular",
                fontSize: 30,
                fontWeight: "bold"
            },
            left: "10px",
            top: 0,
            color: "white"
        });
        wholeView.add(nameTag);
        var sizeView = Ti.UI.createView({
            width: "70%",
            height: Ti.UI.SIZE,
            left: "10px"
        });
        var answerView = Ti.UI.createView({
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            backgroundGradient: {
                type: 'linear',
                colors: [
                    '#3ee8fa', '#185359'
                ],
                startPoint: {
                    x: '0%',
                    y: '0%'
                },
                endPoint: {
                    x: '0%',
                    y: '100%'
                },
                backFillStart: true
            }
        });
        var answer = Ti.UI.createLabel({
            text: element,//answers[question],
            color: "white",
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            left: "10px",
            top: "10px",
            font: {
                fontFamily: "GoodTimesRg-Regular",
                fontSize: 30
            },
        });
        answerView.add(answer)
        sizeView.add(answerView);
        //add photos and video here depending of the value
        if(element == "video"){ //in case of video
            var videoButton = Ti.UI.createButton({
                width: "50%",
                height: "6%",
                title: "Ver video",
                backgroundImage: "/squareButton.png",
                color: "white"
            });
            videoButton.addEventListener("click", function(e){
                var activeMovie = Titanium.Media.createVideoPlayer({
                    autoplay: true,
                    fullscreen: true,
                    showsControls: false,
                    scalingMode: Titanium.Media.VIDEO_SCALING_RESIZE_ASPECT,
                    url: "/Comp_1.mp4"
                });
                var closeButton = Ti.UI.createButton({
                    title: "Fechar",
                    backgroundImage: "/roundButton.png",
                    height: 100,
                    width: 100,
                    bottom: 0,
                    right: 0,
                    color: "white"
                });
                closeButton.addEventListener('click', function() {
                    activeMovie.hide();
                    activeMovie.release();
                    activeMovie = null;
                });
            
                activeMovie.add(closeButton);
            });
            sizeView.add(videoButton);
        }else if(element == "foto quinta"){ //photo of quinta
            var photo = Ti.UI.createImageView({
                height: "50%",
                image: "/portaSerra.jpg"
            })
            sizeView.add(photo);
        }else if(element == "foto livro"){ // photo of the book
            var photo = Ti.UI.createImageView({
                height: "50%",
                image: "/bookFront.jpg"
            })
            sizeView.add(photo);
        }
        wholeView.add(sizeView);
        $.chat.add(wholeView);
        setTimeout(() => {
            $.chat.scrollToBottom();
        }, 500)    
    });

    //check next questions
    //end when "E depois? O que faço?" is asked
    if(question == "Ajudar"){
        Alloy.createController("postExp").getView().open();
    }
    if(question == "E depois? O que faço?"){
        $.question1.title = "Ajudar";
        return
    }else{
        nextQuestions = questions[question];
        $.question2.show();
        $.question1.show();
        //what to show
        $.question1.title = nextQuestions[0];
        $.question2.title = nextQuestions[1];
        console.log(initialPath);
        if($.question2.title == "hide"){ //show only 1 question
            $.question2.hide();
        }
        if($.question1.title == "Como te chamas?"){
            lourencoName = "Lourenço";
        }
        //branching mechanics
        if((question == "O futuro é como nos filmes?" || question == "Isso é muito estranho") && initialPath == 1){
            $.question1.title = "Como te chamas?";
            $.question2.hide();
        }else if(question == "Como te chamas?" && initialPath == 1){
            $.question1.title = "O que vai acontecer?";
            $.question2.hide();
        }
    }
    
}


function firstToRun(firstMessage){
    var wholeView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        left: 0,
        layout: "vertical",
        top: "10px",
    });
    var nameTag = Ti.UI.createLabel({
        text: lourencoName,
        font:{
            fontFamily: "GoodTimesRg-Regular",
            fontSize: 30,
            fontWeight: "bold"
        },
        left: "10px",
        top: 0,
        color: "white"
    });
    wholeView.add(nameTag);
    var sizeView = Ti.UI.createView({
        width: "70%",
        height: Ti.UI.SIZE,
        left: "10px"
    });
    var answerView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        backgroundGradient: {
            type: 'linear',
            colors: [
                '#3ee8fa', '#185359'
            ],
            startPoint: {
                x: '0%',
                y: '0%'
            },
            endPoint: {
                x: '0%',
                y: '100%'
            },
            backFillStart: true
        }
    });
    var answer = Ti.UI.createLabel({
        text: firstMessage,
        color: "white",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        left: "10px",
        top: "10px",
        font: {
            fontFamily: "GoodTimesRg-Regular",
            fontSize: 30
        },
    });
    answerView.add(answer)
    sizeView.add(answerView);
    wholeView.add(sizeView);
    $.chat.add(wholeView);
}