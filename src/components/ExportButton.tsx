
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, FileText, Table } from 'lucide-react';

interface ExportButtonProps {
  data: any[];
  filename: string;
  onExport?: (format: 'csv' | 'xls') => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ data, filename, onExport }) => {
  const exportToCSV = () => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Handle values that might contain commas by wrapping in quotes
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
    
    if (onExport) onExport('csv');
  };

  const exportToXLS = () => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    let xlsContent = '<table>';
    
    // Add headers
    xlsContent += '<tr>';
    headers.forEach(header => {
      xlsContent += `<th>${header}</th>`;
    });
    xlsContent += '</tr>';
    
    // Add data rows
    data.forEach(row => {
      xlsContent += '<tr>';
      headers.forEach(header => {
        xlsContent += `<td>${row[header] || ''}</td>`;
      });
      xlsContent += '</tr>';
    });
    
    xlsContent += '</table>';
    
    const blob = new Blob([xlsContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.xls`;
    link.click();
    
    if (onExport) onExport('xls');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={exportToCSV}>
          <FileText className="h-4 w-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToXLS}>
          <Table className="h-4 w-4 mr-2" />
          Export as XLS
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportButton;
