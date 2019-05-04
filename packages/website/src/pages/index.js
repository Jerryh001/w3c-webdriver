import React from 'react';
import * as ReactRouter from 'react-router';
import Home from './Home';
import Api from './Api';
import { StaticRouter } from 'react-router';
import { withSiteConfig } from '../components/utils/SiteConfigProvider';
import TableOfContentsCollector from '../components/table-of-contents/TableOfContentsCollector';

const Route = ({ exact, path, component, title }) => (
  <>
    <TableOfContentsCollector url={path} level={1} title={title} />
    <ReactRouter.Route exact={exact} path={path} component={component} />
  </>
);

const Routes = ({ path, github }) => (
  <StaticRouter location={path} context={{}}>
    <>
      <Route exact path="/" component={Home} title="Introduction" />
      <Route path="/api" component={Api} title="API" />
      <TableOfContentsCollector url={github} level={1} title="GitHub" />
    </>
  </StaticRouter>
);

export default withSiteConfig(Routes);
