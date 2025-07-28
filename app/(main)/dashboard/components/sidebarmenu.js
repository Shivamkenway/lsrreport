'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarMenu() {
  const pathname = usePathname();

  const menuItems = [
    { label: '📈LSR Batch Table', href: '/dashboard' },
    { label: '🔩Pump Efficiency', href: '/pump' },
    { label: '🌀Agitator', href: '/agitator' },
    { label: '⚡Batch-Wise', href: '/batch' },
  ];

  return (
    <div style={{
      width: '220px',
      height: '100vh',
      backgroundColor: '#1e2b4c',
      color: 'white',
      fontFamily: 'Segoe UI, sans-serif',
      paddingTop: '30px',
      paddingLeft: '20px',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000
    }}>
      <h2 style={{ fontSize: '20px', marginBottom: '30px' }}>LSR Report</h2>

      {menuItems.map((item, index) => (
        <Link key={index} href={item.href} style={{
          display: 'block',
          padding: '10px 15px',
          marginBottom: '10px',
          borderRadius: '6px',
          backgroundColor: pathname === item.href ? '#4da6ff' : 'transparent',
          color: 'white',
          textDecoration: 'none',
          transition: 'background-color 0.2s ease',
        }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4da6ff'}
          onMouseLeave={(e) => {
            if (pathname !== item.href) e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarMenu() {
  const pathname = usePathname();

  const menuItems = [
    { label: '📈LSR Batch Table', href: '/dashboard' },
    { label: '🔩Pump Efficiency', href: '/pump' },
    { label: '🌀Agitator', href: '/agitator' },
    { label: '⚡Batch-Wise', href: '/batch' },
  ];

  return (
    <div style={{
      width: '220px',
      height: '100vh',
      backgroundColor: '#1e2b4c',
      color: 'white',
      fontFamily: 'Segoe UI, sans-serif',
      paddingTop: '30px',
      paddingLeft: '20px',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000
    }}>
      <h2 style={{ fontSize: '20px', marginBottom: '30px' }}>LSR Report</h2>

      {menuItems.map((item, index) => (
        <Link key={index} href={item.href} style={{
          display: 'block',
          padding: '10px 15px',
          marginBottom: '10px',
          borderRadius: '6px',
          backgroundColor: pathname === item.href ? '#4da6ff' : 'transparent',
          color: 'white',
          textDecoration: 'none',
          transition: 'background-color 0.2s ease',
        }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4da6ff'}
          onMouseLeave={(e) => {
            if (pathname !== item.href) e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
