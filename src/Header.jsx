import React from "react";
import { Navbar, Container } from "react-bootstrap";

import TelegramLoginButton from "react-telegram-login";

export const Header = ({ className, showTelegramButton }) => {
  return (
    <>
      <Navbar
        expand="md"
        variant="dark"
        className={`bg-dark py-4 px-3 border border-bottom-1 ${className}`}
      >
        <Container fluid className="d-flex justify-content-between">
          <Navbar.Brand
            href="/"
            aria-label="Return to homepage"
            className="p-0"
          >
            <h1 className="m-0 text-white">OpenSplit</h1>
          </Navbar.Brand>
          {showTelegramButton && (
            <div className="d-flex justify-content-end p-0">
              <TelegramLoginButton
                className="mt-3"
                dataAuthUrl="https://opensplit.netlify.app/home"
                botName="opensplit_bot"
              />
            </div>
          )}
        </Container>
      </Navbar>
    </>
  );
};
