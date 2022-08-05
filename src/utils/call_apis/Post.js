import { postDataApi } from "../fetchApi";

export const createModel = async (edition, model, formPost) => {
    const res = await postDataApi(`${edition}/${model}`, formPost);
    return res;
}

export const createFullModel = async (edition, model, formPost, textOfChild) => {
    const res = await postDataApi(`${edition}/${model}/child?textOfChild=${textOfChild}`, formPost);
    return res;
}