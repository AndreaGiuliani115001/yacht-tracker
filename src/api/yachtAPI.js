// src/api/yachtAPI.js

const API_URL = 'http://localhost:4000/yacht-data';

export async function fetchYachtData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Errore HTTP ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Errore fetch dati yacht:', error);
        return null;
    }
}
