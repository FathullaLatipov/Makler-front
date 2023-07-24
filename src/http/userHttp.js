import $host from "./index";

export const verifyUser = async () => {
    try {
        const token = window.localStorage.getItem("access");
        const { data } = await $host.post('authorization/api/v1/token/verify/', { token: token });
        return data;
    } catch (e) {
        console.error(e);
    }
};