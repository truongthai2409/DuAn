import { toast } from 'sonner';
import axios from "axios";
import http from '../api/apiConfig';

export const loginExten = async (data) => {
    try {
        const response = await http.post('/auth/login-extesion', data);
        return response.data;
    } catch (error) {
        console.error('Error logging in', error);
        toast.error(`Login error: ${error.response.data.message}`);
        throw error;
    }
};

export const register = async (data) => {
    try {
        const response = await http.post('/auth/register', data);
        return response.data;
    } catch (error) {
        toast.error(`Sign up error!`);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await http.get('/auth/logout');
        return response;
    } catch (error) {
        console.error('Error logout in', error);
        throw error;
    }
};

export const postData = async (formData) => {
    try {
        
        const response = await axios.post('http://localhost:5000/product/addProduct', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data)
        return response.data

    } catch (error) {
        toast.error(`Up load error!`);
        console.error('Error logout in', error);
        throw error;
    }
}
