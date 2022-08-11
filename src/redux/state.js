export default {
    isOpenFormDetail: false,
    isLoading: false,
    isAlertDeleteOpen: false,
    isReplication: false,
    isReload: false,
    isBinding: false,
    reloadFlag: false,
    isModify: false,

    currentFood: '',
    currentTotalNumberFood: 0,

    allFavorService: [],
    currentFavorService: [],
    isCurrentFavorChanging: false,
    isFavorServiceFormOpen: false,

    foodGroup: [],
    foodUnit: [],
    foodPlace: [],

    dataFoodPaging: [],
    codeFilter: '',
    nameFilter: '',
    groupFilter: '',
    unitFilter: '',
    priceFilter: '',
    pageIndex: 1,
    pageSize: 100,
    totalPages: 0,
    totalRecordsInPage: 0,
};