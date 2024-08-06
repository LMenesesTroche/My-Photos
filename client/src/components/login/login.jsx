import { GoogleLogin } from "react-google-login";

const clientId =
  "913811512322-mif9shii3k76dkvt2hjepmj4ks934nh7.apps.googleusercontent.com";

function Login() {
    const onSuccess = (res) => {
        console.log("Login succes",res.profileObj);
    }
    const onFailure = (res) => {
        console.log("Login failed", res);
    }
  return (
    <div id="SignInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;