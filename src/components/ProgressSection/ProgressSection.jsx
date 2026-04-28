import { Doughnut } from "react-chartjs-2";


export default function ProgressSection({
    percent,
    getPercentForDay,
    data,
    completedDays
  }) {
  
  return (
    <div className="progress-container">
      <div className="weekly-section">
        <h3>This Week</h3>

        <div className="days-container">
          {["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"].map(day => {
            const dayPercent = getPercentForDay(day);

            return (
              <div className="day-column" key={day}>
                <div className="bar-container">
                  <div className="bar-fill" style={{height: `${dayPercent}%`}}>
                    {dayPercent}%
                  </div>
                </div>
                <span className="day-label">{day}</span>
              </div>
            )
            
          })}
        </div>
      </div>

      <div className="chart-section">
          <h3>Overall Progress</h3>
          <Doughnut data={data} />
          <p>{completedDays}/7 Days</p>
      </div>
    </div>
  )
}

