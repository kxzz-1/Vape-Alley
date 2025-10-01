import React from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';

const FormInput = ({ label, id, type = 'text', placeholder, autoComplete, icon: Icon }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <div className="relative">
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="checkout-input" // Re-use styles from checkout
      />
    </div>
  </div>
);

const SignupPage = () => {
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
          <form className="space-y-6" action="#" method="POST">
            <FormInput label="Full Name" id="name" type="text" placeholder="Your Name" autoComplete="name" icon={UserIcon} />
            <FormInput label="Email address" id="email" type="email" placeholder="you@example.com" autoComplete="email" icon={EnvelopeIcon} />
            <FormInput label="Password" id="password" type="password" placeholder="Create a Password" autoComplete="new-password" icon={LockClosedIcon} />
            <FormInput label="Confirm Password" id="confirm-password" type="password" placeholder="Confirm Your Password" autoComplete="new-password" icon={LockClosedIcon} />

            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-x-3 py-3 rounded-full bg-primary hover:bg-primary-hover transition-colors text-white font-bold text-lg"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;