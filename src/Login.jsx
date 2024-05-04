import React from "react";
import { Container, Carousel, Row, Col, Image } from "react-bootstrap";
import TelegramLoginButton from "react-telegram-login";

export const Login = () => {
  const images_src = ["/avion.svg", "/home.svg", "/friends.svg"];
  const texts = ["of your trips", "of your home", "with your friends"];
  const colors = ["primary", "secondary", "info"];
  return (
    <>
      <Container fluid className="px-0 pt-4">
        <Carousel
          controls={false}
          indicators={false}
          fade
          interval={4000}
          pause={false}
          variant="dark"
        >
          {images_src.map((src, index) => (
            <Carousel.Item key={index}>
              <CarouselImage
                src={src}
                text={texts[index]}
                color={colors[index]}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </>
  );
};

const CarouselImage = ({ src, text, color }) => {
  const images_src = ["/avion.svg", "/home.svg", "/friends.svg"];

  return (
    <Row lg={2} className="justify-content-center">
      <Col
        xl={5}
        className="bg-light d-flex flex-column justify-content-center px-md-4"
      >
        <h1>
          Organize your expenses{" "}
          <span className={`fw-bolder text-${color}`}>{text}</span> without
          stress
        </h1>
        <Row className="my-2">
          {images_src.map((src, index) => (
            <Col key={index} xs="auto">
              <Image fluid src={src} style={{ width: "50px" }} />
            </Col>
          ))}
        </Row>
        <h5 className="text-mutted">
          Log in with Telegram and use our telegram bot or our webapp to
          organize your expenses
        </h5>
        <TelegramLoginButton
          className="mt-3"
          dataAuthUrl="https://opensplit.netlify.app/home"
          botName="opensplit_bot"
        />
      </Col>
      <Col xl={5} className="bg-light">
        <Image fluid src={src} />
      </Col>
    </Row>
  );
};
