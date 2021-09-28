const input = document.querySelector(".what_todo");

const btnAdd = document.querySelector(".add");

const todoList = document.querySelector(".todo__list");

const labelRight = document.querySelector(".right");

const labelLeft = document.querySelector(".left");

const cancel = document.querySelector(".clear");

// Create an Array for both localStorage and for script

const store = function() {
    let work = input.value;
    if (!work) return;
    let localItems = JSON.parse(localStorage.getItem("localItem"));
    if (localItems === null) {
        task = [];
    } else {
        task = localItems;
    }
    task.push(work);
    localStorage.setItem("localItem", JSON.stringify(task));
    addList();
    input.value = "";
};

//  Add event listner to add work

btnAdd.addEventListener("click", store);
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") store();
});

//  Create Todo List by inserting in DOM

function addList() {
    let localItems = JSON.parse(localStorage.getItem("localItem"));
    if (localItems === null) {
        task = [];
    } else {
        task = localItems;
    }
    labelLeft.innerHTML = " ";
    labelRight.innerHTML = " ";
    if (labelRight.innerText === "" || labelLeft.innerText === "") {
        cancel.classList.add("hidden");
    }

    task.forEach((el, i) => {
        if (i % 2 === 0) {
            let html = `<div class="todo"><span class ="hide">${el}</span><button class="delete"><img src="delete.png" alt="" class ="delete"/></button>
    </div>`;
            labelLeft.insertAdjacentHTML("beforeend", html);
        } else {
            html = `<div class="todo"><span class ="hide">${el}</span><button class="delete"><img src="delete.png" alt="" class ="delete"/></button>
        </div>`;
            labelRight.insertAdjacentHTML("beforeend", html);
        }
    });
    if (labelRight.innerText !== "" || labelLeft.innerText !== "") {
        cancel.classList.remove("hidden");
    }
}
addList();

// Add event Listner to Parent element (event delegation) and select by specific condition (DOM traversing) for delete specific work

const deleteTask = function(e) {
    if (e.target.classList.contains("delete")) {
        const curr = e.target.closest(".todo");

        curr.remove();

        task.forEach((el, i) => {
            const current = curr.firstElementChild.innerText;

            if (el === current) {
                let localItems = JSON.parse(localStorage.getItem("localItem"));

                task.splice(i, 1);
                localStorage.setItem("localItem", JSON.stringify(task));
                addList();
            }
        });
    }
};
labelLeft.addEventListener("click", deleteTask);
labelRight.addEventListener("click", deleteTask);

// Add Event Listner for clear whole list

cancel.addEventListener("click", function() {
    localStorage.clear();
    addList();
});

//  Get current date and day

const labelDay = document.querySelector(".day");
const labelDate = document.querySelector(".date");
const option = {
    weekday: "long",
};
const option2 = {
    day: "numeric",
    year: "numeric",
    month: "short",
};
const day = new Date();

setInterval(() => {
    labelDay.textContent = new Intl.DateTimeFormat(
        navigator.language,
        option
    ).format(day);
    labelDate.textContent = new Intl.DateTimeFormat("en-GB", option2).format(day);
}, 1000);