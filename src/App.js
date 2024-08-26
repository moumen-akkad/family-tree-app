import React from 'react';
import { DndProvider } from 'react-dnd'; // DndProvider für Drag-and-Drop
import { HTML5Backend } from 'react-dnd-html5-backend'; // HTML5-Backend-Adapter für Drag-and-Drop
import FamilyTree from './components/FamilyTree';
import './styles/TreeStyles.css';

function App() { // Hauptkomponente der Anwendung
  const clearLocalStorage = () => { // Löschen der gespeicherten Familiendaten
    window.location.reload();
  };

  return (
    <DndProvider backend={HTML5Backend}> {/* Initialisiert den Drag-and-Drop */}
      <div className="App">
        <h1>Family Tree</h1> {/* Überschrift */}
        <button onClick={clearLocalStorage}>Clear Family Tree</button> {/* Button zum Löschen des Familienstammbaums */}
        <FamilyTree /> {/* Eingebettete FamilyTree-Komponente */}
      </div>
    </DndProvider>
  );
}

export default App;