import React from "react";
import PropTypes from "prop-types";
import { useAppContext } from "../appContext";
import { Link as ScrollLink } from "react-scroll";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
// Icons
import { Icon } from "@iconify/react";
// Components
import { Container, Nav, Navbar } from "react-bootstrap";
// Images
import Logo from "./defaultNavLogo.svg";

// #region styled-components
const StyledSwitch = styled.label`
  /* Slider pill */
  display: flex;
  width: 3.2rem;
  font-size: 1.5rem;
  border-radius: 30px;
  transition: var(--transition);
  border: 2px solid;

  /* Hide defualt checkbox */
  input[type="checkbox"] {
    height: 0;
    width: 0;
    opacity: 0;
  }

  /* Move span when checked */
  input[type="checkbox"]:checked + div {
    transform: translateX(100%);
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--transition);
  }
`;

const FixedNavSpacer = styled.div`
  height: var(--nav-height);
`;

function ThemeToggle() {
  const { theme, toggleTheme, closeExpanded } = useAppContext();

  return (
    <StyledSwitch onClick={closeExpanded}>
      <input
        type="checkbox"
        aria-label={`Toggle theme, currently ${theme}.`}
        onClick={toggleTheme}
      />
      <div>
        {theme === "light" ? (
          <Icon icon="game-icons:sunflower" />
        ) : (
          <Icon icon="game-icons:moon" />
        )}
      </div>
    </StyledSwitch>
  );
}
// #endregion

// #region component
const propTypes = {
  Logo: PropTypes.node.isRequired,
};

const defaultProps = {
  Logo: Logo,
};

export default function NavBar({ Logo }) {
  const { theme, isExpanded, closeExpanded, toggleExpanded } = useAppContext();
  const { pathname } = useLocation();
  const navLinks = {
    routes: [
      { id: "1R", name: "Home", route: "/" },
      { id: "2R", name: "About Me", route: "/About" },
      { id: "3R", name: "Education", route: "/Education" },
      { id: "4R", name: "Publications", route: "/Publications" },
      { id: "5R", name: "Projects", route: "/Projects" },
      { id: "6R", name: "Skills", route: "/Skills" },
      { id: "7R", name: "Contact", route: "/Contact" },
    ],
    to: [
      { id: "1T", name: "Home", to: "Home" },
      { id: "2T", name: "About Me", to: "About" },
      { id: "3T", name: "Education", to: "Education" },
      { id: "4T", name: "Publications", to: "Publications" },
      { id: "5T", name: "Projects", to: "Projects" },
      { id: "6T", name: "Skills", to: "Skills" },
      { id: "7T", name: "Contact", to: "Contact" },
    ],
  };

  return (
    <>
      <FixedNavSpacer />
      <Navbar
        id="nav"
        collapseOnSelect={true}
        expand="lg"
        expanded={isExpanded}
        bg={theme === "light" ? "light" : "dark"}
        variant={theme === "light" ? "light" : "dark"}
        fixed="top"
      >
        <Container>
          <Navbar.Brand>
            <img
              alt="Logo"
              src={Logo}
              width="35"
              height="35"
              className="rounded-circle"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={toggleExpanded}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav navbarScroll className="me-auto">
              {pathname === "/"
                ? navLinks.to.map((el) => {
                  return (
                    <Nav.Item key={el.id}>
                      {/* <ScrollLink
                        to={el.to}
                        spy={true}
                        activeClass="active"
                        className="nav-link"
                        onClick={closeExpanded}
                      >
                        {el.name}
                      </ScrollLink> */}
                      <Nav.Link as={Link} to={el.to} spy={true}
                        activeClass="active"
                        className="nav-link"
                        onClick={closeExpanded} > {el.name}</Nav.Link>
                    </Nav.Item>
                  );
                })
                : navLinks.routes.map((el) => {
                  return (
                    <Nav.Item key={el.id}>
                      <Link
                        to={el.route}
                        className={
                          pathname === el.route
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={closeExpanded}
                      >
                        {el.name}
                      </Link>
                    </Nav.Item>
                  );
                })}
            </Nav>
            <Nav>
              <ThemeToggle />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar >
    </>
  );
}

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;
// #endregion
