import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../actions/index';

const initialState = {
    data: [],
    loading: true,
    error: ''
}
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case HOME_PAGE_LOADED:
            return {
                ...state,
                data: action.payload,
                loading: false
            };
        case HOME_PAGE_UNLOADED:
            return {
                loading: false
            };
        default:
            return state;
    }
};
