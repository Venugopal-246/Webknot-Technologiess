import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QRCodeScanner = ({ onScanSuccess, onManualEntry, isActive }) => {
  const [manualId, setManualId] = useState('');
  const [scannerMode, setScannerMode] = useState('qr'); // 'qr' or 'manual'
  const [isScanning, setIsScanning] = useState(false);
  const [lastScannedId, setLastScannedId] = useState('');

  const handleStartScanning = () => {
    setIsScanning(true);
    // Simulate QR code scanning - in real implementation, this would integrate with camera
    setTimeout(() => {
      const mockStudentId = `STU${Math.floor(Math.random() * 1000)?.toString()?.padStart(3, '0')}`;
      setLastScannedId(mockStudentId);
      onScanSuccess(mockStudentId);
      setIsScanning(false);
    }, 2000);
  };

  const handleManualSubmit = (e) => {
    e?.preventDefault();
    if (manualId?.trim()) {
      onManualEntry(manualId?.trim());
      setManualId('');
    }
  };

  const handleStopScanning = () => {
    setIsScanning(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quick Check-in</h3>
          <p className="text-sm text-muted-foreground">
            Scan QR codes or enter student IDs manually
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={scannerMode === 'qr' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setScannerMode('qr')}
            iconName="QrCode"
          >
            QR Scanner
          </Button>
          <Button
            variant={scannerMode === 'manual' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setScannerMode('manual')}
            iconName="Keyboard"
          >
            Manual Entry
          </Button>
        </div>
      </div>
      {scannerMode === 'qr' ? (
        <div className="space-y-4">
          {/* QR Scanner Interface */}
          <div className="relative">
            <div className={`aspect-square max-w-sm mx-auto rounded-lg border-2 border-dashed ${
              isScanning ? 'border-primary bg-blue-50' : 'border-muted bg-muted/20'
            } flex items-center justify-center`}>
              {isScanning ? (
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-sm text-primary font-medium">Scanning for QR code...</p>
                  <p className="text-xs text-muted-foreground mt-1">Point camera at student QR code</p>
                </div>
              ) : (
                <div className="text-center">
                  <Icon name="QrCode" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">Camera preview will appear here</p>
                </div>
              )}
            </div>
            
            {/* Scanner Controls */}
            <div className="flex justify-center mt-4 space-x-3">
              {!isScanning ? (
                <Button
                  variant="default"
                  onClick={handleStartScanning}
                  disabled={!isActive}
                  iconName="Camera"
                  iconPosition="left"
                >
                  Start Scanning
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleStopScanning}
                  iconName="Square"
                  iconPosition="left"
                >
                  Stop Scanning
                </Button>
              )}
            </div>
          </div>

          {/* Last Scanned */}
          {lastScannedId && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">
                  Last scanned: {lastScannedId}
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Manual Entry Form */}
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <Input
              label="Student ID"
              type="text"
              placeholder="Enter student ID (e.g., STU001)"
              value={manualId}
              onChange={(e) => setManualId(e?.target?.value)}
              description="Enter the student's ID to check them in manually"
              required
            />
            
            <div className="flex space-x-3">
              <Button
                type="submit"
                variant="default"
                disabled={!manualId?.trim() || !isActive}
                iconName="UserCheck"
                iconPosition="left"
                className="flex-1"
              >
                Check In Student
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => setManualId('')}
                iconName="X"
              >
                Clear
              </Button>
            </div>
          </form>

          {/* Quick ID Suggestions */}
          <div className="border-t border-border pt-4">
            <p className="text-sm font-medium text-foreground mb-2">Quick Access</p>
            <div className="grid grid-cols-3 gap-2">
              {['STU001', 'STU002', 'STU003']?.map((id) => (
                <Button
                  key={id}
                  variant="outline"
                  size="sm"
                  onClick={() => setManualId(id)}
                  className="text-xs"
                >
                  {id}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Scanner Status */}
      <div className="mt-6 p-3 bg-muted rounded-md">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-success' : 'bg-error'}`} />
            <span className="text-muted-foreground">
              Scanner Status: {isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Smartphone" size={14} />
            <span>Mobile compatible</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScanner;