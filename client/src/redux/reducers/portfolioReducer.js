const initialState = {
    stocks: [],
    loading: true,
    error: null,
};

export default function portfolioReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_PORTFOLIO_SUCCESS':
            return { ...state, stocks: action.payload.stocks, loading: false };
        case 'FETCH_PORTFOLIO_FAIL':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}
