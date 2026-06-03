import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login({ onLogin }) {

    const handleSuccess = (credentialResponse) => {

        const user = jwtDecode(
            credentialResponse.credential
        );

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        onLogin(user);
    };

    return (

        <div className="h-screen bg-[#181818] flex items-center justify-center">

            <div className="bg-[#111] p-10 rounded-3xl border border-gray-800 text-center">

                <h1 className="text-5xl font-bold text-white mb-4">
                    DocuMind AI
                </h1>

                <p className="text-gray-400 mb-8">
                    Sign in to continue
                </p>

                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() =>
                        console.log("Login Failed")
                    }
                />

            </div>

        </div>
    );
}

export default Login;