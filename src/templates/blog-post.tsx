import React from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import moment from 'moment';

import Layout from 'src/components/templates/layout';
import SEO, { getSchemaOrgJSONLD } from 'src/components/templates/seo';
import Bio from 'src/components/bio';
import ContextPostCard from 'src/components/molecules/post-card/context';
import Utterances from 'src/components/organisms/utterances';
import { Tag } from 'src/components/atoms';
import { MIDDLE_GREY, BLACK, LIGHT_GREY } from 'src/constants/colors';

function BlogPostTemplate({ data, pageContext, location }) {
  const tags = data.allMarkdownRemark.group;
  const post = data.markdownRemark;
  const { previous, next } = pageContext;

  const { excerpt, fields, frontmatter } = post;
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
      <PostWrapper>
      <Article>
        <header>
          <H1>{post.frontmatter.title}</H1>
          <Row>
            {post.frontmatter.tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </Row>
          <Row>
            <StyledLink to="/">
              <Name>박효진 (@gywlsp)</Name>
            </StyledLink>
            <Date>
              {moment(post.frontmatter.date).format('YYYY년 MM월 DD일')}
            </Date>
          </Row>
          <Image
            fluid={thumbnail.childImageSharp.fluid}
            style={{
              width: '80%',
              height: 'auto',
              objectFit: 'cover',
              margin: '0.8rem auto 2.4rem',
              border: `0.1px solid ${LIGHT_GREY}`,
            }}
          />
        </header>
        <section
          className="postContents"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </Article>
      <ContextWrapper>
        {next && <ContextPostCard type="next" {...next} />}
        {previous && <ContextPostCard type="previous" {...previous} />}
      </ContextWrapper>
      <Utterances repo="gywlsp/blog-comments" />
      </PostWrapper>
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

const PostWrapper = styled.div`
  width: calc(100% - 260px - 1.6rem);
  @media (max-width: 1400px) {
    width: 100%;
  }
`;

const Article = styled.article`
flex: 1;
`;

const H1 = styled.h1`
  && {
    margin: 0;
    margin-bottom: 0.8rem;
    font-size: 2.6rem;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: baseline;
`;

const Name = styled.p`
  font-size: 1.4rem;
  margin-right: 1.2rem;
`;

const Date = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${MIDDLE_GREY};
`;

const StyledLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: ${BLACK};
`;

const ContextWrapper = styled.div`
  display: flex;
  flex-flow: row-reverse wrap;
  justify-content: space-between;
  margin-top: 2rem;
`;
