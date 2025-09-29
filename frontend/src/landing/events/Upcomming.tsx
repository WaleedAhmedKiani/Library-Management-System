import { AutoAwesome } from '@mui/icons-material';
import './Upcomming.css';

export const Upcomming:React.FC = () => {
    return(
      <div className="upcoming-events">
  <div className="upcoming-events-header">
    <AutoAwesome sx={{ fontSize: "2.5rem", color: "#2c3e50" }} />
    <h1>Upcoming Events</h1>
    <p>
      Stay tuned for our upcoming events and be part of the exciting
      experiences we have planned.
    </p>
  </div>

  {/* Example Events List (optional, expandable later) */}
  <div className="upcoming-events-list">
    <div className="event-card">
      <h2>Book Reading Session</h2>
      <p>📅 September 15, 2025 | 📍 City Library</p>
    </div>
    <div className="event-card">
      <h2>Author Meetup</h2>
      <p>📅 September 25, 2025 | 📍 Community Hall</p>
    </div>
  </div>
</div>

    )
}