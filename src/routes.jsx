import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'components/App';
import { HomePage, SamplePage, NotFoundPage, Musix } from 'components';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/sample" component={SamplePage} />
    <Route path="/terasir" component={Musix} />

    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;
