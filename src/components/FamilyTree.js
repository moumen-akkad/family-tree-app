import React, { useState } from 'react';
import TreeNode from './TreeNode';

const FamilyTree = () => { // Komponent ist die Wurzel vom Baum (hard coded)
    const [familyData, setFamilyData] = useState({ // Initialisiert des Familienstammbaums
        id: 1,
        name: ' Moumen ',
        birthdate: '2000-01-30',
        children: [],
    });

    const addFamilyMember = (parentId, newMember) => { // Hinzufügen eines neuen Familienmitglieds
        const addMemberRecursively = (node) => { // Rekursive Funktion zum Finden des Elternknotens
            if (node.id === parentId) { // Wenn der aktuelle Knoten der gesuchte Elternknoten ist
                node.children.push(newMember); // Füge das neue Mitglied zu den Kindern hinzu
            } else {
                node.children.forEach(child => addMemberRecursively(child)); // Durchsuche die Kinderknoten rekursiv
            }
        };

        const updatedFamilyData = { ...familyData }; // Kopiere die aktuellen Familiendaten
        addMemberRecursively(updatedFamilyData); // Füge das neue Mitglied hinzu
        setFamilyData(updatedFamilyData); // Aktualisiere den Zustand mit den neuen Familiendaten
    };

    const editMember = (memberId, updatedMember) => { // Bearbeiten eines Familienmitglieds
        const editMemberRecursively = (node) => { // Rekursive Funktion zum Bearbeiten des Mitglieds
            if (node.id === memberId) { // Wenn der aktuelle Knoten der gesuchte Knoten ist
                Object.assign(node, updatedMember); // Aktualisiere den Knoten mit den neuen Daten
            } else {
                node.children.forEach((child) => editMemberRecursively(child)); // Durchsuche die Kinderknoten rekursiv
            }
        };

        const updatedFamilyData = { ...familyData }; // Kopiere die aktuellen Familiendaten
        editMemberRecursively(updatedFamilyData); // Bearbeite das Mitglied
        setFamilyData(updatedFamilyData); // Aktualisiere den Zustand mit den bearbeiteten Familiendaten
    };

    const removeFamilyMember = (memberId) => { // Entfernen eines Familienmitglieds
        const removeMemberRecursively = (node) => { // Rekursive Funktion zum Entfernen des Mitglieds
            node.children = node.children.filter(child => child.id !== memberId); // Entferne das Mitglied aus den Kindern
            node.children.forEach(child => removeMemberRecursively(child)); // Durchsuche die Kinderknoten rekursiv
        };

        const updatedFamilyData = { ...familyData }; // Kopiere die aktuellen Familiendaten
        if (updatedFamilyData.id !== memberId) { // Überprüfe, ob der zu löschende Knoten nicht der Root-Knoten ist
            removeMemberRecursively(updatedFamilyData); // Entferne das Mitglied
            setFamilyData(updatedFamilyData); // Aktualisiere den Zustand mit den neuen Familiendaten
        } else {
            alert("Wurzelknoten kann nicht entfernt werden"); // Warnung, wenn versucht wird, den Root-Knoten zu löschen
        }
    };

    const moveNode = (draggedId, targetId) => { // Verschieben eines Knotens
        const findAndRemoveNode = (node, id) => { // Rekursive Funktion zum Entfernen des verschobenen Knotens
            if (!node.children) return null; // falls keine Kinder, wird nichts entfernt
            for (let i = 0; i < node.children.length; i++) { // Durchlaufe alle Kinderknoten
                if (node.children[i].id === id) { // Wenn der gesuchte Knoten gefunden ist
                    return node.children.splice(i, 1)[0]; // Entferne und gib den Knoten zurück
                }
                const foundNode = findAndRemoveNode(node.children[i], id); // Suche rekursiv in den Unterknoten
                if (foundNode) return foundNode; // Gib den gefundenen Knoten zurück
            }
            return null;
        };

        const addNodeToTarget = (node, targetId, childNode) => { // Hinzufügen des Knotens an die Zielposition
            if (node.id === targetId) { // Wenn der aktuelle Knoten der Zielknoten ist
                node.children.push(childNode); // Füge den verschobenen Knoten als Kind hinzu
            } else {
                node.children.forEach(child => addNodeToTarget(child, targetId, childNode)); // Durchsuche die Kinderknoten rekursiv
            }
        };

        const updatedFamilyData = { ...familyData }; // Kopiere die aktuellen Familiendaten
        const draggedNode = findAndRemoveNode(updatedFamilyData, draggedId); // Finde und entferne den verschobenen Knoten
        if (draggedNode) { // falls gefunden
            addNodeToTarget(updatedFamilyData, targetId, draggedNode); // Füge ihn am Zielort wieder ein
            setFamilyData(updatedFamilyData); // Aktualisiere den Zustand mit den neuen Familiendaten
        }
    };

    return (
        <div className="tree-container">
            <div className="family-tree">
                <TreeNode
                    person={familyData} // Übergeben aller implementierten Funktionen
                    addMember={addFamilyMember} 
                    removeMember={removeFamilyMember}
                    moveNode={moveNode}
                    editMember={editMember}
                />
            </div>
        </div>
    );
};

export default FamilyTree;