import { axiosWrapper } from "./axiosWrapper"

export const updateApiToken = async (apiToken:  string | null) => {
    if (!apiToken) {
        delete axiosWrapper.defaults.headers.common['Authorization'];
        return 
    }
    
    axiosWrapper.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;
}