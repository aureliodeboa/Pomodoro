let clockEl = document.querySelector('.clock');
let timerEl = document.querySelector('.timer');
let texTimerEl = document.querySelector('.text-time');
let progressBarEl = document.querySelector('.progress-bar');
let pomodoroBtn = document.querySelector('.area-bar span:nth-child(1)');
let shortBtn = document.querySelector('.area-bar span:nth-child(2)');
let longBtn = document.querySelector('.area-bar span:nth-child(3)');

let intervalTimer;
let minutesTimer= 25;
let secondsTimer= 0;
let isPause= true;
let shortqt=0;
let setbar=0;

let progressPerSecond= 360/(minutesTimer*60); //calcula quanto degraus a progress bar deve se apagada de acordo com o tempo esbelecido

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
    if(secondsTimer === 0){
        secondsTimer=59;
        minutesTimer--;
    }
    else
    {
        if(minutesTimer === 0){
            shortqt++; //contabilizar os short break
            short();
            minutesTimer= 25; //reinicia o tempo
            setbar=0; //zera a progressbar
        }
        else{
            secondsTimer--;
        }
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

    minutesTimer=5;
    secondsTimer=0;

    timerEl.textContent=formateInTime(minutesTimer,secondsTimer)



}

function pomodoro(){
    pomodoroBtn.classList.add('active-bar');
    longBtn.classList.remove('active-bar');
    shortBtn.classList.remove('active-bar');

    if(!isPause)
    {
        tooglePause();
    }

    minutesTimer=25;
    secondsTimer=0;

    timerEl.textContent=formateInTime(minutesTimer,secondsTimer)



}

function long(){
    pomodoroBtn.classList.remove('active-bar');
    longBtn.classList.add('active-bar');
    shortBtn.classList.remove('active-bar');

    if(!isPause)
    {
        tooglePause();
    }

    minutesTimer=10;
    secondsTimer=0;

    timerEl.textContent=formateInTime(minutesTimer,secondsTimer)



}

pomodoroBtn.addEventListener('click',pomodoro);
shortBtn.addEventListener('click',short);
longBtn.addEventListener('click',long);

clockEl.addEventListener('click',startTimer);



