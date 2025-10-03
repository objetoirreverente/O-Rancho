

class Resources{
 constructor(){
   this.sementesQuantidade = 0;

  this.money = {
   quantidade: 10,
   dom: document.getElementById('dinheirotxt'),

   Set(){
    this.dom.innerHTML = this.quantidade;
    this.checkValues();
   },

   Take(q){
      this.quantidade -= q;
      this.Set();
   },

   Add(q){
      this.quantidade += q;
      this.Set();
   },


   checkValues(){
    const values = document.getElementsByClassName('value');
    const maizinho = document.getElementsByClassName('maizinho');

    for(var i = 0; i<values.length; i++){
     const ehOficina = values[i].id.charAt(values[i].id.length -2) == "P";
     if(parseInt(values[i].innerHTML.slice(1,4)) <= this.quantidade){
      values[i].style.color = 'black';

      const upgId = values[i].id.slice(0,values[i].id.length -2);
      
      if(ehOficina && !cabaMorreuB && caminhao.canUpg(upgId)){
       const index = parseInt(values[i].id.charAt(values[i].id.length - 1));
       maizinho[index].style.display = 'block';
      }
     }
     else{
      values[i].style.color = 'red';

      if(ehOficina){
       const index = parseInt(values[i].id.charAt(values[i].id.length - 1));
       maizinho[index].style.display = 'none';
      }
     }
    }
   }
  }

  this.inseticida = {
   quantidade: 0,
   dom: [document.getElementById('qfert'),
        document.getElementById('inseticidaPreco')],
   price: 50,

   Buy(){
    if(recursos.money.quantidade >= this.price){
     recursos.Take(recursos.money, this.price);
     this.quantidade++;
     this.Set(); 
    }
    else{
     modal('Insuficient funds');
    }
   },

   Set(){
    this.dom[0].innerHTML = this.quantidade;
    this.dom[1].innerHTML = this.price;
   }
  }   

  this.money.Set();
  this.inseticida.Set();
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
     if(this.money.quantidade >= this.price){
      this.money.Take(this.price);
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

const recursos = new Resources();

const arvore = new Frutos('arvore');
const bananeira = new Frutos('bananeira');
const acaiVender = new Frutos('acaiVender');
const acaizeiro = new Frutos('acaizeiro');
const frutoRedencao = new Frutos('frutoRedencao');
const macasVender = new Frutos('macasVender');
const bananaVender = new Frutos('bananaVender');

const sementeMaca = new Sementes('Maca', 10);
const sementeBanana = new Sementes('Banana', 15);
const sementeAcai = new Sementes('Acai', 40);



