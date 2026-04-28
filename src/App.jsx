import './App.css';
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Habits from './components/HabitSection/Habits';
import ProgressSection from './components/ProgressSection/ProgressSection'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie, Doughnut } from "react-chartjs-2"
import Calendar from './CalendarSection/Calendar';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  function getToday() {
    return ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"][new Date().getDay()];
  }

  
  const currentDay = getToday();
  

  function addHabit() {
    const today = getToday();
    const todayDate = new Date().toLocaleDateString("en-CA");

    const newHabit = {
      id: Date.now(),
      title: "New Habit",
      history: {
        Mon: false,
        Tue: false,
        Wed: false,
        Thur: false,
        Fri: false,
        Sat: false,
        Sun: false
      },
      dates: {
        [todayDate]: false
      }
    }

    setHabits([...habits, newHabit])
  }

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits])

  const [editHabitId, setEditHabitId] = useState(null);
  const [editHabitInput, setEditHabitInput] = useState("");

  function editHabit(id) {
    setEditHabitId(id);
    const habitToEdit = habits.find(habit => habit.id === id);
    setEditHabitInput(habitToEdit.title);
  }

  function saveNewHabit() {
    setHabits(habits.map(habit => habit.id === editHabitId 
      ? {...habit, title: editHabitInput} 
      : habit))
    setEditHabitId(null);
    setEditHabitInput("");
  }

  function deleteHabit(id) {
    setHabits(habits.filter(habit => habit.id !== id));
  }


  function toggleHabit(id) {
    const today = getToday();
    const todayDate = new Date().toLocaleDateString("en-CA");

    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const newValue = !habit.history?.[today];

        return {
          ...habit,
          history: {
            ...habit.history,
            [today]: newValue
          },
          dates: {
            ...habit.dates,
            [todayDate]: newValue
          }
        };
      }
      return habit;
    }));
  }


  const [filter, setFilter] = useState("all");


  const filterHabits = habits.filter(habit => {
    const today = getToday();
    const done = habit.history?.[today] || false;

    if (filter === "done") return done;
    if (filter === "notdone") return !done;
    return true;
  });

  function getPercentForDay(day) {
    const completedToday = habits.filter(habit => habit.history?.[day]).length;
    const totalDay = habits.length || 1;

    return Math.round((completedToday/totalDay) * 100);
  }

  const percent = getPercentForDay(currentDay);

  function isDayComplete(day) {
    if (habits.length === 0) return false;

    return habits.every(habit => habit.history?.[day]);
  }

  const days = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];

  const completedDays = days.filter(day => isDayComplete(day)).length;



  const data = {
    labels: [],
    datasets: [
      {
        data: [completedDays, 7 - completedDays],
        backgroundColor: ["#874519", "#dfd1a9"],
        borderWidth: 1,
      }
    ]
  }

  function getStreak() {
    let streak = 0;

    const today = new Date();

    while (true) {
      const dateStr = new Date(today);
      dateStr.setDate(today.getDate() - streak);

      const fullDate = dateStr.toLocaleDateString("en-CA");

      const isComplete = habits.length > 0 && habits.every(habit => habit.dates?.[fullDate]);

      if (!isComplete) break;

      streak++;
    }
    return streak;
  }

  const streak = getStreak();


  return (
    <div className="app-container">
      <div className='left-panel'>
        <ProgressSection 
          percent={percent}
          getPercentForDay={getPercentForDay}
          data={data}
          completedDays={completedDays}
        />
        <Habits 
          getToday={getToday}
          habits={habits}
          addHabit={addHabit}
          deleteHabit={deleteHabit}
          editHabit={editHabit}
          saveNewHabit={saveNewHabit}
          editHabitId={editHabitId}
          editHabitInput={editHabitInput}
          setEditHabitInput={setEditHabitInput}

          toggleHabit={toggleHabit}

          filter={filter}
          setFilter={setFilter}
          filterHabits={filterHabits}
        />
      </div>

      <div className='right-panel'>
        <Calendar   
          habits={habits}
          streak={streak}
        />
      </div>
    </div>
  )
}

export default App

