// fetchdata.js

import React, { useEffect, useState } from 'react';
import { fetchTrainingSessions, saveTrainingSession } from './api'; // Importiere die Funktionen aus api.js

const FetchData = () => {
    const [trainings, setTrainings] = useState([]);
    const [newTraining, setNewTraining] = useState({
        date: '',
        weekday: '',
        trainingType: '',
    });

    useEffect(() => {
        const loadTrainings = async () => {
            try {
                const data = await fetchTrainingSessions(); // Trainingssessions abrufen
                setTrainings(data); // State mit den abgerufenen Daten aktualisieren
            } catch (error) {
                console.error('Failed to load trainings:', error);
            }
        };
        loadTrainings();
    }, []);

    const handleSave = async () => {
        try {
            await saveTrainingSession(newTraining); // Neues Training speichern
            setTrainings([...trainings, newTraining]); // State nach dem Speichern aktualisieren
            setNewTraining({ date: '', weekday: '', trainingType: '' }); // Formular zurücksetzen
        } catch (error) {
            console.error('Failed to save training session:', error);
        }
    };

    return (
        <div>
            <h1>Training Sessions</h1>
            <ul>
                {trainings.map((training, index) => (
                    <li key={index}>
                        {training.date} - {training.weekday} - {training.trainingType}
                    </li>
                ))}
            </ul>

            <div>
                <input
                    type="text"
                    placeholder="Datum"
                    value={newTraining.date}
                    onChange={(e) => setNewTraining({ ...newTraining, date: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Wochentag"
                    value={newTraining.weekday}
                    onChange={(e) => setNewTraining({ ...newTraining, weekday: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Trainingsart"
                    value={newTraining.trainingType}
                    onChange={(e) => setNewTraining({ ...newTraining, trainingType: e.target.value })}
                />
                <button onClick={handleSave}>Save Training Session</button>
            </div>
        </div>
    );
};

export default FetchData;
