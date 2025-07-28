<<<<<<< HEAD
'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import SidebarMenu from './components/sidebarmenu';
import LsrBatchTable from './components/lsrbatchtable';

export default function DashboardPage() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
      const formattedDate = now.toLocaleDateString('en-GB', dateOptions).replace(/ /g, '-');
      const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
      setDate(formattedDate);
      setTime(formattedTime);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handleLogout = () => router.push('/login');

  const handleExport = () => {
    const table = document.querySelector('table');
    if (!table) return;
    const rows = Array.from(table.querySelectorAll('tr'));
    const csv = rows.map(row => {
      const cols = Array.from(row.querySelectorAll('th, td'));
      return cols.map(col => `"${col.innerText}"`).join(',');
    }).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'lsr_batch_status_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const lsrColumnHeaders = ['BLENDER 1 (BK-1)', 'BLENDER 2 (BK-2)', 'BLENDER 3 (BK-3)'];
  const lsrRowHeaders = [
    'BATCH NO',
    'PRODUCT NAME',
    'BATCH TIME',
    'STEP NO',
    'STEP TIME',
    'STATUS',
    'MODE',
    'OPERATOR GUID MESSAGE'
  ];

  const lsrData = [
    ['1001', '1002', '1003'],
    ['AC DELCO DEO SELECT 20W40', 'AC DELCO DEO SELECT 20W40', 'AC DELCO DEO SELECT 20W40'],
    ['01:39:20', '00:39:20', '02:39:20'],
    ['4', '2', '6'],
    ['00:06:54', '00:04:20', '00:09:25'],
    [
      <span key="status-1" style={statusStyle('#ffa500')}>InProgress</span>,
      <span key="status-2" style={statusStyle('#28a745')}>Complete</span>,
      <span key="status-3" style={statusStyle('#ffa500')}>InProgress</span>
    ],
    ['AUTO', 'MANUAL', 'AUTO'],
    ['', '', '']
  ];

  return (
    <div style={containerStyle}>
      {menuOpen && (
        <div ref={sidebarRef}>
          <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />
        </div>
      )}

      {/* Top Bar */}
      <div style={topBarStyle}>
        <div onClick={() => setMenuOpen(!menuOpen)} style={hamburgerStyle}>
          <span style={barStyle} />
          <span style={barStyle} />
          <span style={barStyle} />
        </div>

        <div style={dateTimeStyle}>
          <div>📅 {date}</div>
          <div>⏰ {time}</div>
        </div>

        <div style={buttonGroupStyle}>
          <button onClick={handleExport} style={exportButtonStyle}>EXPORT</button>
          <button onClick={handleLogout} style={logoutButtonStyle}>LOGOUT</button>
        </div>
      </div>

      {/* Table */}
      <LsrBatchTable rowHeaders={lsrRowHeaders} columnHeaders={lsrColumnHeaders} data={lsrData} />
    </div>
  );
}

// === STYLES ===

const containerStyle = {
  fontFamily: 'Segoe UI, sans-serif',
  fontSize: '16px',
  color: '#333',
  background: 'linear-gradient(to right, #414b5f, #dde3ee)',
  minHeight: '100vh',
  padding: '20px',
  boxSizing: 'border-box',
  position: 'relative'
};

const topBarStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  padding: '16px 20px',
  fontWeight: 'bold',
  borderRadius: '10px',
  backdropFilter: 'blur(6px)',
  flexWrap: 'wrap',
  gap: '10px',
};

const hamburgerStyle = {
  cursor: 'pointer',
  fontSize: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
};

const dateTimeStyle = {
  display: 'flex',
  gap: '20px',
  fontSize: '16px',
  flexWrap: 'wrap'
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap'
};

const barStyle = {
  width: '25px',
  height: '3px',
  backgroundColor: '#333'
};

const exportButtonStyle = {
  backgroundColor: 'green',
  color: 'white',
  padding: '8px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const logoutButtonStyle = {
  backgroundColor: '#e53935',
  color: 'white',
  padding: '8px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const statusStyle = (color) => ({
  backgroundColor: color,
  padding: '5px 12px',
  borderRadius: '20px',
  color: '#fff',
  fontWeight: 'bold',
  display: 'inline-block'
});
=======
'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import SidebarMenu from './components/sidebarmenu';
import LsrBatchTable from './components/lsrbatchtable';

export default function DashboardPage() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
      const formattedDate = now.toLocaleDateString('en-GB', dateOptions).replace(/ /g, '-');
      const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
      setDate(formattedDate);
      setTime(formattedTime);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handleLogout = () => router.push('/login');

  const handleExport = () => {
    const table = document.querySelector('table');
    if (!table) return;
    const rows = Array.from(table.querySelectorAll('tr'));
    const csv = rows.map(row => {
      const cols = Array.from(row.querySelectorAll('th, td'));
      return cols.map(col => `"${col.innerText}"`).join(',');
    }).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'lsr_batch_status_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const lsrColumnHeaders = ['BLENDER 1 (BK-1)', 'BLENDER 2 (BK-2)', 'BLENDER 3 (BK-3)'];
  const lsrRowHeaders = [
    'BATCH NO',
    'PRODUCT NAME',
    'BATCH TIME',
    'STEP NO',
    'STEP TIME',
    'STATUS',
    'MODE',
    'OPERATOR GUID MESSAGE'
  ];

  const lsrData = [
    ['1001', '1002', '1003'],
    ['AC DELCO DEO SELECT 20W40', 'AC DELCO DEO SELECT 20W40', 'AC DELCO DEO SELECT 20W40'],
    ['01:39:20', '00:39:20', '02:39:20'],
    ['4', '2', '6'],
    ['00:06:54', '00:04:20', '00:09:25'],
    [
      <span style={statusStyle('#ffa500')}>InProgress</span>,
      <span style={statusStyle('#28a745')}>Complete</span>,
      <span style={statusStyle('#ffa500')}>InProgress</span>
    ],
    ['AUTO', 'MANUAL', 'AUTO'],
    ['', '', '']
  ];

  return (
    <div style={{
      fontFamily: 'Arial, Helvetica, sans-serif',
      color: '#333',
      background: 'linear-gradient(to right, #414b5fff, #dde3eeff)',
      minHeight: '100vh',
      padding: '20px',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      {menuOpen && (
        <div ref={sidebarRef}>
          <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />
        </div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
          <span style={barStyle} />
          <span style={barStyle} />
          <span style={barStyle} />
        </div>

        <div style={{ display: 'flex', gap: '20px', fontSize: '15px' }}>
          <div>📅 {date}</div>
          <div>⏰ {time}</div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleExport} style={exportButtonStyle}>EXPORT</button>
          <button onClick={handleLogout} style={logoutButtonStyle}>LOGOUT</button>
        </div>
      </div>

      <LsrBatchTable rowHeaders={lsrRowHeaders} columnHeaders={lsrColumnHeaders} data={lsrData} />
    </div>
  );
}

const barStyle = {
  width: '25px',
  height: '3px',
  backgroundColor: '#333'
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

const statusStyle = (color) => ({
  backgroundColor: color,
  padding: '4px 10px',
  borderRadius: '20px',
  color: '#fff',
  fontWeight: 'bold'
});
>>>>>>> a1164b31685c01de719572ae24b71c6638881267
