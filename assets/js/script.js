/*elements */
let clockEl = document.querySelector('.clock');
let timerEl = document.querySelector('.timer');
let texTimerEl = document.querySelector('.text-time');
let progressBarEl = document.querySelector('.progress-bar');
let pomodoroBtn = document.querySelector('.area-bar span:nth-child(1)');
let shortBtn = document.querySelector('.area-bar span:nth-child(2)');
let longBtn = document.querySelector('.area-bar span:nth-child(3)');
let configBtn = document.querySelector('.config');
let modal= document.querySelector('.modal');
let closeBtn = document.querySelector('.close');
let apllyBtn = document.querySelector('.button');
let pomodoroTimeEl = document.querySelector("#pomodoro-time");
let shortTimeEl = document.querySelector("#short-time");
let longTimeEl = document.querySelector("#long-time");
let fontEL= document.querySelectorAll('.font');
let colorEl = document.querySelectorAll('.color');
let  tapSong= document.querySelector('#tap');
let  barSong= document.querySelector('#barSong');
let  finishSong= document.querySelector('#finish');

 //current color and current fonts
let  currentFont = getComputedStyle(document.documentElement).getPropertyValue('--current-font'); 
let  currentColor = getComputedStyle(document.documentElement).getPropertyValue('--current-color'); 

//variables globals
let intervalTimer;
let minutesTimer= pomodoroTimeEl.value;
let secondsTimer= 0;
let isPause= true;
let shortqt=0;
let setbar=0;
let progressPerSecond=0;
let barStatus=0;


function calculateProgressBar(minutesTimer){
    progressPerSecond= 360/(minutesTimer*60); //calcula quanto graus a progress bar deve se apagada de acordo com o tempo esbelecido
    setbar=progressPerSecond;

}


function formateInTime(min,seg){
    
    let minutos = min < 10 ? `0${min}`: min;
    let segundos = seg < 10 ? `0${seg}`: seg;

    return `${minutos}:${segundos}`;
}

function progressBar(){
    progressBarEl.style.background= `conic-gradient(  var(--bg-color) ${setbar+=progressPerSecond}deg, var(--current-color) 180deg)`;
    
}

function songPlay(song){
    
    if(song.paused){
        song.play();
    }
    else{
        song.pause();
        song.currentTime=0;
    }

}

function tooglePause(){

    if(isPause){
        texTimerEl.textContent="Pause";
        isPause= false;
        songPlay(tapSong);
       
    }
    else{
        texTimerEl.textContent="Start";
        isPause=true;
        clearInterval(intervalTimer);
        songPlay(tapSong);
    }

    
}


function startTimer (){
    tooglePause();
     if(!isPause){
        intervalTimer = setInterval(time,1000);
     }

}

function time(){
    //make time elelment
    if(secondsTimer === 0 && minutesTimer===0){
       
        shortqt++; //contabilizar os short break
        minutesTimer= pomodoroTimeEl.value; //reinicia o tempo
        setbar=0; //zera a progressbar
        songPlay(finishSong);

        switch (barStatus) {
            case 0:
                if(shortqt > 3 ) 
                {
                    long();
                    shortqt=0;
                }
                else{
                    short();
                    short++;
                }
                break;
            case 1:
                pomodoro();
                break;
            case 2:
                pomodoro();
                break;   
            default:
                short();
                shortqt++;
                break;
        }
    
    }
    else
    {
        if(secondsTimer===0){
            secondsTimer=59;
            minutesTimer--;

        }

        secondsTimer--;
    }
    progressBar();
    timerEl.textContent=formateInTime(minutesTimer,secondsTimer);
}

function short(){
    
    barStatus=1;
    pomodoroBtn.classList.remove('active-bar');
    longBtn.classList.remove('active-bar');
    shortBtn.classList.add('active-bar');

    if(!isPause)
    {
        tooglePause();
    }

    minutesTimer=shortTimeEl.value;
    secondsTimer=0;
    calculateProgressBar(minutesTimer); //calcula a progress bar com o timer do short
    timerEl.textContent=formateInTime(minutesTimer,secondsTimer)//atualiza a tela com o valor do short


}

