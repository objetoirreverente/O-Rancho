function setDurationBar(especie){
  document.getElementById('mbar' + especie.index).style.height = '60px';
  document.getElementById('mbar' + especie.index).style.top = '0px';
  document.getElementById('mbarw' + especie.index).style.height = '20px';
  document.getElementById('mbarw' + especie.index).style.top = '38px';
 
  this.mbarh = '60px';
  manipulacoes("escrever", 'btext' + especie.index, especie.colheitas);    
}

function Criar(especie, index){
  especie[especie.name + index] = {
   inseticidado: false,
   age: "",
   index: index,

   especie: especie,     
   regaBind: undefined,
   inseticidaBind: undefined,
   coletaBind: undefined,

   plantado: false,
   grown: false,
   carregada: false,
   estagio: 1,
   water: undefined,
   colheitas: especie.colheitasMax + (especie.Longevidade.lastUp ? especie.Longevidade.lastUp : 0)  * 5,
   mbarh: "60px",

   temp: new Temporizador(document.getElementById('di' + index)), //Temporizador é uma classe que se encontra no script utilidades.js
   estagiotemp: new Temporizador(),
   praga: undefined,

 setBind(){
  const coletabind = this.Coletar.bind(this);
  const inseticidabind = this.inseticida.bind(this);

  const Binds = [coletabind, inseticidabind];  
  return Binds;
 },

 aplicavel(tf){
  if(tf){
   document.getElementById("treeHover" + this.index).addEventListener("mouseover", plantacao.checkCursor("fert", this.index));
   document.getElementById("treeHover" + this.index).addEventListener("click", this.inseticidaBind);
  }
  else{
   document.getElementById("treeHover" + this.index).removeEventListener("mouseover", plantacao.checkCursor("fert", this.index));
   document.getElementById("treeHover" + this.index).removeEventListener("click", this.inseticidaBind);
   document.getElementById("treeHover" + this.index).style.cursor = 'default';
  }
 },

 inseticida(){
  if(inseticida.quantidade && !this.inseticidado){
   const h = this.praga.isHappening;
   this.inseticidado = true;
   manipulacoes("mostrar", 'tinseticida' + this.index);
   inseticida.Take(1);
   if(h){
    this.inseticidado = false;
    this.praga.consequence('stop', '', 'i');
    manipulacoes("esconder", 'tinseticida' + this.index);
   }
  }
 },

 regavel(tf){
  const th = document.getElementById("treeHover" + this.index);
  if(tf){
   th.addEventListener("click", this.regaBind);
   th.addEventListener("mouseover", plantacao.checkCursor("regador", this.index));

  }
  else{
   th.removeEventListener("click", this.regaBind);
   th.removeEventListener("mouseover", plantacao.checkCursor("regador", this.index));  
   if(this.grown){
    plantacao.checkCursor("fert", this.index);
   }
   else{
    th.style.cursor = "default";
   }
  }
 },

  rega(){
    var styleindex = document.getElementById('mbarw' + especie[especie.name + index].index).style;
    styleindex.top = (parseFloat(styleindex.top) - 6) + 'px';
    styleindex.height = (parseFloat(styleindex.height) + 6) + 'px';
   },

 coletavel(tf){
  if(tf){
   document.getElementById("treeHover" + this.index).addEventListener("mouseover", plantacao.checkCursor("basket", this.index));
   document.getElementById("treeHover" + this.index).addEventListener("click", this.coletaBind);
  }
  else{
   document.getElementById("treeHover" + this.index).removeEventListener("mouseover", plantacao.checkCursor("basket", this.index));
   document.getElementById("treeHover" + this.index).removeEventListener("click", this.coletaBind);
  }
 },

   Coletar(){
    const obj = this;
    const exp = Math.round(Math.random() * 9) + 1;
    const frutoDaRedencao = Math.round(Math.random() * 49) + 1;
    
    if(frutoDaRedencao == 1){
     alert(frutoDaRedencao + ' vc ganhou o fruto da redencao');
     frutoRedencao.Add(1);
    }

    obj.especie.exp += exp;
    console.log(obj.especie.exp + '/' + (obj.especie.expLvl ** obj.especie.lvl) * 100);
    if(obj.especie.exp >= (obj.especie.expLvl ** obj.especie.lvl) * 100 && obj.especie.lvl < 5){
     obj.especie.exp = 0;
     obj.especie.lvlUp();
     alert("Upou");
    }
    if(obj.praga.isHappening){
     obj.praga.consequence('stop', '', exp);
    }
    else{

     addToken(
      obj.index, 
      {
       especieName: obj.especie.name, 
       src: undefined, 
       quantidade: obj.especie.frutoQ,
       exp: exp
      },
      'qFruto','exp'
     );

     console.log(obj.especie.fruto);
     obj.especie.fruto.Add(obj.especie.frutoQ);
    }

    obj.colheitas--;

    manipulacoes('escrever', 'btext' + obj.index, obj.colheitas);

    var styleindex = document.getElementById('mbar' + obj.index).style;

    //Para colheitasMax = 10 e para o valor 6, a barrinha de progresso das colheitas fica vazia quando this.colheitas = 0
    //O indiceBase serve para manter essa proporção quando this.colheitasMax tiver outros valores.
    const indiceBase = (obj.especie.colheitasMax/10); 
 
    styleindex.top = (parseInt(styleindex.top) + 6 / indiceBase) + 'px';
    styleindex.height = (parseInt(styleindex.height) - 6 / indiceBase) + 'px';

    obj.estagio=this.especie.grownStage;

    manipulacoes('trocar', 'plantarSpot' + obj.index, 'Imagens/fazenda/' + obj.especie.name + '/' + this.especie.name + obj.estagio + obj.age + '.PNG');
    manipulacoes('mostrar', 'display' + obj.index);


    obj.carregada = false;
    obj.coletavel(false);
    this.aplicavel(true);
    obj.grown = true;

    if(tut == 5){
     manipulacoes('esconder', 'tutSeta');
     tut++;
     fade("out","Store", "Farm");
     moveElement('tutSeta', '120px', '190px');
   
     var t = setInterval(function(){
      var inputValuea = document.getElementById('amount0').value;
      var inputValuep = document.getElementById('price0').value;

      if(inputValuea != ""){
       moveElement('tutSeta', '120px', '215px');
      }

      if(inputValuea != "" && inputValuep != ""){
       moveElement('tutSeta', '90px', '245px');
      clearInterval(t);
      }
     },100);
    }

    if(obj.colheitas != 0){ 
     Semear(obj.especie, obj.index);
    }
    else{
     if(document.getElementById('plantarSpot' + obj.index) != 'prantadoApenas.PNG'){
      manipulacoes('trocar', 'plantarSpot' + obj.index, 'Imagens/fazenda/' + obj.especie.name + '/' + obj.especie.name + 'Dead.PNG');
     }

     document.getElementsByClassName('duracao')[obj.index].style.display = 'none';
     manipulacoes("mostrar", 'axe' + obj.index);
     manipulacoes("esconder", 'display' + obj.index);
     this.aplicavel(false);
     manipulacoes("esconder", 'tinseticida' + obj.index);
     obj.inseticidado = false;
    }
   }

  };

  const newObj = function(){return especie[especie.name + index]};

  const regaBind = newObj().rega.bind(this);


  setDurationBar(newObj());

  newObj().inseticidaBind = newObj().setBind()[1];
  newObj().regaBind = regaBind;
  newObj().coletaBind = newObj().setBind()[0];

  newObj().praga = new Pragas(newObj());

  Semear(especie, index);
 }
