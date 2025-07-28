<<<<<<< HEAD
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import SidebarMenu from '../(main)/dashboard/components/sidebarmenu';

export default function PumpEfficiencyPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fromDate, setFromDate] = useState('2025-05-12');
  const [toDate, setToDate] = useState('2025-06-06');
  const sidebarRef = useRef(null);
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login'); // Royal redirect for logout
  };

  const handleExport = () => {
    const table = document.getElementById('pump-table');
    const rows = Array.from(table.querySelectorAll('tr'));
    const csvContent = rows.map(row => {
      const cols = Array.from(row.querySelectorAll('th, td'));
      return cols.map(cell => `"${cell.innerText}"`).join(',');
    }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'pump_efficiency_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  const data = [
    ['1001', 'PMP-1', '1000', 'Blender 1', '06-06-2025', '1:00 PM', '13.33', '12.5', '', '75.00', '', '80.00'],
    ['1002', 'PMP-2', '1200', 'Blender 2', '05-06-2025', '2:00 PM', '16', '15', '', '75.00', '', '80.00'],
    ['1003', 'PMP-3', '1800', 'Blender 3', '04-06-2025', '3:00 PM', '20', '20', '', '90.00', '', '90.00'],
    ['1004', 'PMP-4', '2300', 'Blender 1', '03-06-2025', '4:00 PM', '19.17', '28.75', '', '80.00', '', '80.00'],
    ['1005', 'PMP-5', '850', 'Blender 2', '02-06-2025', '5:00 PM', '10.62', '10.62', '', '80.02', '', '80.02']
  ];

  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      background: 'linear-gradient(to right, #414b5fff, #dde3eeff)',
      color: '#fff',
      minHeight: '100vh',
      padding: '20px',
      position: 'relative'
    }}>
      {menuOpen && (
        <div ref={sidebarRef}>
          <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />
        </div>
      )}

      {/* Top Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        padding: '14px 20px',
        fontWeight: 'bold',
        borderRadius: '10px',
        backdropFilter: 'blur(8px)'
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
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleExport} style={exportButtonStyle}>EXPORT</button>
          <button onClick={handleLogout} style={logoutButtonStyle}>LOGOUT</button>
        </div>
      </div>

      {/* FROM - TO Filters */}
      <div style={{
        marginTop: '20px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        fontWeight: 'bold',
        fontSize: '14px'
      }}>
        <label>
          FROM: <span style={{ fontSize: '18px' }}>📅</span>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={dateInputStyle} />
        </label>
        <label>
          TO: <span style={{ fontSize: '18px' }}>📅</span>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={dateInputStyle} />
        </label>
      </div>

      {/* Table */}
      <div style={{
        backgroundColor: 'rgba(20, 19, 19, 0.95)',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        overflowX: 'auto',
        color: '#000'
      }}>
        <table id="pump-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr>
              <th colSpan={13} style={{
                backgroundColor: '#1e2b4cff',
                color: 'white',
                padding: '14px',
                fontSize: '18px',
                textAlign: 'center',
                borderBottom: '2px solid white'
              }}>
                LSR PUMP EFFICIENCY
              </th>
            </tr>
            <tr style={{ backgroundColor: '#d0e7ff', color: '#000' }}>
              <th rowSpan={2} style={headerCellStyle}>SN</th>
              <th rowSpan={2} style={headerCellStyle}>BATCH NO</th>
              <th rowSpan={2} style={headerCellStyle}>PUMP</th>
              <th rowSpan={2} style={headerCellStyle}>QTY (kg)</th>
              <th rowSpan={2} style={headerCellStyle}>DESTINATION</th>
              <th rowSpan={2} style={headerCellStyle}>DATE</th>
              <th rowSpan={2} style={headerCellStyle}>START TIME</th>
              <th rowSpan={2} style={headerCellStyle}>TOTAL TIME (min)</th>
              <th rowSpan={2} style={headerCellStyle}>ENERGY CONSUME (kWh)</th>
              <th colSpan={2} style={headerCellStyle}>EFFICIENCY (TIME) (kg/min)</th>
              <th colSpan={2} style={headerCellStyle}>EFFICIENCY (ENERGY) (kg/kWh)</th>
            </tr>
            <tr style={{ backgroundColor: '#d0e7ff', color: '#000' }}>
              <th style={headerCellStyle}>STANDARD</th>
              <th style={headerCellStyle}>ACTUAL</th>
              <th style={headerCellStyle}>STANDARD</th>
              <th style={headerCellStyle}>ACTUAL</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <td style={cellStyle}>{idx + 1}</td>
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

// === Styles ===

const barStyle = {
  width: '25px',
  height: '3px',
  backgroundColor: '#fff'
};

const exportButtonStyle = {
  backgroundColor: 'green',
  color: 'white',
  padding: '6px 18px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const logoutButtonStyle = {
  backgroundColor: '#e53935',
  color: 'white',
  padding: '6px 18px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const dateInputStyle = {
  marginLeft: '8px',
  padding: '6px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const headerCellStyle = {
  border: '1px solid #555',
  padding: '10px',
  textAlign: 'center',
  fontWeight: 'bold'
};

