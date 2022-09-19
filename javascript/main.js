const myDate = new Date();
document.querySelector(".day").innerText = setDay();
document.querySelector(".date").innerText = `${myDate.getDate()}th`;
document.querySelector(".month").innerText = setMonth();

function setDay() {
    const dayOfWeek = myDate.getDay();
    let day;
    if(dayOfWeek === 1) {
        day = "Monday";
    } else if(dayOfWeek === 2) {
        day = "Tuesday";
    } else if(dayOfWeek === 3) {
        day = "Wednesday";
    } else if(dayOfWeek === 4) {
        day = "Thursday";
    } else if(dayOfWeek === 5) {
        day = "Friday";
    } else if(dayOfWeek === 6) {
        day = "Saturday";
    } else if(dayOfWeek === 7) {
        day = "Sunday";
    }
    return day;
}

function setMonth() {
    const monthOfYear = myDate.getMonth();
    let month;
    if(monthOfYear === 0) {
        month = "January"; 
    } else if(monthOfYear === 1) {
        month = "February";
    } else if(monthOfYear === 2) {
        month = "March";
    } else if(monthOfYear === 3) {
        month = "April";
    } else if(monthOfYear === 4) {
        month = "May";
    } else if(monthOfYear === 5) {
        month = "June";
    } else if(monthOfYear === 6) {
        month = "July";
    } else if(monthOfYear === 7) {
        month = "August";
    } else if(monthOfYear === 8) {
        month = "September";
    } else if(monthOfYear === 9) {
        month = "October";
    } else if(monthOfYear === 10) {
        month = "November";
    } else if(monthOfYear === 11) {
        month = "December";
    }
    return month;
}