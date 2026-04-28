

export default function Calendar({
    habits,
    streak
  }) {

  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  const today = new Date();
  const year = today.getFullYear();
  const month  = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();


  const dates = [];

  for (let i = 0; i < startDay; i++) {
    dates.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(i);
  }

  return(
    <div className="calendar-progress-container">
      <div className="calendar">
        <h3>Calendar</h3>
        <div className="calendar-month-date-container">
          <h2>{today.toLocaleString("default", {month: "long"})}</h2>

          <div className="calendar-grid">
            {days.map(day => (
              <div key={day} className="calendar-day">
                {day}
              </div>
            ))}
            {dates.map((date, index) => {
              if (!date) {
                return <div key={index} className="calendar-cell"></div>;
              }

              const fullDate = new Date(year, month, date).toLocaleDateString('en-CA');
              
              const isComplete = habits.every(habit => {
                if (!habit.dates) return false;
                return habit.dates?.[fullDate];
              });

              return (
                <div 
                  key={index} 
                  className={
                    `calendar-cell ${isComplete ? "calendar-cell-active" : ""}`
                  }>
                  {date}
                </div>
              )
            }

             
            )}
          </div>

        </div>
      </div>
      <div className="progress-streak">
        <h3>{streak}</h3>
        <p>Day Streak</p>
      </div>
    </div>
  )
}