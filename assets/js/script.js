let clockEl = document.querySelector('.clock');
let timerEl = document.querySelector('.timer');
let texTimerEl = document.querySelector('.text-time');
let progressBarEl = document.querySelector('.progress-bar');

let intervalTimer;
let minutesTimer= 25;
let secondsTimer= 0;
let isPause= true;
let shortqt=0;

let progresPerSecond= 360/(minutesTimer*60);


function formateInTime(min,seg){
    
    let minutos = min < 10 ? `0${min}`: min;
    let segundos = seg < 10 ? `0${seg}`: seg;

    return `${minutos}:${segundos}`;
}

function progressBar(){
    
}

function tooglePause(){
    if(isPause){

        texTimerEl.textContent="Pause";
        isPause= false;
        
    }
    else{
        texTimerEl.textContent="Start";
        isPause=true;
        clearInterval(intervalTimer);
    }

    console.log(isPause);
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
            shortqt++;
            short();
            minutesTimer=25;
        }
        else{
            secondsTimer--;
        }
    }
    timerEl.textContent=formateInTime(minutesTimer,secondsTimer);
}

function short(){
    //open short break
}
clockEl.addEventListener('click',startTimer);



