import { GoogleLogout } from "react-google-login";

const clientId =
  "913811512322-mif9shii3k76dkvt2hjepmj4ks934nh7.apps.googleusercontent.com";

function LogOut() {
    const onSuccess = () => {
        console.log("Log Out Succesfull")
    }
    return (
        <div id="signOutButton">
            <GoogleLogout
                clientid={clientId}
                buttonText={"LogOut"}
                onLogoutSuccess={onSuccess}
            />

        </div>
    )
}

export default LogOut;