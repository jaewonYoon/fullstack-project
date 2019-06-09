import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Form, Input, List, Button, Card, Icon } from "antd";
const Profile = () => {
  return (
    <div>
      <Form
        style={{
          marginBottom: "20px",
          border: "1px solid #d9d9d9",
          padding: "20px"
        }}
      >
        <Input addonButton="닉네임" />
        <Button type="primary">수정</Button>
      </Form>
      <List />
    </div>
  );
};

export default Profile;
