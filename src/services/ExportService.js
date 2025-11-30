import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
        alert("No data to export");
        return;
    }

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(row => Object.values(row).join(","));
    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportToPDF = (headers, rows, filename) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("MINT Financial Report", 14, 20);
    doc.setFontSize(11);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

    autoTable(doc, {
        head: [headers],
        body: rows,
        startY: 35,
    });

    doc.save(`${filename}.pdf`);
};