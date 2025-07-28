<<<<<<< HEAD
'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SidebarMenu from '../(main)/dashboard/components/sidebarmenu';

export default function AgitatorReport() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [fromDate, setFromDate] = useState('2025-05-01');
  const [toDate, setToDate] = useState('2025-06-30');
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
    const table = document.getElementById('agitator-table');
    const rows = Array.from(table.querySelectorAll('tr'));
    const csvContent = rows.map(row => {
      const cols = Array.from(row.querySelectorAll('th, td'));
      return cols.map(cell => `"${cell.innerText}"`).join(',');
    }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'agitator_energy_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
    router.push('/login');
  };

  const data = [
    ['1001', 'P-101', '20'],
    ['1002', 'P-102', '25'],
    ['1003', 'P-103', '15'],
    ['1004', 'P-104', '30'],
    ['1005', 'P-105', '20'],
  ];

  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      background: 'linear-gradient(to right, #414b5f, #dde3ee)',
      minHeight: '100vh',
      padding: '20px',
      position: 'relative',
      color: '#fff'
    }}>
      {menuOpen && (
        <div ref={sidebarRef}>
          <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />
        </div>
      )}

      {/* Top bar */}
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
          <span style={barStyle} />
          <span style={barStyle} />
          <span style={barStyle} />
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
        backgroundColor: 'rgba(29, 27, 27, 0.95)',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        overflowX: 'auto',
        color: '#000'
      }}>
        <table id="agitator-table" style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead>
            <tr>
              <th colSpan={4} style={{
                backgroundColor: '#1e2b4c',
                color: 'white',
                padding: '14px',
                fontSize: '18px',
                textAlign: 'center',
                borderBottom: '2px solid white'
              }}>
                LSR AGITATOR REPORT
              </th>
            </tr>
            <tr style={{ backgroundColor: '#d0e7ff', color: '#000' }}>
              <th style={headerCellStyle}>SN</th>
              <th style={headerCellStyle}>BATCH NO</th>
              <th style={headerCellStyle}>AGITATOR</th>
              <th style={headerCellStyle}>ENERGY CONSUMPTION (kWh)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} style={{
                backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#ffffff'
              }}>
                <td style={cellStyle}>{idx + 1}</td>
                <td style={cellStyle}>{row[0]}</td>
                <td style={cellStyle}>{row[1]}</td>
                <td style={cellStyle}>{row[2]}</td>
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
  border: '1px solid #555',
  padding: '10px',
  textAlign: 'center'
};
=======
'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SidebarMenu from '../(main)/dashboard/components/sidebarmenu'; // ✅ Make sure spelling matches file!

export default function AgitatorReport() {
  const router = useRouter();
  const sidebarRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fromDate, setFromDate] = useState('2025-05-01');
  const [toDate, setToDate] = useState('2025-06-30');

  const handleLogout = () => {
    router.push('/login');
  };

  const handleExport = () => {
    const table = document.getElementById('agitator-table');
    const rows = Array.from(table.querySelectorAll('tr'));
    const csv = rows
      .map(row => {
        const cells = Array.from(row.querySelectorAll('th, td'));
        return cells.map(cell => `"${cell.innerText}"`).join(',');
      })
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'agitator_energy_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Optional: Close sidebar when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const data = [
    ['1001', 'P-101', '20'],
    ['1002', 'P-102', '25'],
    ['1003', 'P-103', '15'],
    ['1004', 'P-104', '30'],
    ['1005', 'P-105', '20'],
  ];

  return (
    <div style={wrapperStyle}>
      {menuOpen && (
        <div ref={sidebarRef}>
          <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />
        </div>
      )}

      {/* Top Navbar */}
      <div style={topBarStyle}>
        <div onClick={() => setMenuOpen(!menuOpen)} style={hamburgerStyle}>
          <span style={barStyle} />
          <span style={barStyle} />
          <span style={barStyle} />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleExport} style={exportButtonStyle}>EXPORT</button>
          <button onClick={handleLogout} style={logoutButtonStyle}>LOGOUT</button>
        </div>
      </div>

      {/* Date Filters */}
      <div style={filterStyle}>
        <label>
          FROM: 📅
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={dateInputStyle} />
        </label>
        <label>
          TO: 📅
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={dateInputStyle} />
        </label>
      </div>

      {/* Data Table */}
      <div style={tableContainerStyle}>
        <table id="agitator-table" style={tableStyle}>
          <thead>
            <tr>
              <th colSpan="4" style={titleCellStyle}>LSR AGITATOR REPORT</th>
            </tr>
            <tr style={headerRowStyle}>
              <th style={headerCellStyle}>SN</th>
              <th style={headerCellStyle}>BATCH NO</th>
              <th style={headerCellStyle}>AGITATOR</th>
              <th style={headerCellStyle}>ENERGY CONSUMPTION (kWh)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
                <td style={cellStyle}>{index + 1}</td>
                <td style={cellStyle}>{row[0]}</td>
                <td style={cellStyle}>{row[1]}</td>
                <td style={cellStyle}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// === Inline Styles ===

const wrapperStyle = {
  fontFamily: 'Segoe UI, sans-serif',
  background: 'linear-gradient(to right, #414b5f, #dde3ee)',
  minHeight: '100vh',
  padding: '20px',
  position: 'relative',
  color: '#fff'
};

const topBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  padding: '14px 20px',
  borderRadius: '10px',
  fontWeight: 'bold',
  backdropFilter: 'blur(8px)'
};

const hamburgerStyle = {
  cursor: 'pointer',
  fontSize: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
};

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

const filterStyle = {
  marginTop: '20px',
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  fontWeight: 'bold',
  fontSize: '14px'
};

const dateInputStyle = {
  marginLeft: '8px',
  padding: '6px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const tableContainerStyle = {
  backgroundColor: 'rgba(29, 27, 27, 0.95)',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  overflowX: 'auto',
  marginTop: '10px',
  color: '#000'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '14px'
};

const titleCellStyle = {
  backgroundColor: '#1e2b4c',
  color: 'white',
  padding: '14px',
  fontSize: '18px',
  textAlign: 'center',
  borderBottom: '2px solid white'
};

const headerRowStyle = {
  backgroundColor: '#d0e7ff',
  color: '#000'
};

const headerCellStyle = {
  border: '1px solid #555',
  padding: '10px',
  textAlign: 'center',
  fontWeight: 'bold'
};

const cellStyle = {
  border: '1px solid #555',
  padding: '10px',
  textAlign: 'center'
};

const evenRowStyle = {
  backgroundColor: '#f9f9f9'
};

const oddRowStyle = {
  backgroundColor: '#ffffff'
};
>>>>>>> a1164b31685c01de719572ae24b71c6638881267
