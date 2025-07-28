'use client';

import React from 'react';

export default function AgitatorTable({ data }) {
  return (
    <div style={outerWrapper}>
      <div style={tableWrapper}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th colSpan={5} style={mainHeaderStyle}>
                LSR AGITATOR STATUS REPORT
              </th>
            </tr>
            <tr style={subHeaderRowStyle}>
              <th style={headerCellStyle}>SN</th>
              <th style={headerCellStyle}>AGITATOR ID</th>
              <th style={headerCellStyle}>BATCH NO</th>
              <th style={headerCellStyle}>SPEED (RPM)</th>
              <th style={headerCellStyle}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#ffffff',
                }}
              >
                <td style={cellStyle}>{idx + 1}</td>
                <td style={cellStyle}>{row[0]}</td>
                <td style={cellStyle}>{row[1]}</td>
                <td style={cellStyle}>{row[2]}</td>
                <td style={cellStyle}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 🔷 Styles
const outerWrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  width: '100%',
  boxSizing: 'border-box',
  overflowX: 'auto', // prevent screen from moving horizontally
};

const tableWrapper = {
  width: '100%',
  maxWidth: '1000px',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  overflowX: 'auto',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '14px',
  minWidth: '600px',
  tableLayout: 'fixed',
};

const mainHeaderStyle = {
  backgroundColor: '#1e2b4c',
  color: 'white',
  padding: '14px',
  fontSize: '18px',
  textAlign: 'center',
  borderBottom: '2px solid white',
};

const subHeaderRowStyle = {
  backgroundColor: '#d0e7ff',
  color: '#000',
};

const headerCellStyle = {
  border: '1px solid #555',
  padding: '10px',
  textAlign: 'center',
  fontWeight: 'bold',
  wordWrap: 'break-word',
};

const cellStyle = {
  border: '1px solid #555',
  padding: '10px',
  textAlign: 'center',
  wordWrap: 'break-word',
};
