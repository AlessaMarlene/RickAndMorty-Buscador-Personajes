var intentos = 0;

$(function(){

    $('#logueo').click(event => {
        
        let usuario = $('#user').val();
        let contra = $('#password').val();
        event.preventDefault();

        if(validacionClave(contra)){ validarCredencial(contra, usuario) }
        else{ manejarError() }

    });

})

function validacionClave(id) {

    var expresionRegular = /^\d{1,2}$/;

    if (!expresionRegular.test(id)) { return false }

    return true;

}

function validarCredencial(id, email){
    
    $.ajax({

        type: 'GET',
        url: `https://jsonplaceholder.typicode.com/users/${id}`,
        success: function(respuesta){
            
            if(email == respuesta.email){

                $('#login').css('display', 'none');

                mostrarContenidoPrincipal(respuesta);

            }
            else{ manejarError() }

        },
        error: function(){ manejarError() }

    })

}

function manejarError(){

    intentos++;

    if(intentos <= 3){ $('#mensajeError').text(`El usuario o contrasenia es inválido. Intento ${intentos}/3`) }
    else{

        $('#login').css('display', 'none');
        $('#mensajeBloqueo').text('La cuenta ha sido bloqueada por exceder la cantidad de intentos permitidos').css('display', 'block');

    }

}

function mostrarContenidoPrincipal(respuesta){

    let fecha = new Date();
    $('#contenidoPrincipal').css('display', 'block');
    $('#encabezado > div > h4').text(`Hola ${respuesta.name}!`);
    $('#encabezado > h4').text(`${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`);

    $('#logout').click(event =>{

        mostrarLogin();

    })

    $(document).keypress(function(event){
        
        let idPersonaje = $('#idPersonaje').val();

        if(event.which == 13 && idPersonaje != ""){
            
            getPersonaje(idPersonaje);

        }

    });

}

function mostrarLogin(){

    $('#login').css('display', 'flex');
    $('#contenidoPrincipal').css('display', 'none');
    $('#resultadoPersonaje').css('display', 'none');
    $('#user').val("");
    $('#password').val("");

}

function getPersonaje(id){

    $.ajax({
        
        type: 'GET',
        url: `https://rickandmortyapi.com/api/character/${id}`,
        success: function(respuesta){
            mostrarPersonaje(respuesta);
        },
        error: function(){
            $('#busqueda > p').text('No existe un personaje con el ID ingresado');
        }

    })

}

function mostrarPersonaje(personaje){

    limpiarTarjetaPersonajeAnterior();

    $('#id > td').text(personaje.id);
    $('#nombre > td').text(personaje.name);
    $('#estado > td').text(personaje.status);
    $('#especie > td').text(personaje.species);
    $('#tipo > td').text(personaje.type);
    $('#genero > td').text(personaje.gender);

    $('#nombre > td').click(event => {
        
        $('#resultadoPersonaje > h4').css('display', 'none');
        let imagen = `<img src="${personaje.image}" alt="${personaje.name}">`;
        $('#resultadoPersonaje > div').append(imagen);
        $('#nombre > td').unbind("click").css({'cursor': 'text', 'color': 'white'});

    })

}

function limpiarTarjetaPersonajeAnterior(){

    $('#resultadoPersonaje').css('display', 'flex');
    $('#resultadoPersonaje > h4').css('display', 'block');
    $('#resultadoPersonaje > div > img').remove();
    $('#nombre > td').bind("click").css({'cursor': 'pointer', 'color': ' rgb(132, 158, 236)'});
    $('#busqueda > p').text("");

}