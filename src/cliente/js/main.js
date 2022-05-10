const { default: axios } = require('axios');

require('../css/styles.css');

var clases = document.getElementsByClassName('indiceClick');
clases[0].classList.add('disenoDesClick');
var elementoAntClick = clases[0];

for(let i = 0; i < clases.length; i++){
    clases[i].addEventListener('click', function(){
        clases[i].classList.add('disenoDesClick');
        if(elementoAntClick === clases[i]){
            elementoAntClick = clases[i];
        }
        else{
            elementoAntClick.classList.remove('disenoDesClick');
            elementoAntClick = clases[i];
        }
    });
}

var elementosScrolleados = document.getElementsByClassName('disenoGeneralCuerpo');

function miFun(){
   for(let i = 0; i < elementosScrolleados.length; i++){
        if(document.querySelector('#cuerpo').scrollTop >= (elementosScrolleados[i].offsetTop)-250){
            for(var j = 0; j < clases.length; j++){
                if(j === i){
                    clases[j].classList.add('disenoDesClick');
                    if(elementoAntClick === clases[j]){
                        elementoAntClick = clases[j];
                    }
                    else{
                        elementoAntClick.classList.remove('disenoDesClick');
                        elementoAntClick = clases[j];
                    }
                }
            }
        }
    } 
}

document.querySelector('#cuerpo').onscroll = function(){miFun()}

// Modal
const showModalButton = document.querySelector('#showModal1');
showModalButton.onclick = function(){
    document.querySelector('#modalProyect1').style.display = 'flex';
}
const closeModalButton = document.querySelector('#closeModal1');
closeModalButton.onclick = function(){
    document.querySelector('#modalProyect1').style.display = 'none';
}

// Redirect to projects
document.querySelector('#redirectsProyect1').onclick = function(){
    location.href ='https://weather-app-woad-eight.vercel.app/';
}

// Form

document.getElementById("contactForm").onsubmit = function(event){
    event.preventDefault();
    let strNombre = document.getElementById("nombreContacto").value;
    let strCorreo = document.getElementById("emailContacto").value;
    let strAsunto = document.getElementById("asunto").value;
    let strMensaje = document.getElementById("mensaje").value;
    let emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(strCorreo);
    if(strNombre && emailValidation && strAsunto && strMensaje){
        let datos = {
            n: strNombre,
            c: strCorreo,
            a: strAsunto,
            m: strMensaje
        }
        axios.post("/api/contacto", datos)
        .then(function(response){
            document.getElementById("nombreContacto").value = "";
            document.getElementById("emailContacto").value = "";
            document.getElementById("asunto").value = "";
            document.getElementById("mensaje").value = "";
            alert("Gracias por escribirme, en breve te contactaré");
        })
        .catch(function(error){
           console.log(error); 
        });
    }
    else{
        alert("Por favor rellenar correctamente todos los campos");
    }
}