const storage = localStorage.getItem('data')
const parseStorage = storage ? JSON.parse(storage) : []
const data = parseStorage
const formCreateElement = document.querySelector('#formCreate')
const listElement = document.querySelector('#list')
const inputSearchElement = document.querySelector('#search')
const selectSortElement = document.querySelector('#sort')
let isEdit = false

formCreateElement.addEventListener('submit', handleSubmitFormCreate)
listElement.addEventListener('change', handleTodoChange)
listElement.addEventListener('click', handleRemoveTodo)
listElement.addEventListener('click', handleEditTodo)
listElement.addEventListener('submit', handleSubmitFormEdit)
inputSearchElement.addEventListener('input', handleInputFilterForm)
selectSortElement.addEventListener('change', handleChangeSort)
window.addEventListener('beforeunload', () => {
    const string = JSON.stringify(data)
    localStorage.setItem('data', string)
})

document.addEventListener('DOMContentLoaded', () => render(data))