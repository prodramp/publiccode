import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import compact from "lodash/compact";
import map from 'lodash/map';
import isUndefined from 'lodash/isUndefined';
import SuspenseLoader from '../../utils/SuspenseLoader';

const IndexHome = React.lazy( () => import('../pages/IndexHome'));
const DataHome = React.lazy( () => import('../pages/data/DataHome'));

export const routes = [
    {path: '/index', exact: true, name: 'Home', component: IndexHome},
    {path: '/data', exact: true, name: 'Home', component: DataHome}
]

export default () => {
    return(
        <React.Fragment>
            <Switch>
              {compact(
                  map(routes, ({ component: Component, ...routeProps }) => {
                  return !isUndefined(Component) ? (
                      <Route
                      key={`route_${routeProps.path}_${routeProps.name}`}
                      {...routeProps}
                      render={props => (
                          <React.Suspense fallback={<SuspenseLoader />}>
                            <Component {...props} />
                          </React.Suspense>
                      )}
                      />
                  ) : null;
                  })
              )}
            <Route render={() => <Redirect to='/index' />} />
            </Switch> 
        </React.Fragment>
    )
}