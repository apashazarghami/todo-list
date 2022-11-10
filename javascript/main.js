const myDate = new Date(),
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
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
  today = myDate.getDate(),
  year = myDate.getFullYear(),
  header = document.querySelector(".header"),
  conditions = document.querySelectorAll(".condition-statement");

document.addEventListener("DOMContentLoaded", showWeeklyCalendar());

const daysOfWeek = header.children[2].children;

function showWeeklyCalendar() {
  showToday();
  const calendarDiv = document.createElement("div");
  calendarDiv.classList.add("calendar");
  header.appendChild(calendarDiv);
  makeCalendar(calendarDiv);
  loadLocalStorage(today, months[new Date().getMonth()], year);
}

function showToday() {
  document.querySelector(".day").innerText = days[myDate.getDay()];
  document.querySelector(".date").innerText = `${myDate.getDate()}th`;
  document.querySelector(".month").innerText = months[myDate.getMonth()];
  document.querySelector(".year").innerText = year;
}

function makeCalendar(calendarDiv) {
  for (let j = 0; j < 7; j++) {
    const daysDiv = document.createElement("div"),
      textDate = document.createTextNode(
        new Date(
          myDate.setDate(myDate.getDate() - myDate.getDay() + j)
        ).getDate()
      ),
      textDay = document.createTextNode(days[j]);
    let hiddenDiv, divDate, divDay;
    daysDiv.classList.add("another-day-content");
    if (textDate.data === String(today)) {
      daysDiv.classList.add("today-content");
    }
    makeTagTextNode(divDate, textDate, daysDiv);
    makeTagTextNode(divDay, textDay, daysDiv);
    makeDivTag(hiddenDiv, daysDiv, "year", j);
    calendarDiv.appendChild(daysDiv);
    daysDiv.addEventListener("click", () =>
      changeDaysClass(event, calendarDiv)
    );
  }
}

function makeTagTextNode(tagName, nodeText, appendTag) {
  tagName = document.createElement("div");
  tagName.appendChild(nodeText);
  appendTag.appendChild(tagName);
}

function makeDivTag(tagName, appendTag, className, tagText) {
  tagName = document.createElement("div");
  appendTag.appendChild(tagName);
  tagName.classList.add(className);
  tagName.innerText = tagText;
  return tagName;
}

function makeImageTag(tagName, appendTag, source, className) {
  tagName = document.createElement("img");
  appendTag.appendChild(tagName);
  tagName.src = source;
  tagName.classList.add(className);
}

function changeDaysClass(event, calendarDiv) {
  calendarDiv.querySelectorAll(".another-day-content").forEach((day) => {
    if (day.classList.contains("highlight")) {
      day.classList.remove("highlight");
    }
    if (day.classList.contains("today-content")) {
      day.classList.replace("today-content", "today-highlight");
    } else {
      event.target.classList.add("highlight");
    }
  });

  if (event.target.classList.contains("today-highlight")) {
    event.target.classList.replace("today-highlight", "today-content");
    event.target.classList.remove("highlight");
  }
  calendarDiv.querySelectorAll(".another-day-content").forEach((day) => {
    day.childNodes.forEach((element) => {
      element.classList.remove("highlight");
    });
  });
}

function changeConditionsClass(event) {
  const satates = document.querySelectorAll(".condition-statement");
  satates.forEach((state) => {
    if (state.classList.contains("condition-statement-clicked")) {
      state.classList.remove("condition-statement-clicked");
    }
  });
  event.target.classList.add("condition-statement-clicked");
}

function loadLocalStorage(date, month, year) {
  const getData = JSON.parse(localStorage.getItem("todo"));
  const cards = document.querySelector(".cards");
  cards.innerHTML = "";
  getData.forEach((item) => {
    if (
      item["date"] == date &&
      item["month"] == month &&
      item["year"] == year &&
      item["task"]
    ) {
      let divCard,
        imageCard,
        taskDiv,
        topicDiv,
        notesDiv,
        deleteCompleteDiv,
        image,
        completeImage,
        deleteImage;
      const divCardTag = makeDivTag(divCard, cards, "card", ""),
        taskNotesDiv = document.createElement("div"),
        imageCardTag = makeDivTag(imageCard, divCardTag, "act-com-img", ""),
        taskDivTag = makeDivTag(taskDiv, divCardTag, "task-content", "");
      makeDivTag(topicDiv, taskNotesDiv, "topic", item["task"]);
      makeDivTag(notesDiv, taskNotesDiv, "note", item["note"]);
      makeImageTag(image, imageCardTag, "../images/active.png");
      taskDivTag.appendChild(taskNotesDiv);
      const deleteCompleteDivTag = makeDivTag(
        deleteCompleteDiv,
        taskDivTag,
        "delete-complete",
        ""
      );
      makeImageTag(
        completeImage,
        deleteCompleteDivTag,
        "../images/completed.png",
        "complete-img"
      );
      makeImageTag(
        deleteImage,
        deleteCompleteDivTag,
        "../images/remove.png",
        "delete-img"
      );
    }
  });
}

