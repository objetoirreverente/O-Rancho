  const money = {
   quantidade: 10,
   dom: document.getElementById('dinheirotxt'),

   Set: ()=>{
    console.log(this);
    this.dom.innerHTML = this.quantidade;
    this.checkValues();
   },

   Take: (q)=>{
      this.quantidade -= q;
      this.Set();
   },

   Add: (q)=>{
      console.log(this.quantidade);
      this.quantidade += q;
      console.log(this.quantidade);
      this.Set();
   },


   checkValues: ()=>{
    const values = document.getElementsByClassName('value');
    const maizinho = document.getElementsByClassName('maizinho');

    for(var i = 0; i<values.length; i++){
     const ehOficina = values[i].id.charAt(values[i].id.length -2) == "P";
     if(parseInt(values[i].innerHTML.slice(1,4)) <= this.quantidade){
      values[i].style.color = 'black';

      const upgId = values[i].id.slice(0,values[i].id.length -2);
      
      if(ehOficina && !cabaMorreuB && caminhao.canUpg(upgId)){
       const index = parseInt(values[i].id.charAt(values[i].id.length - 1));
       maizinho[index].style.display = 'visible';
      }
     }
     else{
      values[i].style.color = 'red';

      if(ehOficina){
       const index = parseInt(values[i].id.charAt(values[i].id.length - 1));
       maizinho[index].style.visibility = 'hidden';
      }
     }
    }
   }
  }

  const inseticida = {
   quantidade: 0,
   dom: [document.getElementById('qfert'),
        document.getElementById('inseticidaPreco')],
   price: 50,

   Buy: ()=>{
    if(money.quantidade >= this.price){
     money.Take(this.price);
     this.quantidade++;
     this.Set(); 
    }
    else{
     modal('Insuficient funds');
    }
   },

  Add: (q)=>{
   this.quantidade += q;
   this.Set();
  },

  Take: (q)=>{
   console.log(q);
   this.quantidade -= q;
   this.Set();
  },

   Set: ()=>{
    this.dom[0].innerHTML = this.quantidade;
    this.dom[1].innerHTML = this.price;
   }
  } 

money.Set();
inseticida.Set();

class Resources{
 constructor(){
   this.sementesQuantidade = 0;  
 }

  Add(q){
   this.quantidade += q;
   this.Set();
  }

  Take(q){
   console.log(q);
   this.quantidade -= q;
   this.Set();
  }

}

class Frutos extends Resources{
   constructor(name){
      super();
      this.quantidade = 0;
      this.dom = document.getElementById(name + 'txt');
   }

   Set(){
      this.dom.innerHTML = this.quantidade;
   }
}

class Sementes extends Resources{
   constructor(name, price){
      super();
      this.sementesQuantidade++;
      this.index = this.sementesQuantidade;
      this.quantidade = 0;
      this.dom = [document.getElementById('semente' + name), document.getElementById('price' + name)];
      this.price = price;
   }

    Buy(){
     if(money.quantidade >= this.price){
      money.Take(this.price);
      this.Add(1);
      document.getElementsByClassName('choice0' + this.index)[0].innerHTML = this.quantidade + 'x';
      if(tut == 1){
       moveElement('tutSeta', '75px', '240px');
       clsSW();
       tut++;
      }
     }
     else{
      modal('Insuficient funds');
     }
    }

   Set(){
     this.dom[0].innerHTML = this.quantidade;
     this.dom[1].innerHTML = this.price;
     const celements = document.getElementsByClassName('choice0' + this.index);
     for(var i = 0; i<celements.length;i++){
      celements[i].innerHTML = this.quantidade + "x";
     }
   }
}

//const recursos = new Resources();

const arvore = new Frutos('arvore');
const bananeira = new Frutos('bananeira');
const acaiVender = new Frutos('acaiVender');
const acaizeiro = new Frutos('acaizeiro');
const frutoRedencao = new Frutos('frutoRedencao');
const macasVender = new Frutos('macasVender');
macasVender.Add(10);

const bananaVender = new Frutos('bananaVender');

const sementeMaca = new Sementes('Maca', 10);
const sementeBanana = new Sementes('Banana', 15);
const sementeAcai = new Sementes('Acai', 40);



