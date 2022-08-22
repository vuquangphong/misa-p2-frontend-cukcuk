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

    setIsBinding(state, isBinding) {
        state.isBinding = isBinding;
    },

    setReloadFlag(state, reloadFlag) {
        state.reloadFlag = reloadFlag;
    },

    setIsModify(state, isModify) {
        state.isModify = isModify;
    },

    setCurrentFood(state, currentFood) {
        state.currentFood = currentFood;
    },

    setAllFavorService(state, allFavorService) {
        state.allFavorService = allFavorService;
    },

    setCurrentFavorService(state, currentFavorService) {
        state.currentFavorService = currentFavorService;
    },

    setIsCurrentFavorChanging(state, isCurrentFavorChanging) {
        state.isCurrentFavorChanging = isCurrentFavorChanging;
    },

    setIsFavorServiceFormOpen(state, isFavorServiceFormOpen) {
        state.isFavorServiceFormOpen = isFavorServiceFormOpen;
    },

    setCoordinateOptionFS(state, coordinateOptionFS) {
        state.coordinateOptionFS = coordinateOptionFS;
    },

    setIsFSOptionsOpen(state, isFSOptionsOpen) {
        state.isFSOptionsOpen = isFSOptionsOpen;
    },

    setIsClickDropDownFS(state, isClickDropDownFS) {
        state.isClickDropDownFS = isClickDropDownFS;
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