import React, { useState } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [copyCount, setCopyCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Increment copy count
    setCopyCount((prevCount) => prevCount + 1);

    // Generate downloadable code
    const downloadableCode = `
      // Your React component code goes here
      import React from 'react';
      import './formComponent.css'; // Include your CSS file

      const FormComponent = () => {
        // Submitted data
        const formData = {
          name: "${formData.name}",
          email: "${formData.email}",
          phone: "${formData.phone}"
        };

        // Your component JSX
        return (
          <div className="form-container">
            <h2>Form Component</h2>
            <div>No of copies made: ${copyCount}</div>
            <form>
              <label>Name:</label>
              <input type="text" value="${formData.name}" disabled />
              <label>Email:</label>
              <input type="email" value="${formData.email}" disabled />
              <label>Phone:</label>
              <input type="tel" value="${formData.phone}" disabled />
            </form>
          </div>
        );
      };

      export default FormComponent;
    `;

    // Create a Blob and initiate download
    const blob = new Blob([downloadableCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'FormComponent.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="form-container">
      <h2>Form Component</h2>
      <div>No of copies made: {copyCount}</div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        <label>Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
