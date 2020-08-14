document.getElementById("formTarea").addEventListener("submit", guardarTarea);// esto llama el formulario con idformTask para usar el boton submit con addeventlistener y lo guarda en una funcion guardarTarea()

function guardarTarea(evento)
{
    evento.preventDefault() //esto elimina el funcionamiento de default del evento submit
    let tarea = document.getElementById("title").value;// esto es una variable que con getelementById trae el input del titulo de tarea para recolectar su valor (lo escrito en el ) con .value
    let descripcion = document.getElementById("description").value; //lo mismo que arriba pero con la descripcion de la tarea
    const tareaConst = {// esto es un objeto con la var const (constante)
        tarea,
        descripcion
        // en este caso podemos poner simplemente una vez el nombre para llamar las variables del objeto seria igual a escribir esto let tarea = tarea y lo mismo para la descripcion asi abreviamos mas el codigo
    };

    //condicion

    //localStorage.setItem("tareas", JSON.stringify(tareaConst)); esto es para almacenar los datos del objeto const tareaConst convertido en un string con json.stringify
    //JSON.parse(localStorage.getItem("tareas"))aqui btenemos las tareas guardadas anteriormente en el localstorage con .getItem y la convertimos de string a objetos con json.parse
    if (localStorage.getItem("tareas") === null)
    {
        let tareas = [];
        tareas.push(tareaConst);
        localStorage.setItem("tareas" ,JSON.stringify(tareas));
    }//con este if lo que hago es almacenar las tareas en caso de que no exista ninguna (null)
    else
    {
        let tareas = JSON.parse(localStorage.getItem("tareas"));
        tareas.push(tareaConst);
        localStorage.setItem("tareas", JSON.stringify(tareas))
    }//este else lo que hace es actualizarlas en caso de que existan tareas las almacena nuevamente
    document.getElementById("formTarea").reset();// con esto reiniciamos el formulario para volver a escribir sin necesidad de estar borrando siempre
    obtenerTarea()
}
function obtenerTarea()
{
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    let tareasView = document.getElementById("tareas");

    tareasView.innerHTML = " ";

    for(let i = 0 ; i < tareas.length; i++)//aqui hacemos el ciclo de leer constantemente si hay tareas para añadir una nueva si existe alguna nueva
    {
        let tarea = tareas[i].tarea;
        let descripcion = tareas[i].descripcion;
        tareasView.innerHTML += `<div class="tareas_body"><h2>lista de tareas</h2>
            <div class="card_body">
                <p>${tarea} - ${descripcion}</p>
                <button href="#" onclick="eliminarTareas('${tarea}')" class="btn_eliminar" >
                tarea realizada
                </button>
            </div>
        </div>`
    }

}
function eliminarTareas(tarea)
{
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    for(let i = 0; i < tareas.length; i++)// este for lo que hace es recorrer las tareas guardas en localstorage para ver si un nombre coincide con alguna de las tareas guardadas si es verdad loo eliminas con el splice
    {
        if(tareas[i].tarea == tarea)//este if elimina una tarea si el nombre coincide con alguno guardado en el localstorage
        {
            tareas.splice(i,1);
        }
    }
    localStorage.setItem("tareas", JSON.stringify(tareas));
    obtenerTarea()
}