import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import { Profile } from "./Profile";

import { useSearchParams } from "react-router-dom";

export const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState(searchParams.get("id"));
  const [firstName, setFirstName] = useState(searchParams.get("first_name"));
  const [lastName, setLastName] = useState(searchParams.get("last_name"));
  const [username, setUsername] = useState(searchParams.get("username"));
  const [photoUrl, setPhotoUrl] = useState(searchParams.get("photo_url"));
  const [authDate, setAuthDate] = useState(searchParams.get("auth_date"));
  const [hash, setHash] = useState(searchParams.get("hash"));

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        console.log(username);
        const response = await fetch(
          `https://opensplitbackend.onrender.com/users/@${username}/balance`
        );
        const jsonData = await response.json();
        console.log(jsonData);
        setLoading(false);
        setData(jsonData);
      } catch (error) {
        setError(error);
        console.error(error);
        setLoading(false);
      }
    };

    fetchGroups();
  }, [id, firstName, lastName, username, photoUrl, authDate, hash]);

  return (
    <>
      {loading && (
        <Container
          fluid
          className="vh-75 d-flex align-items-center justify-content-center"
        >
          <Spinner
            animation="border"
            role="status"
            style={{ width: "100px", height: "100px" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      )}
      {!loading && (
        <Container fluid className="p-0">
          <Row xs={1} lg={2} className="mx-0 p-0">
            <Col className="p-0">
              {Object.entries(data).map(([group_name, balance], index) => (
                <Row
                  key={index}
                  className="mx-0 py-4 px-3 bg-dark justify-content-between border border-bottom-1 text-white"
                >
                  <Col xs="auto">
                    <h3>{group_name}</h3>
                  </Col>
                  <Col
                    xs="auto"
                    className={balance < 0 ? "text-danger" : "text-success"}
                  >
                    <h5>{balance}</h5>
                  </Col>
                </Row>
              ))}
            </Col>
            <Col className="d-none d-lg-block">
              <Profile
                className="px-2"
                photo_url={photoUrl}
                username={username}
                first_name={firstName}
                last_name={lastName}
                data={data}
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
