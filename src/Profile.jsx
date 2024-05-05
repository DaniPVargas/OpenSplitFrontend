import React, { useEffect, useState } from "react";

import { Container, Row, Col, Image } from "react-bootstrap";

function getBalance(data) {
  let positive_balance = 0;
  let negative_balance = 0;
  data.forEach((element) => {
    if (element.amount > 0) {
      positive_balance += element.amount;
    } else {
      negative_balance -= element.amount;
    }
  });
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
    <Container fluid className={`${className} py-5`}>
      <Row className="mx-0">
        <Col className="d-flex flex-column align-items-center justify-content-center">
          <Image fluid src={photo_url} className="rounded-circle mw-50" />
          <h2 className="mt-3">
            {first_name} {last_name}
          </h2>
          <h6 className="text-muted">@{username}</h6>
        </Col>
      </Row>
      <h2 className="text-center mt-4">My total balance</h2>
      <p className="text-center">
        How much I debt and I receive for my groups?
      </p>
      <Row xs={2} className="py-0">
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
