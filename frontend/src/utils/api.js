import axios from 'axios';
import { getUserSession,getUserToken } from './localStorage.utils';

export const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': getUserSession()? `Bearer ${getUserToken()}`: null
    }
});