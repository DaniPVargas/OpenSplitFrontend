import React, { useState } from "react";
import { Navbar, Container, Image } from "react-bootstrap";

import { useSearchParams } from "react-router-dom";

import TelegramLoginButton from "react-telegram-login";

export const Header = ({ className, showTelegramButton }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [photoUrl, setPhotoUrl] = useState(searchParams.get("photo_url"));
  return (
    <>
      <Navbar
        expand="md"
        variant="dark"
        className={`${className} bg-dark px-3 border border-bottom-1`}
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
                dataAuthUrl="https://opensplit.co/home"
                botName="opensplit_bot"
              />
            </div>
          )}
          {photoUrl && (
            <div className="p-0">
              <Image
                fluid
                src={photoUrl}
                className="rounded-circle"
                style={{ maxWidth: "65px" }}
              />
            </div>
          )}
        </Container>
      </Navbar>
    </>
  );
};
