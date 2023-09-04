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


let intervalTimer;
let minutesTimer= pomodoroTimeEl.value;
let secondsTimer= 0;
let isPause= true;
let shortqt=0;
let setbar=0;
let progressPerSecond=0;

function calculateProgressBar(minutesTimer){
    progressPerSecond= 360/(minutesTimer*60); //calcula quanto graus a progress bar deve se apagada de acordo com o tempo esbelecido
    setbar=progressPerSecond;
    console.log(minutesTimer);
}


function formateInTime(min,seg){
    
    let minutos = min < 10 ? `0${min}`: min;
    let segundos = seg < 10 ? `0${seg}`: seg;

    return `${minutos}:${segundos}`;
}

function progressBar(){
    progressBarEl.style.background= `conic-gradient(  var(--bg-color) ${setbar+=progressPerSecond}deg, var(--current-color) 180deg)`;
    
}

function tooglePause(){
    if(isPause){
        texTimerEl.textContent="Pause";
        isPause= false;
        //make sound
    }
    else{
        texTimerEl.textContent="Start";
        isPause=true;
        clearInterval(intervalTimer);
        //put sound
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
        short();
        
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

function openModal(){
    modal.classList.add('open');

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

    timerEl.textContent = formateInTime(minutesTimer,secondsTimer);
    calculateProgressBar(minutesTimer);
    reloadTimer();
    closeModal();
}


pomodoroBtn.addEventListener('click',pomodoro);
shortBtn.addEventListener('click',short);
longBtn.addEventListener('click',long);
configBtn.addEventListener('click',openModal);
closeBtn.addEventListener('click',closeModal);
apllyBtn.addEventListener('click',apllyModal);
//modal.addEventListener('click',closeModal);



clockEl.addEventListener('click',startTimer);