function removeLocalStorage(todo, note, month, year) {
  const days = header.children[2].children;
  let todos, date;
  if (localStorage.getItem("todo") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todo"));
  }
  [...days].forEach((item) => {
    if (
      item.classList.contains("today-content") ||
      item.classList.contains("highlight")
    ) {
      date = item.children[0].innerText;
    }
  });

  todos.forEach((todoItem, index) => {
    if (
      todoItem["date"] == date &&
      todoItem["month"] == month &&
      todoItem["year"] == year &&
      todoItem["task"] == todo &&
      todoItem["note"] == note
    ) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todo", JSON.stringify(todos));
}

function completeHandler(event) {
  if (event.target.classList.contains("complete-img")) {
    event.target.parentElement.previousSibling.children[0].classList.toggle(
      "complete"
    );
    event.target.parentElement.parentElement.parentElement.classList.toggle(
      "hide"
    );
    if (
      event.target.parentElement.previousSibling.children[0].classList.contains(
        "complete"
      )
    ) {
      event.target.parentElement.parentElement.previousSibling.children[0].src =
        "../images/complete.png";
      event.target.src = "../images/delete.png";
    } else {
      event.target.parentElement.parentElement.previousSibling.children[0].src =
        "../images/active.png";
      event.target.src = "../images/completed.png";
    }
  }
}

function deleteHandler(event) {
  if (event.target.classList.contains("delete-img")) {
    const removeText =
      event.target.parentElement.parentElement.firstChild.firstChild.innerText;
    const note =
      event.target.parentElement.parentElement.firstChild.children[1].innerText;
    let month, year;
    document.querySelectorAll(".another-day-content").forEach((dayOfWeek) => {
      [
        ...event.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.previousElementSibling.children[2].children,
      ].forEach((day) => {
        if (
          dayOfWeek.classList.contains("today-content") ||
          dayOfWeek.classList.contains("today-highlight")
        ) {
          if (
            day.classList.contains("today-content") ||
            day.classList.contains("highlight")
          ) {
            if (
              Number(day.children[2].innerText) <
                Number(dayOfWeek.children[2].innerText) &&
              Number(day.children[0].innerText) >
                Number(dayOfWeek.children[0].innerText)
            ) {
              month =
                new Date().getMonth() == 0
                  ? "December"
                  : months[new Date().getMonth() - 1];
              year =
                new Date().getMonth() == 0
                  ? new Date().getFullYear() - 1
                  : header.children[0].children[0].children[3].innerText;
            } else if (
              Number(day.children[2].innerText) >
                Number(dayOfWeek.children[2].innerText) &&
              Number(day.children[0].innerText) <
                Number(dayOfWeek.children[0].innerText)
            ) {
              month =
                new Date().getMonth() == 11
                  ? "January"
                  : months[new Date().getMonth() + 1];
              year =
                new Date().getMonth() == 11
                  ? new Date().getFullYear() + 1
                  : header.children[0].children[0].children[3].innerText;
            } else {
              month = header.children[0].children[0].children[2].innerText;
              year = header.children[0].children[0].children[3].innerText;
            }
          }
        }
      });
    });
    removeLocalStorage(removeText, note, month, year);
    event.target.parentElement.parentElement.parentElement.remove();
  }
}

function iconClickHandler(event) {
  completeHandler(event);
  deleteHandler(event);
}

function conditionHandler(event) {
  [...cards.children].forEach((card) => {
    if (event.target.innerText === "All") {
      card.style.display = "flex";
    } else if (event.target.innerText === "Complete") {
      if (
        card.children[1].children[0].children[0].classList.contains("complete")
      ) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    } else if (event.target.innerText === "Active") {
      if (
        card.children[1].children[0].children[0].classList.contains("complete")
      ) {
        card.style.display = "none";
      } else {
        card.style.display = "flex";
      }
    }
  });
}

conditions.forEach((condition) => {
  condition.addEventListener("click", changeConditionsClass);
});

[...daysOfWeek].forEach((item) => {
  item.addEventListener("click", (event) => {
    const dateOfWeek = event.target.children[0].innerText;
    const calendar = item.parentElement.children;
    let yearOfWeek;
    let monthOfWeek;
    [...calendar].forEach((dayOfWeek) => {
      if (
        dayOfWeek.classList.contains("today-highlight") ||
        dayOfWeek.classList.contains("today-content")
      ) {
        if (
          Number(event.target.children[2].innerText) <
            Number(dayOfWeek.children[2].innerText) &&
          Number(event.target.children[0].innerText) >
            Number(dayOfWeek.children[0].innerText)
        ) {
          monthOfWeek =
            new Date().getMonth() == 0
              ? "December"
              : months[new Date().getMonth() - 1];
          yearOfWeek =
            new Date().getMonth() == 0
              ? new Date().getFullYear() - 1
              : header.children[0].children[0].children[3].innerText;
        } else if (
          Number(event.target.children[2].innerText) >
            Number(dayOfWeek.children[2].innerText) &&
          Number(event.target.children[0].innerText) <
            Number(dayOfWeek.children[0].innerText)
        ) {
          monthOfWeek =
            new Date().getMonth() == 11
              ? "January"
              : months[new Date().getMonth() + 1];
          yearOfWeek =
            new Date().getMonth() == 11
              ? new Date().getFullYear() + 1
              : header.children[0].children[0].children[3].innerText;
        } else {
          monthOfWeek = header.children[0].children[0].children[2].innerText;
          yearOfWeek = header.children[0].children[0].children[3].innerText;
        }
      }
    });
    loadLocalStorage(dateOfWeek, monthOfWeek, yearOfWeek);
  });
});

const cards = document.querySelector(".cards");

cards.addEventListener("click", iconClickHandler);

document
  .querySelector(".condition")
  .addEventListener("click", conditionHandler);
