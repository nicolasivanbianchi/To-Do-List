const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#enter')
const check = 'bx-check-circle'
const uncheck = 'bx-circle'
const lineThrough = 'line-through'
let id
let LIST

// creacion de fecha
const FECHA = new Date()
fecha.innerHTML = `${FECHA.toLocaleDateString('es-MX',{weekday:'long',month:'short',day:'numeric'})}.`

// funcion agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {
    if (eliminado) {
        return
    }

    // function ternario = ? TRUE : FALSE
    const isFinishedIcon = realizado ? check : uncheck
    const isFinishedLine = realizado ? lineThrough : ''

    const elemento = `  
                    <li id="elemento">
                        <i class='icon bx ${isFinishedIcon}' data="switcher" id="${id}"></i>
                        <p class="text ${isFinishedLine}">${tarea}</p>
                        <i class='bx bxs-trash' data="eliminado" id="${id}"></i>
                    </li> 
                     `
    lista.insertAdjacentHTML("beforeend", elemento)
}

// funcion tarea realizada
function tareaSwitcher(element) {
    if (LIST[element.id].realizado === false) {
        element.parentNode.querySelector('.text').classList.add(lineThrough)
        element.parentNode.querySelector('.icon').classList.remove(uncheck)
        element.parentNode.querySelector('.icon').classList.add(check)
        LIST[element.id].realizado = true
    } else {
        element.parentNode.querySelector('.text').classList.remove(lineThrough)
        element.parentNode.querySelector('.icon').classList.remove(check)
        element.parentNode.querySelector('.icon').classList.add(uncheck)
        LIST[element.id].realizado = false
    }
}

// funcion tarea eliminada
function eliminarTarea(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
}


botonEnter.addEventListener('click', () => {
    const tarea = input.value
    if (tarea) {
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })
    }
    localStorage.setItem('TO-DO', JSON.stringify(LIST))
    input.value = ''
    id++
})

document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const tarea = input.value
        if (tarea) {
            agregarTarea(tarea, id, false, false)
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            })
        }
        localStorage.setItem('TO-DO', JSON.stringify(LIST))
        input.value = ''
        id++
    }
})

lista.addEventListener('click', function (event) {
    const element = event.target
    const elementData = element.attributes.data.value
    if (elementData === 'switcher') {
        tareaSwitcher(element)
    } else if (elementData === 'eliminado') {
        eliminarTarea(element)
    }
    localStorage.setItem('TO-DO', JSON.stringify(LIST))
})

// localStorage getItem
let data = localStorage.getItem('TO-DO')
if (data) {
    LIST = JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
} else {
    LIST = []
    id = 0
}

function cargarLista(DATA) {
    DATA.forEach(function (i) {
        if (i.eliminado === false) {
            agregarTarea(i.nombre, i.id, i.realizado, i.eliminado)
        }
    })
}