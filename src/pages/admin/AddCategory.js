import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";

const AddCategory = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/categorys/create", { name: category });

      const alert = <Alert variant="success">Success Add Category!</Alert>;
      setMessage(alert);

      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Container className="px-5">
      <h1 className="text-light my-3">Add Category</h1>
      {message && message}
      <Form onSubmit={(e) => handleSubmit.mutate(e)}>
        <Row>
          <Col className="col-8">
            <input
              onChange={handleChange}
              label="Title"
              type="text"
              name="title"
              placeholder="Title"
              className="p-2 w-100 rounded rounded-3 my-2 border-1 shadow-lg bg-dark text-light"
            />
          </Col>
          <Col className="col-4">
            <Button className="btn-color mt-2 w-50 fw-bold fs-5 " type="submit">
              Add Category
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddCategory;
