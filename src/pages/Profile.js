import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import convertRupiah from "rupiah-format";

import profile from "../assets/profile.svg";
import { API } from "../config/api";
import { UserContext } from "../Usercontext/Usercontex";

const Profile = () => {
  const [state] = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const response = await API.get(`/user/${state.user.id}`);
      // log dulu cuy cari isi data nya 🙄
      setUser(response.data.data);
    };
    getUserProfile();
  }, [state]);
  // cek status

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h2 className="mb-5 text-light">My Profile</h2>
          <Row>
            <Col className="col-5 col-lg-4">
              <img alt="user" src={profile} width="180px" />
            </Col>
            <Col>
              <div className="mb-3">
                <p className="text-color fw-bold">FullName</p>
                <p className="text-secondary">{user?.fullName}</p>
              </div>
              <div className="mb-3">
                <p className="text-color fw-bold">Email</p>
                <p className=" text-secondary"> {user?.email} </p>
              </div>
              <div>
                <p className="text-color fw-bold">Phone</p>
                <p className="text-secondary">{user?.phone}</p>
              </div>
            </Col>
          </Row>
        </Col>

        <Col className="col-12 col-md-6">
          <h2 className="mb-5 text-light">History Transaction</h2>
          <div style={{ maxHeight: "250px", overflow: "scroll" }}>
            {user?.transaction?.map((item) => (
              <Card className="shadow d-flex mb-3 btn-color border border-md card-light">
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title className="text-light fw-bold"></Card.Title>
                      <Card.Text className="mb-2 text-light">
                        {new Date(item?.tanggal_order).toLocaleDateString(
                          "id-ID",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}
                      </Card.Text>
                      <Card.Text className="text-color fw-bold">
                        Total: {convertRupiah.convert(item?.film?.price)}
                      </Card.Text>
                      <Col className="ms-5" style={{ textAlign: "end" }}>
                        <Button className="btn-finish fw-bold fs-5 w-50">
                          {item?.status}
                        </Button>
                      </Col>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
