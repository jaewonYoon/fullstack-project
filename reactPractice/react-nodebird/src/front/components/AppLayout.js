import React from "react";
import Link from "next/link";
import { Menu, Input, Button } from "antd";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
const dummy = {
  nickname: "제로초",
  Post: [],
  Followings: [],
  Followers: [],
  isLoggedIn: true
};
const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
      </Menu>
      <Link href="/signup">
        <a>
          <Button>회원가입</Button>
        </a>
      </Link>
      <Row>
        <Col xs={12} md={8}>
          {dummy.isLoggedIn ? (
            <Card
              actions={[
                <div key="twit">
                  쨱쨱
                  <br />
                  {dummy.Post.length}
                </div>,
                <div key="following">
                  팔로잉
                  <br />
                  {dummy.Followings.length}
                </div>,
                <div key="follower">
                  팔로워
                  <br />
                  {dummy.Followers.length}
                </div>
              ]}
            >
              <Card.Meta
                avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
                title={dummy.nickname}
              />
            </Card>
          ) : (
            <LoginForm />
          )}
        </Col>
        <Col xs={12} md={8}>
          <Card />
        </Col>
        <Col xs={12} md={8}>
          <Card />
        </Col>
      </Row>
      {children}
    </div>
  );
};
AppLayout.propTypes = {
  childeren: PropTypes.node
};
export default AppLayout;
