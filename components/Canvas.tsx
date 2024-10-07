'use client';

import React from 'react';
import { useDrop } from 'react-dnd';
import { useEditor } from '@/contexts/EditorContext';
import CanvasElement from './CanvasElement';

interface CanvasProps {
  setSelectedElement: (element: any) => void;
}

const Canvas: React.FC<CanvasProps> = ({ setSelectedElement }) => {
  const { elements, updateElement } = useEditor();

  const [, drop] = useDrop({
    accept: 'element',
    drop: (item: any, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        updateElement(item.id, { left, top });
      }
      return undefined;
    },
  });

  return (
    <div
      ref={drop}
      className="flex-grow bg-white overflow-auto relative"
      style={{
        width: '8.5in',
        height: '11in',
        margin: '2rem auto',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {elements.map((element) => (
        <CanvasElement
          key={element.id}
          element={element}
          setSelectedElement={setSelectedElement}
        />
      ))}
    </div>
  );
};

export default Canvas;