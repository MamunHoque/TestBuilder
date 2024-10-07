'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Element {
  id: string;
  type: string;
  content: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

interface EditorContextType {
  elements: Element[];
  addElement: (element: Partial<Element>) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
  removeElement: (id: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [elements, setElements] = useState<Element[]>([]);

  const addElement = (element: Partial<Element>) => {
    const newElement: Element = {
      id: Date.now().toString(),
      type: element.type || 'text',
      content: element.content || '',
      left: element.left || 0,
      top: element.top || 0,
      width: element.width || 100,
      height: element.height || 50,
    };
    setElements((prevElements) => [...prevElements, newElement]);
  };

  const updateElement = (id: string, updates: Partial<Element>) => {
    setElements((prevElements) =>
      prevElements.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const removeElement = (id: string) => {
    setElements((prevElements) => prevElements.filter((el) => el.id !== id));
  };

  return (
    <EditorContext.Provider value={{ elements, addElement, updateElement, removeElement }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};