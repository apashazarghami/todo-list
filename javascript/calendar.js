const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let firstDay = (new Date(currentYear, currentMonth)).getDay();
const tBody = document.querySelector(".t-body");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const addTaskButton = document.querySelector(".add-task-button")
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
                cell.classList.add("no-day");
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
}

// function determineTime(hour, minute) {
//     let refrence;
//     if (hour < 13) {
//         if (hour < 10) {
//             hour = `0{hours}`
//         } else {
//             hour = hour;
//         }
//         refrence = "AM";
//     }
// }

// const tableBody = document.querySelector("tbody");
if (tBody) {
    tBody.addEventListener("click", event => {
        document.querySelector("tbody").childNodes.forEach(item => {
            item.childNodes.forEach(element => {
                if (element.classList.contains("today")) {
                    element.classList.replace("today", "highlight-today");
                }
                if (element.classList.contains("highlight-day")) {
                    element.classList.remove("highlight-day")
                }
            })
        })
        event.target.childNodes[1].classList.remove("highlight-day");
        event.target.classList.add("highlight-day");
        if(event.target.classList.contains("highlight-today")) {
            event.target.classList.replace("highlight-today", "today")
        }
        if(event.target.children.length === 0) {
            event.target.classList.remove("highlight-day");
            document.querySelector("tbody").childNodes.forEach(item => {
                item.childNodes.forEach(element => {
                    if(element.classList.contains("highlight-today")) {
                        element.classList.replace("highlight-today", "today")
                    }
                })
            })
            
        }
    })
}
// tBody.addEventListener("click", event => {
//     document.querySelector("tbody").childNodes.forEach(item => {
//         item.childNodes.forEach(element => {
//             if (element.classList.contains("today")) {
//                 element.classList.replace("today", "highlight-today");
//             }
//             if (element.classList.contains("highlight-day")) {
//                 element.classList.remove("highlight-day")
//             }
//         })
//     })
//     event.target.classList.add("highlight-day");
//     if(event.target.classList.contains("highlight-today")) {
//         event.target.classList.replace("highlight-today", "today")
//     }
//     if(event.target.children.length !== 2) {
//         event.target.classList.remove("highlight-day")
//     }
//     console.log(event.target.children.length)
// })

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
// localStorage.clear()
const saveData = () => {
    const textInput = document.querySelector(".new-task-input").value;
    const notesInput = document.querySelector(".notes-input").value;
    const main = document.querySelector(".main");
    let todos;
    let date;
    let month = main.children[0].children[1].children[0].innerText;
    let year = main.children[0].children[1].children[1].innerText;
    const tr = main.children[1].children[0].children[0].children;
    [...tr].forEach(item => {
        item.childNodes.forEach(element => {
            if(element.classList.contains("today") || element.classList.contains("highlight-day")) {
                date = element.children[1].children[0].innerText;
            }
        })
    });
    if(localStorage.getItem("todo") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todo"))
    }
    todos.push({
        date: date,
        month: month,
        year: year,
        task: textInput,
        note: notesInput
    })
    localStorage.setItem("todo", JSON.stringify(todos));
    document.querySelector(".new-task-input").value = "";
    document.querySelector(".notes-input").value = "";
}

if (previousMonth) {
    previousMonth.addEventListener("click", showPreviousMonth);
}
if (nextMonth) {
    nextMonth.addEventListener("click", showNextMonth);
}

// export const getData = JSON.parse(localStorage.getItem("todo"));

window.onload = function() {
    showCalendar(currentYear, currentMonth, firstDay);
}

if (addTaskButton) {
    addTaskButton.addEventListener("click", saveData);
}
