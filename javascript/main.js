const myDate = new Date();

function setDay() {
    const dayOfWeek = myDate.getDay();
    let day;
    if(dayOfWeek === 1) {
        day = "Monday";
    } else if(dayOfWeek === 2) {
        day = "Tuesday"
    } else if(dayOfWeek === 3) {
        day = "Wednesday"
    } else if(dayOfWeek === 4) {
        day = "Thursday"
    } else if(dayOfWeek === 5) {
        day = "Friday"
    } else if(dayOfWeek === 6) {
        day = "Saturday"
    } else if(dayOfWeek === 7) {
        day = "Sunday"
    }
    return day;
}