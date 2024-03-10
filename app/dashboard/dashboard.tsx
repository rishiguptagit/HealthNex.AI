"use client";

import React, { useEffect, useState } from "react";
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

const { Header, Content, Footer } = Layout;
const { Option } = Select;

export default function PatientDashboard() {
  const [patient, setPatient] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Add this line
  const email = localStorage.getItem("primaryKey");
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasInsurance, setHasInsurance] = useState(null);
  const [appointments, setAppointments] = useState<any | null>(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInsuranceChange = (value: any) => {
    setHasInsurance(value);
  };

  const handleSave = async () => {
    const values = form.getFieldsValue();
    const response = await fetch(
      `/api/dashboard-patient?email=${encodeURIComponent(email ?? "")}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setPatient(data);
      setIsEditing(false);
    } else {
      // Handle error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (email) {
        try {
          // Fetch patient data
          const responsePatient = await fetch(
            `/api/dashboard-patient?email=${encodeURIComponent(email)}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!responsePatient.ok) {
            throw new Error(`HTTP error! status: ${responsePatient.status}`);
          }

          const dataPatient = await responsePatient.json();
          setPatient(dataPatient);

          // Fetch appointments
          const responseAppointments = await fetch(
            `/api/dashboard-appointment?email=${encodeURIComponent(email)}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!responseAppointments.ok) {
            throw new Error(
              `HTTP error! status: ${responseAppointments.status}`
            );
          }

          const dataAppointments = await responseAppointments.json();
          setAppointments(dataAppointments);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("No email found in local storage");
      }
    };
    fetchData();
  }, [email]);

  if (!patient) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "2em",
          color: "#888",
        }}
      >
        Loading...
      </div>
    );
  }
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
          <img
            src="/healthnex.jpg"
            alt="HealthNex.AI"
            style={{ width: "50px", marginRight: "10px" }}
          />
          HealthNex.AI
        </Typography.Title>
        <Button type="link" style={{ color: "white" }}>
          Logout
        </Button>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
          <Row gutter={12}>
            <Col span={12}>
              <Typography.Title level={3} style={{ marginBottom: 0 }}>
                {patient && `Welcome ${patient.firstName}!`}
              </Typography.Title>
            </Col>
            <Col span={12}>
              <Card
                title={
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Appointments and Visits
                    <Button
                      type="primary"
                      style={{ backgroundColor: "navy" }}
                      onClick={showModal}
                    >
                      Make an appointment
                    </Button>
                  </div>
                }
                style={{ marginTop: 0 }}
              >
                Some content
              </Card>

              <Modal
                title="Make an appointment"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Form form={form}>
                  <Form.Item label="Date and time">
                    <DatePicker
                      showTime={{ format: "HH:mm", use12Hours: true }}
                      format="YYYY-MM-DD h:mm a"
                      placeholder="Enter the date and time of the appointment"
                    />
                  </Form.Item>
                  <Form.Item label="Do you have insurance?">
                    <Select
                      placeholder="Select"
                      onChange={handleInsuranceChange}
                    >
                      <Option value="yes">Yes</Option>
                      <Option value="no">No</Option>
                    </Select>
                  </Form.Item>
                  {hasInsurance === "yes" && (
                    <>
                      <Form.Item label="Insurance Provider">
                        <Input placeholder="Enter Insurance Provider Name" />
                      </Form.Item>
                      <Form.Item label="Insurance ID">
                        <Input placeholder="Enter Insurance ID" />
                      </Form.Item>
                    </>
                  )}
                  <Form.Item label="Symptoms">
                    <Input.TextArea placeholder="Enter your symptoms" />
                  </Form.Item>
                </Form>
              </Modal>
            </Col>
            <Col span={12}>
              <Card
                title="Personal Information"
                extra={
                  <Button
                    type="primary"
                    style={{ backgroundColor: "navy", borderColor: "navy" }}
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                }
                style={{ marginTop: -80 }}
              >
                {isEditing ? (
                  <Form form={form} layout="vertical" initialValues={patient}>
                    <Form.Item label="First Name" name="firstName">
                      <Input defaultValue={patient?.firstName} />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName">
                      <Input defaultValue={patient?.lastName} />
                    </Form.Item>
                    <Form.Item label="Legal Sex" name="sex">
                      <Select defaultValue={patient?.sex}>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Gender Identity" name="gender">
                      <Select defaultValue={patient?.gender}>
                        <Select.Option value="man">Man</Select.Option>
                        <Select.Option value="woman">Woman</Select.Option>
                        <Select.Option value="agender">Agender</Select.Option>
                        <Select.Option value="transgender">
                          Transgender
                        </Select.Option>
                        <Select.Option value="genderqueer">
                          Genderqueer
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Sexual Orientation" name="sexual">
                      <Select defaultValue={patient?.status}>
                        <Select.Option value="heterosexual">
                          Heterosexual
                        </Select.Option>
                        <Select.Option value="bisexual">Bisexual</Select.Option>
                        <Select.Option value="homosexual">
                          Homosexual
                        </Select.Option>
                        <Select.Option value="pansexual">
                          Pansexual
                        </Select.Option>
                        <Select.Option value="asexual">Asexual</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Race Identity" name="race">
                      <Select defaultValue={patient?.raceIdentity}>
                        <Select.Option value="americanindian">
                          American Indian
                        </Select.Option>
                        <Select.Option value="asian">Asian</Select.Option>
                        <Select.Option value="african">
                          Black or African American
                        </Select.Option>
                        <Select.Option value="white">White</Select.Option>
                        <Select.Option value="hawaiian">
                          Native Hawaiian
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Marital Status" name="marital">
                      <Select defaultValue={patient?.marital}>
                        <Select.Option value="married">Married</Select.Option>
                        <Select.Option value="unmarried">
                          Unmarried
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Form>
                ) : (
                  <Descriptions column={1}>
                    <Descriptions.Item label="First Name">
                      {patient?.firstName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Name">
                      {patient?.lastName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Legal Sex">
                      {patient?.sex}
                    </Descriptions.Item>
                    <Descriptions.Item label="Gender Identity">
                      {patient?.gender}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sexual Orientation">
                      {patient?.sexual}
                    </Descriptions.Item>
                    <Descriptions.Item label="Race Identity">
                      {patient?.race}
                    </Descriptions.Item>
                    <Descriptions.Item label="Marital Status">
                      {patient?.marital}
                    </Descriptions.Item>
                  </Descriptions>
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        {"© "}
        {new Date().getFullYear()} HealthNex.AI. All rights reserved. |{" "}
        <a href="/privacypolicy">Privacy Policy</a> |{" "}
        <a href="/termsofuse">Terms of Use</a>
      </Footer>
    </Layout>
  );
}
