function Semear(especie, index){

  //const _Propriedades = especie.propriedades;
  const currentStation = document.getElementById('estacaotxt').innerHTML;
  const obj = especie[especie.name + index];


  var currentSegundos = 0;
  var _currentMinutos = 0;
  var _currentSegundos = 0;

  //Aqui é definido qual vai ser a duração do timer.Ela depende da estação atual e da espécie da planta. 
  //currentSegundos(sem underline) é o tempo do estagio
  //Criar classe para estações. Criar função estática switch?
  switch(currentStation){
   case "OUTONO":
   // _currentMinutos = especie.temposEstacoes.outono.minutos;
    _currentSegundos = especie.temposEstacoes.outono.segundos;
    currentSegundos = especie.temposEstacoes.outono.segundoE;
    break;
   case "PRIMAVERA":
   // _currentMinutos = especie.temposEstacoes.primavera.minutos;
    _currentSegundos = especie.temposEstacoes.primavera.segundos;
    currentSegundos = especie.temposEstacoes.primavera.segundoE;
    break;
   case "INVERNO":
    //_currentMinutos = especie.temposEstacoes.inverno.minutos;
    _currentSegundos = especie.temposEstacoes.inverno.segundos;
    currentSegundos = especie.temposEstacoes.inverno.segundoE;
    break;
   case "VERAO":
   // _currentMinutos = especie.temposEstacoes.verao.minutos;
    _currentSegundos = especie.temposEstacoes.verao.segundos;
    currentSegundos = especie.temposEstacoes.verao.segundoE;
    break;
  }
 
  //Se a planta ainda não for adulta(grown), então ela deve ser regada.
  if(!obj.grown){
   obj.regavel(true);
   waterStart(obj);
  }
  else{
   obj.regavel(false);
  }

  manipulacoes('esconder', 'choiceContainer' + index);

  //Cada planta tem um objeto temporizador e aqui ele é setado de fato.

  //const modDesenvolvimento = (Math.round((obj.especie.Desenvolvimento.lastUp/10) * 26));
  const modDesenvolvimento = (Math.round((especie.Desenvolvimento.lastUp/10) * 26));
  const tempoEspecie = _currentSegundos - modDesenvolvimento;
  const tempoEstagio = (especie.qestagios - especie.grownStage) * (currentSegundos - modDesenvolvimento);

  obj.temp.segundos = tempoEspecie; //O primeiro ciclo da planta tera a duração inteira
  

  //'tut' diz respeito à do fase tutorial. No caso abaixo o timer terá uma duração específica quando tut = 3
  if(tut == 3){
   manipulacoes('esconder', 'tutSeta');
   obj.temp.minutos=0;
   obj.temp.segundos=18;
   obj.estagiotemp.segundos=3;
   tut++;
  }

  //Verifica se há semente disponível para plantar ou, se ja for uma planta adulta, repetir o ciclo.
  if(especie.seed.quantidade > 0 || obj.grown){
   if(!obj.grown){
    especie.seed.Take(1);
    manipulacoes('trocar', 'plantarSpot'+ index, 'Imagens/fazenda/arvore/prantadoApenas.PNG');
    document.getElementsByClassName('duracaow')[index].style.display = 'block';
    obj.plantado = true;
    if(tut > 4){
     obj.temp.minutos = _currentMinutos; 
     obj.temp.segundos = tempoEspecie + tempoEstagio; // Duração após amadurecimento

    }  
   }
   especie.seed.Set();
   manipulacoes('esconder',"plantar" + obj.index);

   obj.temp.on(obj.temp.segundos,

   //A CADA SEGUNDO EXECUTA
   ()=>{
    
    if(obj.temp.intervaloAtual <= ((especie.qestagios - obj.estagio)/especie.qestagios) * obj.temp.intervaloTotal){
     manipulacoes('trocar', 'plantarSpot' + obj.index, "Imagens/fazenda/" + especie.name + '/' + especie.name + obj.estagio + obj.age + '.PNG');
     var arv1 = document.getElementById("plantarSpot" + obj.index).style;

     if(obj.estagio == especie.grownStage){
      switch(especie.name){
       case "acaizeiro":
        obj.praga.consequence('start', 'formiga');
        break;

       case "arvore":
        obj.praga.consequence('start', 'larva');
        break;
      }
     }

     if(obj.estagio==1){
      moveElement("plantarSpot" + obj.index, obj.especie.locais[0][0], obj.especie.locais[0][1]);
     }

     if(obj.estagio==2){
      if(obj.especie.canAge){obj.age = 'a';} 
      moveElement("plantarSpot" + obj.index, obj.especie.locais[1][0], obj.especie.locais[1][1]);
     }

     if(obj.estagio==3){
      obj.aplicavel(true);
      document.getElementsByClassName('duracaow')[obj.index].style.display = 'none';
      document.getElementsByClassName('duracao')[obj.index].style.display = 'block';

      if(!obj.grown) clearInterval(obj.water);
       obj.grown = true;
       //this.setDurationBar(obj);
       moveElement("plantarSpot" + obj.index, obj.especie.locais[2][0], obj.especie.locais[2][1]);
      }

      if(obj.estagio==4 && tut != 4){        
       if(obj.especie.locais[3] != undefined && obj.especie.locais[3] != undefined){
        moveElement("plantarSpot" + obj.index, obj.especie.locais[3][0], obj.especie.locais[3][1]);
       }          
      }
      if(obj.estagio==5){
       if(obj.especie.locais[4] != undefined && obj.especie.locais[4] != undefined){
        moveElement("plantarSpot" + obj.index, obj.especie.locais[4][0], obj.especie.locais[4][1]);
       }          
      }

      if(especie.qestagios == obj.estagio){
       obj.carregada = true;   
      }
     obj.estagio++;
    }
   },

   //EXECUTA NO FIM DO TIMER
   ()=>{
    if(bdisplay_fazendinha == true && coletaHabilitado == true){
     manipulacoes('esconder', 'display' + obj.index);
     manipulacoes('trocar', 'plantarSpot' + obj.index, "Imagens/fazenda/" + obj.especie.name + '/' + obj.especie.name + obj.especie.qestagios + obj.age + '.PNG');
     obj.estagio = obj.especie.qestagios;
     obj.aplicavel(false);
     obj.coletavel(true);
    
     if(tut == 4){
      manipulacoes('mostrar',"tutSeta");
      moveElement('tutSeta', '72px', '172px');
      tut++;
     }
    }
   });

   manipulacoes('mostrar', 'display'+ obj.index);
   document.getElementById("display"+ obj.index).style.visibility="visible";
   }
   else{
    modal("Insufficient seeds.");
   }
  }