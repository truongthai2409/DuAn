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
export const postData = async (formData, URL) => {
 
    try {
        console.log(formData)
        let token = localStorage.getItem('authToken');
        token = token ? token.trim() : '';
        // Create a new FormData object
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        const response = await axios.post(
            // `${process.env.API_BE}/product/add-product-extension`, // Ensure the URL is correct
            `${process.env.API_BE}${URL}`, // Ensure the URL is correct
            data, // The FormData object goes here
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error uploading', error.message);
        throw error;
    }
};
