import { putDataApi } from "../fetchApi"

export const updateModelById = async (edition, model, id, formPut) => {
    const res = await putDataApi(`${edition}/${model}/${id}`, formPut);
    return res;
}