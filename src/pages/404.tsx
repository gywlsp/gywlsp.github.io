import React from 'react';

import Layout from 'src/components/templates/layout';
import SEO from 'src/components/templates/seo';

function NotFoundPage({ location }) {
  return (
    <Layout pathname={location.pathname}>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
}

export default NotFoundPage;
