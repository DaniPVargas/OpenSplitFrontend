import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TelegramLoginButton from "react-telegram-login";

export const Login = () => {
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center p-5 bg-secondary"
      >
        <TelegramLoginButton
          dataAuthUrl="https://opensplit.netlify.app/home"
          botName="opensplit_bot"
        />
      </Container>
    </>
  );
};
