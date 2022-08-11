export default {
    isOpenFormDetail: state => state.isOpenFormDetail,
    isLoading: state => state.isLoading,
    isAlertDeleteOpen: state => state.isAlertDeleteOpen,
    isReplication: state => state.isReplication,
    isReload: state => state.isReload,
    isBinding: state => state.isBinding,
    reloadFlag: state => state.reloadFlag,
    isModify: state => state.isModify,

    currentFood: state => state.currentFood,
    currentTotalNumberFood: state => state.currentTotalNumberFood,
    
    allFavorService: state => state.allFavorService,
    currentFavorService: state => state.currentFavorService,
    isCurrentFavorChanging: state => state.isCurrentFavorChanging,
    isFavorServiceFormOpen: state => state.isFavorServiceFormOpen,

    foodGroup: state => state.foodGroup,
    foodUnit: state => state.foodUnit,
    foodPlace: state => state.foodPlace,

    dataFoodPaging: state => state.dataFoodPaging,
    codeFilter: state => state.codeFilter,
    nameFilter: state => state.nameFilter,
    groupFilter: state => state.groupFilter,
    unitFilter: state => state.unitFilter,
    priceFilter: state => state.priceFilter,
    pageIndex: state => state.pageIndex,
    pageSize: state => state.pageSize,
    totalPages: state => state.totalPages,
    totalRecordsInPage: state => state.totalRecordsInPage,
};