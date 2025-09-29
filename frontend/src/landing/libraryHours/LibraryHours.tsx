import './LibraryHours.css';

export const LibraryHours: React.FC = () => {
       const hours = [
    { day: "Monday", time: "9:00 AM - 6:00 PM" },
    { day: "Tuesday", time: "9:00 AM - 6:00 PM" },
    { day: "Wednesday", time: "9:00 AM - 6:00 PM" },
    { day: "Thursday", time: "9:00 AM - 6:00 PM" },
    { day: "Friday", time: "9:00 AM - 6:00 PM" },
    { day: "Saturday", time: "10:00 AM - 4:00 PM" },
    { day: "Sunday", time: "Closed" },
  ];
  
  return (
    <div className="library-hours">
      <h2>Library Hours</h2>
      <table className="hours-table">
        <tbody>
          {hours.map((entry, index) => (
            <tr key={index}>
              <td className="day">{entry.day}</td>
              <td
                className={`time ${entry.time === "Closed" ? "closed" : ""}`}
              >
                {entry.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
