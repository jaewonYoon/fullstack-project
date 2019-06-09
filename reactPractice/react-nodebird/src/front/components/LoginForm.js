import React,{ useCallback, useState } from "react";
import { Form, Input, Button } from "antd";
const userInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback(e => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const LoginForm = () => {
  const [id, onChangeId] = userInput("");
  const [password, onChangePassword] = userInput("");

  const onSubmitForm = e => {
    e.preventDefault();
    console.log({ id, password });
  },[id, password];

  return (
    <Form onSubmit={onSubmitForm} style={{ padding: 10 }}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} required onChange={onChangeId} />
      </div>
      <div>
        <label htmlFor="user-pass">비밀번호</label>
        <br />
        <Input
          name="user-pass"
          value={password}
          required
          onChange={onChangePassword}
        />
      </div>
      <div>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginTop: 10 }}
          loading={false}
        >
          로그인
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;