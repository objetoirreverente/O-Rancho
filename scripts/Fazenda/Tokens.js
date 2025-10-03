const Tokens = document.getElementsByClassName('Tokens');


function addToken(id, fruto, ...type){
   const currentToken = Tokens[id];
   const canim = document.createElement('div');

   canim.classList.add('canim');
   currentToken.appendChild(canim);   

 switch(fruto.especieName){
  case "bananeira":
   fruto.src = "Imagens/vendinha/banana.PNG";
   break;

  case "acaizeiro":
   fruto.src = "Imagens/vendinha/acaiFruto.PNG";
   break;
  
  case "arvore":
   fruto.src = "Imagens/vendinha/apple.PNG";
   break;
 }

 type.forEach((c)=>{
  if(c == 'qFruto'){
    const frutos = document.createElement('div');
    frutos.classList.add('frutos');
    canim.appendChild(frutos);

    const img = document.createElement('img');
    img.src = fruto.src;
    img.classList.add('fruitimg');
    frutos.appendChild(img);

    const p = document.createElement('p');
    p.style.paddingLeft = '5px';
    p.style.margin = '0px';
    p.innerHTML = '+' + fruto.quantidade;
    frutos.appendChild(p);
  }
   
  if(c == 'exp'){
    const exp = document.createElement('div');
    exp.classList.add('exp');
    exp.innerHTML = '+' + fruto.exp + ' exp';
   
   canim.appendChild(exp);
  }
 });

 let count = 0;
 let opacityUp = true;

 const interval = setInterval(()=>{
  if(opacityUp && count < 2){
   count += 0.06;
  }
  else{
   opacityUp = false;
  }

  if(!opacityUp && count >= 0){
   count -= 0.03;
  }
  else if(count <= 0){
   clearInterval(interval);
   canim.style.translate = `initial`;
   canim.remove();
   return;
  }
  
  canim.style.opacity = count;
  canim.style.translate = `0px -${Math.abs(count)*15}px`;
 },20);

}