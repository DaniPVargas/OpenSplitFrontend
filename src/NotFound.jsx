import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container fluid className="p-5 text-center">
      <h1 className="fw-bold text-center mb-4">¡Lo sentimos!</h1>
      <p>¡Lo sentimos!, no pudimos encontrar la página que busca</p>
      <Button variant="primary" className="mt-4" onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </Container>
  );
};
