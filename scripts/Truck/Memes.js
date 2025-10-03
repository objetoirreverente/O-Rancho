const dedao = document.getElementById('dedao');

var translate = -5;
var podeMexer;
var dedaoMeio;
var apertando = false;


const slider = document.querySelector('.slider');
const images = Array.from(document.querySelectorAll('.dragImg'));
let isDragging = false;
let startY = 0;
let translateY = 0;
let prevTranslate = 0;
var apertando = false;

// Duplicar imagens para efeito infinito
images.forEach((img) => {
    const clone = img.cloneNode(true);
    slider.appendChild(clone);
});

let i;
let count;
function startDrag(event) {
    apertando = true;
    isDragging = true;
    verificaDedao();
    startY = event.clientY;
    slider.style.transition = 'none';
    console.log(startY);

    i = setInterval(()=>{count++;console.log(count);},10);
}

var dedaoTranslate = 0;

function verificaDedao(){
     if(dedaoBaixo){
      dedao.src = 'Imagens/truck/memes/data/dedaoBaixo.PNG';
      if(apertando) dedao.src = 'Imagens/truck/memes/data/dedaoBaixoApertando.PNG';
     }

     if(dedaoMeio){
      dedao.src = 'Imagens/truck/memes/data/dedaoMeio.PNG';
      if(apertando) dedao.src = 'Imagens/truck/memes/data/dedaoMeioApertando.PNG'; 
     }
}

function drag(event) {    
    const currentY = event.clientY;
    
    dedaoTranslate = currentY - screen.availHeight/2;
    translateY = prevTranslate + (currentY - startY);
    podeMexer = dedaoTranslate > -60 && dedaoTranslate < 0;

    dedaoBaixo = dedaoTranslate > -23 && dedaoTranslate < 0;
    dedaoMeio = dedaoTranslate < -23;
    
    if(podeMexer){
     dedao.style.transform = `translate(0px, ${dedaoTranslate}px)`;
     verificaDedao();
    }

    if (!isDragging) return;

    slider.style.transform = `translateY(${translateY}px)`;

    // Efeito infinito
    if (translateY > 0) {
        translateY = -slider.scrollHeight / 2;
        prevTranslate = translateY;
    } else if (Math.abs(translateY) > slider.scrollHeight / 2) {
        translateY = 0;
        prevTranslate = translateY;
    }
}

let endY;
function endDrag() {
    apertando = false;
    verificaDedao();
    isDragging = false;
    prevTranslate = translateY;

    slider.style.transition = 'transform 0.3s ease-out';
    
    snapToClosestImage();
}

function snapToClosestImage() {
    const slideHeight = document.querySelector('.slider img').clientHeight;
    const closestSlide = Math.round(translateY / slideHeight);
    translateY = closestSlide * slideHeight;
    slider.style.transform = `translateY(${translateY}px)`;
    prevTranslate = translateY;

    endY = event.clientY;
    const orientacao = (endY > startY) ? "baixo" : "cima";
    clearInterval(i);
    if(count >= 6 && count <= 12 && closestSlide == -4){
     window.open("https://springgreen-cattle-575382.hostingersite.com/", '_blank').focus();
    }
    count = 0;
}

dedao.addEventListener('mousedown', startDrag);
dedao.addEventListener('mousemove', drag);
dedao.addEventListener('mouseup', endDrag);
