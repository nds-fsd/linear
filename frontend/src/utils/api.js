import axios from 'axios';
import { getUserSession } from './localStorage.utils';

export const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getUserSession()}`
    }
});