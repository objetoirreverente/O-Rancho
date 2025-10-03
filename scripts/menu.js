coletaHabilitado = true;

function modal(text){
 if(document.getElementById('modal').style.display == 'none'){
   document.getElementById('content').innerHTML = text;
   manipulacoes("mostrar", 'modal');
   
   var changeOpacity = setInterval(function(){opacity() },50);
   var x = -0.1;
   var subindo = true;
   var termina = false;

   
   function opacity(){
    if(x < -0.1){
     subindo = true;
     if(termina){clearInterval(changeOpacity);manipulacoes("esconder", 'modal');}
    }
    if(x >= 7){
     subindo = false;
     termina = true;
    }

    if(subindo == false){ 
     x-=0.25;
     document.getElementById("modal").style.opacity =  x;
    }
    if(subindo == true){ 
     x+=0.25;
     document.getElementById("modal").style.opacity =  x;
    }
   }
 }
}

const cenas = ['Farm', 'Truck', 'Store', 'Deposito', 'Oficina', 'Memes'];
let cenaAtual = '';

function mudaCena(nome){

 for(var i = 0;i < cenas.length; i++){
  if(cenas[i] == nome){
    manipulacoes('mostrar', nome);
    cenaAtual = nome;
    //0 > cenas.toString().indexOf(nome) ? null : manipulacoes('mostrar', 'infotxt');
  }
  else{
   manipulacoes('esconder', cenas[i]);
  }
 }
}

function display_fazendinha(){
 manipulacoes('mostrar', 'Farm');
 manipulacoes('esconder', 'Store');
 bdisplay_fazendinha=true;

}


function display_vendinha(){
 manipulacoes('esconder', 'Inicial');
 manipulacoes('esconder', 'Farm');

 manipulacoes('mostrar', 'Store');
}

var onFade = false;
function fade(option, scene, scene2){
 manipulacoes('mostrar', 'fade');
   if(!onFade){
    var changeOpacity = setInterval(function(){opacity() },50);
    onFade= true;
   }

   var x;
   
   function opacity(){
    if(option=='in'){

     if(x == undefined){x = 1;}
     document.getElementById("fade").style.opacity =  x;
     x-=0.1;     
     if(x<=-1){
      onFade = false;
      manipulacoes('esconder', 'fade');
      if(tut == 6){manipulacoes('mostrar', 'tutSeta');}
      clearInterval(changeOpacity);
     
     }
    }
    if(option=='out'){
     if(x == undefined){x = 0;}
     document.getElementById("fade").style.opacity =  x; 
     
     x+=0.1;     
     if(x>=1){
      manipulacoes('esconder', scene2);
      onFade = false;
      clearInterval(changeOpacity);
      if(scene=='Farm'){display_fazendinha();}else{manipulacoes('mostrar', scene);}
      fade('in');
     }
    }
 } 

}


const fruitV = ['Imagens/vendinha/apple.PNG', 'Imagens/vendinha/banana.PNG', 'Imagens/vendinha/acaiFruto.PNG'];
let index = 0;

function esquerda(indexc){
 if(index == 0){
  index = fruitV.length - 1;
 }
 else{
  index--;
 }

 manipulacoes('trocar', 'frutaV' + indexc, fruitV[index]);
}

function direita(indexc){
 if(index == fruitV.length - 1){
  index = 0;
 }
 else{
  index++;
 }

 manipulacoes('trocar', 'frutaV' + indexc, fruitV[index]);
}

/*var baixo = true;
function infoMenu(){
 switch(baixo){
  case true:
   manipulacoes('mostrar', 'info');
   manipulacoes('trocar', 'dropIcon', 'Imagens/fazenda/up_icon.PNG');
   baixo = false;
   break;
  case false:
   manipulacoes('esconder', 'info');
   manipulacoes('trocar', 'dropIcon', 'Imagens/fazenda/down_icon.PNG');
   baixo = true;
 }
}*/

function moveElement(element, marginLeft, marginTop){
 document.getElementById(element).style.marginLeft = marginLeft;
 document.getElementById(element).style.marginTop = marginTop;
}

function openUpg(div){
 document.getElementById(div).style.visibility = 'visible';
 document.getElementById('clickArea').style.cursor = 'default';
}

function closeUpg(div){
 document.getElementById(div).style.visibility = 'hidden';
}

class ctxMenu{
 constructor(DOM, titulo, src, text, theme){
  this.tpTheme = theme;
  this.text = text;
  this.h4 = titulo;
  this.imgSrc = src;
  this.DOM = DOM; //Elemento que o mouse vai passar em cima

  const showBind = this.Show.bind(this);
  const removeBind = this.Remove.bind(this);
  this.removeBind = removeBind;
  this.followBind = undefined;
  
  this.DOM.addEventListener('mouseenter', showBind);
  this.DOM.addEventListener('mouseleave', this.removeBind);
 }

