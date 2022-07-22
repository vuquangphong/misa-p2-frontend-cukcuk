import { getAll } from "@/utils/call_apis/Get";

export default {
    openFormDetail({ commit }) {
        commit('setIsOpenFormDetail', true);
    },
    closeFormDetail({ commit }) {
        commit('setIsOpenFormDetail', false);
    },

    controlLoader({ commit, getters }) {
        commit('setIsLoading', !getters.isLoading);
    },

    openAlertDelete({ commit }) {
        commit('setIsAlertDeleteOpen', true);
    },
    closeAlertDelete({ commit }) {
        commit('setIsAlertDeleteOpen', false);
    },

    beingReplication({ commit }) {
        commit('setIsReplication', true);
    },
    stopReplication({ commit }) {
        commit('setIsReplication', false);
    },

    changeIsReload({ commit }, payload) {
        commit('setIsReload', payload);
    },

    changeIsBinding({ commit, getters }) {
        commit('setIsBinding', !getters.isBinding);
    },

    changeReloadFlag({ commit, getters }) {
        commit('setReloadFlag', !getters.reloadFlag);
    },

    beingModify({ commit }) {
        commit('setIsModify', true);
    },
    stopModify({ commit }) {
        commit('setIsModify', false);
    },

    changeCurrentFood({ commit }, payload) {
        commit('setCurrentFood', payload);
    },

    changeCurrentTotalNumberFood({ commit }, payload) {
        commit('setCurrentTotalNumberFood', payload);
    },

    async getFoodGroup({ commit }) {
        try {
            const res = await getAll('v1', 'FoodGroups');
            let foodGroups = [];
            res.data.responseData.forEach(data => {
                let element = {
                    FoodGroupID: data.FoodGroupID,
                    FoodGroupCode: data.FoodGroupCode,
                    FoodGroupName: data.FoodGroupName,
                };
                foodGroups.push(element);
            });
            commit('setFoodGroup', foodGroups);
        } catch (err) {
            commit('setFoodGroup', []);
            console.log(err);
        }
    },

    async getFoodUnit({ commit }) {
        try {
            const res = await getAll('v1', 'FoodUnits');
            let foodUnitIDName = [];
            res.data.responseData.forEach(data => {
                let element = {
                    FoodUnitID: data.FoodUnitID,
                    FoodUnitName: data.FoodUnitName,
                };
                foodUnitIDName.push(element);
            });
            commit('setFoodUnit', foodUnitIDName);
        } catch (err) {
            commit('setFoodUnit', []);
            console.log(err);
        }
    },

    async getFoodPlace({ commit }) {
        try {
            const res = await getAll('v1', 'FoodPlaces');
            let foodPlaceIDName = [];
            res.data.responseData.forEach(data => {
                let element = {
                    FoodPlaceID: data.FoodPlaceID,
                    FoodPlaceName: data.FoodPlaceName,
                };
                foodPlaceIDName.push(element);
            });
            commit('setFoodPlace', foodPlaceIDName);
        } catch (err) {
            commit('setFoodPlace', []);
            console.log(err);
        }
    },

    loadDataFoodPaging({ commit }, payload) {
        commit('setDataFoodPaging', payload);
    },

    changeCodeFilter({ commit }, payload) {
        commit('setCodeFilter', payload);
    },

    changeNameFilter({ commit }, payload) {
        commit('setNameFilter', payload);
    },

    changeGroupFilter({ commit }, payload) {
        commit('setGroupFilter', payload);
    },

    changeUnitFilter({ commit }, payload) {
        commit('setUnitFilter', payload);
    },

    changePriceFilter({ commit }, payload) {
        commit('setPriceFilter', payload);
    },

    changePageIndex({ commit }, payload) {
        commit('setPageIndex', payload);
    },

    changePageSize({ commit }, payload) {
        commit('setPageSize', payload);
    },

    changeTotalPages({ commit }, payload) {
        commit('setTotalPages', payload);
    },

    changeTotalRecordsInPage({ commit }, payload) {
        commit('setTotalRecordsInPage', payload);
    },
};