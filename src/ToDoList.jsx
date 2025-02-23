import { useState } from 'react';

function ToDoList () {

    //get familiar with hooks
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    //what event is being passed to it? the onChange in the input
    function inputChange(event){
        setNewTask(event.target.value);
    }

    //take existing tasks "tasks", add the new task "newTask"
    function addTask(){

        if(newTask.trim()) {
            //BROWSER IS GIVING ME AN ERROR
            //it's a string newTask is a string

            //OK browser was NOT giving me an error i cleared my cache
            //I needed to specify that i was only rendering tasks.text and not the entire task object: LINE 85

            //gave it a isCompleted field, so its an object now
            const newTaskObject = {text: newTask || "", isCompleted: false}
            //update
            setTasks(t => [...t, newTaskObject]);
            //clear setNewTask (and the input field)
            setNewTask('');
        }
    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((element, i) => 
        i !== index);
        setTasks(updatedTasks);
        // we are using setTasks every time we want to update the list in return()
    }

    function doneTask(index){
        //TODO: a thing that maps over it to see which task was clicked, then changes the font color to green
        const updatedTasks = [...tasks];
        updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
        setTasks(updatedTasks);
    }

    function moveTaskUp(index){
        if(index > 0){
            //... is the spread syntax, breaking arrays/lists/whatever into individual components. dependent on what u want to show tho
            const updatedTasks = [...tasks];

            // switch two elements in an array
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];

            //update
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){
        // minus one because remember index starts with 0 for the love of GOD index starts with zero
        if(index < tasks.length - 1){

            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];

            setTasks(updatedTasks);
        }
    }

    // a callback is a function executed by another function. i never did get that clarified until now, i always called it a function's function
    return(
        <div className = "to-do-list">
            <h1>To Do</h1>
            <input type="text" placeholder="Enter new task" value={newTask} onChange={inputChange}
            />
            <button className = "add-button" onClick={addTask}>
                +
            </button>
            <ol>
                {tasks.map((task, index) => 
                // here we do the doneTask() changes via ternary
                <li key={index} style={{color: task.isCompleted ? 'green' : 'black'}}>
                    <button className = "done-button" onClick={() => doneTask(index)}>✔️</button>
                    <span className = "text">{task.text || ""}</span>
                    
                    <button className = "delete-button" onClick={() => deleteTask(index)}>🗑️</button>

                    <button className = "move-up-button" onClick={() => moveTaskUp(index)}>↑</button>

                    <button className = "move-down-button" onClick={() => moveTaskDown(index)}>↓</button>
                </li>
                )}
            </ol>
        </div>
    );
}

export default ToDoList