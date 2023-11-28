// Declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas 

const questions = [
    {
        "question": "PHP foi desenvolvido para qual fim?",
        "answers": [
            {
                "answer": "Back-end",
                "correct": true
            },
            {
                "answer": "Front-end",
                "correct": false
            },
            {   
                "answer": "Sistema Operacional",
                "correct": false
            }, 
            {
                "answer": "Banco de dados",
                "correct": false
            }
        ]
    },
    {
        "question": "Uma forma de declarar variáveis em JavaScript",
        "answers": [
            {
                "answer": "$var",
                "correct": false
            },
            {
                "answer": "let",
                "correct": true
            },
            {
                "answer": "$const",
                "correct": false
            },
            {
                "answer": "#let",
                "correct": false
            }
        ]
    },
    {
        "question": "Qual o seletor de id no CSS?",
        "answers": [
            {
                "answer": "$",
                "correct": false
            },
            {
                "answer": "@",
                "correct": false
            },
            {
                "answer": "#",
                "correct": true
            },
            {
                "answer": ".",
                "correct": false
            }
        ]
    }
];

// Substituição do quizz para a primeira pergunta
function init() {
    // Criar a primeira pergunta
    createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i) {
    // Limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function(btn) {
        btn.remove();
    });

    // Alterar o texto da pergunta
    const questionText = document.querySelector("#question-text");
    const questionNumber = document.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // Insere alternativas 
    questions[i].answers.forEach(function(answer, i){

        // Cria o template do botão do quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
        
        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // Remover hide e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-tempalte");

        // Inserir alternativas na tela
        answersBox.appendChild(answerTemplate);

        // Inserindo evento de clique no botão
        answerTemplate.addEventListener("click", function() {
            checkAnswer(this);
        });
    });

    // Incrementar o número da questão
    actualQuestion++;
}

// Verificando resposta do usuário
function checkAnswer(btn) {
    // Selecionando todos os botões
    const buttons = answersBox.querySelectorAll("button");

    // Verifica se a resposta está correta e adiciona classes nos botões
    buttons.forEach(function(button) {
        if(button.getAttribute("correct-answer") === "true") {
            button.classList.add("correct-answer");

            // Checa se o usuário acertou a pergunta
            if(btn === button) {
                // Incremento dos pontos
                points++;
            }
        } else {
            button.classList.add("wrong-answer");
        }
    });
    
    // Exibir próxima pergunta
    nextQuestion();
}


// Exibe a próxima pergunta do Quizz
function nextQuestion() {
    // Timer para os usuários ver as respostas 
    setTimeout(function() {

        // Verifica se ainda há perguntas
        if(actualQuestion >= questions.length) {
            // Apresenta a mensagem de sucesso
            showSuccessMessage();
            return;
        }

        createQuestion(actualQuestion);
    }, 1500);
}

// Exibe a tela final
function showSuccessMessage() {
    hideOrShowQuizz();

    // Trocar dados da tela de sucesso

    // Calcular o Score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    // Alterar o número de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    // Alterar o total de perguntas
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
}

// Mostra ou esconde o score
function hideOrShowQuizz() {
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

// Reiniciar Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {
    
    // Zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();
});
// Inicialização do Quizz
init();

