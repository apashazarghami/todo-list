const myDate = new Date();
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const today = myDate.getDate();
const year = myDate.getFullYear();
const header = document.querySelector(".header");
// const getData = JSON.parse(localStorage.getItem("todo")); //attention اگر کد خراب شد اینو از کامنت دربیار و همینو تو لوکال استوریج لود پاک کن
let yearOfWeek = header.children[0].children[0].children[3].innerText;
let monthOfWeek = header.children[0].children[0].children[2].innerText;
let myDiv;

document.querySelector(".day").innerText = days[myDate.getDay()];
document.querySelector(".date").innerText = `${myDate.getDate()}th`;
document.querySelector(".month").innerText = months[myDate.getMonth()];
document.querySelector(".year").innerText = year;

showWeeklyCalendar();
loadLocalStorage(today, months[myDate.getMonth()], year)

function showWeeklyCalendar() {
    const div = document.createElement("div");
    div.classList.add("calendar");
    header.appendChild(div);
    for(let j = 0; j < 7; j++) {
        myDiv = document.createElement("div");
        let divDate = document.createElement("div");
        let textDate = document.createTextNode(new Date(myDate.setDate(myDate.getDate() - myDate.getDay() + j)).getDate());
        let divDay = document.createElement("div");
        let textDay = document.createTextNode(days[j]);
        divDate.appendChild(textDate);
        divDay.appendChild(textDay);
        myDiv.classList.add("another-day-content");
        if (textDate.data === String(today)) {
            myDiv.classList.add("today-content")
        }
        myDiv.appendChild(divDate);
        myDiv.appendChild(divDay);  
        div.appendChild(myDiv);
        myDiv.addEventListener("click", (event) => {
            div.querySelectorAll(".another-day-content").forEach(item => {
                if(item.classList.contains("highlight")) {
                    item.classList.remove("highlight")
                }
                if (item.classList.contains("today-content")) {
                    item.classList.replace("today-content", "today-highlight");
                } else {
                    event.target.classList.add("highlight");
                }
            })
            
            if (event.target.classList.contains("today-highlight")) {
                event.target.classList.replace("today-highlight", "today-content");
                event.target.classList.remove("highlight")
            }
            div.querySelectorAll(".another-day-content").forEach(item => {
                item.childNodes.forEach(element => {
                    element.classList.remove("highlight");
                })
            })
        })
    }
}


document.querySelectorAll(".condition-statement").forEach(item => {
    item.addEventListener("click", event => {
        const condition = document.querySelector(".condition").querySelectorAll("div");
        condition.forEach(item => {
            if(item.classList.contains("condition-statement-clicked")) {
                item.classList.remove("condition-statement-clicked");
            }
        })
        event.target.classList.add("condition-statement-clicked");
    })
})




const daysOfWeek = header.children[2].children;

[...daysOfWeek].forEach((item) => {
    item.addEventListener("click", (event) => {
        const dateOfWeek = event.target.children[0].innerText;
        if (item.children[0].innerText == 1 && item.classList.contains("today-content")) {
            monthOfWeek = header.children[0].children[0].children[2].innerText;
            yearOfWeek = header.children[0].children[0].children[3].innerText;
        } else if(item.children[0].innerText == 2 || item.children[0].innerText == 3 || item.children[0].innerText == 4 || item.children[0].innerText == 5 || item.children[0].innerText == 6 || item.children[0].innerText == 7) {
            monthOfWeek = header.children[0].children[0].children[2].innerText;
            yearOfWeek = header.children[0].children[0].children[3].innerText;
        } else {
            monthOfWeek = months[myDate.getMonth() - 1];
            if(myDate.getMonth() - 1 === -1) {
                yearOfWeek = year - 1;
                monthOfWeek = "December";
            } else if (myDate.getMonth() - 1 === 12) {
                yearOfWeek = year + 1;
                monthOfWeek = "January";
            } else {
                monthOfWeek = months[myDate.getMonth() - 1];
                yearOfWeek = year;
            }
        }
        loadLocalStorage(dateOfWeek, monthOfWeek, yearOfWeek);
    })
})

