const initialState = {
    watchlist: [],
    loading: true,
    error: null,
};

const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_WATCHLIST_SUCCESS':
            return {
                ...state,
                watchlist: action.payload,
                loading: false,
            };
        case 'FETCH_WATCHLIST_FAIL':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default watchlistReducer;
