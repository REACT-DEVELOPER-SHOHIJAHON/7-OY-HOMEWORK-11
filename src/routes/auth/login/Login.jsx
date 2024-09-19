import { Button, Form, Input, Typography, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useLogInMutation } from "../../../redux/api/authApi";
import { logIn } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const {Title, Text} = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logInRequest, {data, isSuccess}] = useLogInMutation();

  const onFinish = (values) => {
    logInRequest(values);
  };

  useEffect(() => {
    if(isSuccess){
      dispatch(logIn({token: data.payload.token}))
      notification.success({
        message: "Successfully logged in! Go ahed 😊"
      })
      navigate("/dashboard/profile")
    }
  }, [isSuccess])

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className="p-4 w-full"
      name="basic"
      layout="vertical"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title level={2} className="text-center">Login</Title>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button className="w-full" type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
        <Text>Don't have an account? <Link to="/auth/signup">Sign Up</Link></Text>
    </Form>
  );
};
export default Login;
