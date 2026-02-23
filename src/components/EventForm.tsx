import { useState } from "react";

export default function EventForm({ initialValues, onSubmit, submitText }) {
  const [title, setTitle] = useState(initialValues.title || "");
  const [date, setDate] = useState(initialValues.date || "");
  const [location, setLocation] = useState(initialValues.location || "");
  const [description, setDescription] = useState(initialValues.description || "");
  
  const inputStyle = "input input-bordered w-full";
  const textareaStyle = "textarea textarea-bordered w-full";
  const labelStyle = "lg:text-lg md:text-base sm:text-sm form-control w-full";

  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");

    const formData = {
      title,
      date,
      location,
      description,
    };

    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      {error && <div className="alert alert-error">{error}</div>}

      <label className="form-control">
        <span className={labelStyle}>Title</span>
        <input
          className={inputStyle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title of the event"
        />
      </label>

      <label className="form-control">
        <span className={labelStyle}>Date</span>
        <input
          className={inputStyle}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Enter the date of the event"
        />
      </label>

      <label className="form-control">
        <span className={labelStyle}>Location</span>
        <input
          className={inputStyle}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter the location of the event"
        />
      </label>

      <label className="form-control">
        <span className={labelStyle}>Description</span>
        <textarea
          className={textareaStyle}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write details..."
        />
      </label>

      <button className="btn btn-primary w-full" type="submit">
        {submitText}
      </button>
    </form>
  );
}
