'use client';

import { useRef, useState, useEffect } from 'react';
import SidebarMenu from '../(main)/dashboard/components/sidebarmenu';

export default function BatchWiseReport() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleExport = () => {
    const table = document.getElementById('energy-table');
    const rows = Array.from(table.querySelectorAll('tr'));
    const csvContent = rows.map(row => {
      const cols = Array.from(row.querySelectorAll('th, td'));
      return cols.map(cell => `"${cell.innerText}"`).join(',');
    }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'batchwise_energy_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const data = [
    ['1001', 'BK-1', 'AC DELCO DEO SELECT 20W40', '32.5'],
    ['1002', 'BK-2', 'AC DELCO DEO SELECT 20W40', '40'],
    ['1003', 'BK-3', 'AC DELCO DEO SELECT 20W40', '35'],
    ['1004', 'BK-1', 'AC DELCO DEO SELECT 20W40', '58.75'],
    ['1005', 'BK-2', 'AC DELCO DEO SELECT 20W40', '30.62'],
  ];

  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f2f2f2',
      minHeight: '100vh',
      padding: '20px',
      position: 'relative'
    }}>
      {menuOpen && (
        <div ref={sidebarRef}>
          <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onLogout={() => {}} />
        </div>
      )}

      {/* Top bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: '14px 20px',
        fontWeight: 'bold',
        borderRadius: '10px'
      }}>
        <div onClick={() => setMenuOpen(!menuOpen)} style={{
          cursor: 'pointer',
          fontSize: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <span style={barStyle}></span>
          <span style={barStyle}></span>
          <span style={barStyle}></span>
        </div>
        <button onClick={handleExport} style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '6px 18px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>EXPORT</button>
      </div>

      {/* Table */}
      <div style={{
        marginTop: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        overflowX: 'auto',
      }}>
        <table id="energy-table" style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead>
            <tr>
              <th colSpan={5} style={{
                backgroundColor: '#1e2b4c',
                color: 'white',
                padding: '14px',
                fontSize: '18px',
                textAlign: 'center',
                borderBottom: '2px solid white'
              }}>
                LSR BATCH-WISE ENERGY CONSUMPTION REPORT
              </th>
            </tr>
            <tr style={{ backgroundColor: '#d0e7ff', color: '#000' }}>
              <th style={headerStyle}>BATCH NO</th>
              <th style={headerStyle}>BLENDER</th>
              <th style={headerStyle}>PRODUCT</th>
              <th style={headerStyle}>ENERGY CONSUMPTION (kWh)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} style={{
                backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#ffffff'
              }}>
                {row.map((cell, i) => (
                  <td key={i} style={cellStyle}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const barStyle = {
  width: '25px',
  height: '3px',
  backgroundColor: '#333'
};

const headerStyle = {
  border: '1px solid #555',
  padding: '10px',
  textAlign: 'center'
};

const cellStyle = {
  border: '1px solid #555',
  padding: '10px',
  textAlign: 'center'
};