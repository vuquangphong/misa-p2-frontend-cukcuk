import { deleteDataApi } from "../fetchApi"

export const deleteModelById = async (edition, model, id) => {
    const res = deleteDataApi(`${edition}/${model}/${id}`);
    return res;
}