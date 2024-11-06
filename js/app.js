// Variables
const formulario = document.querySelector('#formulario');
const listNotas = document.querySelector('#lista-notas');
const nota = document.querySelector('#nota');
let notasArr = [];

// Event Listener
eventListener();

function eventListener(){
    formulario.addEventListener('submit', agregarNota);

    document.addEventListener('DOMContentLoaded',()=>{
        notasArr = JSON.parse(localStorage.getItem('notas')) || [];
        crearHTML();
    });
}

// Funciones
function agregarNota(event){
    event.preventDefault();
    if(nota.value === ''){
        mostrarError("La nota no puede ir vacia")
        return
    }
    const notaObj = {
        id: Date.now(),
        texto: nota.value
    }
    notasArr = [...notasArr, notaObj];

    crearHTML();
    formulario.reset();
}

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const content = document.querySelector('#contenido')
    content.appendChild(mensajeError);
    setTimeout(()=>{mensajeError.remove()},3000);
}

function crearHTML(){
    limpiarHTML();
    if( notasArr.length > 0){
        notasArr.forEach(nota =>{
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            btnEliminar.onclick = () => {
                borrarNota(nota.id);
            }

            const li = document.createElement('li');
            li.innerText = nota.texto;
            li.appendChild(btnEliminar);
            listNotas.appendChild(li);
        });
    }
    sincronizarStorage();
}

function limpiarHTML(){
    while(listNotas.firstChild){
        listNotas.removeChild(listNotas.firstChild);
    }
}

function sincronizarStorage(){
    localStorage.setItem('notas', JSON.stringify(notasArr));
}

function borrarNota(id){
    notasArr = notasArr.filter(nota => nota.id !== id);
    crearHTML();
}