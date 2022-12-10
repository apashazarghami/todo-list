const today = new Date(),
  tBody = document.querySelector(".t-body"),
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  addTaskButton = document.querySelector(".add-task-button");

let currentYear = today.getFullYear(),
  currentMonth = today.getMonth(),
  firstDay = new Date(currentYear, currentMonth).getDay(),
  previousMonth = document.querySelector(".previous-month"),
  nextMonth = document.querySelector(".next-month");

showDate();

function showDate() {
  makeText(".day", days[today.getDay()]);
  makeText(".date", today.getDate());
  makeText(".month", months[currentMonth]);
}

function makeText(className, text) {
  document.querySelector(className).innerText = text;
}

function showCalendar(year, month, day) {
  makeText(".year", year);
  makeText(".month-of-year", months[month]);
  previousMonth.innerText = month === 0 ? months[11] : months[month - 1];
  nextMonth.innerText = month === 11 ? months[0] : months[month + 1];
  tBody.innerHTML = "";
  makeCalendar(year, month, day);
}

function makeDayCell(day, cell) {
  let daySpan = document.createElement("span");
  daySpan.innerText = day;
  cell.appendChild(daySpan);
  if (day === "Sun") {
    cell.classList.add("sunday");
  } else if (day === "Sat") {
    cell.classList.add("saturday");
  }
}

function makeCalendar(year, month, day) {
  let date = 1;
  for (let i = 0; i < 6; i++) {
    const tableRow = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < day) {
        let cell = document.createElement("td");
        cell.classList.add("no-day");
        tableRow.appendChild(cell);
      } else if (date > daysInMonth(year, month)) {
        break;
      } else {
        let cell = document.createElement("td");
        let div = document.createElement("div");
        if (j === 0) {
          makeDayCell("Sun", cell);
        } else if (j === 1) {
          makeDayCell("Mon", cell);
        } else if (j === 2) {
          makeDayCell("Tue", cell);
        } else if (j === 3) {
          makeDayCell("Wed", cell);
        } else if (j === 4) {
          makeDayCell("Thu", cell);
        } else if (j === 5) {
          makeDayCell("Fri", cell);
        } else if (j === 6) {
          makeDayCell("Sat", cell);
        }
        let dateSpan = document.createElement("span");
        let textCell = document.createTextNode(date);
        dateSpan.appendChild(textCell);
        cell.classList.add("date-of-month");
        div.appendChild(dateSpan);
        cell.appendChild(div);
        if (
          year === today.getFullYear() &&
          month === today.getMonth() &&
          date === today.getDate()
        ) {
          cell.classList.add("today");
          cell.classList.remove("sunday");
          cell.classList.remove("saturday");
        }
        tableRow.appendChild(cell);
        date++;
      }
    }
    tBody.appendChild(tableRow);
  }
}

function chooseDate(event) {
  document.querySelector("tbody").childNodes.forEach((item) => {
    item.childNodes.forEach((element) => {
      if (element.classList.contains("today")) {
        element.classList.replace("today", "highlight-today");
      }
      if (element.classList.contains("highlight-day")) {
        element.classList.remove("highlight-day");
      }
    });
  });
  event.target.childNodes[1].classList.remove("highlight-day");
  event.target.classList.add("highlight-day");
  if (event.target.classList.contains("highlight-today")) {
    event.target.classList.replace("highlight-today", "today");
  }
  if (event.target.children.length === 0) {
    event.target.classList.remove("highlight-day");
    document.querySelector("tbody").childNodes.forEach((item) => {
      item.childNodes.forEach((element) => {
        if (element.classList.contains("highlight-today")) {
          element.classList.replace("highlight-today", "today");
        }
      });
    });
  }
}

function showPreviousMonth(event) {
  event.preventDefault();
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear -= 1;
  } else {
    currentMonth -= 1;
    currentYear = currentYear;
  }
  firstDay = new Date(currentYear, currentMonth).getDay();

  showCalendar(currentYear, currentMonth, firstDay);
}

function showNextMonth(event) {
  event.preventDefault();
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear += 1;
  } else {
    currentMonth += 1;
    currentYear = currentYear;
  }
  firstDay = new Date(currentYear, currentMonth).getDay();

  showCalendar(currentYear, currentMonth, firstDay);
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

const saveData = () => {
  const textInput = document.querySelector(".new-task-input").value,
    notesInput = document.querySelector(".notes-input").value,
    main = document.querySelector(".main"),
    tr = main.children[1].children[0].children[0].children,
    year = main.children[0].children[1].children[1].innerText,
    month = main.children[0].children[1].children[0].innerText;
  let todos, date;
  [...tr].forEach((tableRows) => {
    tableRows.childNodes.forEach((tableRow) => {
      if (
        tableRow.classList.contains("today") ||
        tableRow.classList.contains("highlight-day")
      ) {
        date = tableRow.children[1].children[0].innerText;
      }
    });
  });
  if (localStorage.getItem("todo") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todo"));
  }
  todos.push({
    date: date,
    month: month,
    year: year,
    task: textInput,
    note: notesInput,
  });
  localStorage.setItem("todo", JSON.stringify(todos));
  document.querySelector(".new-task-input").value = "";
  document.querySelector(".notes-input").value = "";
};

tBody.addEventListener("click", chooseDate);

previousMonth.addEventListener("click", showPreviousMonth);

nextMonth.addEventListener("click", showNextMonth);

window.onload = function () {
  showCalendar(currentYear, currentMonth, firstDay);
};

addTaskButton.addEventListener("click", saveData);
