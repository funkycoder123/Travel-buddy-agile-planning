import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ useNavigate added

const SignUpPage = () => {
  const [name, setName] = useState(''); // ✅ Added name state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate(); // ✅ this lets us redirect

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }), // ✅ Include name in request
      });

      const data = await response.json();
      if (response.status === 201) {
        alert('Registration successful!');
        navigate('/login'); // ✅ redirect after success
      } else {
        alert(data.message || 'Signup failed!');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Something went wrong. Try again later.');
    }
  };

  return (
    <section className="bg-white min-h-screen flex items-center justify-center px-6">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border border-gray-200">
        <div className="p-6 space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </h1>
          <form className="space-y-5" onSubmit={handleSignup}>

            {/* ✅ Name Field */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                Your name
              </label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                  required
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm text-gray-500">
                I accept the <a href="#" className="font-medium text-red-600 hover:underline">Terms and Conditions</a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>

            <p className="text-sm font-light text-gray-500 text-center">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-red-500 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
