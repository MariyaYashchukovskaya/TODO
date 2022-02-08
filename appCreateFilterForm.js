
function handleInputFilterForm(event) {
    event.preventDefault()
    const { target } = event
    const searchString = target.value
    const matches = data.filter((item) => item.title.includes(searchString))
    render(matches)
}

function handleChangeSort(event) {
    const { target } = event
    const { value } = target

    let sortData = []

    if (value) {
        sortData = data.sort((a, b) => {
            if (+a[value] > +b[value]) return -1
            if (+a[value] < +b[value]) return 1

        })
    } else {
        sortData = data
    }


    render(sortData)
}


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

function buildDate(date) {
    let objectDate = new Date()
    const dateCreate = transformData(objectDate.getDate())
    const monthCreate = transformData(objectDate.getMonth() + 1)
    const yearCreate = objectDate.getFullYear()
    return `${dateCreate}.${monthCreate}.${yearCreate}`
}

function transformData(time) {
    return time < 10 ? `0${time}` : time
}



function buildPriorityForm(priorityForm) {
    const imgStar = '<img src="img/star.png" alt="">'
    let sum = " "
    for (let i = 0; i < priorityForm; i++) {
        sum = sum + imgStar
    }
    priorityForm = sum
    return priorityForm
}