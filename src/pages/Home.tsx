import { useEffect, useState } from "react";
import { getIncomingEvents } from "../assets/services/api.js";
import EventCard from "../components/EventCard.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function load() {
      try {
        setError("");
        const data = await getIncomingEvents();
        console.log("Data from getIncomingEvents:", data);
        console.log("Data type:", typeof data);
        console.log("Data length:", data?.length);

        const sorted = [...data].sort((a, b) => {
          if (!a.date || !b.date) return 0;
          return new Date(a.date) - new Date(b.date);
        });

        setEvents(sorted);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-2">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4 mt-6">
      <h1 className="lg:text-6xl md:text-5xl sm:text-4xl font-bold text-center text-primary p-4">
        Welcome to the Event Scheduler!
      </h1>
      <p className="lg:text-2xl md:text-xl sm:text-lg text-gray-800 text-center max-w-1xl">
        Plan and manage your events with ease. Create, edit, and track all your
        events in one place. Stay organized and never miss an important date
        again!
      </p>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate(isAuthenticated ? "/new-event" : "/login")}
          className="btn font-bold py-2 px-4 mt-6 rounded self-center hover:bg-black-200"
        >
          + Create New Event
        </button>
      </div>

      <div className="max-w-5xl mx-auto p-4">
        <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-center font-bold mt-4 mb-6">
          Upcoming Events
        </h2>
        {error && <div className="alert alert-error">{error}</div>}

        {events.length === 0 ? (
          <div className="alert">No events found.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
