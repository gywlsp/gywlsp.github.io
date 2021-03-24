module.exports = {
  siteMetadata: {
    title: `사이다 데브로그 CIDER DEVLOG`,
    author: {
      name: `박효진 (@gywlsp)`,
      summary: `이화여자대학교에서 컴퓨터공학을 배우고 있는 23살 대학생입니다.`,
    },
    description: `사이다 데브로그 CIDER DEVLOG :: gywlsp dev blog`,
    siteUrl: `https://gywlsp.github.io/`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `anchor-header`,
              maintainCase: false,
              removeAccents: true,
              elements: [`h1`, `h2`, `h3`, `h4`],
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `사이다 데브로그 CIDER DEVLOG`,
        short_name: `CiderDevlog`,
        start_url: `/`,
        background_color: `#FFF`,
        theme_color: `#D2EFFF`,
        display: `minimal-ui`,
        icon: `content/assets/cyder.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    'gatsby-plugin-root-import',
    {
      resolve: `gatsby-plugin-styled-components`,
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          'G-L85J9BWD42', // Google Analytics / GA
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
