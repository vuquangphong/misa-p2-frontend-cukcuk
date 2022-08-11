import { putDataApi } from "../fetchApi"

export const updateModelById = async (edition, model, id, formPut) => {
    const res = await putDataApi(`${edition}/${model}/${id}`, formPut);
    return res;
}

export const updateMasterDetailById = async (edition, master, detail, formPost, masterId) => {
    const res = await putDataApi(`${edition}/${master}/${detail}/${masterId}`, formPost);
    return res;
}