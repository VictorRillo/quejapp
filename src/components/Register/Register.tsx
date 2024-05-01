import React, { useState } from "react";
import "./Register.scss";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useLogIn from "hooks/api/useLogIn";
import useRegister from "hooks/api/useRegister";
import { LogInType, RegisterType } from "types/userType";
import toast from "react-hot-toast";

export default function Register() {
  const { t } = useTranslation();
  const { mutateAsync: logIn } = useLogIn();
  const { mutateAsync: register } = useRegister();

  const [state, setState] = useState({
    buttonLoading: false,
    usernameError: false,
    passwordError: false,
    emailError: false,
    username: "",
    password: "",
    email: "",
  });

  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState<number>();

  const handleRegister = async () => {
    setError(undefined);
    const registerData: RegisterType = {
      username: state.username,
      password: state.password,
      email: state.email,
    };
    try {
      await register(registerData);
      window.location.reload();
    } catch (error: any) {
      toast.error(t("toast_error"));
      setError(error.response.data.code);
    }
  };

  const handleLogin = async () => {
    setError(undefined);
    const loginData: LogInType = {
      username: state.username,
      password: state.password,
    };
    try {
      await logIn(loginData);
      window.location.reload();
    } catch (error: any) {
      toast.error(t(`toast_error`));
      setError(error.response.data.code);
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.getAttribute("id");
    const value = event.target.value;
    if (!value || value === "") {
      setState((prevState) => ({
        ...prevState,
        [`${name}Error`]: true,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [`${name}Error`]: false,
        [name as string]: value,
      }));
    }
  };

  return (
    <section id="register">
      <Container>
        <Row className={"box-form"}>
          <Col>
            <Form className={"formLogin"}>
              <Form.Group>
                <Form.Label htmlFor="username">{t("username")}</Form.Label>
                <Form.Control
                  required
                  id="username"
                  type="text"
                  onChange={changeHandler}
                  onInvalid={(e: any) =>
                    e.target.setCustomValidity(t("username_required"))
                  }
                />
                <Form.Control.Feedback
                  className={state.usernameError ? "displayErrors" : "noError"}
                >
                  {t("username_required")}
                </Form.Control.Feedback>
              </Form.Group>
              {isSignup && (
                <Form.Group>
                  <Form.Label htmlFor="email">{t("email")}</Form.Label>
                  <Form.Control
                    required
                    id="email"
                    type="email"
                    onChange={changeHandler}
                    onInvalid={(e: any) =>
                      e.target.setCustomValidity(t("email_required"))
                    }
                  />
                  <Form.Control.Feedback
                    className={state.emailError ? "displayErrors" : "noError"}
                  >
                    {t("email_required")}
                  </Form.Control.Feedback>
                </Form.Group>
              )}
              <Form.Group>
                <Form.Label htmlFor="password">{t("password")}</Form.Label>
                <Form.Control
                  required
                  id="password"
                  type="password"
                  onChange={changeHandler}
                  onInvalid={(e: any) =>
                    e.target.setCustomValidity(t("password_requried"))
                  }
                />
                <Form.Control.Feedback
                  className={state.passwordError ? "displayErrors" : "noError"}
                >
                  {t("password_requried")}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="row" style={{ paddingTop: "10px" }}></div>
              {isSignup ? (
                <>
                  <Button
                    className={"col-6 btn btn-primary"}
                    onClick={handleRegister}
                    disabled={
                      (
                        !state.username || !state.password || !state.email
                          ? true
                          : false
                      )
                        ? true
                        : false
                    }
                  >
                    {t("register_button_text")}
                  </Button>
                  <Button
                    variant="link"
                    className={"col-6 btn"}
                    onClick={() => setIsSignup(false)}
                  >
                    {t("login_button_text")}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className={"col-6 btn btn-primary"}
                    onClick={handleLogin}
                    disabled={
                      (!state.username || !state.password ? true : false)
                        ? true
                        : false
                    }
                  >
                    {t("login_button_text")}
                  </Button>
                  <Button
                    variant="link"
                    className={"col-6 btn"}
                    onClick={() => setIsSignup(true)}
                  >
                    {t("register_button_text")}
                  </Button>
                </>
              )}
              <Form.Control.Feedback
                className={error ? "displayErrors" : "noError"}
              >
                {t(`error_${error}`)}
              </Form.Control.Feedback>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
