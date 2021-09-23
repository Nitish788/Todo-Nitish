const input = document.querySelector(".what_todo");

const btnAdd = document.querySelector(".add");

const btnDelete = document.getElementsByClassName("delete");

const todoList = document.querySelector(".todo__list");

const todo = [];

const list = function(arr) {
    btnAdd.addEventListener("click", function() {
        let work = input.value;

        if (!work) return;
        todo.push(work);
        todoList.innerHTML = " ";

        arr.forEach((el) => {
            const html = `<div class="todo">
        ${el} <button class="delete">A</button>
        </div>`;
            todoList.insertAdjacentHTML("afterbegin", html);
        });
        input.value = "";
    });
};

list(todo);

todoList.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete")) {
        const curr = e.target.closest(".todo");
        curr.remove();
    }
});