import axios from "axios";
import Cookies from "universal-cookie/es6";

export const API_URL = "https://api.makleruz.uz/";
export const WEB_URL = "https://makler-front.vercel.app/";

const $host = axios.create({
    baseURL: API_URL,
    headers: {
      'Accept-Language': localStorage.getItem("i18nextLng") || "ru"
    }
});

$host.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if(!token) return config;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => Promise.reject(error));

$host.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        const cookies = new Cookies();
        if(!cookies.get('refreshToken'))
            return Promise.reject(error);
        try {
            const refreshToken = cookies.get('refreshToken');
            const { data } = await $host.post("authorization/api/v1/token/refresh/" , {refresh: refreshToken});
            window.localStorage.setItem("access", data.access);
            $host.defaults.headers.common["Authorization"] = "Bearer " + data.access;
            return $host.request(originalRequest);
        } catch (error) {
            cookies.set("refreshToken", "", { maxAge: 0 });
            window.localStorage.removeItem("access");
            console.error(error);
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
});

export default $host;