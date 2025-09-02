import React, { useState } from "react";

function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Yeni görev ekle..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Ekle</button>
    </form>
  );
}

export default AddTask;
