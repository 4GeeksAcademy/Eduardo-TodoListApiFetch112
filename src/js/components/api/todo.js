export const deleteTask = (todo_id) => {

    console.log(todo_id)
    
     return fetch(`https://playground.4geeks.com/todo/todos/${todo_id}`, {
        method : 'DELETE', 
        headers : {
            'Content-Type' : 'application/json'
        }

    })


}


