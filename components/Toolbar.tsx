'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useEditor } from '@/contexts/EditorContext';
import { 
  Type, 
  Square, 
  Image as ImageIcon, 
  BarChart, 
  Map, 
  Layout, 
  FileText
} from 'lucide-react';

const toolbarItems = [
  { name: 'Templates', icon: Layout, elements: ['Template 1', 'Template 2', 'Template 3'] },
  { name: 'Elements', icon: Square, elements: ['Button', 'Input', 'Card'] },
  { name: 'Text', icon: Type, elements: ['Heading', 'Paragraph', 'List'] },
  { name: 'Shapes & Lines', icon: Square, elements: ['Rectangle', 'Circle', 'Line'] },
  { name: 'Icons', icon: FileText, elements: ['Icon 1', 'Icon 2', 'Icon 3'] },
  { name: 'Images', icon: ImageIcon, elements: ['Upload Image', 'Stock Image', 'Gallery'] },
  { name: 'Charts', icon: BarChart, elements: ['Bar Chart', 'Pie Chart', 'Line Graph'] },
  { name: 'Maps', icon: Map, elements: ['World Map', 'Country Map', 'City Map'] },
];

const Toolbar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addElement } = useEditor();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleElementClick = (element: string) => {
    addElement({
      type: element,
      content: `New ${element}`,
      left: 50,
      top: 50,
      width: 200,
      height: 100,
    });
  };

  return (
    <div className="w-64 bg-background border-r flex flex-col">
      <div className="flex-shrink-0 p-4">
        <h2 className="text-lg font-semibold">Toolbar</h2>
      </div>
      <Separator />
      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-4">
          {toolbarItems.map((item) => (
            <div key={item.name}>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleCategoryClick(item.name)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
              {selectedCategory === item.name && (
                <div className="mt-2 ml-4 space-y-2">
                  {item.elements.map((element) => (
                    <Button
                      key={element}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleElementClick(element)}
                    >
                      {element}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Toolbar;