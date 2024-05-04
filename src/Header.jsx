import React from "react";
import { Navbar, Container } from "react-bootstrap";

export const Header = () => {
  return (
    <>
      <Navbar
        expand="md"
        variant="dark"
        className="bg-dark sticky-top py-4 px-3 border border-bottom-1"
      >
        <Container fluid className="d-flex justify-content-between">
          <Navbar.Brand
            href="/"
            aria-label="Return to homepage"
            className="p-0"
          >
            <h1 className="m-0 text-white">OpenSplit</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};
