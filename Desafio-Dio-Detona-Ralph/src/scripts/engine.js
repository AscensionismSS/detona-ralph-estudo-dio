const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        
    },

    values:{
        currentTime: 60,
        gameVelocity:1000,
        hitPosition:0,
        result:0,
        totalAttempts: 0,
        lives: 3, // Máximo de vidas é 3
    },

    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
        removeLife: setInterval(removeLife, 10000),
    },
};



function removeLife() {
    let hitPercentage = (state.values.result / state.values.totalAttempts) * 100;
    if (hitPercentage < 60 && state.values.lives > 0) {
        state.values.lives--;
        state.view.lives.textContent = "X" + state.values.lives; // Adiciona o "X" na frente das vidas
    }
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime === 0 || state.values.lives === 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.removeLife);
        alert("Game Over! o seu resultado foi:" + state.values.result);
        restartGame();  // Chama a função para reiniciar o jogo
    }
}


function randomSquare(){
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
    state.values.totalAttempts++;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) =>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
          
            }
        });
    });
}

function restartGame() {
    if (confirm("Deseja reiniciar o jogo?")) {
        // Reinicia as variáveis do jogo
        state.values.currentTime = 60;
        state.values.result = 0;
        state.values.totalAttempts = 0;
        state.values.lives = 3;

        // Atualiza a visualização do jogo
        state.view.timeLeft.textContent = state.values.currentTime;
        state.view.score.textContent = state.values.result;
        state.view.lives.textContent = "X" + state.values.lives; // Adiciona o "X" na frente das vidas

        // Reinicia os intervalos do jogo
        state.actions.timerId = setInterval(randomSquare, 1000);
        state.actions.countDownTimerId = setInterval(countDown, 1000);
        state.actions.removeLife = setInterval(removeLife, 10000);

        // Mensagem breve ao reiniciar o jogo
        alert("Bem-vindo ao jogo! Você tem 3 vidas. A cada 10 segundos, se a porcentagem de acertos for menor que 60%, você perderá uma vida. O jogo termina quando o tempo acaba ou quando você perde todas as vidas. Boa sorte!");
    }
}

function initialize() {
    alert("Bem-vindo ao jogo! Você tem 3 vidas. A cada 10 segundos, se a porcentagem de acertos for menor que 60%, você perderá uma vida. O jogo termina quando o tempo acaba ou quando você perde todas as vidas. Boa sorte!");
    addListenerHitBox();
}

initialize();
