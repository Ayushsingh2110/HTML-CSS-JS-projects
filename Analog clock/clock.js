setInterval(()=>{
    date = new Date();
    hour = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    hrotation = 30*hour + minutes/2;
    mrotation = minutes*6;
    srotation = seconds*6;

    document.getElementById('hourHand').style.transform = `rotate(${hrotation}deg)`;
    document.getElementById('minuteHand').style.transform = `rotate(${mrotation}deg)`;
    document.getElementById('secondHand').style.transform = `rotate(${srotation}deg)`;

}, 1000);