 Show(){
  const div = document.createElement('div');
  const infoWrapper = document.createElement('div');
  const ctxWrapper = document.createElement('div');

  div.classList.add('contextMenu');
  div.classList.add('tooltip');

  switch(this.tpTheme){
   case 'Basic':
    infoWrapper.classList.add('infoWrapperBasic');
    break;
   default:
    infoWrapper.classList.add('infoWrapper');
  }
  ctxWrapper.classList.add('ctxWrapper');

  if(this.h4){
   const h4 = document.createElement('h4');  
   div.appendChild(h4);
   h4.innerHTML = this.h4;
   h4.style.margin =  0;
  }

  div.style.position = 'absolute'; 
  div.style.zIndex = 21;

  div.appendChild(ctxWrapper); 
  ctxWrapper.appendChild(infoWrapper);

  if(this.imgSrc){
   const img = document.createElement('img');
   img.id = 'ctxImg';
   img.src = this.imgSrc; 
   ctxWrapper.appendChild(img);
  }

  const follow = this.Follow.bind(this);
  this.followBind = follow;
  document.addEventListener('mousemove', follow);

  infoWrapper.innerHTML = this.text;
  document.body.appendChild(div);
    console.log(infoWrapper);
 }

 Follow(){
  const element = document.getElementsByClassName('tooltip')[0];
  element.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
 }

 Remove(){
  const element = document.getElementsByClassName('tooltip')[0];
  element.remove();
  document.removeEventListener('mousemove', this.followBind);
 }

 Update(text){
  this.text = text;
 }
}

const ctxMacieira = new ctxMenu(document.getElementsByClassName('shopItens')[0],
 `Macieira`,
 `Imagens/fazenda/shop/sementeMaca.PNG`,
 `<p>Máximo de colheitas: ${plantacao.macieira.colheitasMax}</p>
  <p>Estagio adulto: ${plantacao.macieira.grownStage}</p>
  <p>Frutos por colheita: ${plantacao.macieira.frutoQ}</p>
  <p>Estagios de crescimento: ${plantacao.macieira.qestagios}</p>`
);

const ctxBananeira = new ctxMenu(document.querySelectorAll('.shopItens')[1],
 `Bananeira`,
 `Imagens/fazenda/shop/mudaBanana.PNG`,
 `<p>Máximo de colheitas: ${plantacao.bananeira.colheitasMax}</p>
  <p>Estagio adulto: ${plantacao.bananeira.grownStage}</p>
  <p>Frutos por colheita: ${plantacao.bananeira.frutoQ}</p>
  <p>Estagios de crescimento: ${plantacao.bananeira.qestagios}</p>`
);

const ctxAcai = new ctxMenu(document.querySelectorAll('.shopItens')[2],
 `Acaizeiro`,
 `Imagens/fazenda/shop/sementeAcai.PNG`,
 `<p>Máximo de colheitas: ${plantacao.acaizeiro.colheitasMax}</p>
  <p>Estagio adulto: ${plantacao.acaizeiro.grownStage}</p>
  <p>Frutos por colheita: ${plantacao.acaizeiro.frutoQ}</p>
  <p>Estagios de crescimento: ${plantacao.acaizeiro.qestagios}</p>`
);

let tpMiddle = new ctxMenu(document.querySelector('.middleHolder'),
 false,
 false,
 `<p>Resistencia: ${plantacao.macieira.Resistencia.points}</p>
  <p>Longevidade: ${plantacao.macieira.Longevidade.points}</p>
  <p>Desenvolvimento: ${plantacao.macieira.Desenvolvimento.points}</p>`,
 `Basic`
);

const upCircleUnits = document.getElementsByClassName('upCircleUnit');
const unitsArr = [];

for(var c = 0;c < upCircleUnits.length; c++){
 const upTypeArr = upCircleUnits[c].className.split(" ");
 let uType = upTypeArr[upTypeArr.length - (upTypeArr.length == 3 ? 1 : 2)];

 switch(uType[0]){
  case 'r':
   uType = "Resistencia";
   break;
  case 'd':
   uType = "Desenvolvimento";
   break;
  case 'l':
   uType = "Longevidade";
   break;
 }

 const tpUnit = new ctxMenu(upCircleUnits[c],
  false,
  false,
  `<p>${uType} +1</p>`,
  'Basic'
 );

 unitsArr.push(tpUnit);
}




