import { useState, useEffect } from "react";
import { deleteTask } from "./api/todo.js"


function TodoList() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  function obtenerListaTareas() {
    fetch('https://playground.4geeks.com/todo/users/eduardo', { method: "GET" })// buscar informacion en la url
      .then((response) => {
        return response.json()
      }) // si llega una respuesta prometo que la convierto en un formato utilizable JSON

      .then((data) => setTareas(data.todos)) // Prometo que si el formato a json sale bien lo guardo en un espacio
      .catch((error) => console.log(error)) // si algo sale, lo aviso
  }
  console.log(tareas)

  function createTask() {

    fetch('https://playground.4geeks.com/todo/todos/eduardo', {
      method: "POST",
      body: JSON.stringify({
        "label": nuevaTarea,
        "is_done": false
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          obtenerListaTareas();
          setNuevaTarea("");  //PARA LIMPIAR EL INPUT
        }

        return response.json()
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error))

  }

  useEffect(() => {
    //codigo que queremos que se ejecute cuando se cargue el componente
    obtenerListaTareas()
  }, [])

  const input = (e) => setNuevaTarea(e.target.value);

  const keyDown = (e) => {
    if (e.key === "Enter" && nuevaTarea.trim() !== "") {

      createTask(); // funcion que envía la tarea
    }
  }
  // en vez de pasar el index tengo pasar el ID 
  const borrarTareas = (index) => {
    // const newTareas = tareas.filter((tarea, i) => index != i)

  }

  const finalizarClick = (index) => {
    setTareas(tareas.map((tarea, i) =>
      index == i ? { ...tarea, completado: true } : tarea
    ));
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-3"></div>
        <ul className="list-group col-6">
          <li className="list-group-item active">
            <input className="w-100" type="text" onChange={input} onKeyDown={keyDown} value={nuevaTarea} />
          </li>
          {tareas.map((tarea, index) => {
            return (
              <div key={index}>
                <li className="list-group-item d-flex justify-content-between">
                  <p>
                    {tarea.label}
                  </p>
                  <div>
                    {!tarea.completado && <button className="btn btn-danger me-2"

                      onClick={() => {
                        deleteTask(tarea.id).then(() => {
                          obtenerListaTareas();
                        });
                      }}

                    //onClick={() => { deleteTask(tarea.id), obtenerListaTareas() }}  CODIGO ANTIGUO
                    //he esperado que termine la eliminación antes de recargar la lista y añadÍ un return en el delete

                    >Borrar</button>}
                    <button className="btn btn-success" onClick={() => finalizarClick(index)}>Finalizar</button>
                  </div>
                </li>
              </div>
            )
          })}

          <li className="list-group-item">
            {`${tareas.length} item `}
          </li>

        </ul>
        <div className="col-3"></div>
      </div>

    </div>
  )

}

export default TodoList;