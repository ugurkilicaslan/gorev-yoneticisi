import React from "react";

function TaskList({ tasks, onDelete }) {
  return (
    <ul className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <li key={task._id}>
            <span>{task.title}</span>
            <button onClick={() => onDelete(task._id)}>Sil</button>
          </li>
        ))
      ) : (
        <p className="no-tasks">Henüz görev yok.</p>
      )}
    </ul>
  );
}

export default TaskList;
