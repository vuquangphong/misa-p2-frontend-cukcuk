import { postDataApi } from "../fetchApi";

export const createModel = async (edition, model, formPost) => {
    const res = await postDataApi(`${edition}/${model}`, formPost);
    return res;
}

export const createMasterDetail = async (edition, master, detail, formPost) => {
    const res = await postDataApi(`${edition}/${master}/${detail}`, formPost);
    return res;
}