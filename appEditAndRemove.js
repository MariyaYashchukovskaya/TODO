function handleSubmitFormEdit(event) {
    event.preventDefault()
    const { target } = event
    const inputElement = target.querySelector('input[name="title"]')
    const { value } = inputElement
    const { id } = target.dataset
    data.forEach((item) => {
        if (item.id == id) {
            item.title = value
        }
    })

    let parent = target.closest('.island__item')
    parent.classList.remove('island__item_edit')
    isEdit = false
    render(data)
}


function handleEditTodo(event) {
    const { target } = event
    if (target.dataset.role != 'edit') return
    if (isEdit) {
        alert('Задача уже редактируется!')
        return
    }
    let parent = target.closest('.island__item')
    parent.classList.add('island__item_edit')
    isEdit = true
}

function handleRemoveTodo(event) {
    const { target } = event
    if (target.dataset.role != 'remove') return
    const { id } = target.dataset

    data.forEach((item, index) => {
        if (item.id == id) {
            data.splice(index, 1)
        }
    })
    render(data)
}



