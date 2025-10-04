const caminhao = {
 integridade: 100,
 
 precoReparo: 0,
 btnReparo: document.querySelector('#btnReparo'),

 refrigeracao: {atual:0, max: 5},
 durabilidade: {atual:0, max: 5},
 motor: {atual:0, max: 5},
 capacidade: {atual:30, max: 80}, 

 dano(){
  const n = Math.floor(Math.random() * 100) + 1;
  const porcentagem = this.integridade - this.durabilidade.atual * 10 + 40 * this.durabilidade.atual / 10;

  console.log('Porcentagem ' + porcentagem);
  this.btnReparo.style.display = 'block';

  if(n < porcentagem){
   this.integridade -= Math.floor(Math.random() * 10) + 1;
   document.getElementById('integridade').innerHTML = this.integridade;
   this.precoReparo = (100 - this.integridade) * 100;
   document.getElementById('reparotxt').innerHTML = '$' + this.precoReparo;
  }
 },

 estragou(carga){
  const porcentagem = 100 - this.refrigeracao.atual * 10;
  const number = Math.floor(Math.random() * 100) + 1;
  alert('estragou');
  if(number <= porcentagem){
   modal("Parte da carga estragou no caminho!");
   for(let c of carga){
    if(c > 0){
     console.log(carga + ' antes');
     const rand = (this.refrigeracao.atual/100 + Math.random()/3) * c;
     carga[carga.indexOf(c)] = Math.ceil(rand);
     console.log(carga + ' depois');


    }
   }
  }
 },

 reparo(){
  this.btnReparo.style.display = 'none';
  this.integridade = 100;
  document.getElementById('integridade').innerHTML = this.integridade;
  recursos.Take(recursos.money, this.precoReparo);
  recursos.money.checkValues();
  document.getElementById('reparotxt').innerHTML = '-';
 },

 canUpg(att){
   return (this[att]?.atual ?? 0) < (this[att]?.max ?? 0) && recursos.money.quantidade >= 100;
 }
};

