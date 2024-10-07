'use client';

import React from 'react';
import { useDrag } from 'react-dnd';
import { useEditor } from '@/contexts/EditorContext';

interface CanvasElementProps {
  element: any;
  setSelectedElement: (element: any) => void;
}

const CanvasElement: React.FC<CanvasElementProps> = ({ element, setSelectedElement }) => {
  const { updateElement } = useEditor();

  const [{ isDragging }, drag] = useDrag({
    type: 'element',
    item: { ...element },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleResize = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = element.width;
    const startHeight = element.height;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction.includes('e')) newWidth = startWidth + deltaX;
      if (direction.includes('s')) newHeight = startHeight + deltaY;

      updateElement(element.id, { width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: element.left,
        top: element.top,
        width: element.width,
        height: element.height,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: '1px solid #ccc',
        padding: '4px',
        backgroundColor: '#f0f0f0',
      }}
      onClick={() => setSelectedElement(element)}
    >
      {element.content}
      <div
        className="absolute right-0 bottom-0 w-4 h-4 bg-blue-500 cursor-se-resize"
        onMouseDown={(e) => handleResize(e, 'se')}
      />
    </div>
  );
};

export default CanvasElement;