// console.log(getData)

function loadLocalStorage(date, month, year) {
    const getData = JSON.parse(localStorage.getItem("todo"));
    const cards = document.querySelector(".cards");
    cards.innerHTML = "";
    getData.forEach(item => {
        if(item["date"] == date && item["month"] == month && item["year"] == year && item["task"] ) {
            const divCard = document.createElement("div");
            divCard.classList.add("card");
            cards.appendChild(divCard);
            const imageCard = document.createElement("div");
            imageCard.classList.add("act-com-img");
            divCard.appendChild(imageCard);
            const image = document.createElement("img");
            image.src = "../images/active.png";
            imageCard.appendChild(image);
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task-content");
            divCard.appendChild(taskDiv);
            const taskNotesDiv = document.createElement("div");
            taskDiv.appendChild(taskNotesDiv);
            const topicDiv = document.createElement("div");
            topicDiv.innerText = item["task"]
            topicDiv.classList.add("topic");
            taskNotesDiv.appendChild(topicDiv);
            const notesDiv = document.createElement("div");
            notesDiv.innerText = item["note"];
            notesDiv.classList.add("note")
            taskNotesDiv.appendChild(notesDiv);
            const deleteCompleteDiv = document.createElement("div");
            deleteCompleteDiv.classList.add("delete-complete");
            taskDiv.appendChild(deleteCompleteDiv);
            const completeImage = document.createElement("img");
            completeImage.src = "../images/completed.png";
            completeImage.classList.add("complete-img");
            deleteCompleteDiv.appendChild(completeImage);
            const deleteImage = document.createElement("img");
            deleteImage.src = "../images/remove.png";
            deleteImage.classList.add("delete-img");
            deleteCompleteDiv.appendChild(deleteImage);
        }
    })
}

function removeLocalStorage(todo, note) {
    let todos;
    if (localStorage.getItem("todo") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todo"));
    }
    const days = header.children[2].children;
    let date;
    let month = header.children[0].children[0].children[2].innerText;
    let year = header.children[0].children[0].children[3].innerText;
    [...days].forEach(item => {
        if(item.classList.contains("today-content") || item.classList.contains("highlight")) {
            date = item.children[0].innerText;
        }
        
    })
    todos.forEach((item, index) => {
        if(item["date"] == date && item["month"] == month && item["year"] == year && item["task"] == todo && item["note"] == note ) {
            todos.splice(index, 1)
        }
    })

    localStorage.setItem("todo", JSON.stringify(todos));
}

const cards = document.querySelector(".cards");

cards.addEventListener("click", event => {
    if (event.target.classList.contains("complete-img")) {
        event.target.parentElement.previousSibling.children[0].classList.toggle("complete");
        event.target.parentElement.parentElement.parentElement.classList.toggle("hide");
        if (event.target.parentElement.previousSibling.children[0].classList.contains("complete")) {
            event.target.parentElement.parentElement.previousSibling.children[0].src = "../images/complete.png";
            event.target.src = "../images/delete.png";
        } else {
            event.target.parentElement.parentElement.previousSibling.children[0].src = "../images/active.png";
            event.target.src = "../images/completed.png";
        }
    }
    if (event.target.classList.contains("delete-img")) {
        const removeText = event.target.parentElement.parentElement.firstChild.firstChild.innerText;
        const note = event.target.parentElement.parentElement.firstChild.children[1].innerText;
        event.target.parentElement.parentElement.parentElement.remove();
        removeLocalStorage(removeText, note);
    }
})

document.querySelector(".condition").addEventListener("click", event => {
    if(event.target.innerText === "All") {
        [...cards.children].forEach(item => item.style.display = "flex")
    } else if (event.target.innerText === "Complete") {
        [...cards.children].forEach(item => {
            if (item.children[1].children[0].children[0].classList.contains("complete")) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        })
    } else if (event.target.innerText === "Active") {
        [...cards.children].forEach(item => {
            if (item.children[1].children[0].children[0].classList.contains("complete")) {
                item.style.display = "none";
            } else {
                item.style.display = "flex";
            }
        })
    }
})


