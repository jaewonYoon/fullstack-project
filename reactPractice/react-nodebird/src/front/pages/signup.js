import React, { useState, useCallback } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import PropTypes from "prop-types";
const TextInput = ({ value }) => {
  return <div>{value}</div>;
};
TextInput.propTypes = {
  value: PropTypes.string
};
const Signup = () => {
  const [id, setId] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (password !== passwordCheck) {
        setPasswordError(true);
      }
      if (!term) {
        setTermError(true);
      }
    },
    [password, passwordCheck, term]
  );

  const onChangeId = useCallback(e => {
    setId(e.target.value);
  }, []);

  const onChangeNick = useCallback(e => {
    setNick(e.target.value);
  }, []);

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const onChangeTerm = useCallback(e => {
    setTerm(e.target.checked);
  }, []);

  return (
    <Form onSubmit={onSubmit} style={{ padding: 10 }}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} required onChange={onChangeId} />
      </div>
      <div>
        <label htmlFor="user-nick">닉네임</label>
        <br />
        <Input name="user-nick" value={nick} required onChange={onChangeNick} />
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
        <label htmlFor="user-password-check">비밀번호 확인</label>
        <br />
        <Input
          name="user-passcheck"
          value={passwordCheck}
          required
          onChange={onChangePasswordCheck}
        />
        {passwordError && (
          <div style={{ color: "red" }}> 비밀번호가 일치하지 않습니다.</div>
        )}
      </div>
      <div>
        <Checkbox name="user-term" value={term} onChange={onChangeTerm}>
          동의합니다.
        </Checkbox>
        {termError && (
          <div style={{ color: "red" }}> 약관에 동의하셔아합니다. </div>
        )}
      </div>
      <div>
        <Button type="primary" htmlType="submit" style={{ marginTop: 10 }} />
      </div>
    </Form>
  );
};

export default Signup;
