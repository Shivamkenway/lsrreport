'use client';

import React from 'react';

export default function LsrBatchTable({ rowHeaders = [], columnHeaders = [], data = [] }) {
  const isValidData = data.length === rowHeaders.length && data.every(row => row.length === columnHeaders.length);

  return (
    <div
      style={{
        marginTop: '20px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
        overflowX: 'auto',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px',
          minWidth: '600px'
        }}
      >
        <thead>
          <tr>
            <th
              colSpan={columnHeaders.length + 1}
              style={{
                backgroundColor: '#1e2b4c',
                color: 'white',
                padding: '14px',
                fontSize: '20px',
                textAlign: 'center',
                borderBottom: '2px solid #fff',
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}
            >
              LSR BATCH STATUS REPORT
            </th>
          </tr>
          <tr style={{ backgroundColor: '#e1f0ff' }}>
            <th style={headerCellStyle}></th>
            {columnHeaders.map((col, i) => (
              <th key={i} style={headerCellStyle}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isValidData ? (
            rowHeaders.map((rowTitle, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  backgroundColor: rowIndex % 2 === 0 ? '#f9f9f9' : '#ffffff',
                  transition: 'background 0.3s ease',
                }}
              >
                <td style={{ ...cellStyle, fontWeight: 'bold', backgroundColor: '#e1f0ff' }}>
                  {rowTitle}
                </td>
                {data[rowIndex].map((cell, colIndex) => (
                  <td key={colIndex} style={cellStyle}>{cell}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnHeaders.length + 1} style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                No data available or data mismatch.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const headerCellStyle = {
  border: '1px solid #ccc',
  padding: '10px 12px',
  textAlign: 'center',
  fontWeight: '600',
  color: '#333',
  backgroundColor: '#e1f0ff',
  position: 'sticky',
  top: 48,
  zIndex: 1
};

const cellStyle = {
  border: '1px solid #ddd',
  padding: '10px 12px',
  textAlign: 'center',
  color: '#333'
};
