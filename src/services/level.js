import axiosInstance from "../axios/authAxios";

/**
 * The school's levels: those it offers (Levels Offered by the School), or
 * with scope "system" every level of its level system.
 */
export const getLevels = async (scope) => {
    const response = await axiosInstance.get("level", { params: scope ? { scope } : undefined });
    return response.data;
}