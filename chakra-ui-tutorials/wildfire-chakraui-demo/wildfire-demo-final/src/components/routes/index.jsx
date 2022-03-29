import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import compact from "lodash/compact";
import map from 'lodash/map';
import isUndefined from 'lodash/isUndefined';
import SuspenseLoader from '../../utils/SuspenseLoader';

const IndexHome = React.lazy( () => import('../pages/IndexHome'));
const DataHome = React.lazy( () => import('../pages/data/DataHome'));
const MapHome = React.lazy( () => import('../pages/map/MapHome'));
const WildfireMapHome = React.lazy( () => import('../pages/wildfire/WildfireMapHome'));

export const routes = [
    {path: '/index', exact: true, name: 'Home', component: IndexHome},
    {path: '/dataHome', exact: true, name: 'Home', component: DataHome},
    {path: '/mapHome', exact: true, name: 'Home', component: MapHome},
    {path: '/wildfireMap', exact: true, name: 'Home', component: WildfireMapHome}
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