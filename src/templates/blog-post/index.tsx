import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from 'src/components/templates/layout';
import SEO, { getSchemaOrgJSONLD } from 'src/components/templates/seo';
import Content from './content';
import Nav from './nav';
import Utterances from 'src/components/organisms/utterances';

function BlogPostTemplate({ data, pageContext, location }) {
  const tags = data.allMarkdownRemark.group;
  const post = data.markdownRemark;

  const { fields, frontmatter, excerpt } = post;
  const { slug } = fields;
  const { title, date, thumbnail } = frontmatter;
  const url = `${data.site.siteMetadata.siteUrl}${slug}`;
  const image = thumbnail.childImageSharp.fluid.src;

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    url,
    title,
    image,
    description: excerpt,
    datePublished: date,
  });

  return (
    <Layout selectedTag={null} pathname={location.pathname} tags={tags}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        meta={[
          { name: 'image', content: image },
          { name: 'og:image', content: image },
          { name: 'og:type', content: 'article' },
          { name: 'og:url', content: url },
        ]}
      >
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>
      </SEO>
      <Wrapper>
        <Content {...post} />
        <Nav {...pageContext} />
        <Utterances repo="gywlsp/blog-comments" />
      </Wrapper>
    </Layout>
  );
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      tableOfContents
      frontmatter {
        title
        date
        description
        tags
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;
