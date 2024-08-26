import React, { useState, useRef } from 'react'; 
import { useDrag, useDrop } from 'react-dnd'; // Hooks für Drag-and-Drop Funktionen

const ItemTypes = {
    TREE_NODE: 'treeNode', // Typ für das Drag-and-Drop-Element
};

const cities = ["Berlin", "Frankfurt", "München", "Hamburg"]; // Liste von Städten

const TreeNode = ({ person, addMember, removeMember, moveNode, editMember }) => { // Hauptkomponente für den Baumknoten
    const [showForm, setShowForm] = useState(false); // State der Sichtbarkeit zum Hinzufügen neuer Mitglieder
    const [showEditForm, setShowEditForm] = useState(false); // State der Sichtbarkeit zum Bearbeiten eines Mitglieds
    const [name, setName] = useState(''); // State für den Namen des Mitglieds
    const [birthdate, setBirthdate] = useState(''); // State für das Geburtsdatum des Mitglieds
    const [gender, setGender] = useState('male');  // State für das Geschlecht, standardmäßig 'male'
    const [deathdate, setDeathdate] = useState(''); // State für das Sterbedatum
    const [cityOfBirth, setCityOfBirth] = useState(''); // State für den Geburtsort
    const [cityOfDeath, setCityOfDeath] = useState(''); // State für den Sterbeort

    const ref = useRef(null); // Referenz für das DOM-Element des Knoten

    const [, drop] = useDrop({
        accept: ItemTypes.TREE_NODE, // Akzeptiert nur Elemente vom Typ TREE_NODE
        hover(item) {
            if (item.id !== person.id) { // ein anderes Knoten-Element wie das aktuelle Knoten-Element
                moveNode(item.id, person.id); // Verschiebt den Knoten an die neue Position
                item.id = person.id; // Aktualisiert die ID des verschobenen Elements
            }
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TREE_NODE, // Typ des zu ziehenden Elements
        item: { id: person.id }, // Das Element, das gezogen wird
        collect: (monitor) => ({
            isDragging: monitor.isDragging(), // Überwacht, ob das Element gezogen wird
        }),
    });

    drag(drop(ref)); // Verbindet Drag und Drop mit der DOM-Referenz

    const handleAddMember = () => { // Hinzufügen eines neuen Mitglieds
        if (name && birthdate) { // Überprüft, ob Name und Geburtsdatum ausgefüllt sind
            const newMember = {
                id: Date.now(), // Generiert eine eindeutige ID für das neue Mitglied
                name,
                birthdate,
                gender,
                deathdate,
                cityOfBirth,
                cityOfDeath,
                children: [], // Initialisiert eine leere Kinderliste
            };
            addMember(person.id, newMember); // Fügt das neue Mitglied hinzu
            // Setzt alle Eingabefelder zurück und schließt das Formular
            setName('');
            setBirthdate('');
            setGender('male');
            setDeathdate('');
            setCityOfBirth('');
            setCityOfDeath('');
            setShowForm(false);
        } else {
            alert("Pflichtige Felder bitte ausfüllen (Name and Birthdate).");
        }
    };

    const handleEditMember = () => { // Funktion zum Bearbeiten eines vorhandenen Mitglieds
        const updatedMember = {
            ...person, // Beibehaltung der bestehenden Daten
            deathdate,
            cityOfBirth,
            cityOfDeath,
        };
        editMember(person.id, updatedMember); // Speichert die Änderungen
        setShowEditForm(false);
    };

    return (
        <div
            ref={ref} // Referenz zu diesem div-Element
            className={`tree-node ${person.gender === 'female' ? 'female' : 'male'}`} // Setzt die CSS-Klasse basierend auf dem Geschlecht
            style={{ opacity: isDragging ? 0.5 : 1 }} // Wenn am Ziehen Opazität fällt zur hälfte
        >
            <div className="person-info">{/* Zeigt Infos der Person */}
                <h4>{person.name}</h4> 
                <p>Born: {person.birthdate}</p>
                {person.cityOfBirth && <p>City of Birth: {person.cityOfBirth}</p>} {/* Falls vorhanden Zeigt die restlichen Infos */}
                {person.deathdate && <p>Died: {person.deathdate}</p>} 
                {person.cityOfDeath && <p>City of Death: {person.cityOfDeath}</p>} 
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancel" : "Add Child"} {/* Button zur Steuerung des Hinzufügen-Fomulars, event wird per Klick ausgelöst */}
                </button>
                <button onClick={() => removeMember(person.id)}>Remove</button> {/* Button zum Entfernen des aktuellen Mitglieds */}
                <button onClick={() => setShowEditForm(!showEditForm)}>
                    {showEditForm ? "Cancel" : "Edit"} {/* Button zur Steuerung des Bearbeitung-Formulars, event wird per Klick ausgelöst */}
                </button>
            </div>
            {showForm && (
                <div className="add-member-form">
                    <input
                        type="text"
                        placeholder="Name"
                        className="obligatory"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Aktualisiert den Namen
                    />
                    <input
                        type="date"
                        className="obligatory"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)} // Aktualisiert das Geburtsdatum
                    />
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)} // Aktualisiert das Geschlecht
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <input
                        type="date"
                        placeholder="Death Date (optional)"
                        value={deathdate}
                        onChange={(e) => setDeathdate(e.target.value)} // Aktualisiert das Sterbedatum
                    />
                    <input
                        type="text"
                        placeholder="City of Birth (optional)"
                        list="cities"
                        value={cityOfBirth}
                        onChange={(e) => setCityOfBirth(e.target.value)} // Aktualisiert den Geburtsort
                    />
                    <input
                        type="text"
                        placeholder="City of Death (optional)"
                        list="cities"
                        value={cityOfDeath}
                        onChange={(e) => setCityOfDeath(e.target.value)} // Aktualisiert den Sterbeort
                    />
                    <datalist id="cities">
                        {cities.map((city, index) => (
                            <option key={index} value={city} /> // Verwendet die City Liste
                        ))}
                    </datalist>
                    <button onClick={handleAddMember}>Add Member</button> {/* Button zum Hinzufügen des neuen Mitglieds */}
                </div>
            )}
            {showEditForm && (
                <div className="edit-member-form">
                    <input
                        type="date"
                        placeholder="Death Date"
                        value={deathdate}
                        onChange={(e) => setDeathdate(e.target.value)} // Aktualisiert das Sterbedatum im Bearbeitungsformular
                    />
                    <input
                        type="text"
                        placeholder="City of Birth"
                        list="cities"
                        value={cityOfBirth}
                        onChange={(e) => setCityOfBirth(e.target.value)} // Aktualisiert den Geburtsort im Bearbeitungsformular
                    />
                    <input
                        type="text"
                        placeholder="City of Death"
                        list="cities"
                        value={cityOfDeath}
                        onChange={(e) => setCityOfDeath(e.target.value)} // Aktualisiert den Sterbeort im Bearbeitungsformular
                    />
                    <datalist id="cities">
                        {cities.map((city, index) => (
                            <option key={index} value={city} />
                        ))}
                    </datalist>
                    <button onClick={handleEditMember}>Save Changes</button> {/* Button zum Speichern */}
                </div>
            )}
            {person.children && person.children.length > 0 && ( // Überprüft, ob das Mitglied Kinder hat
                <div className="children">
                    {person.children.map((child) => (
                        <TreeNode
                            key={child.id} // Schlüssel für jedes Kind
                            person={child} // Übergibt das Kind als neues 'person'-Objekt an die TreeNode-Komponente
                            addMember={addMember}
                            removeMember={removeMember}
                            moveNode={moveNode}
                            editMember={editMember}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeNode;