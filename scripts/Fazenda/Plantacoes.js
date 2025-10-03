//Criar classe para cada espécie


//Classe que define as propriedades de cada espécie
class Propriedades{
    constructor(name, grownStage, img, frutoQuantidade, fruto, semente, qestagios, colheitasMax){
        this.img = img;
        this.grownStage = grownStage;           //Estagio em que a planta se torna adulta
        this.frutoQuantidade = frutoQuantidade; //Quantidade de frutos por colheita
        this.fruto = fruto;                     //objeto da classe Resources correspondente ao fruto da espécie
        this.name = name;                       //Identificador. Essa propriedade esta atrelada a varios processos e pode causar conflitos se modificada.
        this.seed = semente;                    //objeto da classe Resources correspondente a semente da espécie
        this.qestagios = qestagios;             //Estagios totais
        this.colheitasMax = colheitasMax;       //Número máximo de colheitas possíveis
    }

    //Trazer função semear para cá
}

//Classe que contem cada instancia de plantação semeada pelo jogador. De acordo com cada espécie
class Plantacoes{
 constructor(){ 
  this.macieira = { 
   img: 'sementeMaca',
   grownStage: 3, 
   frutoQ: 10, 
   fruto: arvore, 
   name: 'arvore', 
   seed: sementeMaca,
   qestagios: 6, 
   canAge: true, //Se a planta muda de aparencia com o tempo
   colheitasMax: 30, 
   //propriedades: new Propriedades('arvore', 3, 'sementeMaca', 10, arvore, sementeMaca, 6, 30),
 
   exp: 0,
   expLvl: 5,
   lvl: 0,
   newPoint: 0,

   Resistencia: {
    lastUp: 0, 
    points: 0,
    DOM: []
   },

   Desenvolvimento: {
    lastUp: 0, 
    points: 0,
    DOM: []
   },

   Longevidade: {
    lastUp: 0, 
    points: 0,
    DOM: []
    },

   locais: [['-115px', '35px'], ['-130px', '-80px'], ['-120px', '-85px']], //Corretivo de posíção do elemento html

   //Duração do timer de acordo com a estação
   temposEstacoes: {
    outono: {
     segundos: 84,
     segundoE: 35
    },
    inverno: {
     segundos: 39,
     segundoE: 20
    },
    verao: {
     segundos: 129,
     segundoE: 50
    },
    primavera: {
     segundos: 99,
     segundoE: 40
    }
   },

   lvlUp(){
    const obj = this;
    const pointDOM = document.querySelector('#lvlpoints');
    const lastUp = [obj.Resistencia.lastUp, obj.Desenvolvimento.lastUp, obj.Longevidade.lastUp];
    const firstlvlR = lastUp[0] == 0 ? 0 : 1;
    const firstlvlL = lastUp[2] == 0 ? 0 : 1;
    const firstlvlD = lastUp[1] == 0 ? 0 : 1;

    this.Resistencia.DOM[lastUp[0]].style.backgroundColor = "rgb(203 151 71)";
    this.Longevidade.DOM[lastUp[2]].style.backgroundColor = "rgb(203 151 71)";
    this.Desenvolvimento.DOM[lastUp[1]].style.backgroundColor = "rgb(203 151 71)";

    this.lvl++;
    this.newPoint++;
    pointDOM.innerHTML = '+' + this.newPoint;
    document.getElementById('lvl' + obj.name).innerHTML = obj.lvl + obj.lvl == 5 ? '(MAX)': '';
   } 

  };

  this.bananeira = {
   Resistencia: 0,
   Desenvolvimento: 0,
   Longevidade: 0,
   h4: 'Bananeira',
   img: 'mudaBanana', 
   frutoQ: 6,
   fruto: bananeira,
   grownStage: 3,
   name: 'bananeira',
   seed: sementeBanana,
   qestagios: 5,
   canAge: false,
   colheitasMax: 10,
   locais: [['-115px', '-10px'], ['-115px', '-10px'], ['-160px', '-100px'], ['-170px', '-95px'], ['-160px', '-90px']],

   temposEstacoes: {
    outono: {
     segundos: 23,
     segundoE: 8
    },
    inverno: {
     segundos: 17,
     segundoE: 6
    },
    verao: {
     segundos: 14,
     segundoE: 5
    },
    primavera: {
     segundos: 5,
     segundoE: 2
    }
   }
  };

  this.acaizeiro = {
   Resistencia: 0,
   Desenvolvimento: 0,
   Longevidade: 0,
   h4: 'Açaizeiro',
   img: 'sementeAcai', 
   frutoQ: 8,   //4 quilos por cacho
   fruto: acaizeiro,
   grownStage: 4,
   name: 'acaizeiro',
   seed: sementeAcai,
   qestagios: 6,
   canAge: false,
   colheitasMax: 4,
   locais: [['-108px', '37px'], ['-108px', '37px'], ['-108px', '-10px'], ['-108px', '-60px'], ['-108px', '-92px']],

   temposEstacoes: {
    outono: {
     segundos: 23,
     segundoE: 6
    },
    inverno: {
     segundos: 15,
     segundoE: 4
    },
    verao: {
     segundos: 19,
     segundoE: 5
    },
    primavera: {
     segundos: 3,
     segundoE: 1
    }
   }
  }; 
 } 

