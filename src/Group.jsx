import React, { useEffect, useState } from "react";

import { Tabs, Tab, ListGroup, Badge } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";

export const loaderGroup = async ({ params }) => {
  const [name, id] = params.group.split("-");
  const auth = localStorage.getItem("auth");
  return { id, name, auth };
};

export const Group = () => {
  const { group_id, group_name, auth } = useLoaderData();
  const [id, setId] = useState(group_id);
  const [name, setName] = useState(group_name);
  const [authInfo, setAuthInfo] = useState(JSON.parse(auth));
  const [expenses, setExpenses] = useState([]);

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

    fetchExpenses();
  }, [id, authInfo]);

  return (
    <>
      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="expenses" title="Expenses">
          <Expenses expenses={expenses} />
        </Tab>
        <Tab eventKey="exchanges" title="Exchanges">
          <Exchanges />
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
    <ListGroup as="ol" numbered>
      {expenses.map((expense, index) => (
        <ListGroup.Item
          as="li"
          key={index}
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{expense.description}</div>
            {expense.amount} €
          </div>
          <Badge bg="primary" pill>
            {expense.amount}
          </Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

const Exchanges = () => {
  return <div>Exchanges</div>;
};

const Graphics = () => {
  return <div>Graphics</div>;
};
