const initialState = {
    stocks: [],
    portfolio: []
  };
  
  const stockReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_STOCKS':
        return { ...state, stocks: action.payload };
      case 'SET_PORTFOLIO':
        return { ...state, portfolio: action.payload };
      default:
        return state;
    }
  };
  
  export default stockReducer;
  