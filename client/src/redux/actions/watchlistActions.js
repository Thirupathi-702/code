import axios from 'axios';

export const fetchWatchlist = () => async (dispatch) => {
    try {
        const res = await axios.get('https://backend-hoac.onrender.com/api/watchlist');
        dispatch({
            type: 'FETCH_WATCHLIST_SUCCESS',
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: 'FETCH_WATCHLIST_FAIL',
            payload: error.response.data.message,
        });
    }
};
