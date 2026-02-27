import { Link } from "react-router";
import type { Event } from "../types/index.js";

export default function EventCard({event}: {event: Event}) {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">{event.title}</h2>
    
        <p className="opacity-70">
          {event.date ? `Date: ${new Date(event.date).toLocaleDateString('en-GB', { timeZone: 'Europe/Berlin' })}` : "No date provided"}
        </p>

        <div className="card-actions justify-end">
          <Link to={`/events/${event.id}`} className="btn btn-sm btn-primary">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
