
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Upload, FileText, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';

const MigrationTool = () => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadResults, setUploadResults] = useState<{
    success: number;
    errors: string[];
  } | null>(null);

  const isAdmin = user?.role === 'admin';

  // Template data for CSV downloads
  const templates = {
    assets: [
      {
        name: 'Laptop Dell Inspiron',
        category_id: 'use-category-id-from-asset_categories-table',
        serial_number: 'DL123456789',
        purchase_date: '2024-01-15',
        purchase_price: '15000000',
        vendor: 'PT Teknologi Indonesia',
        location_id: 'use-location-id-from-work_areas-table',
        assigned_to: 'John Doe',
        description: 'Business laptop for development work',
        status: 'Aktif'
      },
      {
        name: 'Printer Canon LBP',
        category_id: 'use-category-id-from-asset_categories-table',
        serial_number: 'CN987654321',
        purchase_date: '2024-02-10',
        purchase_price: '2500000',
        vendor: 'PT Office Solutions',
        location_id: 'use-location-id-from-work_areas-table',
        assigned_to: 'Jane Smith',
        description: 'Laser printer for office use',
        status: 'Aktif'
      }
    ],
    vendor: [
      {
        vendor_name: 'PT Teknologi Indonesia',
        vendor_industry: 'Technology',
        vendor_email: 'info@teknologi.co.id',
        vendor_phone: '+62-21-12345678',
        vendor_address: 'Jl. Sudirman No. 123, Jakarta',
        vendor_pic: 'Ahmad Santoso',
        vendor_rating: '4.5'
      },
      {
        vendor_name: 'PT Office Solutions',
        vendor_industry: 'Office Equipment',
        vendor_email: 'sales@officesolutions.co.id',
        vendor_phone: '+62-21-87654321',
        vendor_address: 'Jl. Thamrin No. 456, Jakarta',
        vendor_pic: 'Siti Nurhaliza',
        vendor_rating: '4.2'
      }
    ],
    buildings: [
      {
        building_name: 'Head Office',
        building_address: 'Jl. Gatot Subroto No. 789, Jakarta',
        floors: '10',
        area: '2500.5',
        pic: 'Building Manager',
        status: 'Active'
      },
      {
        building_name: 'Branch Office Surabaya',
        building_address: 'Jl. Pemuda No. 321, Surabaya',
        floors: '5',
        area: '1200.0',
        pic: 'Regional Manager',
        status: 'Active'
      }
    ]
  };

  const downloadTemplate = (type: 'assets' | 'vendor' | 'buildings') => {
    const data = templates[type];
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${type}_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [];
    
    // Add headers
    csvRows.push(headers.join(','));
    
    // Add data rows
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in CSV
        return `"${String(value).replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  };

  const parseCSV = (text: string): any[] => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const rows = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      const row: any = {};
      
      headers.forEach((header, index) => {
        let value: any = values[index] || '';
        
        // Convert numeric values
        if (header.includes('price') || header.includes('rating') || header.includes('floors') || header.includes('area')) {
          const numValue = parseFloat(value);
          if (!isNaN(numValue)) value = numValue;
        }
        
        row[header] = value;
      });
      
      rows.push(row);
    }
    
    return rows;
  };

  const handleFileUpload = async (file: File, tableName: 'assets' | 'vendor' | 'buildings') => {
    if (!isAdmin) {
      setMessage('Only admins can upload data');
      return;
    }

    setIsUploading(true);
    setUploadResults(null);
    setMessage('');

    try {
      const text = await file.text();
      const data = parseCSV(text);
      
      if (data.length === 0) {
        setMessage('No valid data found in CSV file');
        setIsUploading(false);
        return;
      }

      let successCount = 0;
      const errors: string[] = [];

      for (let i = 0; i < data.length; i++) {
        try {
          const { error } = await supabase
            .from(tableName)
            .insert(data[i]);

          if (error) {
            errors.push(`Row ${i + 2}: ${error.message}`);
          } else {
            successCount++;
          }
        } catch (err: any) {
          errors.push(`Row ${i + 2}: ${err.message}`);
        }
      }

      setUploadResults({ success: successCount, errors });
      
      if (successCount > 0) {
        setMessage(`Successfully uploaded ${successCount} records`);
      }
      
    } catch (error: any) {
      setMessage(`Error processing file: ${error.message}`);
    }
    
    setIsUploading(false);
  };

  const FileUploadSection = ({ title, tableName, templateType }: { 
    title: string; 
    tableName: 'assets' | 'vendor' | 'buildings';
    templateType: 'assets' | 'vendor' | 'buildings';
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => downloadTemplate(templateType)}
            className="flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download Template</span>
          </Button>
        </div>
        
        {isAdmin && (
          <div className="space-y-2">
            <Label htmlFor={`file-${tableName}`}>Upload CSV File</Label>
            <Input
              id={`file-${tableName}`}
              type="file"
              accept=".csv"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileUpload(file, tableName);
                }
              }}
              disabled={isUploading}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Migration Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Use this tool to bulk upload data from CSV files. Download the templates first to see the required format.
              {!isAdmin && ' Only administrators can upload data.'}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {message && (
        <Alert variant={message.includes('Error') ? 'destructive' : 'default'}>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {uploadResults && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-green-600">Successfully uploaded: {uploadResults.success} records</p>
              {uploadResults.errors.length > 0 && (
                <div>
                  <p className="text-red-600 font-medium">Errors ({uploadResults.errors.length}):</p>
                  <ul className="text-sm text-red-600 ml-4 mt-1 space-y-1">
                    {uploadResults.errors.slice(0, 10).map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                    {uploadResults.errors.length > 10 && (
                      <li>• ... and {uploadResults.errors.length - 10} more errors</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="assets" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="vendor">Vendor</TabsTrigger>
          <TabsTrigger value="buildings">Buildings</TabsTrigger>
        </TabsList>

        <TabsContent value="assets">
          <FileUploadSection
            title="Assets Data"
            tableName="assets"
            templateType="assets"
          />
        </TabsContent>

        <TabsContent value="vendor">
          <FileUploadSection
            title="Vendor Data"
            tableName="vendor"
            templateType="vendor"
          />
        </TabsContent>

        <TabsContent value="buildings">
          <FileUploadSection
            title="Buildings Data"
            tableName="buildings"
            templateType="buildings"
          />
        </TabsContent>
      </Tabs>

      {isUploading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <Upload className="h-8 w-8 animate-spin mx-auto mb-2" />
            <p>Uploading data...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MigrationTool;
