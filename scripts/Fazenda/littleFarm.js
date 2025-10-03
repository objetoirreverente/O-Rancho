var bdisplay_fazendinha = false;
var tut = 0;

function updateDisplay(hor, min, seg, horID, minID, segID){
 if(hor<10){
  document.getElementById(horID).innerHTML = "0" + hor;
 }
 else{
  document.getElementById(horID).innerHTML = hor;
 }

 if(min<10){
  document.getElementById(minID).innerHTML = "0" + min;
 }
 else{
  document.getElementById(minID).innerHTML = min;
 }

 if(seg<10){
  document.getElementById(segID).innerHTML = "0" + seg;
 }
 else{
  document.getElementById(segID).innerHTML = seg;
 }
}

function clsSW(){
 if(tut != 1){
  manipulacoes('esconder', 'swindowholder');
 }
}

function opnSW(){
 manipulacoes('mostrar', 'swindowholder');
 if(tut == 0){
  moveElement('tutSeta', '220px', '40px');
  tut++;	
 }
}

function showSeeds(){
 manipulacoes('mostrar', 'Sementes');
 manipulacoes('esconder', 'Fertilizantes');
}

function showFerts(){
 if(tut > 1){
  manipulacoes('mostrar', 'Fertilizantes');
  manipulacoes('esconder', 'Sementes');
 }
}


const inverno = new Temporizador();
const verao = new Temporizador();
const outono = new Temporizador();
const primavera = new Temporizador();

function estacoes(){
 const s = 20;
 const m = 0;
 const h = 0;
 outono.on(s,null,()=>{
  manipulacoes('trocar', 'estacao', 'Imagens/fazenda/floco.PNG');
  manipulacoes('escrever', 'estacaotxt', 'INVERNO');

  inverno.on(s,null,()=>{
   manipulacoes('trocar', 'estacao', 'Imagens/fazenda/flor.PNG');
   manipulacoes('escrever', 'estacaotxt', 'PRIMAVERA');

   primavera.on(s,null,()=>{
    manipulacoes('trocar', 'estacao', 'Imagens/fazenda/sol.PNG');
    manipulacoes('escrever', 'estacaotxt', 'VERAO');
    verao.on(s,null,()=>{
     manipulacoes('trocar', 'estacao', 'Imagens/fazenda/folhaOutono.PNG');
     manipulacoes('escrever', 'estacaotxt', 'OUTONO');
     estacoes();
    });
   });
  });
 });
}

estacoes();
