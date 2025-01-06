document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const subjectInput = document.getElementById("subject");
    const homeworkInput = document.getElementById("homework");
    const dueDateInput = document.getElementById("dueDate");
    const taskList = document.getElementById("taskList");

    // Функція для збереження завдань у Local Storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach((li) => {
            const subject = li.querySelector("strong").textContent;
            const homework = li.querySelector(".task-info").childNodes[2].textContent.trim();
            const dueDate = li.querySelector(".task-date").textContent.replace("До: ", "").trim();
            const isCompleted = li.classList.contains("completed");
            tasks.push({ subject, homework, dueDate, isCompleted });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Функція для завантаження завдань із Local Storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(({ subject, homework, dueDate, isCompleted }) => {
            addTask(subject, homework, dueDate, isCompleted);
        });
    };

    // Функція для створення нового елемента завдання
    const addTask = (subject, homework, dueDate, isCompleted = false) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="task-info">
                <strong>${subject}</strong>: ${homework}
                <div class="task-date">До: ${dueDate}</div>
            </div>
            <span class="delete">✖</span>
        `;

        // Додаємо клас "completed", якщо завдання завершено
        if (isCompleted) {
            li.classList.add("completed");
        }

        // Позначення завдання як виконаного
        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        // Видалення завдання
        li.querySelector(".delete").addEventListener("click", (e) => {
            e.stopPropagation();
            li.remove();
            saveTasks();
        });

        taskList.appendChild(li);
    };

    // Обробка події додавання нового завдання
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const subject = subjectInput.value.trim();
        const homework = homeworkInput.value.trim();
        const dueDate = dueDateInput.value;

        if (!subject || !homework || !dueDate) {
            alert("Будь ласка, заповніть усі поля.");
            return;
        }

        addTask(subject, homework, dueDate);
        saveTasks();

        // Очищення полів форми
        subjectInput.value = "";
        homeworkInput.value = "";
        dueDateInput.value = "";
    });

    // Завантаження завдань при старті
    loadTasks();
});
console.log("Скрипт завантажено");
console.log("Завантаження завдань:", JSON.parse(localStorage.getItem("tasks")));
