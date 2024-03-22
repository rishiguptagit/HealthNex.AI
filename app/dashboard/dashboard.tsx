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

export default function PatientDashboard() {
  const [patient, setPatient] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Add this line
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasInsurance, setHasInsurance] = useState(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [totalBill, setTotalBill] = useState<any[]>([]);
  const [doctors, setDoctors] = useState([]);
  const [insurance, setInsurance] = useState<{
    provider: string | null;
    id: string | null;
  } | null>(null);

  let email: string | null = null;

  if (typeof window !== "undefined") {
    email = localStorage.getItem("primaryKey");
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAppointmentSubmit = async () => {
    const values = form.getFieldsValue();
    if (values.symptoms) {
      values.symptoms = values.symptoms.split(/[\s,]+/).filter(Boolean);
    }

    const { provider, id, ...appointmentDetails } = values;

    try {
      const response = await fetch("/api/dashboard-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientEmail: email,
          appointmentDetails: appointmentDetails,
        }),
      });

      if (response.ok) {
        toast.success("Appointment created successfully!", {
          position: "top-center",
          autoClose: 5000,
        });
      } else {
        const errorData = await response.json();
        toast.error(
          `Failed to create appointment! ${errorData.message || ""}`,
          {
            position: "top-center",
            autoClose: 5000,
          }
        );
      }
    } catch (error) {
      toast.error("An error occurred while creating the appointment.", {
        position: "top-center",
        autoClose: 5000,
      });
    }

    try {
      let bill: number;
      if (appointmentDetails && appointmentDetails.doctor) {
        const doctor = JSON.parse(appointmentDetails.doctor);
        if (doctor.specialty === "OB/GYN") {
          bill = 200;
        } else {
          bill = 500;
        }
        const response = await fetch("api/dashboard-bill", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            patientEmail: email,
            bill: bill,
          }),
        });
        if (response.ok) {
          toast.success("Bill created successfully!", {
            position: "top-center",
            autoClose: 5000,
          });
        } else {
          const errorData = await response.json();
          toast.error(`Failed to create bill! ${errorData.message || ""}`, {
            position: "top-center",
            autoClose: 5000,
          });
        }
      } else {
        toast.error("Appointment details or doctor information is missing.", {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error("An error occurred while creating the bill.", {
        position: "top-center",
        autoClose: 5000,
      });
    }

    if (provider && id) {
      try {
        // Make a POST request to the insurance API endpoint
        const insuranceResponse = await fetch("/api/dashboard-insurance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: provider,
            id: id,
            patientEmail: email,
          }),
        });

        if (!insuranceResponse.ok) {
          const errorData = await insuranceResponse.json();
          toast.error(`Failed to add insurance! ${errorData.message || ""}`, {
            position: "top-center",
            autoClose: 5000,
          });
          fetchInsurance();
        } else {
          toast.success("Insurance added successfully!", {
            position: "top-center",
            autoClose: 5000,
          });
        }
      } catch (error) {
        toast.error(`An error occurred`, {
          position: "top-center",
          autoClose: 5000,
        });
      }
    }
    fetchAppointments();
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
      toast.success("Save successful!", {
        position: "top-center",
        autoClose: 1000,
      });
    } else {
      const errorData = await response.json();
      toast.error(`Save failed! ${errorData.message || ""}`, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const fetchPatientData = useCallback(async () => {
    if (email) {
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
    }
  }, [email]);

  const fetchAppointments = useCallback(async () => {
    if (email) {
      const responseAppointments = await fetch(
        `/api/dashboard-appointment?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!responseAppointments.ok) {
        throw new Error(`HTTP error! status: ${responseAppointments.status}`);
      }

      const appointments = await responseAppointments.json();
      setAppointments(appointments);
    }
  }, [email]);

  const fetchBills = useCallback(async () => {
    if (email) {
      const responseBills = await fetch(
        `/api/dashboard-bill?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!responseBills.ok) {
        throw new Error(`HTTP error! status: ${responseBills.status}`);
      }

      const bills = await responseBills.json();

      const totalBill = bills.reduce(
        (total: number, bill: { amount: number }) => total + bill.amount,
        0
      );
      setTotalBill(totalBill);
    }
  }, [email]);

  const fetchDoctors = useCallback(async () => {
    const responseDoctors = await fetch(`/api/dashboard-doctor`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!responseDoctors.ok) {
      throw new Error(`HTTP error! status: ${responseDoctors.status}`);
    }

    const doctors = await responseDoctors.json();
    setDoctors(doctors);
  }, []);

  const fetchInsurance = useCallback(async () => {
    if (email) {
      const responseInsurance = await fetch(
        `/api/dashboard-insurance?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!responseInsurance.ok) {
        throw new Error(`HTTP error! status: ${responseInsurance.status}`);
      }

      const insurance = await responseInsurance.json();
      setInsurance(insurance);
    }
  }, [email]);

  useEffect(() => {
    if (email) {
      try {
        fetchPatientData();
        fetchAppointments();
        fetchInsurance();
        fetchDoctors();
        fetchBills();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("No email found in local storage");
    }
  }, [
    email,
    fetchPatientData,
    fetchAppointments,
    fetchInsurance,
    fetchDoctors,
    fetchBills,
  ]);

  if (!patient) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "2em",
          color: "#888",
          backgroundColor: "white",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Image
            src="/healthnex.jpg"
            alt="Wellnex logo"
            width={50}
            height={30}
          />
        </div>
        <PulseLoader color="#888" />
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
                style={{
                  position: "absolute",
                  top: 0,
                  right: "10px",
                  width: "100%",
                }}
              >
                {Array.isArray(appointments) ? (
                  appointments.map((appointment: any, index: number) => (
                    <p key={index}>
                      {moment(appointment.time).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}{" "}
                      - {appointment.description}
                    </p>
                  ))
                ) : (
                  <p>No appointments found</p>
                )}
              </Card>

              <Modal
                title="Make an appointment"
                visible={isModalVisible}
                onOk={handleAppointmentSubmit}
                onCancel={handleCancel}
                okButtonProps={{
                  style: {
                    backgroundColor: "navy",
                    borderColor: "navy",
                    color: "white",
                  },
                }}
              >
                <Form form={form}>
                  <Form.Item label="Appointment Description" name="description">
                    <Input placeholder="Enter appointment description" />
                  </Form.Item>
                  <Form.Item label="Time" name="time">
                    <DatePicker
                      className="custom-datepicker"
                      showTime={{ format: "HH:mm", use12Hours: true }}
                      format="YYYY-MM-DD h:mm a"
                      placeholder="Enter the date and time of the appointment"
                    />
                  </Form.Item>
                  <Form.Item label="Do you have insurance">
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
                      <Form.Item label="Insurance Provider" name="provider">
                        <Input
                          placeholder="Enter Insurance Provider Name"
                          defaultValue={insurance?.provider || ""}
                        />
                      </Form.Item>
                      <Form.Item label="Insurance ID" name="id">
                        <Input
                          placeholder="Enter Insurance ID"
                          defaultValue={insurance?.id || ""}
                        />
                      </Form.Item>
                    </>
                  )}
                  <Form.Item label="Symptoms" name="symptoms">
                    <Input.TextArea placeholder="Enter your symptoms" />
                  </Form.Item>
                  <Form.Item label="Choose Doctor" name="doctor">
                    <Select placeholder="Select">
                      {doctors.map((doctor: any, index: number) => (
                        <Option
                          key={index}
                          value={JSON.stringify({
                            email: doctor.email,
                            specialty: doctor.specialty,
                          })}
                        >
                          {doctor.name} - {doctor.specialty}
                        </Option>
                      ))}
                    </Select>
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
                style={{ position: "absolute", right: 0 }}
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
                        <Select.Option value="Male">Male</Select.Option>
                        <Select.Option value="Female">Female</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Gender Identity" name="gender">
                      <Select defaultValue={patient?.gender}>
                        <Select.Option value="Man">Man</Select.Option>
                        <Select.Option value="Woman">Woman</Select.Option>
                        <Select.Option value="Agender">Agender</Select.Option>
                        <Select.Option value="Transgender">
                          Transgender
                        </Select.Option>
                        <Select.Option value="Genderqueer">
                          Genderqueer
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Sexual Orientation" name="sexual">
                      <Select defaultValue={patient?.status}>
                        <Select.Option value="heterosexual">
                          Heterosexual
                        </Select.Option>
                        <Select.Option value="Bisexual">Bisexual</Select.Option>
                        <Select.Option value="Homosexual">
                          Homosexual
                        </Select.Option>
                        <Select.Option value="Pansexual">
                          Pansexual
                        </Select.Option>
                        <Select.Option value="Asexual">Asexual</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Race Identity" name="race">
                      <Select defaultValue={patient?.raceIdentity}>
                        <Select.Option value="americanindian">
                          American Indian
                        </Select.Option>
                        <Select.Option value="Asian">Asian</Select.Option>
                        <Select.Option value="African">
                          Black or African American
                        </Select.Option>
                        <Select.Option value="White">White</Select.Option>
                        <Select.Option value="Hawaiian">
                          Native Hawaiian
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Marital Status" name="marital">
                      <Select defaultValue={patient?.marital}>
                        <Select.Option value="Married">Married</Select.Option>
                        <Select.Option value="Unmarried">
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
                    <Descriptions.Item label="Total Bill">
                      {totalBill}
                    </Descriptions.Item>
                    <Descriptions.Item label="Insurance ID">
                      {insurance
                        ? insurance.id
                        : "No insurance information on file"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Insurance Provider">
                      {insurance
                        ? insurance.provider
                        : "No insurance information on file"}
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
        {new Date().getFullYear()} HealthNex.AI. All rights reserved.
      </Footer>
    </Layout>
  );
}
