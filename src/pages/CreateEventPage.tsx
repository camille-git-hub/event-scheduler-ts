import { useState } from "react";
import { createEvent } from "../assets/services/api.js";
import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm.js";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleCreate(formData) {
    try {
      setError("");

      const eventData = {
        title: formData.title,
        date: formData.date ? new Date(formData.date).toISOString() : null,
        location: formData.location,
        description: formData.description,
      };

      console.log('Form data:', formData);
      console.log('Token:', localStorage.getItem('token'));

      const created = await createEvent(eventData);

      navigate(`/events/${created.id}`);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-primary font-bold mt-6">Create Event</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <EventForm
        initialValues={{}}
        onSubmit={handleCreate}
        submitText="Create"
      />
    </div>
  );
}
