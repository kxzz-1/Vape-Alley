import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserIcon, ShoppingBagIcon, MapPinIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

// --- Mock Data (replace with real data from your backend) ---
const orders = [
  {
    id: 'VPA-12345',
    date: 'June 15, 2024',
    status: 'Delivered',
    total: 10549,
    items: [
      { name: 'VooPoo Argus G3', quantity: 1 },
      { name: 'Blue Razzle E-Juice', quantity: 1 },
    ],
  },
  {
    id: 'VPA-67890',
    date: 'May 28, 2024',
    status: 'Delivered',
    total: 9699,
    items: [{ name: 'OXVA Xlim SQ', quantity: 1 }],
  },
];

const addresses = [
    { id: 1, type: 'Shipping', details: '123 Vape Street, E-Cig City, 54000', isDefault: true },
    { id: 2, type: 'Billing', details: '123 Vape Street, E-Cig City, 54000', isDefault: true },
];

const formatPrice = (num) => `Rs ${num.toLocaleString()}`;

// --- Section Components ---
const ProfileSection = ({ user }) => (
  <div>
    <h2 className="text-2xl font-bold text-white mb-6">My Profile</h2>
    <form className="space-y-6 bg-gray-900/50 p-6 rounded-xl">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
        <input type="text" id="name" defaultValue={user.name || ''} className="checkout-input" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
        <input type="email" id="email" defaultValue={user.email} className="checkout-input" readOnly />
      </div>
      <div className="border-t border-primary/20 pt-6 space-y-6">
        <h3 className="text-lg font-semibold text-accent">Change Password</h3>
        <div>
          <label htmlFor="current-password" className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
          <input type="password" id="current-password" className="checkout-input" />
        </div>
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
          <input type="password" id="new-password" className="checkout-input" />
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="py-2 px-6 rounded-full bg-primary hover:bg-primary-hover transition-colors text-white font-bold">
          Save Changes
        </button>
      </div>
    </form>
  </div>
);

const OrdersSection = () => (
  <div>
    <h2 className="text-2xl font-bold text-white mb-6">My Orders</h2>
    <div className="space-y-6">
      {orders.map(order => (
        <div key={order.id} className="bg-gray-900/50 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start border-b border-primary/20 pb-4 mb-4">
            <div>
              <p className="text-lg font-bold text-white">Order ID: {order.id}</p>
              <p className="text-sm text-gray-400">Date: {order.date}</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-semibold px-3 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{order.status}</p>
              <p className="text-lg font-bold text-accent mt-1">{formatPrice(order.total)}</p>
            </div>
          </div>
          <ul className="text-sm text-gray-300 list-disc list-inside">
            {order.items.map(item => <li key={item.name}>{item.name} (x{item.quantity})</li>)}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const AddressesSection = () => (
    <div>
        <h2 className="text-2xl font-bold text-white mb-6">My Addresses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map(address => (
                <div key={address.id} className="bg-gray-900/50 p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-accent">{address.type} Address</h3>
                        {address.isDefault && <span className="text-xs bg-primary/50 text-white px-2 py-1 rounded-full">Default</span>}
                    </div>
                    <p className="text-gray-300">{address.details}</p>
                    <div className="mt-4 flex gap-4 text-sm">
                        <button className="text-accent hover:text-primary">Edit</button>
                        <button className="text-red-500 hover:text-red-400">Remove</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const UserProfilePage = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-400 mb-8">You must be logged in to view this page.</p>
        <Link to="/login" className="px-6 py-2 rounded-full bg-primary hover:bg-primary-hover transition-colors">
          Go to Login
        </Link>
      </div>
    );
  }

  const NavItem = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === id ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800/50 hover:text-accent'}`}
    >
      <Icon className="h-6 w-6" />
      <span className="font-semibold">{label}</span>
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white tracking-tight mb-8">My Account</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 bg-gray-900/50 p-4 rounded-xl self-start space-y-2">
          <NavItem id="profile" label="Profile" icon={UserIcon} />
          <NavItem id="orders" label="Orders" icon={ShoppingBagIcon} />
          <NavItem id="addresses" label="Addresses" icon={MapPinIcon} />
          <div className="border-t border-primary/20 my-2 !-mx-4"></div>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors">
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
            <span className="font-semibold">Logout</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          {activeTab === 'profile' && <ProfileSection user={user} />}
          {activeTab === 'orders' && <OrdersSection />}
          {activeTab === 'addresses' && <AddressesSection />}
        </main>
      </div>
    </div>
  );
};

export default UserProfilePage;