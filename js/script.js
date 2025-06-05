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
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `;
    });
}

ObtenerRegistros();

//Proceso para agregar registros
const modal = document.getElementById("mdAgregar"); //Refiriendonos al Modal
const btnAgregar = document.getElementById("btnAgregar"); //
const btnCerrar = document.getElementById("btnCerrarModal");