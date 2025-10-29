import React from 'react';

const FormInput = ({ label, id, type = 'text', placeholder, autoComplete, icon: Icon, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <div className="relative">
      {Icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        value={value}
        onChange={onChange}
        className={`checkout-input ${Icon ? 'pl-10' : ''}`}
      />
    </div>
  </div>
);

export default FormInput;