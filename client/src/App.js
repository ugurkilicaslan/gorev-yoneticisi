import React, { useEffect, useState } from "react";
import api from "./api";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Görevler alınamadı:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title) => {
    try {
      const response = await api.post("/tasks", { title });
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Görev eklenemedi:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Görev silinemedi:", error);
    }
  };

  // İlk açılışta görevleri getir
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app">
      <h1>Görev Yöneticisi</h1>
      <AddTask onAdd={addTask} />
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <TaskList tasks={tasks} onDelete={deleteTask} />
      )}
    </div>
  );
}

export default App;
