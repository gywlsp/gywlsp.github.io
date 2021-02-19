import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from 'src/utils/typography';

declare const __PATH_PREFIX__;

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>
        {location.pathname === rootPath && (
          <h1
            style={{
              ...scale(1.5),
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                color: `inherit`,
              }}
              to="/"
            >
              {title}
            </Link>
          </h1>
        )}
        {location.pathname !== rootPath && (
          <h3
            style={{
              fontFamily: `Montserrat, sans-serif`,
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                color: `inherit`,
              }}
              to="/"
            >
              {title}
            </Link>
          </h3>
        )}
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {' '}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
