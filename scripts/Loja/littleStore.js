var precoMedio = 50;

class Slot{
 constructor(index){
  this.index = index;
  this.minuto;
  this.segundo;
  this.preco;
  this.quantidade;

  this.temp = new Temporizador();
  this.temp.display = document.getElementById("dil" + index);
 }

 ocupado(){
  return document.getElementById("slot" + this.index).style.display == "block" ? true:false;
 } 

 setEstado(estado) {
  document.getElementById("slot" + this.index).style.display = estado;
 }

 
 vende_macas(){
  let quantidade = parseInt(document.getElementById("amount" + this.index).value);
  let preco = parseInt(document.getElementById("price" + this.index).value);
  var obj;

  const index = this.index;
  var fruta = fileFromPath(document.getElementById('frutaV' + this.index).src);

  if(fruta == 'apple.PNG'){
   obj = macasVender;	
  } 
  if(fruta == 'banana.PNG'){
   obj = bananaVender;	
  }
  if(fruta == 'acaiFruto.PNG'){
   obj = acaiVender;
  }    

  if(quantidade != 0 && (obj.quantidade - quantidade) >= 0 && preco > 0){
   if(quantidade <= 30){
    if(preco <= 6200){

     if(tut == 6){
      manipulacoes("esconder", "tutSeta");
      manipulacoes("mostrar", "screenSelect");  
     }

     manipulacoes("esconder", 'frutaV' + this.index);
     manipulacoes("esconder", 'setasHolder' + this.index);

     manipulacoes("mostrar", "priceContainer" + this.index);
     manipulacoes("mostrar", "amountContainer" + this.index);

     this.preco = preco;
     this.quantidade = quantidade;

     manipulacoes("trocar", "cesta" + this.index, "Imagens/vendinha/cesta1.png");  

     manipulacoes("esconder", "price" + this.index);
     manipulacoes("escrever", "priceContainer" + this.index, preco);
  
     manipulacoes("esconder", "amount" + this.index);
     manipulacoes("escrever", "amountContainer" + this.index, quantidade);

     manipulacoes("esconder", "v" + this.index);
     manipulacoes("mostrar", "d" + this.index);
 
     var segundo = (((preco/precoMedio) * 2).toFixed(2) * 60 + quantidade * (preco/precoMedio).toFixed(2)).toFixed(0);  
     var minuto = 0;
     var hora = 0;

     obj.Take(quantidade);

     this.temp.on(segundo,
        //EXECUTA DURANTE
        (temp = this.temp)=>{
            if (temp.intervaloAtual <= 5/6 * temp.intervaloTotal) {
                manipulacoes("trocar", "cesta" + index, 'Imagens/vendinha/cesta2.png');
            }
            if (temp.intervaloAtual <= 4/6 * temp.intervaloTotal) {
                manipulacoes("trocar", "cesta" + index, 'Imagens/vendinha/cesta3.png');
            }
            if (temp.intervaloAtual <= 3/6 * temp.intervaloTotal) {
                manipulacoes("trocar", "cesta" + index, 'Imagens/vendinha/cesta4.png');
            }
            if (temp.intervaloAtual <= 2/6 * temp.intervaloTotal) {
                manipulacoes("trocar", "cesta" + index, 'Imagens/vendinha/cesta5.png');
            }
            if (temp.intervaloAtual <= 1/6 * temp.intervaloTotal) {
                manipulacoes("trocar", "cesta" + index, 'Imagens/vendinha/cesta6.png');
            }
        },
        //EXECUTA NO FINAL
        ()=>{
         manipulacoes("trocar", "cesta" + index, 'Imagens/vendinha/cestaVazia.png');
         manipulacoes("esconder", "priceContainer" + index);
         manipulacoes("esconder", "amountContainer" + index);

         manipulacoes("mostrar", "price" + index);
         manipulacoes("mostrar", "amount" + index);
 
         manipulacoes("esconder", "d" + index);
         manipulacoes("mostrar", "v" + index);
    
         manipulacoes("mostrar", 'frutaV' + index);
         manipulacoes("mostrar", 'setasHolder' + index);

         moveElement('frutaV' + index, '40px', '-90px');

         money.Add(preco * quantidade);
        });
    }
    else{
     modal('O preço máximo é 6200');
    }
   }
   else{
    modal('A quantidade máxima é 30');
   }
 
  }
  else {
   modal("Valores Inválidos");
  }
  
 }

 compra_cesta(){
  if(money.quantidade >= 100){
   manipulacoes('esconder', 'bslot' + this.index);
   manipulacoes('mostrar', 'cestaHolder' + this.index);
   money.Take(100);
  }
  else{
   modal("Insuficient funds");
  }
 
 }

}


const slot1 = new Slot(0);
const slot2 = new Slot(1);
const slot3 = new Slot(2);
const slot4 = new Slot(3);
const slot5 = new Slot(4);



