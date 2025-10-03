//Classe para criar timers personalizados.
class Temporizador{
 constructor(display){
  this.display = display;
  this.temporizador = undefined;
  this.intervaloAtual = 0;
  this.intervaloTotal = 0;
  this.noFinal = false;
  this.func = false;
 }
 
 stop(){
  clearInterval(this.temporizador);
 }

on(s, func, noFinal) {
    this.noFinal = noFinal;
    this.func = func;

    const date = new Date();
    //const _hora = parseInt(h) * 60 * 60;
   // const _minuto = parseInt(m) * 60;
    const tempoSegundos = parseInt(s);

    const startTime = Date.now(); // Hora de início em milissegundos
    const endTime = startTime + tempoSegundos * 1000; // Hora que termina em milissegundos

    this.intervaloTotal = Math.max(0, endTime - startTime);

    const getTimeFormatado = () => {
        const now = Date.now(); // Hora atual
        const diferença = Math.max(0, endTime - now); // Diferença de tempo restante
        const diferençaSegundos = Math.floor((diferença / 1000) % 60);
        const diferençaMinutos = Math.floor((diferença / 1000 / 60) % 60);
        const diferençaHoras = Math.floor((diferença / 1000 / 60 / 60));

        const fsegundo = diferençaSegundos > 9 ? diferençaSegundos : "0" + diferençaSegundos;
        const fminuto = diferençaMinutos > 9 ? diferençaMinutos : "0" + diferençaMinutos;
        const fhora = diferençaHoras > 9 ? diferençaHoras : "0" + diferençaHoras;

        return { hora: fhora, minuto: fminuto, segundo: fsegundo, intervaloAtual: diferença };
    };

    const atualizaDisplay = (display, display2) => {
        const tempo = getTimeFormatado();

        if (display) {
            display.innerHTML = `${tempo.hora}:${tempo.minuto}:${tempo.segundo}`;
        }
        if (display2) {
            display2.innerHTML = `${tempo.hora}:${tempo.minuto}:${tempo.segundo}`;
        }
    };

    atualizaDisplay(this.display, this.display2);

    this.temporizador = setInterval(() => {
        this.intervaloAtual = getTimeFormatado().intervaloAtual;
        atualizaDisplay(this.display, this.display2);

        // Chama a função passada, se houver
        if (func) func();

        // Verifica se o tempo acabou
        if (Date.now() >= endTime) {
            if (noFinal) noFinal();
            clearInterval(this.temporizador);
        }
    }, 10); // Atualiza a cada segundo
}

}

function manipulacoes(opcao, objeto, texto){
 if(opcao == "mostrar"){
  document.getElementById(objeto).style.display='block';
 }
 if(opcao == "esconder"){
  document.getElementById(objeto).style.display="none";
 }
 if(opcao == "escrever"){
  document.getElementById(objeto).innerHTML=texto;
 }
 if(opcao == "trocar"){
  //if(objeto == 'frutaV0'){console.log(document.getElementById(objeto));}
  document.getElementById(objeto).src=texto;
 }
}

//Retorna o nome de um arquivo a partir de um caminho
function fileFromPath(src){
  const arr = src.split('/');
  return arr.pop();
}

//Executa uma função aleatoriamente a partir de uma probabilidade
function chance(porcentagem, func){
 const number = Math.floor(Math.Random() * 99) + 1;

 if(number <= porcentagem){
  func();
 }
}

function primeiraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


