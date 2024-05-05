import React, { useEffect, useState } from "react";

import { Tabs, Tab, Row, Col, Container } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";

export const loaderGroup = async ({ params }) => {
  const [group_name, group_id] = params.group.split("_");
  const auth = localStorage.getItem("auth");

  return { group_id, group_name, auth };
};

export const Group = () => {
  const { group_id, group_name, auth } = useLoaderData();
  const [id, setId] = useState(group_id);
  const [name, setName] = useState(group_name);
  const [authInfo, setAuthInfo] = useState(JSON.parse(auth));
  const [expenses, setExpenses] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [balances, setBalances] = useState([]);

  function calculate_balances(exchanges) {
    const balance = {};

    exchanges.forEach((exchange) => {
      const { payer, receiver, amount } = exchange;

      if (!(payer in balance)) {
        balance[payer] = -amount;
      } else {
        balance[payer] -= amount;
      }

      // Registrar la cantidad recibida (positiva) por el receptor
      if (!(receiver in balance)) {
        balance[receiver] = amount;
      } else {
        balance[receiver] += amount;
      }
    });

    return balance;
  }

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.stringify(authInfo),
          },
        };

        const response = await fetch(
          `https://opensplitbackend.onrender.com/groups/${id}/expenses`,
          requestOptions
        );
        const jsonData = await response.json();
        setExpenses(jsonData);
      } catch (error) {
        console.error(error);
      }
    };
    if (id && authInfo) fetchExpenses();
  }, [id, authInfo]);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.stringify(authInfo),
          },
        };

        const response = await fetch(
          `https://opensplitbackend.onrender.com/groups/${id}/exchanges`,
          requestOptions
        );
        const jsonData = await response.json();
        setExchanges(jsonData);
        setBalances(calculate_balances(jsonData));
      } catch (error) {
        console.error(error);
      }
    };
    if (id && authInfo) fetchExchanges();
  }, [id, authInfo]);

  return (
    <>
      <Tabs
        defaultActiveKey="expenses"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="expenses" title="Expenses">
          <Expenses expenses={expenses} />
        </Tab>
        <Tab eventKey="exchanges" title="Exchanges">
          <Exchanges exchanges={exchanges} balance={balances} />
        </Tab>
        <Tab eventKey="graphics" title="Graphics">
          <Graphics />
        </Tab>
      </Tabs>
    </>
  );
};

const Expenses = ({ expenses }) => {
  return (
    <Container fluid className="p-0 border-bottom">
      {expenses.map((expense, index) => (
        <Row
          key={index}
          className="bg-body-tertiary justify-content-between border border-bottom-0 px-5 py-3"
        >
          <Col className="d-flex flex-column align-items-start justify-content-center">
            <h3>{expense.name}</h3>
            <h6 className="text-muted">
              Pay by <span className="fw-bolder">{expense.payer}</span> for{" "}
              {expense.receivers.length} people
            </h6>
          </Col>
          <Col className="d-flex flex-column align-items-end justify-content-center">
            <h5 className="fw-bolder">{expense.amount} €</h5>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

const Exchanges = ({ exchanges, balance }) => {
  return (
    <>
      <Container fluid className="p-0 border-bottom">
        {exchanges.map((exchange, index) => (
          <Row
            key={index}
            className="bg-body-tertiary justify-content-between border border-bottom-0 px-5 py-3"
          >
            <Col className="d-flex flex-column align-items-start justify-content-center">
              <h3>{exchange.payer}</h3>
              <h6 className="text-muted">owes</h6>
              <h3>{exchange.receiver}</h3>
            </Col>
            <Col className="d-flex flex-column align-items-end justify-content-center">
              <h5 className="fw-bolder">{exchange.amount.toFixed(2)} €</h5>
            </Col>
          </Row>
        ))}
      </Container>
      {/* <Container fluid className="p-0">
        {console.log(balance)}
        {Object.entries(balance).map(([name, value], index) => (
          <Row
            key={index}
            className="bg-body-tertiary border-top border-bottom-1 px-5 py-3"
          >
            <Col className="d-flex flex-column align-items-start justify-content-center">
              
            </Col>
            <Col className="d-flex flex-column align-items-end justify-content-center"></Col>
          </Row>
        ))}
      </Container> */}
    </>
  );
};

const Graphics = () => {
  return <div>Graphics</div>;
};
