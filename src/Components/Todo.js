import React, { useEffect, useRef, useState } from "react";
import "./Todo.css";
import axios from "axios";
import { useSelector} from "react-redux";

const Todo = () => {
  const username = useSelector((state) => state.login.user);
  
  const [tasks, setTasks] = useState([]);
  const taskInputRef = useRef(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log(username);
        const response = await axios.post('http://localhost:4000/getTasks', {username});
        console.log("Response is ", response);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [username]);

  const addTask = (event) => {
    event.preventDefault();
    const taskText = taskInputRef.current.value.trim();

    if (taskText !== "") {
      setTasks((prevTasks) => [...prevTasks, taskText]);
      taskInputRef.current.value = "";
    }
  };

  const toggleTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  };

  const saveTasks = async () => {
    try {
      // Send a POST request to the '/addTask' endpoint
      await axios.post("http://localhost:4000/addTask", {
        username,
        tasks,
      });
      console.log("Tasks saved successfully");
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          className="task-input"
          id="taskInput"
          placeholder="Enter task"
          ref={taskInputRef}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ul className="task-list" id="taskList">
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              className="task-checkbox"
              onChange={() => toggleTask(index)}
            />
            <span className="task-text">{task}</span>
          </li>
        ))}
      </ul>
      <div>
        <button className="upload-button" onClick={saveTasks}>
          Save Tasks
        </button>
      </div>
    </div>
  );
};

export default Todo;
