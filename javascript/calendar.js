const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let firstDay = (new Date(currentYear, currentMonth)).getDay();
const tBody = document.querySelector(".t-body");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
document.querySelector(".day").innerText = days[today.getDay()];
document.querySelector(".date").innerText = today.getDate();
document.querySelector(".month").innerText = months[currentMonth];
let previousMonth = document.querySelector(".previous-month");
let nextMonth = document.querySelector(".next-month");


function showCalendar(year, month, day) {
    document.querySelector(".year").innerText = year;
    document.querySelector(".month-of-year").innerText = months[month];
    previousMonth.innerText = month === 0 ? months[11] : months[month - 1];
    nextMonth.innerText = month === 11 ? months[0] : months[month + 1];
    tBody.innerHTML = "";
    let date = 1;
    for(let i = 0; i < 6; i++) {
        const tableRow = document.createElement("tr");
        for(let j = 0; j < 7; j++) {
            if(i === 0 && j < day) {
                let cell = document.createElement("td");
                let textCell = document.createTextNode("");
                cell.classList.add("date-of-month");
                cell.style.opacity = 0.5;
                cell.appendChild(textCell);
                tableRow.appendChild(cell);
            } else if(date > daysInMonth(year, month)) {
                break;
            } else {
                let cell = document.createElement("td");
                let div = document.createElement("div");
                if (j === 0) {
                    cell.classList.add("sunday");
                    let daySpan = document.createElement("span");
                    daySpan.innerText = "Sun";
                    cell.appendChild(daySpan);
                } else if (j === 1) {
                    let daySpan = document.createElement("span");
                    daySpan.innerText = "Mon";
                    cell.appendChild(daySpan);
                } else if (j === 2) {
                    let daySpan = document.createElement("span");
                    daySpan.innerText = "Tue";
                    cell.appendChild(daySpan);
                } else if (j === 3) {
                    let daySpan = document.createElement("span");
                    daySpan.innerText = "Wed";
                    cell.appendChild(daySpan);
                } else if (j === 4) {
                    let daySpan = document.createElement("span");
                    daySpan.innerText = "Thu";
                    cell.appendChild(daySpan);
                } else if (j === 5) {
                    let daySpan = document.createElement("span");
                    daySpan.innerText = "Fri";
                    cell.appendChild(daySpan);
                    cell.addEventListener("click", clickHandler)
                } else if (j === 6) {
                    cell.classList.add("saturday");
                    let daySpan = document.createElement("span");
                    daySpan.innerText = "Sat";
                    cell.appendChild(daySpan);
                } 
                let dateSpan = document.createElement("span");
                let textCell = document.createTextNode(date);
                dateSpan.appendChild(textCell);
                cell.classList.add("date-of-month");
                div.appendChild(dateSpan);
                cell.appendChild(div);
                if (year === today.getFullYear() && month === today.getMonth() && date === today.getDate()) {
                    cell.classList.add("today");
                    cell.classList.remove("sunday");
                    cell.classList.remove("saturday");
                }
                tableRow.appendChild(cell);
                date++;
            }
        }
        tBody.appendChild(tableRow)
    }
   
    document.querySelector("tbody").removeEventListener("click", clickHandler)
    // document.querySelector("tbody").addEventListener("click", clickHandler)
}

function clickHandler(event) {
    function myFunction() {
        event.target.style.background = "#fff";
    }
    event.target.style.background= "#f3e14d";
    // setTimeout(myFunction, 3000)
}

function showPreviousMonth(event) {
    event.preventDefault();
    if(currentMonth === 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else {
        currentMonth -= 1;
        currentYear = currentYear;
    }
    firstDay = (new Date(currentYear, currentMonth)).getDay();
    
    showCalendar(currentYear, currentMonth, firstDay);
}

function showNextMonth(event) {
    event.preventDefault();
    if(currentMonth === 11) {
        currentMonth = 0;
        currentYear += 1;
    } else {
        currentMonth += 1;
        currentYear = currentYear;
    }
    firstDay = (new Date(currentYear, currentMonth)).getDay();
    
    showCalendar(currentYear, currentMonth, firstDay);
}

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

previousMonth.addEventListener("click", showPreviousMonth);
nextMonth.addEventListener("click", showNextMonth);

showCalendar(currentYear, currentMonth, firstDay);