import { getDataApi } from "../fetchApi"

export const getAll = async (edition, model) => {
    const res = await getDataApi(`${edition}/${model}`);
    return res;
}

export const getById = async (edition, model, id) => {
    const res = await getDataApi(`${edition}/${model}/${id}`);
    return res;
}

export const getPaging = async (edition, model, pageIndex, pageSize, modelFilter, filter) => {
    const res = await getDataApi(`${edition}/${model}/filter?pageIndex=${pageIndex}&pageSize=${pageSize}&${modelFilter}=${filter}`);
    return res;
}