import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import HabitList from './HabitList';

export default function Habits({
    getToday, 
    addHabit,
    deleteHabit,
    editHabit,
    saveNewHabit,
    editHabitId,
    editHabitInput,
    setEditHabitInput,
    toggleHabit,
    filter,
    setFilter,
    filterHabits
  }) {
  return (
    <div className='habit-container'>
      <div className='habit-container-top'>
        <Button className='btn btn-success'
          onClick={() => addHabit()}>
          Add
        </Button>
        <select className='status-select form-select'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="notdone">Not Done</option>
        </select>
      </div>
      <ul>
        {filterHabits.map(habit => (
          <HabitList 
            id={habit.id}
            key={habit.id}
            title={habit.title}
            history={habit.history}
            getToday={getToday}
            deleteHabit={deleteHabit}

            toggleHabit={toggleHabit}

            editHabit={editHabit}
            editHabitId={editHabitId}
            saveNewHabit={saveNewHabit}
            editHabitInput={editHabitInput}
            setEditHabitInput={setEditHabitInput}

          />
        ))}
      </ul>
    </div>
  )
}