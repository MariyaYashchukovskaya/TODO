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


function handleSubmitFormCreate(event) {
    event.preventDefault()
    const date = new Date()

    const todo = {
        createdAt: date,
        id: date.getTime(),
        isChecked: false
    }
    const formData = new FormData(formCreateElement)

    for (let [name, value] of formData) {
        todo[name] = value
    }
    data.push(todo)
    render(data)
    formCreateElement.reset()
}


function todoTemplate({ title, id, isChecked, createdAt, estimate, priority}) {
    const dateCreateAt = buildDate(createdAt)
    let priorityForm = `${priority}`
    priorityForm = buildPriorityForm(priorityForm)

    const attrId = 'todo' + id
    const attrChecked = isChecked ? 'checked' : ''
    const estimateInput = estimate ? `${estimate}ч.` : ''
    return `
    
    <div class="island__item  ${isChecked ? 'island__item_checked' : ''}">
     <div class="form-check">
     <div class="form-check_primary">
     <div class="form-check_primary_item">
        <input
          class="form-check-input"
          type="checkbox" id="${attrId}" ${attrChecked} data-id="${id}">     

        <label data-id="${id}" for="${attrId}">
          ${title}
        </label>
        <form action="" class="form-edit"  data-id="${id}">        
            <input type="text" class="island__input_edit" name="title" placeholder="" value="${title}" >               
            <button type="submit" class="button-save"></button>                
        </form>
        </div> 
        <button class="button_edit" data-id="${id}" type="button" data-role="edit"></button>
        <div class="form-create-data">${dateCreateAt}</div>
        </div> 
        <div class="form-check_secondory">  
        
        <button class="btn-remove" data-id="${id}" data-role="remove"></button>
        <span class="star">${priorityForm}</span>
        <span class="estimate">${estimateInput}</span>
        </div>
        </div>
        </div>       
    `
}


function handleTodoChange(event) {
    const { target } = event
    const { id } = target.dataset

    if (target.type != 'checkbox') return
    data.forEach((item) => {
        if (item.id == id) {
            item.isChecked = target.checked
        }
    })
    let parent = target.closest('.island__item')
    parent.classList.toggle('island__item_checked')
}


function render(todoList) {
    let result = ''
    todoList.forEach((todo) => {
        const template = todoTemplate(todo)
        result = result + template
    })
    listElement.innerHTML = result
}

