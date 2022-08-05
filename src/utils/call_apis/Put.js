import { putDataApi } from "../fetchApi"

export const updateModelById = async (edition, model, id, formPut) => {
    const res = await putDataApi(`${edition}/${model}/${id}`, formPut);
    return res;
}

export const updateFullModelById = async (edition, model, formPost, id, textOfChild) => {
    const res = await putDataApi(`${edition}/${model}/child?entityId=${id}&textOfChild=${textOfChild}`, formPost);
    return res;
}