  showOptions(index){
   if(tut > 1){
    manipulacoes('mostrar', 'choiceContainer' + index);

    document.getElementsByClassName('choice01')[index].style.backgroundImage = "url(Imagens/fazenda/shop/sementeMaca.PNG)";    
    document.getElementsByClassName('choice01')[index].innerHTML = sementeMaca.quantidade + 'x';
   }
   if(tut == 2){
    moveElement('tutSeta', '10px', '185px');
    tut++;
   }
  }

  checkCursor(cursor, index){
   switch(cursor){
    case "fert":
     document.getElementById("treeHover" + index).style.cursor = "url('Imagens/fazenda/shop/fert.PNG'), auto";
     console.log(document.getElementById("treeHover" + index).style.cursor);
     break;

    case "basket":
     document.getElementById("treeHover" + index).style.cursor = "url('Imagens/cursores/baskCursor.PNG'), auto";
     break;

    case "regador":
     document.getElementById("treeHover" + index).style.cursor = "url('Imagens/cursores/regador.PNG'), auto";
     break;
   }
  }

  BuySpace(index){
   if(recursos.money.quantidade >= 100){
    document.getElementsByClassName('arvoreHolder')[index-1].style.visibility = 'visible';  
    document.getElementById('treeSign' + index).style.visibility = 'hidden';

    recursos.Take(recursos.money, 100);
   } 
   else {
    modal('Insuficient funds');
   }
  }

  Chop(index){
   let currentSeed = document.getElementById('plantarSpot' + index).src;
   const arr = currentSeed.split('/');
   currentSeed = arr.pop().split('Dead.PNG')[0];

   var obj;
   if(currentSeed == "arvore" || currentSeed == "arvore1" || currentSeed == "arvore2"){
    obj = this.macieira['arvore' + index]; 
   }
   else if(currentSeed == "bananeira" || currentSeed == "bananeira1" || currentSeed == "bananeira2"){
    obj = this.bananeira['bananeira' + index];
   }
   else if(currentSeed == "acaizeiro" || currentSeed == "acaizeiro1" || currentSeed == "acaizeiro2"){
    obj = this.acaizeiro['acaizeiro' + index];
   }
   
   if(currentSeed != "prantadoApenas.PNG"){
    obj.grown = false;
    obj.estagio = 0;
    obj.colheitas = obj.especie.colheitasMax;
    obj.age = '';
    setDurationBar(obj);
   }
   

   manipulacoes("trocar", 'plantarSpot' + index, 'Imagens/fazenda/arvore/plantarApenas.PNG');
   manipulacoes("esconder", 'axe' + index);
   manipulacoes('mostrar', "plantar" + index);
   moveElement('plantarSpot' + index, '-100px', '50px'); 
  }

  opnMacaUpg(){    
   const pointDOM = document.querySelector('#lvlpoints');
   if(this['macieira'].newPoint) pointDOM.style.visibility = 'visible';
   document.getElementById("upgMacaw").style.visibility = 'visible';
  }

  //Trazer função criar para cá
  /*Criar(especie){
      switch(especie){
        case "Macieira":
         this[especie + this.index] = new Macieira();
         break;
      }
      
  }*/

}

const plantacao = new Plantacoes();





