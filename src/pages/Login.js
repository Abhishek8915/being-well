// import React, { useState } from "react";
// import { auth, googleProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const navigate = useNavigate();

//   const sendOTP = async () => {
//     try {
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
//       const confirmation = await signInWithPhoneNumber(auth, email, window.recaptchaVerifier);
//       window.confirmationResult = confirmation;
//       setOtpSent(true);
//     } catch (error) {
//       console.error("OTP Error:", error);
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         localStorage.setItem("token", data.token);
//         navigate("/dashboard");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//     }
//   };
  
//   const verifyOTP = async () => {
//     try {
//       const result = await confirmation.confirm(otp); // Assuming confirmation is set when OTP is sent
//       console.log("User verified:", result.user);
//     } catch (error) {
//       console.error("OTP Verification Error:", error);
//     }
//   };
  

//   const googleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Google Login Error:", error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-semibold text-center">Login</h2>
//         {!otpSent ? (
//           <>
//             <input type="email" placeholder="Enter Email" className="w-full p-2 border rounded mt-4" onChange={(e) => setEmail(e.target.value)} />
//             <button className="w-full bg-blue-500 text-white p-2 mt-4 rounded" onClick={sendOTP}>
//               Send OTP
//             </button>
//             <div id="recaptcha-container"></div>
//           </>
//         ) : (
//           <>
//             <input type="text" placeholder="Enter OTP" className="w-full p-2 border rounded mt-4" onChange={(e) => setOtp(e.target.value)} />
//             <button className="w-full bg-green-500 text-white p-2 mt-4 rounded" onClick={verifyOTP}>
//               Verify OTP
//             </button>
//           </>
//         )}
//         <button className="w-full bg-red-500 text-white p-2 mt-4 rounded" onClick={googleLogin}>
//           Login with Google
//         </button>
//         <p className="text-sm text-center mt-4">
//           Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login"; // Import GoogleLogin component

// Your Google client ID from Firebase
const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your actual client ID

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Define password state
  const [confirmation, setConfirmation] = useState(""); // Define confirmation state
  const navigate = useNavigate();

  // Handle Google Login Success
  const handleGoogleSuccess = (response) => {
    // You can process the Google response here
    console.log("Google login success:", response);
    // You can save the user info or send the token to the backend for verification
    navigate("/home"); // Redirect to home page or dashboard
  };

  // Handle Google Login Error
  const handleGoogleFailure = (error) => {
    console.log("Google login failed:", error);
  };

  // Handle Email login form submission (You can replace this with OTP login logic)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your email/OTP authentication logic
    console.log("Email login attempted with:", email);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 bg-gray-700 text-white rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 bg-gray-700 text-white rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
            />
          </div>

          <div>
            <label htmlFor="confirmation" className="block text-lg">Confirm Password</label>
            <input
              type="password"
              id="confirmation"
              className="w-full p-2 bg-gray-700 text-white rounded-md"
              placeholder="Confirm your password"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)} // Update confirmation state
              required
            />
          </div>

          {/* Google login button */}
          <div className="flex justify-center">
            <GoogleLogin
              clientId={CLIENT_ID} // Your Google Client ID here
              buttonText="Login with Google"
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy="single_host_origin"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
            />
          </div>

          {/* Submit button for email login */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md mt-4"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-500 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
