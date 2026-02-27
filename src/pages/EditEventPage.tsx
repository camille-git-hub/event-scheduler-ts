import { useEffect, useState } from "react";
import { getEventById, updateEvent } from "../services/api.js";
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/EventForm.js";
import type { Event } from "../types/index.js";

export default function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null as Event | null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setError("");
        const data = await getEventById(Number(id));
        setInitialValues(data);
      } catch (e) {
        setError((e as Error).message);
      }
    }
    load();
  }, [id]);

  async function handleUpdate(formData: Event) {
    try {
      setError("");

      const eventData = {
        ...formData,
        date: formData.date ? new Date(formData.date).toISOString() : null,
      };

      await updateEvent(Number(id), eventData as Partial<Event>);
      navigate(`/events/${id}`);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  if (error) return <div className="alert alert-error">{error}</div>;
  if (!initialValues) return <p>Loading event for edit...</p>;

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-primary font-bold mb-4 mt-6">Edit Event</h1>

      <EventForm
        initialValues={initialValues}
        onSubmit={handleUpdate}
        submitText="Save changes"
      />
    </div>
  );
}
