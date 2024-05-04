import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export const Login = () => {
  const TelegramLoginButton = () => {
    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.async = true;
      script.setAttribute("data-telegram-login", "samplebot");
      script.setAttribute("data-size", "large");
      script.setAttribute("data-request-access", "write");
      document.body.appendChild(script);

      return () => {
        // Limpiar el script al desmontar el componente (opcional)
        document.body.removeChild(script);
      };
    }, []);

    return null; // No renderizar nada directamente desde este componente
  };

  return (
    <>
      <Container fluid className="d-flex justify-content-center">
        <TelegramLoginButton />
      </Container>
    </>
  );
};
