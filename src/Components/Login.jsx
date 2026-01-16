import { useState } from "react";

const Login = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log("Login:", formData.email, formData.password);
    alert("Login functionality would be implemented here");
    // You can add actual login logic here (API calls, authentication, etc.)
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[#121212] border border-gray-700 rounded-lg p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Login</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-[#1e1e1e] text-white border border-gray-600 rounded-md focus:outline-none focus:border-red-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-[#1e1e1e] text-white border border-gray-600 rounded-md focus:outline-none focus:border-red-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 cursor-pointer text-white py-2 rounded-md font-semibold transition-colors"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?
          <button
            onClick={() => {
              onClose(); // Close login modal
              if (onSwitchToSignup) onSwitchToSignup(); // Open signup modal
            }}
            className="ml-1 text-red-500 hover:text-red-400 cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;