const cellStyle = {
  border: '1px solid #aaa',
  padding: '10px',
  textAlign: 'center'
=======
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import SidebarMenu from '../(main)/dashboard/components/sidebarmenu';

export default function PumpEfficiencyPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fromDate, setFromDate] = useState('2025-05-12');
  const [toDate, setToDate] = useState('2025-06-06');
  const sidebarRef = useRef(null);
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login'); // Royal redirect for logout
  };

  const handleExport = () => {
    const table = document.getElementById('pump-table');
    const rows = Array.from(table.querySelectorAll('tr'));
    const csvContent = rows.map(row => {
      const cols = Array.from(row.querySelectorAll('th, td'));
      return cols.map(cell => `"${cell.innerText}"`).join(',');
    }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'pump_efficiency_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  const data = [
    ['1001', 'PMP-1', '1000', 'Blender 1', '06-06-2025', '1:00 PM', '13.33', '12.5', '', '75.00', '', '80.00'],
    ['1002', 'PMP-2', '1200', 'Blender 2', '05-06-2025', '2:00 PM', '16', '15', '', '75.00', '', '80.00'],
    ['1003', 'PMP-3', '1800', 'Blender 3', '04-06-2025', '3:00 PM', '20', '20', '', '90.00', '', '90.00'],
    ['1004', 'PMP-4', '2300', 'Blender 1', '03-06-2025', '4:00 PM', '19.17', '28.75', '', '80.00', '', '80.00'],
    ['1005', 'PMP-5', '850', 'Blender 2', '02-06-2025', '5:00 PM', '10.62', '10.62', '', '80.02', '', '80.02']
  ];

  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      background: 'linear-gradient(to right, #414b5fff, #dde3eeff)',
      color: '#fff',
      minHeight: '100vh',
      padding: '20px',
      position: 'relative'
    }}>
      {menuOpen && (
        <div ref={sidebarRef}>
          <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />
        </div>
      )}

      {/* Top Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        padding: '14px 20px',
        fontWeight: 'bold',
        borderRadius: '10px',
        backdropFilter: 'blur(8px)'
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
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleExport} style={exportButtonStyle}>EXPORT</button>
          <button onClick={handleLogout} style={logoutButtonStyle}>LOGOUT</button>
        </div>
      </div>

      {/* FROM - TO Filters */}
      <div style={{
        marginTop: '20px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        fontWeight: 'bold',
        fontSize: '14px'
      }}>
        <label>
          FROM: <span style={{ fontSize: '18px' }}>📅</span>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={dateInputStyle} />
        </label>
        <label>
          TO: <span style={{ fontSize: '18px' }}>📅</span>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={dateInputStyle} />
        </label>
      </div>

      {/* Table */}
      <div style={{
        backgroundColor: 'rgba(20, 19, 19, 0.95)',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        overflowX: 'auto',
        color: '#000'
      }}>
        <table id="pump-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr>
              <th colSpan={13} style={{
                backgroundColor: '#1e2b4cff',
                color: 'white',
                padding: '14px',
                fontSize: '18px',
                textAlign: 'center',
                borderBottom: '2px solid white'
              }}>
                LSR PUMP EFFICIENCY
              </th>
            </tr>
            <tr style={{ backgroundColor: '#d0e7ff', color: '#000' }}>
              <th rowSpan={2} style={headerCellStyle}>SN</th>
              <th rowSpan={2} style={headerCellStyle}>BATCH NO</th>
              <th rowSpan={2} style={headerCellStyle}>PUMP</th>
              <th rowSpan={2} style={headerCellStyle}>QTY (kg)</th>
              <th rowSpan={2} style={headerCellStyle}>DESTINATION</th>
              <th rowSpan={2} style={headerCellStyle}>DATE</th>
              <th rowSpan={2} style={headerCellStyle}>START TIME</th>
              <th rowSpan={2} style={headerCellStyle}>TOTAL TIME (min)</th>
              <th rowSpan={2} style={headerCellStyle}>ENERGY CONSUME (kWh)</th>
              <th colSpan={2} style={headerCellStyle}>EFFICIENCY (TIME) (kg/min)</th>
              <th colSpan={2} style={headerCellStyle}>EFFICIENCY (ENERGY) (kg/kWh)</th>
            </tr>
            <tr style={{ backgroundColor: '#d0e7ff', color: '#000' }}>
              <th style={headerCellStyle}>STANDARD</th>
              <th style={headerCellStyle}>ACTUAL</th>
              <th style={headerCellStyle}>STANDARD</th>
              <th style={headerCellStyle}>ACTUAL</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <td style={cellStyle}>{idx + 1}</td>
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

// === Styles ===

const barStyle = {
  width: '25px',
  height: '3px',
  backgroundColor: '#fff'
};

const exportButtonStyle = {
  backgroundColor: 'green',
  color: 'white',
  padding: '6px 18px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const logoutButtonStyle = {
  backgroundColor: '#e53935',
  color: 'white',
  padding: '6px 18px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const dateInputStyle = {
  marginLeft: '8px',
  padding: '6px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const headerCellStyle = {
  border: '1px solid #555',
  padding: '10px',
  textAlign: 'center',
  fontWeight: 'bold'
};

const cellStyle = {
  border: '1px solid #aaa',
  padding: '10px',
  textAlign: 'center'
>>>>>>> a1164b31685c01de719572ae24b71c6638881267
};