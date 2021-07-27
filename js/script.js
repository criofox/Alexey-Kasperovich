const myStorage = window.localStorage
const inputName = document.getElementById('name')
const inputDescription = document.getElementById('description')

let tasks = document.getElementsByClassName('task')

const btn1 = document.getElementById('btnSwitch1')
const btn2 = document.getElementById('btnSwitch2')
const btn3 = document.getElementById('btnSwitch3')

const tab1 = document.getElementById('tab1')
const tab2 = document.getElementById('tab2')
const tab3 = document.getElementById('tab3')

function buttonSwitch1() {
    tab1.classList.add('visible');
    tab2.classList.remove('visible');
    tab3.classList.remove('visible');
    btn1.classList.add('focus');
    btn2.classList.remove('focus');
    btn3.classList.remove('focus');
}

function buttonSwitch2() {
    tab1.classList.remove('visible');
    tab2.classList.add('visible');
    tab3.classList.remove('visible');
    btn1.classList.remove('focus');
    btn2.classList.add('focus');
    btn3.classList.remove('focus');
}

function buttonSwitch3() {
    tab1.classList.remove('visible');
    tab2.classList.remove('visible');
    tab3.classList.add('visible');
    btn1.classList.remove('focus');
    btn2.classList.remove('focus');
    btn3.classList.add('focus');
}

btn1.addEventListener('click', buttonSwitch1)
btn2.addEventListener('click', buttonSwitch2)
btn3.addEventListener('click', buttonSwitch3)

function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("openButton").style.display = "none"
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("openButton").style.display = "block";
}

function executeTask() {
    const divTaskExe = this.closest(`div`)
    const executedTask = tab2.appendChild(document.createElement('div'))
    executedTask.textContent = divTaskExe.value
    executedTask.value = divTaskExe.value
    executedTask.classList.add('task');
    divTaskExe.remove()
    addEditButton(executedTask)
    addDeleteButton(executedTask)
    addHiddenInput(executedTask)
}

function deleteTask() {
    const divTaskDel = this.closest(`div`)
    const deletedTask = tab3.appendChild(document.createElement('div'))
    deletedTask.textContent = divTaskDel.value
    deletedTask.value = divTaskDel.value
    deletedTask.classList.add('task');
    divTaskDel.remove()
    addRestoreButton(deletedTask)
}

function restoreTask() {
    const divTaskRes = this.closest(`div`)
    const restoredTask = tab1.appendChild(document.createElement('div'))
    restoredTask.textContent = divTaskRes.value
    restoredTask.value = divTaskRes.value
    restoredTask.classList.add('task');
    divTaskRes.remove()
    addEditButton(restoredTask)
    addExecuteButton(restoredTask)
    addDeleteButton(restoredTask)
    addHiddenInput(restoredTask)
}



function showEditInput() {
    const divTaskEd = this.closest(`div`)

    if (divTaskEd.parentElement.id === 'tab1') {
        divTaskEd.childNodes[0].nodeValue = null
        divTaskEd.children[0].style.display = 'none'
        divTaskEd.children[1].style.display = 'none'
        divTaskEd.children[2].style.display = 'none'
        divTaskEd.children[3].style.display = 'block'
        divTaskEd.children[4].style.display = 'block'
        divTaskEd.children[5].style.display = 'block'
        divTaskEd.children[3].value = divTaskEd.value
    } else if (divTaskEd.parentElement.id === 'tab2') {
        divTaskEd.childNodes[0].nodeValue = null
        divTaskEd.children[0].style.display = 'none'
        divTaskEd.children[1].style.display = 'none'
        divTaskEd.children[2].style.display = 'block'
        divTaskEd.children[3].style.display = 'block'
        divTaskEd.children[4].style.display = 'block'
        divTaskEd.children[2].value = divTaskEd.value
    }
}

function editTask() {
    const divTaskEd = this.closest(`div`)

    if (this.previousSibling.value.length < 4) {
        alert('Название задачи должно содержать больше 4 символов')
        editTask()
    } else if (divTaskEd.parentElement.id === 'tab1') {
        const editValue = this.previousSibling.value
        divTaskEd.value = editValue
        divTaskEd.textContent = divTaskEd.value
        divTaskEd.classList.add('task');
        addEditButton(divTaskEd)
        addExecuteButton(divTaskEd)
        addDeleteButton(divTaskEd)
        addHiddenInput(divTaskEd)
    } else if (divTaskEd.parentElement.id === 'tab2') {
        const editValue = this.previousSibling.value
        divTaskEd.value = editValue
        divTaskEd.textContent = divTaskEd.value
        divTaskEd.classList.add('task');
        addEditButton(divTaskEd)
        addDeleteButton(divTaskEd)
        addHiddenInput(divTaskEd)
    }

}

