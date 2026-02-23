import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteEvent, getEventById } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function EventDetailPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setError("");
        const data = await getEventById(id);
        setEvent(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  async function handleDelete() {
    try {
      await deleteEvent(id);
      navigate("/events");
    } catch (e) {
      setError(e.message);
    }
  }

  if (loading) return <p>Loading event...</p>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!event) return <div className="alert">Event not found.</div>;

  return (
    <div className="space-y-4 max-w-2xl mx-auto p-4 mt-6">
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-primary font-bold mb-4 mt-6">{event.title}</h1>

      <p className="opacity-70">{event.date ? `Date: ${new Date(event.date).toLocaleDateString('en-GB', { timeZone: 'Europe/Berlin' })}` : "No date"}</p>
      <p className="text-primary">{event.location ? `Location: ${event.location}` : "No location"}</p>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <p>{event.description || "No description."}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Link to="/events" className="btn btn-ghost">
          Back
        </Link>

        {isAuthenticated && (
          <>
            <Link to={`/events/${id}/edit`} className="btn btn-outline">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-warning">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
