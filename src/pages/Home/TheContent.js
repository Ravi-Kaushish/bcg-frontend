import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CContainer, CFade } from '@coreui/react';
import routes from '../../utils/routes';
import { PageLoader } from 'src/components/Loaders';

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <React.Suspense fallback={PageLoader}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
            <Redirect from="/" to="/policies" />
          </Switch>
        </React.Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent);
