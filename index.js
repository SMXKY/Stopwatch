//declation of variables

let timerID ;
let running = false ;

const time = {
    min: 0,
    sec: 0,
    x: 0
}

const playButton = document.querySelector('.js-start-pause-button') ;
playButton.innerHTML = '<img src="images and icons/play.png" alt="" style="padding-left: 5px ;">'

let count = Number(localStorage.getItem('counter')) || 0 ;
document.querySelector('.js-previous-times').innerHTML = localStorage.getItem('countLog') ;

//stopwatch functionality

function timer(){
    if(!running){
        timerID = setInterval(() => {
            time.x ++ ;
            if(time.x === 100){
                document.querySelector('.js-xsec-span').innerHTML = `00` ;
            }else if(time.x < 10){
                document.querySelector('.js-xsec-span').innerHTML = `0${time.x}` ;
            }else{
                document.querySelector('.js-xsec-span').innerHTML = `${time.x}` ;
            }

            if(time.x > 99){
                time.x = 0 ;
                time.sec ++ ;
                document.querySelector('.js-sec-span').innerHTML = `0${time.sec}` ;
    
                if(time.sec > 9){
                    document.querySelector('.js-sec-span').innerHTML = `${time.sec}` ;
                }

                if(time.sec === 60){
                    document.querySelector('.js-sec-span').innerHTML = `00` ;
                }
    
                if(time.sec > 59){
                    time.sec = 0 ;
                    time.min ++ ;
                    document.querySelector('.js-min-span').innerHTML = `0${time.min}` ;

                    if(time.min > 59){
                        document.querySelector('.js-sec-span').innerHTML = `${time.min}` ;
                    }
                }
            }
    
            
        }, 10) ;

        running = true ;

    }else{
        clearInterval(timerID) ;
        running = false ;
    }

}

//end stopwatch session

function stopTime(){
    count++

    if(time.sec < 9 ){
        document.querySelector('.js-previous-times').innerHTML += `
        <div class = "previous-time-template">
            <div>Count ${count}</div>
            <div>0${time.min}:0${time.sec}:${time.x}</div>
        </div>
        `
    }else{
        document.querySelector('.js-previous-times').innerHTML += `
        <div class = "previous-time-template">
            <div class ="count-number" >Count ${count}</div>
            <p class ="recorder-time" >${time.min}:${time.sec}:${time.x}</p>
        </div>
        `
    }

    time.x = 0 ;
    time.sec = 0 ;
    time.min = 0 ;

    document.querySelector('.js-xsec-span').innerHTML = `00` ;
    document.querySelector('.js-sec-span').innerHTML = `00` ;
    document.querySelector('.js-min-span').innerHTML = `00` ;

    localStorage.setItem('countLog', document.querySelector('.js-previous-times').innerHTML) ;
    localStorage.setItem('counter' , `${count}`) ;

    document.querySelector('.display-time').classList.add('animation') ;
}

function resetClock(){
    time.x = 0 ;
    time.sec = 0 ;
    time.min = 0 ;

    document.querySelector('.js-previous-times').innerHTML = '' ;

    document.querySelector('.js-xsec-span').innerHTML = `00` ;
    document.querySelector('.js-sec-span').innerHTML = `00` ;
    document.querySelector('.js-min-span').innerHTML = `00` ;

    count = 0 ;

    localStorage.setItem('countLog', document.querySelector('.js-previous-times').innerHTML) ;

    clearInterval(timerID) ;
    running = false ;

    document.querySelector('.display-time').classList.add('animation') ;
}

//button functionality

document.querySelector('.js-start-pause-button').addEventListener('click', () => { timer() ; animation() ; playToPause();}) ;
document.querySelector('.js-stop-button').addEventListener('click', () => { stopTime() ;}) ;
document.querySelector('.js-reset-button').addEventListener('click', () => { resetClock() ; }) ;

//animation functionality

function animation(){
    if(document.querySelector('.display-time').classList.contains('animation')){
        document.querySelector('.display-time').classList.remove('animation') ;
    }else{
        document.querySelector('.display-time').classList.add('animation') ;
    }
}

function playToPause(){
    if(playButton.innerHTML === '<img src="images and icons/play.png" alt="" style="padding-left: 5px ;">'){
        playButton.innerHTML = '<img src="images and icons/pause-button.png" alt="">' ;
    }else if(playButton.innerHTML === '<img src="images and icons/pause-button.png" alt="">'){
        playButton.innerHTML = '<img src="images and icons/play.png" alt="" style="padding-left: 5px ;">' ;
    }
}



