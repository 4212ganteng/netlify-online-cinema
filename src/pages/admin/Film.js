import React from "react";
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import convertRupiah from "rupiah-format";
import { API } from "../../config/api";

const Film = () => {
  const navigate = useNavigate();

  let { data: list, refetch } = useQuery("listCache", async () => {
    const response = await API.get("/films");
    return response.data.data;
  });

  React.useEffect(() => {
    refetch();
  }, []);

  return (
    <Container>
      <Row className="mt-5 px-3">
        <Col md={6}>
          <h1 className="text-light ">Film</h1>
        </Col>
        <Col md={6} className="text-end">
          <Button
            className="mb-5 btn-color fw-bold fs-5"
            onClick={() => navigate("/add-film")}
          >
            Add Film
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>NO</th>
            <th>ID</th>
            <th>Films</th>
            <th>Category</th>
            <th>Image</th>
            <th>Price</th>
            <th>Detail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item?.id}</td>
              <td>{item?.title}</td>
              <td>{item?.categorie?.name}</td>
              <td>
                <Image className="w-25" src={item?.image} />
              </td>
              <td>{convertRupiah.convert(item?.price)}</td>
              <td>
                <Button
                  onClick={() => navigate(`/detail/${item?.id}`)}
                  className="fw-bold"
                  variant="outline-info"
                >
                  Detail
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => navigate(`/update-film/${item.id}`)}
                  className="fw-bold me-3"
                  variant="outline-info"
                >
                  Update
                </Button>
                <Button
                  onClick={async () => {
                    const response = await API.delete(
                      `/film/delete/${item.id}`
                    );
                    refetch();
                  }}
                  variant="outline-danger"
                  className="fw-bold"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Film;
