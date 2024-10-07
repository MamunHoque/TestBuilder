'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Eye, 
  Download
} from 'lucide-react';

interface TopBarProps {
  selectedElement: any;
}

const TopBar: React.FC<TopBarProps> = ({ selectedElement }) => {
  const handlePreview = () => {
    // Implement preview functionality
    console.log('Preview clicked');
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log('Download clicked');
  };

  return (
    <div className="bg-background border-b p-2 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Input type="text" placeholder="Font family" className="w-32" />
        <Input type="number" placeholder="Size" className="w-20" />
        <Input type="color" className="w-8 h-8 p-0 border-none" />
        <Button variant="ghost" size="icon">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Underline className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button onClick={handlePreview}>
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <Button onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default TopBar;