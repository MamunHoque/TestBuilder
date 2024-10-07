'use client';

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Toolbar from './Toolbar';
import TopBar from './TopBar';
import Canvas from './Canvas';
import { EditorProvider } from '@/contexts/EditorContext';

const EbookEditor: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<any>(null);

  return (
    <EditorProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="flex h-screen overflow-hidden">
          <Toolbar />
          <div className="flex flex-col flex-grow">
            <TopBar selectedElement={selectedElement} />
            <Canvas setSelectedElement={setSelectedElement} />
          </div>
        </div>
      </DndProvider>
    </EditorProvider>
  );
};

export default EbookEditor;