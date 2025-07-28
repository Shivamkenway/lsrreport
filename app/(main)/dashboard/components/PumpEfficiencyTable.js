<<<<<<< HEAD
'use client';

export default function PumpEfficiencyTable({ data }) {
  return (
    <div style={{
      marginTop: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      overflowX: 'auto',
      maxWidth: '100%',
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', fontSize: '14px' }}>
        <thead>
          <tr>
            <th colSpan={5} style={{
              backgroundColor: '#1e2b4c',
              color: 'white',
              padding: '12px',
              fontSize: '18px',
              textAlign: 'center',
              borderBottom: '2px solid white'
            }}>
              PUMP EFFICIENCY REPORT
            </th>
          </tr>
          <tr style={{ backgroundColor: '#d0e7ff', color: '#000' }}>
            <th style={headerCellStyle}>SN</th>
            <th style={headerCellStyle}>PUMP NAME</th>
            <th style={headerCellStyle}>EFFICIENCY (%)</th>
            <th style={headerCellStyle}>FLOW RATE</th>
            <th style={headerCellStyle}>ENERGY CONSUMED (kWh)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} style={{
              backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff'
            }}>
              <td style={cellStyle}>{index + 1}</td>
              <td style={cellStyle}>{row.name}</td>
              <td style={cellStyle}>{row.efficiency}%</td>
              <td style={cellStyle}>{row.flow}</td>
              <td style={cellStyle}>{row.energy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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

export default function PumpEfficiencyTable({ data }) {
  return (
    <div style={{
      marginTop: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      overflowX: 'auto',
      maxWidth: '100%',
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', fontSize: '14px' }}>
        <thead>
          <tr>
            <th colSpan={5} style={{
              backgroundColor: '#1e2b4c',
              color: 'white',
              padding: '12px',
              fontSize: '18px',
              textAlign: 'center',
              borderBottom: '2px solid white'
            }}>
              PUMP EFFICIENCY REPORT
            </th>
          </tr>
          <tr style={{ backgroundColor: '#d0e7ff', color: '#000' }}>
            <th style={headerCellStyle}>SN</th>
            <th style={headerCellStyle}>PUMP NAME</th>
            <th style={headerCellStyle}>EFFICIENCY (%)</th>
            <th style={headerCellStyle}>FLOW RATE</th>
            <th style={headerCellStyle}>ENERGY CONSUMED (kWh)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} style={{
              backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff'
            }}>
              <td style={cellStyle}>{index + 1}</td>
              <td style={cellStyle}>{row.name}</td>
              <td style={cellStyle}>{row.efficiency}%</td>
              <td style={cellStyle}>{row.flow}</td>
              <td style={cellStyle}>{row.energy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
>>>>>>> a1164b31685c01de719572ae24b71c6638881267
