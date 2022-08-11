import { getDataApi } from "../fetchApi"

export const getAll = async (edition, model) => {
    const res = await getDataApi(`${edition}/${model}`);
    return res;
}

export const getById = async (edition, model, id) => {
    const res = await getDataApi(`${edition}/${model}/${id}`);
    return res;
}

export const getDetailsByMasterId = async (edition, detail, master, masterId) => {
    const res = await getDataApi(`${edition}/${detail}/${master}/${masterId}`);
    return res;
}

export const getPaging = async (edition, model, pageIndex, pageSize, codeFilter, nameFilter, groupFilter, unitFilter, priceFilter) => {
    const res = await getDataApi(`${edition}/${model}/filter?pageIndex=${pageIndex}&pageSize=${pageSize}&codeFilter=${codeFilter}&nameFilter=${nameFilter}&groupFilter=${groupFilter}&unitFilter=${unitFilter}&priceFilter=${priceFilter}`);
    return res;
}

export const getCheckDuplicatedCode = async (edition, model, code) => {
    const res = await getDataApi(`${edition}/${model}/Codes/${code}`);
    return res;
}