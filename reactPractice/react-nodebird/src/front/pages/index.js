import React from "react";
import Link from "next/link";
import Component from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Input, Card, Button, Avatar, Icon, Form } from "antd";
const dummy = {
  isLoggedIn: true,
  isImagePaths: [],
  mainPosts: [
    {
      User: {
        id: 1,
        nickname: "bunggl",
        content: "첫번째 게시글",
        img:
          "https://images.unsplash.com/photo-1558681110-a892c756417e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
      }
    }
  ]
};
const Home = () => {
  return;
  <div>
    {dummy.isLoggedIn && (
      <Form encType="multipart/form-data" style={{ marginBottom: 20 }}>
        <Input.TextArea
          maxLength={140}
          placeholder="어떤 신기한 일이 있었나요? "
        />
        <div>
          <input type="file" multiple hidden />
          <Button>이미지 업로드 </Button>
          <Button type="primary" style={{ float: right }} htmlType="submit">
            짹쨱
          </Button>
        </div>
        <div>
          {dummy.isImagePaths.map((v, i) => {
            return (
              <div key={v} style={{ display: "inline-block" }}>
                <img
                  src={"http:localhost:3065/" + v}
                  style={{ width: "200px" }}
                  alt={v}
                />
                <div>
                  <Button>제거</Button>
                </div>
              </div>
            );
          })}
        </div>
      </Form>
    )}
    {dummy.mainPosts.map(c => {
      return (
        <Card
          key={+c.createdAt}
          cover={c.img && <img alt="example" src={c.img} />}
          actions={[
            <Icon type="retweet" key="retweet" />,
            <Icon type="heart" key="heary" />,
            <Icon type="message" key="message" />,
            <Icon type="ellipsis" key="ellipsis" />
          ]}
          extra={<Button>팔로우</Button>}
        >
          <Card.Meta
            avatar={<Avatar>{c.User.nickName[0]}</Avatar>}
            title={c.User.nickName[0]}
            description={c.User.content}
          />
        </Card>
      );
    })}
    }
  </div>;
};

export default Home;
