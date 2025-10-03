const circleUnits = document.getElementsByClassName('upCircleUnit');

for(var c = 0;c < circleUnits.length;c++){
 circleUnits[c].addEventListener('click', acaoCirUni);
 
 if(c < 5){
  plantacao.macieira.Resistencia.DOM.push(circleUnits[c]);
 }
 else if(c >= 5 && c < 10){
  plantacao.macieira.Desenvolvimento.DOM.push(circleUnits[c]);
 }
 else if(c >= 10 && c < 15){
  plantacao.macieira.Longevidade.DOM.push(circleUnits[c]);
 }
}


function acaoCirUni(){
 const obj = event.target;
 const upTypeArr = obj.className.split(" ");
 const upType = upTypeArr[upTypeArr.length - (upTypeArr.length == 3 ? 1 : 2)];
 const middleBackground = window.getComputedStyle(document.getElementsByClassName('middle')[0], null).getPropertyValue('background-image');
 var plantacaoKey;

 switch(middleBackground.split('/').pop().slice(0, 9)){
  case 'apple.PNG':
   plantacaoKey = 'macieira';
   break;
  case 'bananeira.PNG':
   plantacaoKey = 'bananeira';
   break;
  case 'acaizeiroFruto.PNG':
   plantacaoKey = 'acaizeiro';
   break;
 }

 let skill;

 switch(upType[0]){
  case 'r':
   skill = "Resistencia";
   break;
  case 'd':
   skill = "Desenvolvimento";
   break;
  case 'l':
   skill = "Longevidade";
   break;
 }

 const sk_lastUp = plantacao[plantacaoKey][skill].lastUp;

 const canUpgUnit = parseInt(upType[1]) >= sk_lastUp && parseInt(upType[1]) <= sk_lastUp + 1 && plantacao[plantacaoKey].newPoint > 0; 

 if(obj.style.backgroundColor != 'rgb(235, 157, 0)' && canUpgUnit){
   const ptDOM = document.querySelector('#lvlpoints');
   obj.style.backgroundColor = 'rgb(235, 157, 0)';
   plantacao[plantacaoKey][skill].lastUp = parseInt(upType[1]);
   plantacao[plantacaoKey][skill].points++;
   plantacao[plantacaoKey].newPoint--;
   ptDOM.innerHTML = '+' + plantacao[plantacaoKey].newPoint;
   

   const text = `<p>Resistencia: ${plantacao.macieira.Resistencia.points}</p>
                 <p>Longevidade: ${plantacao.macieira.Longevidade.points}</p>
                 <p>Desenvolvimento: ${plantacao.macieira.Desenvolvimento.points}</p>`;
   tpMiddle.Update(text);

   plantacao[plantacaoKey][skill].DOM[sk_lastUp].style.cursor = 'default';
   plantacao[plantacaoKey][skill].DOM[sk_lastUp].classList.remove('upCircleUnitHover');
   if(!plantacao[plantacaoKey].newPoint){
    ptDOM.style.visibility = 'hidden';
    resetLvlColor();
   }
   else{
    plantacao[plantacaoKey][skill].DOM[sk_lastUp+1].style.backgroundColor = "rgb(203 151 71)";
   }
 }

}

function resetLvlColor(){
 for(var c = 0;c < circleUnits.length;c++){
  if(circleUnits[c].style.backgroundColor == 'rgb(203, 151, 71)'){
   circleUnits[c].style.backgroundColor = '#8b652c';
  }
 }	
}



