import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { renderToStaticMarkup } from 'react-dom/server';
import InvoiceTemplate from './template/InvoiceTemplate';

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

  const generatePDF = async () => {
    if (!data) return;

    const total = data.items.reduce((sum, item) => sum + item.price, 0);
    const htmlContent = renderToStaticMarkup(
      <InvoiceTemplate
        invoiceId={data.invoiceId}
        date={data.date}
        customerName={data.customerName}
        items={data.items}
        total={total}
      />
    );

    const options = {
      margin: 0.5,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    try {
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    
        if (isMobile || !('showSaveFilePicker' in window)) {
          if (isMobile) {
            alert("Mobile browsers don't support choosing a folder — the PDF will be downloaded to your default location.");
          }
    
          html2pdf().set({ ...options, filename: `${data.invoiceId}.pdf` }).from(htmlContent).save();
          return;
        }
    
        // Desktop + supported browser
        const pdfBlob = await html2pdf().set(options).from(htmlContent).outputPdf('blob');
    
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: `${data.invoiceId}.pdf`,
          types: [{
            description: 'PDF file',
            accept: { 'application/pdf': ['.pdf'] },
          }],
        });
    
        const writableStream = await fileHandle.createWritable();
        await writableStream.write(pdfBlob);
        await writableStream.close();
        alert("PDF saved successfully!");
      } catch (err) {
        console.error("Save error:", err);
        alert("Could not save PDF. Try again.");
      }
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
