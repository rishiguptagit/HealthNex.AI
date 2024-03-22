"use client";

import Image from "next/image";
import { PulseLoader } from "react-spinners";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import {
  Layout,
  Button,
  Typography,
  Row,
  Col,
  Card,
  Input,
  DatePicker,
  Select,
  Form,
  Descriptions,
  Modal,
} from "antd";
import moment from "moment";
import Link from "next/link";

const { Header, Content, Footer } = Layout;
const { Option } = Select;

export default function InterestingQueries() {
  const [query1Results, setQuery1Results] = useState([]);
  const [query2Results, setQuery2Results] = useState([]);
  const [query3Results, setQuery3Results] = useState([]);

  useEffect(() => {
    fetch("/api/interesting-query1")
      .then((response) => response.json())
      .then((data) => setQuery1Results(data))
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error fetching Query 1 results", {
          position: "top-center",
          autoClose: 3000,
        });
      });

    const email = "harvey.van den berg@hospital.com";
    const params = new URLSearchParams({ email: email });

    fetch(`/api/interesting-query2?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => setQuery2Results(data))
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error fetching Query 2 results", {
          position: "top-center",
          autoClose: 3000,
        });
      });

    const minTimeDate = new Date("2024-01-01");
    const maxTimeDate = new Date("2024-02-29");

    const minTime = minTimeDate.toISOString();
    const maxTime = maxTimeDate.toISOString();

    const params2 = new URLSearchParams({
      email: "harvey.van den berg@hospital.com",
      minTime: minTime,
      maxTime: maxTime,
    });

    fetch(`/api/interesting-query3?${params2.toString()}`)
      .then((response) => response.json())
      .then((data) => setQuery3Results(data))
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error fetching Query 3 results", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", background: "white" }}>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Title
          level={2}
          style={{
            color: "white",
            marginTop: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            src="/healthnex.jpg"
            alt="HealthNex.AI"
            width={50}
            height={50}
          />
          HealthNex.AI
        </Typography.Title>
        <Link href="/">
          <Button type="link" style={{ color: "white" }}>
            Logout
          </Button>
        </Link>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
          <Row gutter={12}>
            <Col span={8}>
              <Card title="Query 1" style={{ width: "100%" }}>
                <p style={{ textAlign: "center", fontSize: "1.5em" }}>
                  Number patients per insurance provider
                </p>
                {Array.isArray(query1Results) ? (
                  query1Results.map(
                    (
                      result: { provider: string; count: number },
                      index: number
                    ) => (
                      <p key={index}>
                        Provider: {result.provider} Count: {result.count}
                      </p>
                    )
                  )
                ) : (
                  <p>No results found for Query 1</p>
                )}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Query 2" style={{ width: "100%" }}>
                <p style={{ textAlign: "center", fontSize: "1.5em" }}>
                  All appointments for a Doctor
                </p>
                {Array.isArray(query2Results) ? (
                  query2Results.map(
                    (
                      result: { time: Date; patientName: string },
                      index: number
                    ) => (
                      <p key={index}>
                        Time: {new Date(result.time).toLocaleString()}, Patient
                        Name: {result.patientName}
                      </p>
                    )
                  )
                ) : (
                  <p>No results found for Query 2</p>
                )}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Query 3" style={{ width: "100%" }}>
                <p style={{ textAlign: "center", fontSize: "1.5em" }}>
                  All appointments for a Doctor within a specified time
                </p>
                {Array.isArray(query3Results) ? (
                  query3Results.map((result: any, index: number) => (
                    <div key={index}>
                      <p>Time: {new Date(result.time).toLocaleString()}</p>
                      <p>Patient Name: {result.patientName}</p>
                    </div>
                  ))
                ) : (
                  <p>No results found for Query 3</p>
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
