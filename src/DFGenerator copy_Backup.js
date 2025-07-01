// src/components/PDFGenerator.js
import React from 'react';
import html2pdf from 'html2pdf.js';
// Optional: import './styles/invoice.css'; // for styling live UI (if needed)

const css = `
  body {
    font-family: 'Arial', sans-serif;
    color: #333;
    padding: 20px;
  }

  h1 {
    font-size: 24px;
    color: #007BFF;
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const PDFGenerator = () => {
  const handleDownload = () => {
    const container = document.createElement('div');

    container.innerHTML = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          <h1>Invoice</h1>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr><th>Item</th><th>Price</th></tr>
            </thead>
            <tbody>
              <tr><td>Product A</td><td>$10</td></tr>
              <tr><td>Product B</td><td>$20</td></tr>
              <tr><td style="text-align:right; font-weight: bold;">Total</td><td>$30</td></tr>
            </tbody>
          </table>
        </body>
      </html>
    `;

    const opt = {
      margin: 0.5,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(container).save();
  };

  return (
    <div>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default PDFGenerator;
