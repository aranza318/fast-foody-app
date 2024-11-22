import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabaseSync("fastfoody.db");

export const createSessionsTable = () => {
    return new Promise((resolve, reject) => {
        db.execAsync(`
            CREATE TABLE IF NOT EXISTS sessions (
                localId TEXT PRIMARY KEY NOT NULL, 
                email TEXT NOT NULL, 
                token TEXT NOT NULL
            )
        `)
        .then(resolve)
        .catch(reject);
    });
}

export const insertSession = ({email, localId, token}) => {
    return new Promise((resolve, reject) => {
        db.runAsync(
            'INSERT INTO sessions (email, localId, token) VALUES (?, ?, ?)',
            [email, localId, token]
        )
        .then(resolve)
        .catch(reject);
    });
}

export const fetchSession = () => {
    return new Promise((resolve, reject) => {
        db.getAllAsync('SELECT * FROM sessions')
        .then(resolve)
        .catch(reject);
    });
}

export const clearSessions = () => {
    return new Promise((resolve, reject) => {
        db.runAsync('DELETE FROM sessions')
        .then(resolve)
        .catch(reject);
    });
}