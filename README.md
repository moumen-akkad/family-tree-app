# Family Tree App

Dies ist eine einfache React-App zur Darstellung und Verwaltung eines Familienstammbaums. Die App ermöglicht das Hinzufügen, Bearbeiten, Verschieben und Entfernen von Familienmitgliedern in einem dynamischen Drag-and-Drop-Baum.

## Inhaltsverzeichnis

- [Installation](#installation)
- [Verwendung](#verwendung)
- [Projektstruktur](#projektstruktur)
- [Beschreibung der Dateien](#beschreibung-der-dateien)
- [Stil](#stil)

## Installation

1. Klonen Sie dieses Repository:
   git clone https://github.com/your-username/family-tree-app.git
   
3. Wechseln Sie in das Projektverzeichnis:
   cd family-tree-app
   
5. Installieren Sie die Abhängigkeiten:
   npm install

## Verwendung

Starten Sie die App mit dem folgenden Befehl:
```bash
npm start
```

Die App wird im Standard-Browser unter `http://localhost:3000` geöffnet.

## Projektstruktur

├── src
│   ├── components
│   │   ├── FamilyTree.js
│   │   ├── TreeNode.js
│   ├── styles
│   │   └── TreeStyles.css
│   ├── App.js
│   └── index.js
└── README.md

## Beschreibung der Dateien

### `App.js`
Die Hauptkomponente der App. Sie umgibt den Familienstammbaum mit dem Drag-and-Drop-Provider (`DndProvider`) und enthält eine Schaltfläche, um den Baum zurückzusetzen, indem die Daten im `localStorage` gelöscht und die Seite neu geladen wird.

### `FamilyTree.js`
Diese Komponente ist die Wurzel des Familienstammbaums. Sie verwaltet den Zustand (`state`) des gesamten Baums, einschließlich der Daten für die Familienmitglieder. Funktionen zum Hinzufügen, Bearbeiten, Verschieben und Entfernen von Mitgliedern sind in dieser Komponente implementiert.

### `TreeNode.js`
Diese Komponente stellt einzelne Knoten (d.h. Familienmitglieder) im Baum dar. Sie enthält die Logik für die Drag-and-Drop-Funktionen sowie die Formulare zum Hinzufügen und Bearbeiten von Mitgliedern. Jeder Knoten kann Kinder (weitere Knoten) enthalten, wodurch die Baumstruktur entsteht.

### `TreeStyles.css`
Dieses Datei enthält die Stile für den Familienstammbaum. wird unter "Stil" weiter erklärt

## Stil

Die App verwendet CSS für das Styling der Komponenten. Die wichtigsten Stilelemente sind:

- .tree-node: Grundstruktur eines Knoten im Baum.
- .male .person-info und .female .person-info: Stile für männliche und weibliche Mitglieder.
- .children: Stil für die Anzeige von Kindknoten.
- .add-member-form und .edit-member-form: Stile für die Formulare zum Hinzufügen und Bearbeiten von Mitgliedern.
