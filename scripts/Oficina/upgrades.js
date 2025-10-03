function pintaArea(att){
 const graph = document.getElementsByClassName(`upGraph ${att}`)[0].children;

 for(var i = 0; i<graph.length; i++){
  if(graph[i].style.backgroundColor != "rgb(235, 157, 0)"){
   graph[i].style.backgroundColor = "rgb(235, 157, 0)";
   break;
  }
 }
}

function upgrade(atributo){
 const txt = document.getElementById(`condicaoAtual${atributo}`);
 const maizinho = document.getElementsByClassName(`grupoUp ${atributo}`)[0].children[1];

 if(caminhao.canUpg){
  if(atributo == "capacidade"){
   caminhao[atributo].atual += 10;
   txt.innerHTML = caminhao[atributo].atual;
   pintaArea(atributo);

   if(caminhao[atributo].atual == caminhao[atributo].max) maizinho.style.display = 'none';
  }

  if(atributo == "refrigeracao"){
   caminhao[atributo].atual += 1;
   txt.innerHTML = caminhao[atributo].atual;
   pintaArea(atributo);

   if(caminhao[atributo].atual == caminhao[atributo].max) maizinho.style.display = 'none';
  }

  if(atributo == "durabilidade"){
   caminhao[atributo].atual += 1;
   txt.innerHTML = caminhao[atributo].atual;
   pintaArea(atributo);

   if(caminhao[atributo].atual == caminhao[atributo].max) maizinho.style.display = 'none';
  }

  if(atributo == "motor"){
   caminhao[atributo].atual += 1;
   txt.innerHTML = caminhao[atributo].atual;
   pintaArea(atributo);
   
   if(caminhao[atributo].atual == caminhao[atributo].max) maizinho.style.display = 'none';
  }
 
  recursos.Take(recursos.money, 100);
 }
}

const upgTxt = document.querySelectorAll('.upgradetxt');

