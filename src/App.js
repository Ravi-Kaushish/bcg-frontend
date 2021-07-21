import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { PageLoader } from './components/Loaders';

import TheLayout from './pages/Home/TheLayout';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={PageLoader}>
          <Switch>
            <Route path="/" name="home" render={props => <TheLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;