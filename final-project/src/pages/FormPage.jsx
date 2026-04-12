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
      newErrors.name = "Nimi on pakollinen";
    } else if (formData.name.length < 2) {
      newErrors.name = "Nimen tulee olla vähintään 2 merkkiä";
    }

    if (!formData.email) {
      newErrors.email = "Sähköposti on pakollinen";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Virheellinen sähköposti";
    }

    if (formData.age && (formData.age < 1 || formData.age > 120)) {
      newErrors.age = "Iän tulee olla välillä 1–120";
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
      const res = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Request failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="yhteys-lomake">
      <h2>Lomake</h2>
      <p>Täytä alla oleva lomake.</p>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Käyttäjän tiedot</legend>

          {/* NAME */}
          <label htmlFor="name">Nimi:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Anna nimi"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={2}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

          {/* EMAIL */}
          <label htmlFor="email">Sähköposti:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Anna sähköposti"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

          {/* NUMBER */}
          <label htmlFor="age">Ikä:</label>
          <input
            type="number"
            id="age"
            name="age"
            min="1"
            max="120"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
        </fieldset>

        <fieldset>
          <legend>Lisätiedot</legend>

          {/* DATE */}
          <label htmlFor="date">Päivämäärä:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          {/* CHECKBOX */}
          <div className="checkbox-ryhma">
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
            />
            <label htmlFor="subscribe">Tilaa uutiskirje</label>
          </div>
        </fieldset>

        <button type="submit" disabled={loading}>
          {loading ? "Lähetetään..." : "Lähetä"}
        </button>
      </form>

      {/* LOADING */}
      {loading && <p>Lähetetään dataa...</p>}

      {/* RESPONSE (CLEAN COMPONENT) */}
      {response && (
        <FormResponse
          formData={formData}
          response={response}
        />
      )}
    </section>
  );
}

export default FormPage;