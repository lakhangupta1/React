import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from './authSlice';
import { setFavicon } from '../../utils/faviconUtils';

function ForgotPassword() {
    useEffect(() => {
        document.title = "Forgot Password - Admin Dashboard";
        setFavicon('/forgot-password');
    }, []);

    const [forms, setForms] = React.useState({
        email: "",
        createPassword: "",
        createConfirmPassword: "",
    });
    const { loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleChange(e) {
        setForms({
            ...forms,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (forms.createPassword !== forms.createConfirmPassword) {
            // alert("Password and Confirm Password do not match");
            // return;
        }
        
        dispatch(forgotPassword({
            email: forms.email,
            password: forms.createPassword,
        })).then((result) => {
            if (result.type === forgotPassword.fulfilled.type) {
                console.log("Password reset successful");
                navigate("/login");
            }
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Forgot Password
                </h2>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {typeof error === "string" ? error : error.message}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-gray-600 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={forms.email}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-gray-600 font-medium">New Password</label>
                        <input
                            type="password"
                            name="createPassword"
                            placeholder="Enter your new password"
                            value={forms.createPassword}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-gray-600 font-medium">Confirm Password</label>
                        <input
                            type="password"
                            name="createConfirmPassword"
                            placeholder="Confirm your new password"
                            value={forms.createConfirmPassword}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                            onChange={handleChange}
                        />
                    </div>
                   
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg 
                        hover:bg-blue-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                {/* Extra Options */}
                <p className="text-gray-600 text-sm text-center mt-4">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-blue-600 font-semibold hover:underline">
                        Register
                    </a>
                    <a href="/login" className="text-blue-600 font-semibold hover:underline m-2">
                        login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;