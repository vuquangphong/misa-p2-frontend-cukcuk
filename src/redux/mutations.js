export default {
    setIsOpenFormDetail(state, isOpenFormDetail) {
        state.isOpenFormDetail = isOpenFormDetail;
    },

    setIsLoading(state, isLoading) {
        state.isLoading = isLoading;
    },

    setIsAlertDeleteOpen(state, isAlertDeleteOpen) {
        state.isAlertDeleteOpen = isAlertDeleteOpen;
    },

    setIsReplication(state, isReplication) {
        state.isReplication = isReplication
    },

    setIsReload(state, isReload) {
        state.isReload = isReload;
    },

    setCurrentFood(state, currentFood) {
        state.currentFood = currentFood;
    },

    setCurrentTotalNumberFood(state, currentTotalNumberFood) {
        state.currentTotalNumberFood = currentTotalNumberFood;
    },

    setFoodGroup(state, foodGroup) {
        state.foodGroup = foodGroup;
    },

    setFoodUnit(state, foodUnit) {
        state.foodUnit = foodUnit;
    },

    setFoodPlace(state, foodPlace) {
        state.foodPlace = foodPlace;
    },

    setDataFoodPaging(state, dataFoodPaging) {
        state.dataFoodPaging = dataFoodPaging;
    },

    setCodeFilter(state, codeFilter) {
        state.codeFilter = codeFilter;
    },

    setNameFilter(state, nameFilter) {
        state.nameFilter = nameFilter;
    },

    setGroupFilter(state, groupFilter) {
        state.groupFilter = groupFilter;
    },

    setUnitFilter(state, unitFilter) {
        state.unitFilter = unitFilter;
    },

    setPriceFilter(state, priceFilter) {
        state.priceFilter = priceFilter;
    },

    setPageIndex(state, pageIndex) {
        state.pageIndex = pageIndex;
    },

    setPageSize(state, pageSize) {
        state.pageSize = pageSize;
    },

    setTotalPages(state, totalPages) {
        state.totalPages = totalPages;
    },

    setTotalRecordsInPage(state, totalRecordsInPage) {
        state.totalRecordsInPage = totalRecordsInPage;
    },
};