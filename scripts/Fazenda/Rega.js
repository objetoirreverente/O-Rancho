function waterStart(especie){
  //especie é o objeto que é criado quando o usuario seleciona uma semente para plantar
  especie.water = setInterval(()=>{
   var r = 0;
   //Dependendo da estação a barrinha da água encolhe com velocidades diferentes
   switch(document.getElementById('estacaotxt').innerHTML){
    case "OUTONO":
     r = 0.05;
     break;
    case "PRIMAVERA":
     r = 0.1;
     break;
    case "INVERNO":
     r = 0.01;
     break;
    case "VERAO":
     r = 0.2;
     break;  
   }
   //Barrinha da agua(barrinha azul)
   var styleindex = document.getElementById('mbarw' + especie.index).style;

   //Diminui a barrinha
   styleindex.top = (parseFloat(styleindex.top) + r) + 'px';
   styleindex.height = (parseFloat(styleindex.height) - r) + 'px';

   //Se a barrinha diminuir ou aumentar demais, esse bloco será executado
   if(parseFloat(styleindex.height) <= 0.05 || parseFloat(styleindex.height) >= 44){

    //Esconde a div da barrinha de agua.Nessa div existem duas barras que são sobrepostas.
    document.getElementsByClassName('duracaow')[especie.index].style.display = 'none';
    
    if(especie.estagio > 1){
     manipulacoes('trocar', 'plantarSpot'+ especie.index, 'Imagens/fazenda/'+ especie.especie.name + '/' + especie.especie.name + (especie.estagio-1) + 'Dead.PNG');
    }

    document.getElementById("plantar" + especie.index).style.visibility="visible";
    manipulacoes("mostrar", 'axe' + especie.index);
    manipulacoes('esconder', 'display'+ especie.index);
    manipulacoes('esconder', 'plantar'+ especie.index);
    document.getElementById("display"+ especie.index).style.visibility="hidden";
    this.setDurationBar(especie);

    especie.regavel(false);    
    
    especie.temp.stop();
    especie.estagiotemp.stop();  
    clearInterval(especie.water);
   }
  }, 10);
 }