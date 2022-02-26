import IndexHomeEx from '../implementations/IndexHomeEx';
import { connect } from 'react-redux';
import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
} from '../../state/actions/index';

const mapStateToProps = state => ({
    ...state,
    data: state.homeReducers.data
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({ type: HOME_PAGE_LOADED, payload }),
    onUnload: () =>
        dispatch({ type: HOME_PAGE_UNLOADED })
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexHomeEx);

// export default IndexHomeEx;