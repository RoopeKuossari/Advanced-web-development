import React from 'react';

function FormResponse({ formData, response }) {
  // If there is no data, don't render anything
  if (!formData) return null;

  return (
    <div className="response-area" style={{ marginTop: '30px' }}>
      <h3 style={{ color: '#228B22' }}>✅ Form submitted successfully</h3>
      
      <div className="submitted-data-summary" style={{ 
        backgroundColor: '#f4f4f4', 
        padding: '20px', 
        borderRadius: '8px',
        borderLeft: '6px solid #228B22',
        marginBottom: '20px' 
      }}>
        <h4>Submitted Data Summary</h4>
        {/* We use the static formData prop here */}
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Age:</strong> {formData.age || "Not provided"}</p>
        <p><strong>Date:</strong> {formData.date || "Not selected"}</p>
        <p><strong>Newsletter:</strong> {formData.subscribe ? "Yes" : "No"}</p>
      </div>

      <div className="technical-details">
        <h4>Server Response Details</h4>
        <p><strong>Endpoint:</strong> {response.url}</p>
        <p><strong>Status:</strong> {response.status}</p>
        
        <h4>Returned JSON Payload:</h4>
        <pre style={{ 
          backgroundColor: '#2d2d2d', 
          color: '#ccc', 
          padding: '15px', 
          borderRadius: '5px',
          overflowX: 'auto',
          fontSize: '0.9rem'
        }}>
          {JSON.stringify(response.json, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default FormResponse;