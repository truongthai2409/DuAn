import { toast } from 'sonner';
import http from '../api/apiConfig';

export const login = async (data) => {
    try {
        const response = await http.post('/auth/login', data);
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
        // console.error('Error logging in', error);
        // toast.error(`Login error ${error.response.data.error.undefined}`);
        // toast.error(`Login error: ${error.response.data.message}`);
        // console.log(error.response.data.message)
        // console.log(error.response.data.error.undefined)
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
