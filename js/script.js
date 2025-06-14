//Dirección del END POINT generado en RETOOL
const API_URL = "https://retoolapi.dev/03wkDd/Integrantes";

//Creamos la función que llama a la API y realiza una solicitud GET
async function ObtenerRegistros(){
    //Hacemos GET a la API y obtenemos la respuesta (response)
    const respuesta = await fetch(API_URL);
    //Obtenemos los datos en formato JSON a partir de la respuesta
    const data = await respuesta.json(); //Esto ya es un JSON
    //Llamamos a MostrarRegistros y le enviamos el JSON
    MostrarRegistros(data);
}

//Función para generar las filas de la tabla
//Datos que representa al JSON
function MostrarRegistros(datos){
    //Se llama al elemento tbody dentro de la tabla con el id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar código HTML usamos innerHTML
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.Nombre}</td>
                <td>${persona.Apellido}</td>
                <td>${persona.Correo}</td>
                <td>
                <button onclick = "AbrirModalEditar('${persona.id}', '${persona.Nombre}', '${persona.Apellido}', '${persona.Correo}')">Editar</button>
                <button onclick = "EliminarPersona(${persona.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

ObtenerRegistros();

//Proceso para agregar registros
const modal = document.getElementById("mdAgregar"); //Refiriendonos al Modal
const btnAgregar = document.getElementById("btnAgregar"); //Refiriendonos al botón de agregar desde el index
const btnCerrar = document.getElementById("btnCerrarModal"); //Botón para cerrar el modal

//Creación de función flecha para el evento click
btnAgregar.addEventListener("click", () => {
    modal.showModal(); //Abre el modal cuando se le hace click al boton btnAgregar
});

//Creación de función flecha para el evento click
btnCerrar.addEventListener("click", () => {
    modal.close(); //Abre el modal cuando se le hace click al boton btnAgregar
});

//Agregar un nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //Evita que las cosas se envíen sin nada o por defecto

    //Capturamos los valores del formulario
    const Nombre = document.getElementById("txtNombre").value.trim();
    const Apellido = document.getElementById("txtApellido").value.trim();
    const Correo = document.getElementById("txtEmail").value.trim();
    
    //Validaciones de datos, primero validamos que los datos no se envíen vacíos
    if (!Nombre || !Apellido || !Correo){
        alert("Complete los campos antes de ser ingresados")
        return; //Evitamos que el código se siga ejecutando
    }

    //Llamamos a la API para enviar los datos
    //Creamos el objeto partiendo del API_URL, seguido del código
    const respuesta = await fetch(API_URL, {
        method: "POST", //Método que se quiere realizar, en este caso POST (Insert)
        headers: {'Content-Type':'application/json'}, //Lo que se enviará a la API, un JSON
        body: JSON.stringify({Nombre, Apellido, Correo}) //El JSON puro lo convertirá a String para ir a la API
    });
    //Validación extra, verificar si el registro fue enviado correctamente
    if (respuesta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiamos el formulario con los datos contenidos, sin tener la necesidad de recargar la página
        document.getElementById("frmAgregar").reset();

        //Cerramos el modal
        modal.close();

        //Recargamos la tabla EN VEZ de la página
        ObtenerRegistros();
    } else {
        alert("No se registro nada chavalin, revisa el código");
    }
});


//Función para borrar registros
async function EliminarPersona(idPersona){
    const confirmacion = confirm("¿Desea realmente eliminar el registro de esa persona?");

    //Validamos si el usuario eligió 'Aceptar' la eliminación de la persona
    if (confirmacion){
        await fetch(`${API_URL}/${idPersona}`, {
            method: "DELETE"
        }); //Hacemos la llamada al ENDPOINT, indicando la URL y el ID de registro que se desea eliminar

        //Recargamos la tabla para actualizar la vista del grid
        ObtenerRegistros();

    }
}

/* --------------------- PARA EDITAR MJEE ------------------------ */
const modalEditar = document.getElementById("mdModificar"); //Constante para editar el modal
const btnCerrarEditar = document.getElementById("btnCerrarModalEditar"); //Botón para cerrar el modal

/* ------------------ yo ------------------ */
//Crear función para abrir el MODAL editar
btnCerrarEditar.addEventListener("click", () => {
    modalEditar.close(); //Abre el modal cuando se le hace click al boton btnAgregar
});

//Función para llamar a los valores a la hora de editar
function AbrirModalEditar(id, nombreEditar, apellidoEditar, correoEditar){
    //Agregamos los valores a los input
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtNombreEditar").value = nombreEditar;
    document.getElementById("txtApellidoEditar").value = apellidoEditar;
    document.getElementById("txtEmailEditar").value = correoEditar;

    //Luego de agregar los valores al MODAL, mostraremos al modal editar 
    modalEditar.showModal();
}

//Agregar un nuevo integrante desde el formulario
document.getElementById("frmModificar").addEventListener("submit", async e => {
    e.preventDefault(); //Evita que las cosas se envíen sin nada o por defecto

    //Capturamos los valores del formulario
    const idPersona = document.getElementById("txtIdEditar").value;
    const Nombre = document.getElementById("txtNombreEditar").value.trim();
    const Apellido = document.getElementById("txtApellidoEditar").value.trim();
    const Correo = document.getElementById("txtEmailEditar").value.trim();
    
    //Validaciones de datos, primero validamos que los datos no se envíen vacíos
    if (!Nombre || !Apellido || !Correo){
        alert("Complete los campos antes de ser ingresados")
        return; //Evitamos que el código se siga ejecutando
    }

    //Llamamos a la API para enviar los datos
    //Creamos el objeto partiendo del API_URL, seguido del código
    const respuesta = await fetch(`${API_URL}/${idPersona}`, {
        method: "PUT", //Método que se quiere realizar, en este caso POST (Insert)
        headers: {'Content-Type':'application/json'}, //Lo que se enviará a la API, un JSON
        body: JSON.stringify({Nombre, Apellido, Correo}) //El JSON puro lo convertirá a String para ir a la API
    });
    //Validación extra, verificar si el registro fue enviado correctamente
    if (respuesta.ok){
        alert("El registro fue actualizado correctamente");

        //Limpiamos el formulario con los datos contenidos, sin tener la necesidad de recargar la página
        document.getElementById("frmModificar").reset();

        //Cerramos el modal
        modalEditar.close();

        //Recargamos la tabla EN VEZ de la página
        ObtenerRegistros();
    } else {
        alert("No se actualizó nada chavalin, revisa el código");
    }
});