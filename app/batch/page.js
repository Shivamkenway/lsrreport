'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SidebarMenu from '../(main)/dashboard/components/sidebarmenu';

export default function BatchWiseReport() {
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
    const table = document.getElementById('batchwise-table');
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

  const handleLogout = () => router.push('/login');

  const data = [
    ['1', '1001', 'BK-1', 'AC DELCO DEO SELECT 20W40', '32.5'],
    ['2', '1002', 'BK-2', 'AC DELCO DEO SELECT 20W40', '40'],
    ['3', '1003', 'BK-3', 'AC DELCO DEO SELECT 20W40', '35'],
    ['4', '1004', 'BK-1', 'AC DELCO DEO SELECT 20W40', '58.75'],
    ['5', '1005', 'BK-2', 'AC DELCO DEO SELECT 20W40', '30.62'],
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
        backgroundColor: 'rgba(17, 17, 17, 0.95)',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        overflowX: 'auto',
        color: '#000'
      }}>
        <table id="batchwise-table" style={{
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
                LSR BATCH-WISE ENERGY REPORT
              </th>
            </tr>
            <tr style={{ backgroundColor: '#d0e7ff', color: '#000' }}>
              <th style={headerCellStyle}>SN</th>
              <th style={headerCellStyle}>BATCH NO</th>
              <th style={headerCellStyle}>BLENDER</th>
              <th style={headerCellStyle}>PRODUCT NAME</th>
              <th style={headerCellStyle}>ENERGY CONSUMPTION (kWh)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
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

const barStyle = { width: '25px', height: '3px', backgroundColor: '#fff' };
const exportButtonStyle = { backgroundColor: 'green', color: 'white', padding: '6px 18px', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const logoutButtonStyle = { backgroundColor: '#e53935', color: 'white', padding: '6px 18px', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const dateInputStyle = { marginLeft: '8px', padding: '6px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' };
const headerCellStyle = { border: '1px solid #555', padding: '10px', textAlign: 'center', fontWeight: 'bold' };
'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SidebarMenu from '../(main)/dashboard/components/sidebarmenu';

export default function BatchWiseReport() {
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
    const table = document.getElementById('batchwise-table');
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

  const handleLogout = () => router.push('/login');

  const data = [
    ['1', '1001', 'BK-1', 'AC DELCO DEO SELECT 20W40', '32.5'],
    ['2', '1002', 'BK-2', 'AC DELCO DEO SELECT 20W40', '40'],
    ['3', '1003', 'BK-3', 'AC DELCO DEO SELECT 20W40', '35'],
    ['4', '1004', 'BK-1', 'AC DELCO DEO SELECT 20W40', '58.75'],
    ['5', '1005', 'BK-2', 'AC DELCO DEO SELECT 20W40', '30.62'],
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
        backgroundColor: 'rgba(17, 17, 17, 0.95)',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        overflowX: 'auto',
        color: '#000'
      }}>
        <table id="batchwise-table" style={{
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
                LSR BATCH-WISE ENERGY REPORT
              </th>
            </tr>
            <tr style={{ backgroundColor: '#d0e7ff', color: '#000' }}>
              <th style={headerCellStyle}>SN</th>
              <th style={headerCellStyle}>BATCH NO</th>
              <th style={headerCellStyle}>BLENDER</th>
              <th style={headerCellStyle}>PRODUCT NAME</th>
              <th style={headerCellStyle}>ENERGY CONSUMPTION (kWh)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
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

const barStyle = { width: '25px', height: '3px', backgroundColor: '#fff' };
const exportButtonStyle = { backgroundColor: 'green', color: 'white', padding: '6px 18px', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const logoutButtonStyle = { backgroundColor: '#e53935', color: 'white', padding: '6px 18px', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const dateInputStyle = { marginLeft: '8px', padding: '6px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' };
const headerCellStyle = { border: '1px solid #555', padding: '10px', textAlign: 'center', fontWeight: 'bold' };
const cellStyle = { border: '1px solid #555', padding: '10px', textAlign: 'center' };
