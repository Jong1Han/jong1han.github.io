import React from "react";
import { useAppContext } from "./appContext";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGitHubInfo,
  selectError,
  selectIsLoading,
} from "./pages/homeSlice";
import { fetchGitHubReops } from "./pages/allProjectsSlice";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Element } from "react-scroll";
import { ThemeProvider } from "styled-components";
// Data
import { navLogo } from "./data";

// Components
import { Container } from "react-bootstrap";
import { Loading } from "./components/globalStyledComponents";
import ScrollToTop from "./components/ScrollToTop";
import GlobalStyles from "./components/GlobalStyles";
import NavBar from "./components/NavBar";
// Pages
import Home from "./pages/Home";
import AllProjects from "./pages/AllProjects";
import NotFound from "./pages/NotFound";
import Education from "./components/Education";
import Hero from "./components/Hero";
import Publications from "./components/Publications";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

document.body.classList.add("no-scroll")
const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
const themes = {
  light: {
    name: "light",
    color: "#45413C",
    background: "#F5F2E8",
  },
  dark: {
    name: "light",
    color: "#45413C",
    background: "#F5F2E8",
  },
  // dark: {
  //   name: "dark",
  //   color: "#FBFDFF",
  //   background: "#27272A",
  // },
};

export default function App() {
  const { theme, setTheme } = useAppContext();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  React.useEffect(
    function () {
      const updateTheme = () =>
        darkMode ? setTheme("dark") : setTheme("light");
      updateTheme();
      dispatch(fetchGitHubInfo());
      dispatch(fetchGitHubReops());
    },
    [setTheme, dispatch]
  );

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) =>
      e.matches ? setTheme("dark") : setTheme("light")
    );
  if (isLoading) {
    return (
      <ThemeProvider theme={themes[theme]}>
        <GlobalStyles />
        <Container className="d-flex vh-100 align-items-center">
          <Loading />
        </Container>
      </ThemeProvider>
    );
  } else if (error) {
    return (
      <ThemeProvider theme={themes[theme]}>
        <GlobalStyles />
        <Container className="d-flex vh-100 align-items-center justify-content-center">
          <h2>{error}</h2>
        </Container>
      </ThemeProvider>
    );
  } else {
    return (
      <HashRouter>
        <ThemeProvider theme={themes[theme]}>
          <ScrollToTop />
          <GlobalStyles />
          <Element name={"Home"} id="home">
            <NavBar Logo={navLogo} />
          </Element>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/Education" element={<Education />}></Route>
            <Route path="/Publications" element={<Publications />}></Route>
            <Route path="/About" element={<AboutMe />}></Route>
            <Route path="/Projects" element={<Projects />}></Route>
            <Route path="/Skills" element={<Skills />}></Route>
            <Route path="/Contact" element={<Contact />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </HashRouter>
    );
  }
}
