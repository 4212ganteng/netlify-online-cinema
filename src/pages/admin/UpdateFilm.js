import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import img from "../../assets/img.svg";
import { API } from "../../config/api";

const UpdateFilm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selected, setSelected] = useState(-1);
  const [categories, setCategories] = useState([]);

  // const params = useParams();
  const { id } = useParams();
  // console.log(params);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    filmUrl: "",
    category_id: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  //   let { data: updateFilm } = useQuery("updateFilmChache", async () => {
  //     const response = await API.get(`/film/${params}`);
  //     return response;
  //   });

  let { data: updateFilm, refetch } = useQuery("filmasde", async () => {
    const response = await API.get(`/film/${id}`);

    console.log("ini 51", response);

    return response.data.data;
  });
  let { data: categorie, refetch: refetchctg } = useQuery(
    "listCtg",
    async () => {
      const response = await API.get(`/categorys`);

      console.log("ini 62", response);

      return response.data.data;
    }
  );

  useEffect(() => {
    if (updateFilm) {
      setForm({
        ...form,
        title: updateFilm.title,
        description: updateFilm.description,
        price: updateFilm.price,
        image: updateFilm.image,
        filmUrl: updateFilm.filmUrl,
        category_id: updateFilm.category_id,
      });
    }
  }, [updateFilm]);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("category_id", selected);
      formData.set("description", form.description);
      formData.set("price", form.price);
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("filmUrl", form.filmUrl);

      const data = await API.patch(`/film/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      navigate("/film");
    } catch (error) {
      console.log(error);
    }
  });

  React.useEffect(() => {
    refetch();
    refetchctg();
  }, []);

  return (
    <Container>
      <h1 className="text-light my-3">Add Film</h1>
      <Form onSubmit={(e) => handleSubmit.mutate(e)}>
        <Row>
          <Col className="col-12 col-md-9">
            <input
              label="Title"
              type="text"
              name="title"
              value={form?.title}
              placeholder="Title"
              onChange={handleChange}
              className="p-2 w-100 rounded rounded-3 my-2 border-1 shadow-lg bg-dark text-light"
            />
          </Col>
          <Col className="col-12 col-md-3">
            {preview && (
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                  alt={preview}
                />
              </div>
            )}
            <Form.Group
              className="mb-3 p-1 mt-1 rounded border border-form border-dark border-grey3 bg-dark"
              controlId="formBasicEmail"
            >
              <Form.Control
                name="image"
                type="file"
                // value={form?.image}
                placeholder="Attach Image"
                hidden
                onChange={handleChange}
              />
              <Form.Label className="d-flex justify-content-between btn-full align-items-center bg-dark mt-1">
                <div className="text-grey3 text-light bg-dark">
                  Attach Image
                </div>
                <div className="">
                  <img src={img} alt="" className="bg-dark" />
                </div>
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Form.Select
          className="text-light bg-dark border border-none"
          onChange={(e) => setSelected(e.target.value)}
        >
          {categorie?.map((item) => (
            <option value={item.name} className="border border-none">
              {item.name}
            </option>
          ))}
        </Form.Select>
        <input
          label="Price"
          type="text"
          name="price"
          value={form?.price}
          placeholder="Price"
          onChange={handleChange}
          className="p-2 w-100 rounded rounded-3 my-2 border-1 shadow-lg bg-dark text-light"
        />
        <input
          label="filmUrl"
          type="text"
          name="filmUrl"
          placeholder="link film"
          value={form?.filmUrl}
          onChange={handleChange}
          className="p-2 w-100 rounded rounded-3 my-2 border-1 shadow-lg bg-dark text-light"
        />
        <textarea
          label="description"
          name="description"
          value={form?.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 w-100 rounded rounded-3 my-2 border-1 shadow-lg bg-dark text-light"
        ></textarea>
        <div className="d-flex justify-content-end">
          <Button className="btn-color w-25 mt-5 " type="submit">
            Update Film
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UpdateFilm;
