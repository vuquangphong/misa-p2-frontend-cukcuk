import { postDataApi } from "../fetchApi";

export const createModel = async (edition, model, formPost) => {
    const res = await postDataApi(`${edition}/${model}`, formPost);
    return res;
}