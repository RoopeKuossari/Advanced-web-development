import { useState } from 'react';
import FormResponse from '../components/FormResponse';

function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    date: '',
    subscribe: false
  });

  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.age && (formData.age < 1 || formData.age > 120)) {
      newErrors.age = "Age must be between 1 and 120";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setResponse(null);

    try {
      // 1. Send data to the backend API
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Server error while saving data");
      }

      const data = await res.json();

      // 2. CRITICAL FIX: Capture a snapshot of the data BEFORE resetting the form
      // This ensures FormResponse displays the correct values instead of empty strings
      const submittedDataSnapshot = { ...formData };

      setResponse({
        url: "/api/submit",
        json: submittedDataSnapshot, // Using the static snapshot
        serverMessage: data.message,
        status: "Success"
      });

      // 3. Reset the form fields for the next entry
      setFormData({
        name: '',
        email: '',
        age: '',
        date: '',
        subscribe: false
      });

    } catch (error) {
      console.error("Submission error:", error);
      setResponse({ error: "Connection failed. Please ensure the server is running." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="yhteys-lomake">
      <h2>Contact Form</h2>
      <p>Please fill out the form below to get in touch.</p>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>User Information</legend>

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={2}
          />
          {errors.name && <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.name}</p>}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.email}</p>}

          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            min="1"
            max="120"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.age}</p>}
        </fieldset>

        <fieldset>
          <legend>Additional Details</legend>

          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <div className="checkbox-ryhma">
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
            />
            <label htmlFor="subscribe">Subscribe to our newsletter</label>
          </div>
        </fieldset>

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit Form"}
        </button>
      </form>

      {/* FEEDBACK SECTION */}
      {loading && <p>Connecting to server...</p>}

      {response && !response.error && (
        <FormResponse
          formData={response.json} // Passing the captured snapshot
          response={response}
        />
      )}

      {response && response.error && (
        <div style={{ 
          marginTop: "20px", 
          padding: "15px", 
          backgroundColor: "#ffe6e6", 
          color: "#cc0000", 
          borderRadius: "5px",
          border: "1px solid #cc0000" 
        }}>
          <strong>Error:</strong> {response.error}
        </div>
      )}
    </section>
  );
}

export default FormPage;