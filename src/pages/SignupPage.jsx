import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import FormInput from '../components/FormInput';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // In a real app, you'd validate passwords match and call a signup API
    if (password === confirmPassword) {
      console.log('Signing up with:', { name, email, password });
      // Redirect to login page after successful signup
      navigate('/login');
    } else {
      setError("Passwords don't match!");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-20 w-auto"
          src="/logo.png"
          alt="Vape Alley"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-accent hover:text-primary">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900/50 py-8 px-4 shadow-lg rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-center text-red-400 bg-red-500/10 py-2 rounded-md">{error}</p>}
            <FormInput label="Full Name" id="name" type="text" placeholder="Your Name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
            <FormInput label="Email address" id="email" type="email" placeholder="you@example.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormInput label="Password" id="password" type="password" placeholder="Create a Password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <FormInput label="Confirm Password" id="confirm-password" type="password" placeholder="Confirm Your Password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-x-3 py-3 rounded-full bg-primary hover:bg-primary-hover transition-colors text-white font-bold text-lg"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-900/50 px-2 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-800/50 text-sm font-medium text-gray-300 hover:bg-gray-800">
                  <img src="/google-tile.svg" alt="Google" className="h-5 w-5" loading="lazy" />
                </a>
              </div>
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-800/50 text-sm font-medium text-gray-300 hover:bg-gray-800">
                  <img src="/facebook-tile.svg" alt="Facebook" className="h-5 w-5" loading="lazy" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;