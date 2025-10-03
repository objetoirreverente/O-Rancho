class Pragas{
 constructor(obj){
   this.isHappening = false;
   this.index = obj.index;
   this.timer = undefined;
   this.tree = obj;
 }
  
   getInseticidado(){
    return this.tree.inseticidado;
   }

   consequence(opt, flag, exp){
    switch(opt){
     case "start":
      var i = 0;
      const rand = Math.floor(Math.random() * 101);
      if(rand >= 0 && rand <= (30 - this.tree.especie.Resistencia.lastUp * 4)){
       if(this.getInseticidado()){
        manipulacoes("esconder", 'tinseticida' + this.index);
        this.tree.inseticidado = false;
       }
       else{
        manipulacoes('mostrar', 'pragaLarva' + this.index);
        this.isHappening = true;

        this.timer = setInterval(() =>{
         if(this.tree.especie.name == "arvore"){
          manipulacoes('trocar', 'pragaLarva' + this.index, 'Imagens/fazenda/larva/larva' + i++ + '.PNG');
         }
         else if(this.tree.especie.name == "acaizeiro"){
          manipulacoes('trocar', 'pragaLarva' + this.index, 'Imagens/fazenda/formiga/formiga' + i++ + '.PNG');
          moveElement("pragaLarva" + this.index, "-110px", "-174px");
         }

         if(i >= 22 && this.tree.especie.name == "arvore"){
          i = 0;
         }
         if(i >= 5 && this.tree.especie.name == "acaizeiro"){
          i = 0;
         }
        }, 150);
 
       }
      }
      break;

     case "stop":
      this.isHappening = false;
      if(flag != 'i'){
       //Se a arvore nao tiver inseticida, sera descontado
       const diferenca = this.tree.especie.frutoQ + -1 * (Math.floor(Math.random() * 3) + 1);

       //collectAnim(this.index, this.tree.especie.name, diferenca);
       const name = this.tree.especie.name;

       addToken(
        this.index, 
        {
         especieName: name, 
         src: undefined, 
         quantidade: diferenca,
         exp: exp
        },
        'qFruto','exp'
       );
       this.tree.especie.fruto.Add(diferenca);    
      }
      manipulacoes("esconder", 'pragaLarva' + this.index);
      clearInterval(this.timer);
    }
   }
}


