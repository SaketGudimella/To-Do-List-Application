import React, { useState } from "react";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("all");

  const handleAddTask = () => {
    if (newTask !== "") {
      const newTaskObject = { name: newTask, completed: false };
      setTasks([...tasks, newTaskObject]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index, newName) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].name = newName;
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  };

  const handleIncompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = false;
    setTasks(updatedTasks);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const filteredTasks =
    category === "all"
      ? tasks
      : category === "completed"
      ? tasks.filter((task) => task.completed)
      : tasks.filter((task) => !task.completed);

  return (
    <div className="app-container" style={{ backgroundColor: "#ffb703" }}>
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        <select value={category} onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                task.completed
                  ? handleIncompleteTask(index)
                  : handleCompleteTask(index)
              }
              style={{
                textDecoration: task.completed ? "line-through" : "none"
              }}
            />
            <input
              type="text"
              value={task.name}
              onChange={(event) => handleEditTask(index, event.target.value)}
              style={{
                textDecoration: task.completed ? "line-through" : "none"
              }}
            />
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
