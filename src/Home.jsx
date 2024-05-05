import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import { Profile } from "./Profile";

import { useSearchParams, Link } from "react-router-dom";

import "./scss/home.scss";

export const Home = () => {
  const [data, setData] = useState([]);
  const [authInfo, setAuthInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [firstName, setFirstName] = useState(searchParams.get("first_name"));
  const [lastName, setLastName] = useState(searchParams.get("last_name"));
  const [username, setUsername] = useState(searchParams.get("username"));
  const [photoUrl, setPhotoUrl] = useState(searchParams.get("photo_url"));
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let auth = {};

    for (let [key, value] of searchParams) {
      auth[key] = value;
    }

    setAuthInfo(auth);
    localStorage.setItem("auth", auth);
  }, [searchParams]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);

        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.stringify(authInfo),
          },
        };

        // Almacenamos en localstorage o authInfo
        localStorage.setItem("auth", JSON.stringify(authInfo));

        const response = await fetch(
          `https://opensplitbackend.onrender.com/users/${username}/balance`,
          requestOptions
        );
        const jsonData = await response.json();
        setData(jsonData);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);

        console.error(error);
      }
    };

    if (Object.keys(authInfo).length !== 0) {
      fetchGroups();
    }
  }, [username, authInfo]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      {loading && (
        <Container
          fluid
          className="vh-75 d-flex align-items-center justify-content-center bg-light"
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
        <Container fluid className="px-3 py-5 bg-light min-hv-100">
          <Row xs={1} lg={2} className="mx-0 p-0">
            <Col className="p-0">
              <Row className="m-3 rounded-3 border border-bottom-1 ">
                <input
                  type="text"
                  value={filter}
                  onChange={handleFilterChange}
                  className="h-100 py-3 fs-4 rounded-2"
                  placeholder="Filter groups..."
                />
              </Row>
              {data.map((group, index) =>
                filter == "" || group.group_name.startsWith(filter) ? (
                  <GroupButton
                    group_name={group.group_name}
                    group_id={group.group_id}
                    balance={group.amount}
                    key={index}
                  />
                ) : null
              )}
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

function GroupButton({ group_name, group_id, balance }) {
  return (
    <Link to={`/home/${group_name}_${group_id}`} className="link">
      <Row className="m-3 py-4 px-3 bg-dark justify-content-between rounded-4 border border-bottom-1 text-white">
        <Col xs="auto">
          <h3>{group_name}</h3>
        </Col>
        <Col xs="auto" className={balance < 0 ? "text-danger" : "text-success"}>
          <h3 className="mb-0">{Math.round(balance * 100) / 100} €</h3>
        </Col>
      </Row>
    </Link>
  );
}
