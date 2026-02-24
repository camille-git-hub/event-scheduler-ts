import EventCard from "../components/EventCard.js"
import { getAllEvents } from "../services/api.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import type { Event } from "../types/index.js";

export default function EventsPage() {

    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const auth = useAuth();
    const isAuthenticated = auth?.isAuthenticated ?? false;

    useEffect(() => {
        async function load() {
            try {
                setError("");
                const events = await getAllEvents();

                const sorted = [...events].sort((a, b) => {
                    if (!a.date || !b.date) return 0;
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                });

                setEvents(sorted as Event[]);
            } catch (e) {
                setError((e as Error).message);
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

    if (error) {
        return <div className="alert alert-error">{error}</div>;
    }

  return <div>
    <div className="max-w-7xl mx-auto p-4 mt-6">
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-primary font-bold mb-4 p-4">All Events</h1>
      <div className="grid md:grid-cols-2 gap-4">{events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
      </div>
      <div className="flex justify-center mb-6 mt-10">
        <button
          onClick={() => navigate(isAuthenticated ? "/new-event" : "/login")}
          className="btn font-bold py-2 px-4 mt-6 rounded self-center hover:bg-black-200"
        >
          + Create New Event
        </button>
      </div>
    </div>

  </div>
}
