import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Login } from "./Login";

function VerticalBar({ value, user }) {
  const isPositive = value >= 0;
  const barHeight = `${Math.abs(value)}%`; // calculate height based on value
  const barColor = isPositive ? "bg-success" : "bg-danger"; // green for positive, red for negative

  const containerStyle = {
    height: "300px", // fixed height for the container
    width: "50px", // fixed width to keep things uniform
    marginRight: "40px", // space between bars
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // this centers the baseline
    alignItems: "center",
  };

  const barStyle = {
    height: barHeight,
    width: "100%",
    position: "absolute",
    bottom: isPositive ? "60%" : "auto", // start from middle and extend upwards if positive
    top: isPositive ? "auto" : "55%", // start from middle and extend downwards if negative
    transition: "height 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <div style={barStyle} className={barColor}></div>
      <p className="text-center mt-1">{user}</p>
    </div>
  );
}

export const Home = () => {
  const values = [20, 50, -30, 80, -10];
  const users = ["Jorge", "Dani", "Sergio", "Antón", "CastilloDel"];
  const [nick, setNick] = useState("antongomez_10");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // const response = await fetch(
        //   `https://opensplitbackend.onrender.com/users/${nick}/balance`,
        //   { mode: "no-cors" }
        // );
        // const jsonData = await response.json();
        const mockData = {
          grupo1: -1.5,
          grupo2: 0.5,
          grupo3: 1.0,
          grupo4: -1.0,
          grupo5: 1.0,
          grupo6: -0.5,
          grupo7: 0.8,
          grupo8: -0.2,
          grupo9: 0.3,
          grupo10: -0.7,
          grupo11: 0.9,
          grupo12: -0.4,
          grupo13: 0.6,
          grupo14: -0.1,
          grupo15: 0.2,
          grupo16: -0.3,
          grupo17: 0.4,
          grupo18: -0.6,
          grupo19: 0.7,
          grupo20: -0.8,
        };
        console.log(mockData);
        setData(mockData);
      } catch (error) {
        console.error(`Error fetching groups data of user: ${nick}. `, error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <Container fluid className="p-0">
      {/* <div className="d-flex justify-content-center">
        {values.map((value, index) => (
          <VerticalBar key={index} value={value} user={users[index]} />
        ))}
      </div> */}
      <Login />

      {Object.entries(data).map(([group_name, balance], index) => (
        <Row
          key={index}
          className="mx-0 py-4 px-3 bg-dark justify-content-between border border-bottom-1"
        >
          <Col xs="auto">
            <h1>{group_name}</h1>
          </Col>
          <Col
            xs="auto"
            className={balance < 0 ? "text-danger" : "text-success"}
          >
            <h3>{balance}</h3>
          </Col>
        </Row>
      ))}
    </Container>
  );
};
