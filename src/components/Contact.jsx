import React from "react";
import { Element } from "react-scroll";
import styled from "styled-components";
// Components
import { Container } from "react-bootstrap";
import { Title } from "./globalStyledComponents";
import ContactForm from "./ContactForm";

const StyledSection = styled.section`
  min-height: 89vh;
  padding-top: var(--nav-height);
`;

export default function Contact() {
  return (
    <Element name={"Contact"} id="contact" style={{ marginTop: '40px' }}>
      <Container className="d-flex flex-column justify-content-center">
        <Container className="d-flex">
          <Title>
            <h2>Contacts</h2>
            <div className="underline"></div>
          </Title>
        </Container>
        <Container>
          <ContactForm />
        </Container>
      </Container>
    </Element>
  );
}
