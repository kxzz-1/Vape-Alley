import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { UserIcon, ShoppingBagIcon, MapPinIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const formatPrice = (num) => `Rs ${num.toLocaleString()}`;

const getToken = () => localStorage.getItem('token') || JSON.parse(localStorage.getItem('user') || '{}').token;

// --- Section Components ---
const ProfileSection = ({ user, onProfileUpdate }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(user.name || '');
  const [formData, setFormData] = useState({
    phone: user.phone || '',
    address: user.address || '',
    city: user.city || '',
    postalCode: user.postalCode || ''
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const token = getToken();
      const body = { name, ...formData };
      if (newPassword) {
        body.password = newPassword;
        body.currentPassword = currentPassword;
      }

      const res = await fetch('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully' });
        setCurrentPassword('');
        setNewPassword('');
        
        const lsUser = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({ ...lsUser, ...data }));
        if (data.token) localStorage.setItem('token', data.token);

        if (onProfileUpdate) onProfileUpdate(data);
      } else if (res.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setMessage({ type: 'error', text: data.message || 'Error updating profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error' });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">My Profile</h2>
      {message.text && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/50 p-6 rounded-xl">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="checkout-input" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
          <input type="email" id="email" defaultValue={user.email} className="checkout-input" readOnly />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
          <input type="text" id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="checkout-input" />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">Address</label>
          <input type="text" id="address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="checkout-input" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">City</label>
            <input type="text" id="city" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="checkout-input" />
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-300 mb-1">Postal Code</label>
            <input type="text" id="postalCode" value={formData.postalCode} onChange={(e) => setFormData({...formData, postalCode: e.target.value})} className="checkout-input" />
          </div>
        </div>
        <div className="border-t border-primary/20 pt-6 space-y-6">
          <h3 className="text-lg font-semibold text-accent">Change Password</h3>
          <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
            <input type="password" id="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="checkout-input" />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
            <input type="password" id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="checkout-input" />
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
};

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/api/users/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(Array.isArray(data) ? data : []);
        } else if (res.status === 404) {
          setOrders([]);
        } else {
          const errorData = await res.json().catch(() => ({}));
          setError(errorData.message || `Failed to fetch orders (${res.status})`);
        }
      } catch (err) {
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="text-white">Loading orders...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-400">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-gray-900/50 p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-start border-b border-primary/20 pb-4 mb-4">
                <div>
                  <p className="text-lg font-bold text-white">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold px-3 py-1 rounded-full ${order.isDelivered ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                    {order.isDelivered ? 'Delivered' : 'Processing'}
                  </p>
                  <p className="text-lg font-bold text-accent mt-1">{formatPrice(order.totalPrice || order.total)}</p>
                </div>
              </div>
              <ul className="text-sm text-gray-300 list-disc list-inside">
                {order.orderItems && order.orderItems.map((item, idx) => (
                  <li key={idx}>{item.name} (x{item.qty || item.quantity})</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AddressesSection = ({ user }) => (
    <div>
        <h2 className="text-2xl font-bold text-white mb-6">My Addresses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-accent">Default Address</h3>
                    <span className="text-xs bg-primary/50 text-white px-2 py-1 rounded-full">Primary</span>
                </div>
                {user.address ? (
                  <>
                    <p className="text-gray-300">{user.address}</p>
                    <p className="text-gray-300">{user.city}, {user.postalCode}</p>
                    <p className="text-gray-300 mt-2">Phone: {user.phone}</p>
                  </>
                ) : (
                  <p className="text-gray-400 italic">No address saved. Please update your profile.</p>
                )}
            </div>
        </div>
    </div>
);

const UserProfilePage = ({ user: initialUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    // If initialUser is provided, set it, but we might want to fetch fresh data too
    if (initialUser) setUser(initialUser);
  }, [initialUser]);

  // Fetch fresh profile data on mount to get address/orders info if not in initial prop
  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (token) {
        try {
          const res = await fetch('http://localhost:3000/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          }
        } catch (e) { console.error(e); }
      }
    };
    fetchProfile();
  }, []);

  if (!initialUser && !user) {
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
          {activeTab === 'profile' && <ProfileSection user={user} onProfileUpdate={setUser} />}
          {activeTab === 'orders' && <OrdersSection />}
          {activeTab === 'addresses' && <AddressesSection user={user} />}
        </main>
      </div>
    </div>
  );
};

export default UserProfilePage;