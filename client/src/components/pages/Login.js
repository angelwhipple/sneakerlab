import React from "react";
import { useNavigate } from "@reach/router";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "577941677274-3aeilnjtp2hj98r8jvcsa6jvkoq9r5kc.apps.googleusercontent.com";

const Login = (props) => {
  // navigate back to home on login
  const navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
    props.setOnLoginPage(false);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="centered">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            props.handleLogin(credentialResponse);
            routeChange();
          }}
          onError={(err) => console.log(err)}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
