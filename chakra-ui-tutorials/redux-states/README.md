## Adding Redux based state manager to Chakra UI Project ##

1. Adding required package to package.json

```
    "react-redux": "^7.2.6",
    "redux-logger": "^3.0.1",
    "redux-thunk": "^2.4.1",
    "react-router-redux": "^4.0.8",
    "redux-devtools-extension": "^2.13.9",
```
Note: We have the Chakra UI project with React & React-dom V 17.0.2 with react-router & react-router-dom V 5.1.2.

2. Adding store.js at the src-root (src/store.js).

In this code we are going to create the redux store which will connect with all reducer states (./state/reducers)

```
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import reducer from './state/reducers';

import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware);
    } else {
        // Enable additional logging in non-production environments.
        return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware)
        // return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, createLogger())
    }
};

export const store = createStore(
    reducer, composeWithDevTools(getMiddleware()));

```


3. Add agents.js at the src-root (src/agents.js)

You will be adding all API function here for GET/PUT/POST etc.
Below we have done the following:
 - Add the url path of API (this can be dynamic too)
 - Implement the requests() for API
 - Create function (i.e. Home) to call the API 
 - For every function, make sure to export it. (i.e. export default {Home }
 
```
const API_ROOT = 'https://jsonplaceholder.typicode.com';

const requests = {
    del: url =>
        fetch(`${API_ROOT}${url}`, { _method: 'DEL' }).then((res) => res.json()),
    get: url =>
        fetch(`${API_ROOT}${url}`, { _method: 'GET' }).then((res) => res.json()),
    put: (url, body) =>
        fetch(`${API_ROOT}${url}`, { _method: 'PUT', body: body }).then((res) => res.json()),
    post: (url, body) =>
        fetch(`${API_ROOT}${url}`, { _method: 'POST', body: body }).then((res) => res.json())
};

const Home = {
    todos: () =>
        requests.get(`/todos`)
};

export default {
    Home,
    Auth,
    setToken: _token => { token = _token; }
};

```

4. Create a folder name state inside src as src/state and add the following files:

All page specific const will be defined in this index.js
/src/state/actions/
- index.js
```
export const APP_LOAD = 'APP_LOAD';
export const REDIRECT = 'REDIRECT';
export const HOME_PAGE_LOADED = 'HOME_PAGE_LOADED';
export const HOME_PAGE_UNLOADED = 'HOME_PAGE_UNLOADED';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const LOGIN_PAGE_UNLOADED = 'LOGIN_PAGE_UNLOADED';
export const REGISTER_PAGE_UNLOADED = 'REGISTER_PAGE_UNLOADED';
export const ASYNC_START = 'ASYNC_START';
export const ASYNC_END = 'ASYNC_END';
````

All Page specific reducers will be listed here inside reducers folder:
/src/state/reducers/
- /homeReducers.js
```
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

```

- /index.js
```
import {
    combineReducers
} from 'redux';

import homeReducer from './homeReducer';

export default combineReducers({
    homeReducer
});
```

5. Create a folder name utils inside src as src/utils and add the following files:

```
src/utils/helpers.js
export const createActions = (type, payload) => {
    const dto = {
        type,
    };

    if (payload) {
        dto.payload = payload;
    }

    return dto;
};
```

6. In the container part of the code add the following 

```
import IndexHomeEx from '../partials/IndexHomeEx';


import { connect } from 'react-redux';
import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
} from '../../state/actions/index';

const mapStateToProps = state => ({
    ...state,
    data: state.homeReducer.data
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({ type: HOME_PAGE_LOADED, payload }),
    onUnload: () =>
        dispatch({ type: HOME_PAGE_UNLOADED })
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexHomeEx);
```

7. In the partial folder of page implementations, first add the connection to  agent because this will help the call the backend API code.

- Calling the function from the agent.js will make the API call and response will be stored into the this.props.

```
 import agent from '../../agent';

  componentWillMount() {
    this.props.onLoad(agent.Home.todos());
    console.log(this.props);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  {JSON.stringify(this.props)}
```

