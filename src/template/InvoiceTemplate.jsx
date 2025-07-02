import React from 'react';

const InvoiceTemplate = ({ invoiceId, date, customerName, items, total }) => (
  <html>
    <head>
      <style>{`
        body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
        h1 { color: #007BFF; margin-bottom: 10px; }
        img.logo { max-width: 150px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
        th { background-color: #f2f2f2; }
        .total-row td { font-weight: bold; text-align: right; }
      `}</style>
    </head>
    <body>
      <img className="logo" src="/logo.png" alt="Company Logo" />
      <img src="https://via.placeholder.com/300x100?text=Invoice+Banner" style={{ width: '100%', marginBottom: '20px' }} alt="Banner" />
      <h1>Invoice: {invoiceId}</h1>
      <p>Date: {date}</p>
      <p>Customer: {customerName}</p>

      <table>
        <thead>
          <tr><th>Item</th><th>Price</th></tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
            </tr>
          ))}
          <tr className="total-row">
            <td>Total</td>
            <td>${total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
);

export default InvoiceTemplate;
