import { useState } from "react"
import { Button } from "react-bootstrap"

export default function HabitList({
    id, 
    title,
    history,
    getToday,
    deleteHabit,
    editHabit,
    saveNewHabit,
    editHabitId,
    editHabitInput,
    setEditHabitInput,
    toggleHabit,
  }) {

  const today = getToday();
  const dayCompleted = history?.[today] || false;

  return (
    <li className={`habit-item ${dayCompleted ? "completed" : ""}`}>
        {editHabitId === id ? (
          <div className="input-container">
            <input className="check-input form-check-input" type="checkbox" disabled/>
            <input className="form-control" type="text" 
              value={editHabitInput}
              onChange={(e) => setEditHabitInput(e.target.value)}
            />
          </div>
        ) : (
          <label className="habit-label">
            <input className="check-input form-check-input" type="checkbox" 
              checked={dayCompleted}
              onChange={() => toggleHabit(id)}/>
            <h3>{title}</h3>
          </label>
        )}
      <div className="edit-delete-btn">
        {editHabitId === id ? (
          <Button className="btn btn-success"
            onClick={() => saveNewHabit()}>
            Save
          </Button>
        ) : (
          <Button className="btn btn-success"
            onClick={() => editHabit(id)}>
            Edit
          </Button>
        )}
        
        <Button className="btn btn-danger"
          onClick={() => deleteHabit(id)}>
          Delete
        </Button>
      </div>
    </li>
  )
}