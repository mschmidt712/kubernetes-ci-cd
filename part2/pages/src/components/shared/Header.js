import React from 'react';
import {IndexLink, Link} from 'react-router';

const Header = () => {
  return (
    <header className="primary-header">
      <div className="container">
        <img className="logo" src={`../../assets/logo-reg-2x.png`} />
        <nav className="primary-nav">
          <ul className="list-unstyled">
            <li>
              <IndexLink activeClassName="active" to="/">Clear</IndexLink>
            </li>
            <li>
              <Link activeClassName="active" to="/">Reload</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
