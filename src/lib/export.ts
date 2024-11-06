import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

interface ExportOptions {
  filename: string;
  format: 'csv' | 'xlsx' | 'json';
  data: any[];
}

export async function exportData({ filename, format, data }: ExportOptions) {
  try {
    switch (format) {
      case 'csv':
        return exportCSV(filename, data);
      case 'xlsx':
        return exportXLSX(filename, data);
      case 'json':
        return exportJSON(filename, data);
      default:
        throw new Error('Unsupported export format');
    }
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
}

function exportCSV(filename: string, data: any[]) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const csvContent = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}.csv`);
}

function exportXLSX(filename: string, data: any[]) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${filename}.xlsx`);
}

function exportJSON(filename: string, data: any[]) {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  saveAs(blob, `${filename}.json`);
}