function pomodoro(){
    barStatus=0;
    longBtn.classList.remove('active-bar');
    shortBtn.classList.remove('active-bar');
    pomodoroBtn.classList.add('active-bar');
   

    if(!isPause)
    {
        tooglePause();
    }

    minutesTimer=pomodoroTimeEl.value;
    secondsTimer=0;
    calculateProgressBar(minutesTimer); //calcula a progress bar com o timer do pomodoro
    timerEl.textContent=formateInTime(minutesTimer,secondsTimer)



}

function long(){

    barStatus=2;
    pomodoroBtn.classList.remove('active-bar');
    shortBtn.classList.remove('active-bar');
    longBtn.classList.add('active-bar');

    if(!isPause)
    {
        tooglePause();
    }

    minutesTimer=longTimeEl.value;
    secondsTimer=0;
    calculateProgressBar(minutesTimer); //calcula a progress bar com o timer do long
    timerEl.textContent=formateInTime(minutesTimer,secondsTimer)



}

function removeClassActive(el){
  
   for(let i=0;i<el.length;i++)
   {
        el[i].classList.remove('active');
        
   }
   
}

function openModal(){
    modal.classList.add('open');

    fontEL[0].addEventListener('click',()=>{
        removeClassActive(fontEL);
        fontEL[0].classList.add('active');   
    });

    fontEL[1].addEventListener('click',()=>{
        removeClassActive(fontEL);
        fontEL[1].classList.add('active');   
    });

    fontEL[2].addEventListener('click',()=>{
        removeClassActive(fontEL);
        fontEL[2].classList.add('active');   
    });

    colorEl[0].addEventListener('click',()=>{
        removeClassActive(colorEl);
        colorEl[0].classList.add('active');
    });

    colorEl[1].addEventListener('click',()=>{
        removeClassActive(colorEl);
        colorEl[1].classList.add('active');
    });

    colorEl[2].addEventListener('click',()=>{
        removeClassActive(colorEl);
        colorEl[2].classList.add('active');
    });
    
}

function apllyFontColors(){
    
    let ifont=0, icolor=0;
    let root= document.documentElement;

    fontEL.forEach((font, i)=>{
        if(font.classList.contains('active')){
            ifont=i;
        
        }
    })

    colorEl.forEach((color, i)=>{
        if(color.classList.contains('active')){
            icolor=i;
            
        }
    })

   
    switch (icolor) {
        case 0:
           root.style.setProperty('--current-color', '#70f3f8');
            break;
        case 1:
            root.style.setProperty('--current-color', '#f87272');
            break;
        case 2:
            root.style.setProperty('--current-color', '#d881f8');
            
            break;
    
        default:
            root.style.setProperty('--current-color', '#70f3f8');
            break;
    }

    switch (ifont) {
        case 0:
           root.style.setProperty('--current-font', "'Manrope', sans-serif");
            break;
        case 1:
            root.style.setProperty('--current-font', "'IBM Plex Mono', monospace");
            break;
        case 2:
            root.style.setProperty('--current-font', " 'Silkscreen', monospace");
            
            break;
    
        default:
            root.style.setProperty('--current-font', "'Manrope', sans-serif");
            break;
    }


}

function closeModal(){
    modal.classList.remove('open');
}

function reloadTimer()
{
    if(pomodoroBtn.classList.contains('active-bar')){
        pomodoro();
    }else {
        if(shortBtn.classList.contains('active-bar')){
            short();
        }
        else
        {
            if(longBtn.classList.contains('active-bar')){
                long();
            }
        }
    }

}

function apllyModal(){

    if(shortTimeEl.getPropertyValue<0 || pomodoroTimeEl.value <0 || longTimeEl.value<0){
        alert('digite um valor entre 0 e 60');
    }
    else{
        timerEl.textContent = formateInTime(minutesTimer,secondsTimer);
        calculateProgressBar(minutesTimer);
        apllyFontColors();
    
    
        reloadTimer();
        closeModal();
    }

  
}



/* Buttons */
pomodoroBtn.addEventListener('click',pomodoro);
shortBtn.addEventListener('click',short);
longBtn.addEventListener('click',long);
configBtn.addEventListener('click',openModal);
closeBtn.addEventListener('click',closeModal);
apllyBtn.addEventListener('click',apllyModal);


clockEl.addEventListener('click',startTimer);


