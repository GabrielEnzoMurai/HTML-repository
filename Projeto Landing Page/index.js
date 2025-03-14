var leonardo = window.document.getElementById("leonardo")
var samantha = window.document.getElementById("samantha")
var bruna = window.document.getElementById("bruna")
var setaDireita = window.document.getElementById("setaDireita")
var setaEsquerda = window.document.getElementById("setaEsquerda")

function rolarParaDireita() {
    leonardo.style = "display: none"
    bruna.style = "display: flex"
    setaEsquerda.style = "display: flex"
    setaDireita.style = "display: none margin-top: 55%"
}

function rolarParaEsquerda () {
    leonardo.style = "display: flex"
    bruna.style = "display: none"
    setaEsquerda.style = "display: none margin-top: 55%"
    setaDireita.style = "display: flex"

}