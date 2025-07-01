import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';

const PDFGenerator = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchMockData = async () => {
      await new Promise(res => setTimeout(res, 1000));
      setData({
        invoiceId: 'INV-12345',
        date: '2025-07-01',
        customerName: 'John Doe',
        items: [
          { name: 'Product A', price: 10 },
          { name: 'Product B', price: 20 },
        ],
      });
    };

    fetchMockData();
  }, []);

  const generatePDF = () => {
    if (!data) return;

    const total = data.items.reduce((sum, item) => sum + item.price, 0);

    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }
            h1 {
              color: #007BFF;
              margin-bottom: 10px;
            }
            img.logo {
              max-width: 150px;
              margin-bottom: 20px;
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
            .total-row td {
              font-weight: bold;
              text-align: right;
            }
          </style>
        </head>
        <body>
          <!-- Logo from public folder -->
          <img class="logo" src="/logo.png" alt="Company Logo" />
          
          <!-- Remote image -->
          <img src="https://via.placeholder.com/300x100?text=Invoice+Banner" style="width: 100%; margin-bottom: 20px;" alt="Banner" />

          <h1>Invoice: ${data.invoiceId}</h1>
          <p>Date: ${data.date}</p>
          <p>Customer: ${data.customerName}</p>

          <table>
            <thead>
              <tr><th>Item</th><th>Price</th></tr>
            </thead>
            <tbody>
              ${data.items
                .map(
                  item =>
                    `<tr><td>${item.name}</td><td>$${item.price.toFixed(
                      2
                    )}</td></tr>`
                )
                .join('')}
              <tr class="total-row">
                <td>Total</td>
                <td>$${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;

    const options = {
      margin: 0.5,
      filename: `${data.invoiceId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true // Enable cross-origin image loading
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(options).from(htmlContent).save();
  };

  return (
    <div>
      <button onClick={generatePDF} disabled={!data}>
        {data ? 'Download PDF' : 'Loading...'}
      </button>
    </div>
  );
};

export default PDFGenerator;