function cancelEdit() {
    const divTaskEd = this.closest(`div`)

    if (divTaskEd.parentElement.id === 'tab1') {
        divTaskEd.childNodes[0].nodeValue = divTaskEd.value
        divTaskEd.children[0].style.display = 'block'
        divTaskEd.children[1].style.display = 'block'
        divTaskEd.children[2].style.display = 'block'
        divTaskEd.children[3].style.display = 'none'
        divTaskEd.children[4].style.display = 'none'
        divTaskEd.children[5].style.display = 'none'
    } else if (divTaskEd.parentElement.id === 'tab2') {
        divTaskEd.childNodes[0].nodeValue = divTaskEd.value
        divTaskEd.children[0].style.display = 'block'
        divTaskEd.children[1].style.display = 'block'
        divTaskEd.children[2].style.display = 'none'
        divTaskEd.children[3].style.display = 'none'
    divTaskEd.children[4].style.display = 'none'
    }
}

function addInputButtonOk(elem) {
    const inputButtonOk = elem.appendChild(document.createElement('button'))
    inputButtonOk.innerText = 'Ок'
    inputButtonOk.classList.add('ok');
    inputButtonOk.addEventListener('click', editTask)
}

function addInputButtonCancel(elem) {
    const inputButtonCancel = elem.appendChild(document.createElement('button'))
    inputButtonCancel.innerText = 'Отменить'
    inputButtonCancel.classList.add('cancel');
    inputButtonCancel.addEventListener('click', cancelEdit)
}

function addHiddenInput(elem) {
    const hiddenInput = elem.appendChild(document.createElement('input'))
    hiddenInput.classList.add('hidden');
    addInputButtonOk(elem)
    addInputButtonCancel(elem)
}

function addExecuteButton(elem) {
    const executeButton = elem.appendChild(document.createElement('button'))
    executeButton.innerText = 'Выполнить'
    executeButton.classList.add('execute');
    executeButton.addEventListener('click', executeTask)
}

function addDeleteButton(elem) {
    const deleteButton = elem.appendChild(document.createElement('button'))
    deleteButton.innerText = 'Удалить'
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', deleteTask)
}

function addRestoreButton(elem) {
    const restoreButton = elem.appendChild(document.createElement('button'))
    restoreButton.innerText = 'Восстановить'
    restoreButton.classList.add('restore');
    restoreButton.addEventListener('click', restoreTask)
}

function addEditButton(elem) {
    const editButton = elem.appendChild(document.createElement('button'))
    editButton.innerText = 'Редактировать'
    editButton.classList.add('edit');
    editButton.addEventListener('click', showEditInput)
}

function postTask() {
    const task = tab1.appendChild(document.createElement('div'));

    if (inputName.value.length <= 4) {
        alert('Название задачи должно содержать более 4 символов')
    } else {
    task.innerText = `${inputName.value} ${inputDescription.value}`;
    task.value = `${inputName.value} ${inputDescription.value}`
    task.classList.add('task');
    addEditButton(task)
    addExecuteButton(task)
    addDeleteButton(task)
    addHiddenInput(task)
    buttonSwitch1()
    closeForm()
    }
}

function loadTasksFromLocalStorage(i) {
    const task = tab3.appendChild(document.createElement('div'));

    task.innerText = `${i}`;
    task.value = `${i}`
    task.classList.add('task');
    addRestoreButton(task)
}

// Откомменить, чтобы все данные из localStorage попали в виде задач в удалённый раздел списка дел

// const loadTasksInDeletedSection = allStorage().forEach(i => {
//     loadTasksFromLocalStorage(i)
// })

function allStorage() {

    let archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push(localStorage.getItem(key));
    }

    return archive;
}

function localStorageAll(arr) {
    [...arr].forEach((e)=> {
        localStorage.setItem(`${e.value}`, `${e.value}`);
    });
}

window.addEventListener('beforeunload', (event) => {
    event.returnValue = '';
    localStorageAll(tasks);
  });
