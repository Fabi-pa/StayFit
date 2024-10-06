// api.js

import { idmConfig } from './config';

const API_URL = 
  process.env.NODE_ENV === 'development'
    ? `/api${idmConfig.apiPath}` 
    : `${idmConfig.url}${idmConfig.apiPath}`;

// Funktion zum Speichern einer Trainingssession
export async function saveTrainingSession(trainingData) {
    try {
        const response = await fetch(`${API_URL}/trainings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trainingData),
        });
        if (!response.ok) {
            throw new Error('Failed to save training session');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Funktion zum Abrufen der Trainingssessions
export async function fetchTrainingSessions() {
    try {
        const response = await fetch(`${API_URL}/trainings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch training sessions');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
