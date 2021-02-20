/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactNode, ReactNodeArray } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export type SEOProps = {
  description?: string;
  lang?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: any[];
  title: string;
  children?: ReactNode | ReactNodeArray;
};

const SEO = ({
  description = '',
  lang = 'ko',
  meta = [],
  title,
  children,
}: SEOProps) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
      ].concat(meta)}
    >
      {children}
    </Helmet>
  );
};

export const getSchemaOrgJSONLD = ({
  url,
  title,
  image,
  description,
  datePublished,
}) => ({
  '@context': 'http://schema.org',
  '@type': 'BlogPosting',
  image: {
    '@type': 'ImageObject',
    url: image,
  },
  url,
  dateCreated: datePublished,
  datePublished,
  dateModified: datePublished,
  headline: `${title} | 사이다 데브로그`,
  name: `${title} | 사이다 데브로그`,
  description,
  keywords: [
    'Lite:true',
    'Elevated:false',
    'LockedPostSource:LOCKED_POST_SOURCE_NONE',
    'LayerCake:0',
  ],
  author: {
    '@type': 'Person',
    name: 'Park Hyo Jin',
    url: 'https://gywlsp.github.io',
  },
  creator: ['Park Hyo Jin'],
  publisher: {
    '@type': 'Person',
    url: 'https://gywlsp.github.io',
    logo: 'https://gywlsp.github.io/images/logo.svg',
    name: 'Park Hyo Jin',
  },
  mainEntityOfPage: url,
});

export default SEO;
