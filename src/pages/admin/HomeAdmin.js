import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../../config/api";

const HomeAdmin = () => {
  let {data: incom, refetch} = useQuery("incomCache", async () => {
    const response = await API.get("/transactions")
    return response.data.data
  })

  useEffect(() => {
    refetch()
  },[])
  
  return (
    <Container>
        <h1 className="text-light mb-5">Incoming Transaction</h1>
        <Table striped bordered hover variant="dark" className="text-center">
      <thead>
        <tr className="text-color">
          <th>No</th>
          <th>User</th>
          <th>Bukti Transfer</th>
          <th>Film</th>
          <th>Number Account</th>
          <th>Status Payment</th>
        </tr>
      </thead>
      <tbody>
      {incom?.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item?.user?.fullName}</td>
          <td>bca.jpg</td>
          <td>{item?.film?.title}</td>
          <td>4811 1111 1111 1114</td>
          <td className="text-success fs-5 fw-bold">{item?.status}</td>
        </tr>
      ))}
      </tbody>
    </Table>
    </Container>
  );
};

export default HomeAdmin;
