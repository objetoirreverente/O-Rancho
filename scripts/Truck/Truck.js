const tempTruck = new Temporizador();
tempTruck.display = document.getElementById('dit');
tempTruck.display2 = document.getElementById('truckTimer');

var carga = [];

function enviaTruck(){
  const inputs = document.getElementsByClassName('envia');
  var cargaSoma = 0;


  for(var i = 0;i < inputs.length;i++){
   if(inputs[i].value >= 0 && !isNaN(inputs[i].value)){
    if(inputs[i].value =='') inputs[i].value = 0;
    cargaSoma += parseInt(inputs[i].value);
    carga.push(parseInt(inputs[i].value));
   }
 }

  if(cargaSoma <= 0){
     modal("Valores Inválidos");
  }
  else if(cargaSoma > caminhao.capacidade.atual){
     modal("Carga pesada bino!");
  }
  else{
   const bananaDiff = (bananeira.quantidade - parseInt(carga[1])) >= 0;
   const macaDiff = (arvore.quantidade - parseInt(carga[0])) >= 0;
   const acaizeiroDiff = (acaizeiro.quantidade - parseInt(carga[2])) >= 0;

   if(bananaDiff && macaDiff && acaizeiroDiff){
    manipulacoes("esconder", 'btnEnviarTruck');
    manipulacoes("mostrar", 'dit');
    manipulacoes("mostrar", 'truckTimer');

    const tripImg = document.getElementById('trip');

    tripImg.src = "Imagens/truck/tripGoing.PNG";
    tripImg.style.visibility = 'visible';

    console.log('parseInt(carga[0]) ' + parseInt(carga[0]))
    arvore.Take(parseInt(carga[0]));
    bananeira.Take(parseInt(carga[1]));
    acaizeiro.Take(parseInt(carga[2]));
   
    Viajar(cargaSoma);
  }
  else{
    modal("Recursos Insuficientes");
    carga = [];
  }
 }
}

function Viajar(carg){
    var tempoViagem = Math.floor((carg * 25)/(caminhao.motor.atual + 1)) + 300;
    var minuto = 0;
    var hora = 0;

    caminhao.dano();


    tempTruck.on(tempoViagem, null,
        //no final
        ()=>{
            const truckButton = document.getElementById('truckButton');
            caminhao.estragou(carga);

            function mouseOver(){
                truckButton.style.cursor = 'pointer';
                truckButton.style.opacity = '100%';               
            }

            function mouseOut(){
                truckButton.style.opacity = '70%';
                truckButton.style.cursor = 'default';             
            }
            function click(){
                truckButton.style.cursor = 'default';
                truckButton.removeEventListener('mouseover', mouseOver);
                truckButton.removeEventListener('mouseout', mouseOut);

                truckButton.style.opacity = '40%';
                manipulacoes('mostrar', 'truckTimer');

                macasVender.Add(parseInt(carga[0]));
                bananaVender.Add(parseInt(carga[1]));
                acaiVender.Add(parseInt(carga[2]));
                
                carga = [];

                const tripImg = document.getElementById('trip');

                tripImg.src = "Imagens/truck/tripComing.PNG";
                let viagemVolta = Math.floor(300/(caminhao.motor.atual || 1));

                tempTruck.on(viagemVolta, null, 
                    //no fim da execução
                    ()=>{
                        tripImg.style.visibility = 'hidden';

                        const enviaTruck = document.getElementById('btnEnviarTruck');
                        enviaTruck.style.display = 'block';
                        enviaTruck.style.marginTop = '-5px';

                        manipulacoes("esconder", 'dit');
                        manipulacoes("esconder", 'truckTimer');
                    }
                );

                truckButton.removeEventListener('click', click);
            }

            manipulacoes('esconder', 'truckTimer');
            tempTruck.display.innerHTML = "O caminhão está pronto para descarregar";

            truckButton.addEventListener("mouseover", mouseOver);
            truckButton.addEventListener("mouseout", mouseOut);
            truckButton.addEventListener("click", click);

        }
    );
}

