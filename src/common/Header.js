import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">dentico</Link>
      </nav>
    </header>
  );
};

export default Header;