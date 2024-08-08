import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Card, Container, Spinner } from "reactstrap";
import logo from "@assets/images/users/kbz-logo-big.png";
import { useLogin } from "./queries";
import { Box } from "@mui/material";

const schema = Yup.object().shape({
  employeeId: Yup.string()
    .matches(/^\d{6}$/, "Employee ID must be exactly 6 digits")
    .required("Required"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
});

type FormData = {
  employeeId: string;
  password: string;
};

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { mutate, isPending } = useLogin();

  const submitForm = (data: FormData) => {
    const payload = {
      Login_id: data.employeeId,
      Password: data.password,
      service_id: import.meta.env.VITE_APP_SERVICE_ID,
    };
    setLoading(true);
    mutate(payload, {
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  return (
    <Box
      className="my-container"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Card className="login">
        <h3 className="login_header">
          <img src={logo} className="logo" />
          <br />
          <br />
        </h3>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="mb-3">
            <label className="form-label">Staff ID</label>
            <input
              type="text"
              className="form-control"
              {...register("employeeId")}
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                input.value = input.value.replace(/[^0-9]/g, "");
              }}
            />
            {errors.employeeId && (
              <span className="text-danger">
                {errors.employeeId.message?.toString()}
              </span>
            )}
          </div>
          <div className="mb-3 password-container">
            <label className="form-label">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                {...register("password")}
              />
              <i
                className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              ></i>
            </div>
            {errors.password && (
              <span className="text-danger">
                {errors.password.message?.toString()}
              </span>
            )}
          </div>
          <Button
            type="submit"
            style={{ backgroundColor: "#00A9FF", borderColor: "#00A9FF" ,marginLeft:"50%", width:'50%'}}
            className="btn btn-primary btn-block btn-lg"
            disabled={isLoading || isPending}
          >
            {isLoading || isPending ? (
              <>
                <Spinner size="sm" /> Login
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default Login;
