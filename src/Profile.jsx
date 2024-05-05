import React, { useEffect, useState } from "react";

import { Container, Row, Col, Image } from "react-bootstrap";

function getBalance(data) {
  let positive_balance = 0;
  let negative_balance = 0;
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] > 0) {
        positive_balance += data[key];
      } else {
        negative_balance -= data[key];
      }
    }
  }
  return [
    positive_balance,
    negative_balance,
    positive_balance + negative_balance,
  ];
}

export const Profile = ({
  className,
  username,
  first_name,
  last_name,
  photo_url,
  data,
}) => {
  const [positive_balance, negative_balance, total_balance] = getBalance(data);
  return (
    <Container fluid className={`${className} pt-5`}>
      <Row className="mx-0">
        <Col className="d-flex flex-column align-items-center justify-content-center">
          <Image fluid src={photo_url} className="rounded-circle mw-50" />
          <h2 className="mt-3">
            {first_name} {last_name}
          </h2>
          <h6 className="text-muted">@{username}</h6>
        </Col>
      </Row>
      <h2>Summary</h2>
      <Row xs={2}>
        <Col
          xs={6}
          className="px-0 py-2 d-flex flex-column justify-content-center align-items-end"
        >
          <div
            className="bg-danger py-4 rounded-start-4 text-end border border-1 border-top-0 border-bottom-0 border-start-0"
            style={{ minWidth: `${(negative_balance * 100) / total_balance}%` }}
          >
            <span className="me-2 text-nowrap fw-bolder">{`${negative_balance.toFixed(
              2
            )} € `}</span>
          </div>
        </Col>
        <Col
          xs={6}
          className="px-0 py-2 d-flex flex-column justify-content-center align-items-start"
        >
          <div
            className="bg-success py-4 rounded-end-4 text-start border border-1 border-top-0 border-bottom-0 border-end-0"
            style={{ width: `${(positive_balance * 100) / total_balance}%` }}
          >
            <span className="ms-2 text-nowrap fw-bolder">{`${positive_balance.toFixed(
              2
            )} € `}</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};