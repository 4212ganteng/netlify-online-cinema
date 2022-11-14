import React, { useEffect } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import convertRupiah from "rupiah-format";

import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

const DetailList = () => {
  const { id } = useParams();

  let { data: myList } = useQuery("myListCache", async () => {
    const response = await API.get(`/transaction/${id}`);
    return response.data.data;
  });

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Image src={myList?.film?.image} className="w-50" />
        </Col>
        <Col>
          <h1 className="text-light">{myList?.film?.title}</h1>

          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              width="600"
              height="315"
              src={myList?.film?.filmUrl}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h5 className="text-light">{myList?.film?.category?.name}</h5>
          <p className="text-light">{myList?.film?.description}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailList;
