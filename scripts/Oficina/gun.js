const round = [0,0,0,0,0,0,0,0];

var myTurn;
var myTurnB = true;

function areaEvent(e){
 console.log(e.target.id);
}

function addEvent(){
 const areas = document.getElementsByClassName('areaTiro');
 for(let i = 0;i<areas.length;i++){
  areas[i].addEventListener('click', areaEvent);
 }
}


function gunt(){
 const number = Math.round(Math.random() * 7);
 
 round[number] = 1;

 manipulacoes('esconder', 'gunTable');

 console.log('Animacao roleta');
 
 addEvent();
 
 var answ;

 setTimeout(()=>{answ = confirm(`Começou a roleta russa poha. Preste bem atenção, se morrer, tudo estará acabado, o progresso será perdido. Se o caba morrer, os upgrades serão mantidos, porem ficará impedido de fazer novos upgrades!`)}, 5000);

 console.log(answ);
 //Executar após escolha do modal

 setTimeout(
 ()=>{
 if(answ){
  document.getElementById('Oficina').style.cursor = "url('Imagens/oficina/mira.PNG'), auto";

  manipulacoes('mostrar', 'gunHand');

  const gun = document.querySelector('#gunHand');
  const gunol = gun.offsetLeft;
  
  let leftMax, rightMax;
  let handRight, handMiddle, handLeft;
 
  myTurn = (e)=>{
     leftMax = e.clientX <= 5;
     rightMax = e.clientX >= screen.availWidth - gun.offsetWidth;

     if(rightMax){
      gun.style.left = gunol + 'px';
    
     }
     else{
      gun.style.left = e.clientX - gunol - gun.offsetWidth/4 + 'px';
     }
  }  

  document.addEventListener('mousemove', myTurn);
  document.body.addEventListener('click', atira);
 }}, 5000);
}


function yourTurn(){
 document.removeEventListener('mousemove', myTurn);
 document.body.removeEventListener('click', atira);

 console.log('Animaçao youtuber');

 setTimeout(()=>{
  document.body.addEventListener('click', atira);
  document.body.click();
  document.addEventListener('mousemove', myTurn);
  document.getElementById('Oficina').style.cursor = "url('Imagens/oficina/mira.PNG'), auto";
  manipulacoes('mostrar', 'gunHand');
  myTurnB = true;
 },5000);
}


var atirou = false;
function atira(){
   if(round[0]){
    console.log('Tiro!');
    atirou = true;
    document.body.removeEventListener('click', atira);
    document.removeEventListener('mousemove', myTurn);
    manipulacoes('esconder', 'gunHand');
    document.getElementById('Oficina').style.cursor = 'default';
    myTurnB ? cabaMorreu() : Morri(); 
   }
   else{
    console.log('gira o tambor\ntambor: ' + round);
    for(var i = 0;i<8;i++){
     if(i == 7) round[i] = round[0];
     else round[i] = round[i+1];     
    }
   }
 if(myTurnB && !atirou){
  console.log('myTurb');
  document.body.removeEventListener('click', atira);
  myTurnB = false;
  manipulacoes('esconder', 'gunHand');
  document.getElementById('Oficina').style.cursor = 'default';
  yourTurn();
 }
}

var cabaMorreuB = false;
function cabaMorreu(){
 const maizinho = document.querySelectorAll('.maizinho');

 cabaMorreuB = true;

 document.querySelector('#overlayMorreu').style.display = 'block';

 for(let i = 0; i < maizinho.length; i++){
  maizinho[i].style.display = 'none';
 }

 document.getElementById('clickArea').style.cursor = "url('Imagens/cursores/cavera.PNG'), auto";

}

function Morri(){
 window.location.reload();
}