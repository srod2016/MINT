import React, { useState } from 'react';
import { exportToCSV, exportToPDF } from '../services/ExportService';

const ExportMenu = ({ data, filename = "Export" }) => {
    const [showMenu, setShowMenu] = useState(false);

    const handleCSV = () => {
        exportToCSV(data, filename);
        setShowMenu(false);
    };

    const handlePDF = () => {
        if (!data || data.length === 0) {
            alert("No data to export");
            return;
        }

        const headers = Object.keys(data[0]);
        const rows = data.map(item => Object.values(item));

        exportToPDF(headers, rows, filename);
        setShowMenu(false);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button 
                className="mint-btn" 
                style={{ width: 'auto', background: '#fff', color: '#2699FB', cursor: 'pointer', border: '1px solid #2699FB' }} 
                onClick={() => setShowMenu(!showMenu)}
            >
                 Export as ▼
            </button>

            {showMenu && (
                <div style={{
                    position: 'absolute', 
                    right: 0, 
                    top: '100%', 
                    marginTop: '5px',
                    backgroundColor: 'white', 
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    borderRadius: '5px', 
                    zIndex: 10, 
                    minWidth: '150px', 
                    overflow: 'hidden',
                    border: '1px solid #eee'
                }}>
                    <button 
                        onClick={handleCSV}
                        style={{ display: 'block', width: '100%', padding: '10px 15px', textAlign: 'left', border: 'none', background: 'white', color: '#333', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                    >
                        📄 CSV
                    </button>
                    <button 
                        onClick={handlePDF}
                        style={{ display: 'block', width: '100%', padding: '10px 15px', textAlign: 'left', border: 'none', background: 'white', color: '#333', cursor: 'pointer' }}
                    >
                        📑 PDF
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExportMenu;