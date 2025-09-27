import React from 'react';
import { Link } from 'react-router-dom';
import { LockClosedIcon, TrashIcon } from '@heroicons/react/24/solid';

// Re-using sample data for demonstration. In a real app, this would come from a cart context.
const sampleCartItems = [
  {
    id: 1,
    name: 'VooPoo Argus G3',
    price: 8099,
    quantity: 1,
    image: '/argus-g3.png',
    variant: { Color: 'Satin Blue' },
  },
  {
    id: 2,
    name: 'Uwell Caliburn G3',
    price: 8999,
    quantity: 2,
    image: '/caliburn-g3.jpg',
    variant: { Color: 'Space Grey' },
  },
];

const formatPrice = (num) => `Rs ${num.toLocaleString()}`;

const CheckoutPage = ({ cartItems = [], onRemove }) => {
  const subtotal = sampleCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 250;
  const total = subtotal + shipping;

  const FormInput = ({ label, id, type = 'text', placeholder, autoComplete, required = true }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">{label}</label>
      <div className="mt-1">
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="checkout-input"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white tracking-tight">Checkout</h1>
        <p className="mt-2 text-lg text-gray-400">Complete your purchase</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
        {/* Shipping Information Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-accent">Contact Information</h2>
            <FormInput label="Email address" id="email" type="email" placeholder="you@example.com" autoComplete="email" />
          </div>

          <div className="border-t border-primary/20 pt-6">
            <h2 className="text-2xl font-semibold text-accent">Shipping Address</h2>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div className="sm:col-span-2">
                <FormInput label="Full name" id="full-name" placeholder="Your Name" autoComplete="name" />
              </div>
              <div className="sm:col-span-2">
                <FormInput label="Address" id="address" placeholder="1234 Main St" autoComplete="street-address" />
              </div>
              <FormInput label="City" id="city" placeholder="Lahore" autoComplete="address-level2" />
              <FormInput label="Postal code" id="postal-code" placeholder="54000" autoComplete="postal-code" />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-900/50 p-6 rounded-xl shadow-lg self-start">
          <h2 className="text-2xl font-semibold text-accent border-b border-primary/20 pb-4">Order Summary</h2>
          <ul role="list" className="divide-y divide-primary/20 my-6">
            {sampleCartItems.map((product) => (
              <li key={product.id} className="flex py-4">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-700">
                  <img src={product.image} alt={product.name} className="h-full w-full object-contain object-center" />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-white">
                      <h3>{product.name}</h3>
                      <p className="ml-4">{formatPrice(product.price * product.quantity)}</p>
                    </div>
                    {product.variant && (
                      <p className="mt-1 text-sm text-gray-400">
                        {Object.entries(product.variant).map(([key, value]) => `${key}: ${value}`).join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-400">Qty {product.quantity}</p>
                    <div className="flex">
                      <button onClick={() => onRemove(product.id)} type="button" className="font-medium text-primary hover:text-accent transition-colors">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-primary/20 pt-6 space-y-2 text-gray-300">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>{formatPrice(subtotal)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>{formatPrice(shipping)}</p>
            </div>
            <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-primary/30 mt-2">
              <p>Total</p>
              <p>{formatPrice(total)}</p>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-x-3 py-3 rounded-full bg-primary hover:bg-primary-hover transition-colors text-white font-bold text-lg"
            >
              <LockClosedIcon className="h-6 w-6" />
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

