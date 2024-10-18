// document.querySelector("") para pegar a tag pela classe
// e tambem uma das forma de pegar elementos do html.

const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const starPauseBt = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
const inicarOuPausarBt = document.querySelector("#start-pause span");
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon");
const tempoNaTela = document.querySelector("#timer");

const audioPlay = new Audio("sons/play.wav");
const audioPausa = new Audio("sons/pause.mp3");
const audioTempoFinalizado = new Audio("sons/beep.mp3");
const musica = new Audio("sons/luna-rise-part-one.mp3");


let tempoDecorridoEmSegundos = 1500;
let inetrvaloId = null

musica.loop = true // musica vai tocar permanente

musicaFocoInput.addEventListener("change", () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto("foco")
    focoBt.classList.add("active")
});

curtoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto("descanso-curto")
    curtoBt.classList.add("active")
});

longoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto("descanso-longo")
    longoBt.classList.add('active')
});


function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove("active")
    })
    html.setAttribute("data-contexto", contexto)
    banner.setAttribute("src", `imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade, <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<strong class="app__title-strong">faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()   // áudio executado quando o cronometro finalizar ou chegar a zero
        alert("Tempo finalizado!")
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo();

}

starPauseBt.addEventListener("click", iniciarOuPausar)



function iniciarOuPausar() {
    if(inetrvaloId){
        audioPausa.play()   // áudio executado quando o cronometro for pausado
        zerar();
        return
    }
    audioPlay.play()   // áudio executado quando cronometro inicicar
    inetrvaloId = setInterval(contagemRegressiva, 1000)
    inicarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute("src", "imagens/pause.png");
}

function zerar(){
    clearInterval(inetrvaloId)
    inicarOuPausarBt.textContent = "Começar"
    iniciarOuPausarBtIcone.setAttribute("src", "imagens/play_arrow.png");
    inetrvaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString("pt-br", {minute: "2-digit", second: "2-digit"})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();