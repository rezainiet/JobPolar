import React from 'react';
import QRCode from 'react-qr-code';

function TestingQR() {
    const data = 'https://masudreza.dev'
  return (
    <div className="flex flex-col items-center justify-center">
      <QRCode value={data} level='H' />
      <p className="mt-2 text-sm text-gray-600">Scan this QR code with your smartphone to access the information.</p>
    </div>
  );
}

export default TestingQR;
