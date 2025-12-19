import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { 
  Squares2X2Icon, 
  CubeIcon, 
  UsersIcon, 
  ShoppingBagIcon, 
  PlusIcon, 
  TrashIcon, 
  XMarkIcon,
  PencilSquareIcon,
  ClipboardDocumentListIcon,
  PhotoIcon,
  TagIcon,
  BuildingStorefrontIcon,
  FilmIcon,
  CurrencyDollarIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import FormInput from './FormInput';
import CustomDropdown from './CustomDropdown';

const API_URL = 'http://localhost:3000/api';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [carouselSlides, setCarouselSlides] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Discount State
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountTarget, setDiscountTarget] = useState('all'); // 'all' or 'selected'
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  
  // Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [isCarouselModalOpen, setIsCarouselModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Devices', brand: '', stock: '', description: '', images: [], colors: '' });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newBrand, setNewBrand] = useState({ name: '', image: '', categoryIds: [] });
  const [newSlide, setNewSlide] = useState({ title: '', subtitle: '', image: '', isActive: true });

  const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user?.token}`
    };
  };

  // --- Fetch Data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, userRes, orderRes, catRes, brandRes, carouselRes] = await Promise.all([
          fetch(`${API_URL}/products`),
          fetch(`${API_URL}/users`, { headers: getAuthHeaders() }),
          fetch(`${API_URL}/orders`, { headers: getAuthHeaders() }),
          fetch(`${API_URL}/categories`),
          fetch(`${API_URL}/brands`),
          fetch(`${API_URL}/carousel`)
        ]);

        if (userRes.status === 401 || orderRes.status === 401) {
          localStorage.removeItem('user');
          navigate('/login');
          return;
        }
        
        if (prodRes.ok) setProducts(await prodRes.json());
        if (userRes.ok) setUsers(await userRes.json());
        if (orderRes.ok) setOrders(await orderRes.json());
        if (catRes.ok) {
          const cats = await catRes.json();
          setCategories(cats);
        }
        if (brandRes.ok) {
          setBrands(await brandRes.json());
        }
        if (carouselRes.ok) {
          setCarouselSlides(await carouselRes.json());
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Handlers ---

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`${API_URL}/products/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`${API_URL}/users/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
        setUsers(users.filter(u => u.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ name: newCategoryName, value: newCategoryName })
      });
      if (res.ok) {
        const savedCategory = await res.json();
        setCategories([...categories, savedCategory]);
        setIsCategoryModalOpen(false);
        setNewCategoryName('');
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await fetch(`${API_URL}/categories/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
        setCategories(categories.filter(c => c.id !== id));
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleSaveBrand = async (e) => {
    e.preventDefault();
    const brandData = {
      name: newBrand.name,
      image: newBrand.image,
      categories: newBrand.categoryIds
    };

    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/brands/${editingId}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(brandData)
        });
      } else {
        res = await fetch(`${API_URL}/brands`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(brandData)
        });
      }

      if (res.ok) {
        const savedBrand = await res.json();
        if (editingId) {
          setBrands(brands.map(b => b.id === editingId ? savedBrand : b));
        } else {
          setBrands([...brands, savedBrand]);
        }
        setIsBrandModalOpen(false);
        setNewBrand({ name: '', image: '', categoryIds: [] });
        setEditingId(null);
      }
    } catch (error) {
      console.error("Error saving brand:", error);
    }
  };

  const handleDeleteBrand = async (id) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      try {
        await fetch(`${API_URL}/brands/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
        setBrands(brands.filter(b => b.id !== id));
      } catch (error) {
        console.error("Error deleting brand:", error);
      }
    }
  };

  const handleAddSlide = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/carousel`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newSlide)
      });
      if (res.ok) {
        const savedSlide = await res.json();
        setCarouselSlides([savedSlide, ...carouselSlides]);
        setIsCarouselModalOpen(false);
        setNewSlide({ title: '', subtitle: '', image: '', isActive: true });
      }
    } catch (error) {
      console.error("Error adding slide:", error);
    }
  };

  const handleDeleteSlide = async (id) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      try {
        await fetch(`${API_URL}/carousel/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
        setCarouselSlides(carouselSlides.filter(s => s.id !== id));
      } catch (error) {
        console.error("Error deleting slide:", error);
      }
    }
  };

  const toggleSlideStatus = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API_URL}/carousel/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (res.ok) {
        setCarouselSlides(carouselSlides.map(s => s.id === id ? { ...s, isActive: !currentStatus } : s));
      }
    } catch (error) {
      console.error("Error updating slide status:", error);
    }
  };

  const toggleOrderDetails = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const handleApplyDiscount = async () => {
    if (discountTarget === 'selected' && selectedProductIds.length === 0) {
      alert("Please select at least one product.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/discounts`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          percentage: Number(discountPercentage),
          productIds: discountTarget === 'selected' ? selectedProductIds : []
        })
      });
      if (res.ok) {
        alert('Discounts updated successfully!');
        // Refresh products to show new prices
        const prodRes = await fetch(`${API_URL}/products`);
        if (prodRes.ok) setProducts(await prodRes.json());
        setSelectedProductIds([]);
        setDiscountPercentage(0);
      } else {
        const errorData = await res.json();
        alert(`Failed to apply discount: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error applying discount:", error);
      alert("An error occurred while applying the discount.");
    }
  };

  const handleClearAllDiscounts = async () => {
    if (window.confirm("Are you sure you want to remove discounts from ALL products?")) {
      try {
        const res = await fetch(`${API_URL}/discounts`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            percentage: 0,
            productIds: [] // Empty implies all
          })
        });
        if (res.ok) {
          alert('All discounts cleared!');
          const prodRes = await fetch(`${API_URL}/products`);
          if (prodRes.ok) setProducts(await prodRes.json());
        }
      } catch (error) {
        console.error("Error clearing discounts:", error);
      }
    }
  };

  const handleRemoveProductDiscount = async (productId) => {
    try {
      const res = await fetch(`${API_URL}/discounts`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          percentage: 0,
          productIds: [productId]
        })
      });
      if (res.ok) {
        const prodRes = await fetch(`${API_URL}/products`);
        if (prodRes.ok) setProducts(await prodRes.json());
      }
    } catch (error) {
      console.error("Error removing discount:", error);
    }
  };

  const openAddModal = () => {
    const defaultCategory = categories.length > 0 ? categories[0].value : '';
    setNewProduct({ 
      name: '', 
      price: '', 
      category: defaultCategory, 
      brand: '',
      stock: '', 
      description: '', 
      images: [], 
      colors: '' 
    });
    setEditingId(null);
    setIsProductModalOpen(true);
  };

  const openEditModal = (product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      category: product.category,
      brand: product.brand || '',
      stock: product.stock,
      description: product.description || '',
      images: product.images || (product.image ? [product.image] : []),
      colors: product.colors ? product.colors.join(', ') : ''
    });
    setEditingId(product.id);
    setIsProductModalOpen(true);
  };

  const openAddBrandModal = () => {
    setNewBrand({ name: '', image: '', categoryIds: [] });
    setEditingId(null);
    setIsBrandModalOpen(true);
  };

  const openEditBrandModal = (brand) => {
    setNewBrand({
      name: brand.name,
      image: brand.image || '',
      categoryIds: brand.categories ? brand.categories.map(c => c.id) : []
    });
    setEditingId(brand.id);
    setIsBrandModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await fetch(`${API_URL}/media/upload`, {
          method: 'POST',
          body: formData,
        });
        return await res.json();
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    const newUrls = results.filter(r => r && r.url).map(r => r.url);
    
    setNewProduct(prev => ({ ...prev, images: [...prev.images, ...newUrls] }));
  };

  const handleBrandImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${API_URL}/media/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) setNewBrand({ ...newBrand, image: data.url });
    } catch (error) {
      console.error("Error uploading brand image:", error);
    }
  };

  const handleSlideImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${API_URL}/media/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) setNewSlide({ ...newSlide, image: data.url });
    } catch (error) {
      console.error("Error uploading slide image:", error);
    }
  };

  const removeImage = (index) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const imageList = newProduct.images;
    const colorList = newProduct.colors.split(',').map(s => s.trim()).filter(Boolean);
    const mainImage = imageList.length > 0 ? imageList[0] : '/logo.png';

    const productData = {
      name: newProduct.name,
      category: newProduct.category,
      brand: newProduct.brand,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      description: newProduct.description,
      images: imageList,
      colors: colorList,
      image: mainImage
    };

    try {
      let response;
      if (editingId) {
        response = await fetch(`${API_URL}/products/${editingId}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(productData)
        });
      } else {
        response = await fetch(`${API_URL}/products`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(productData)
        });
      }

      const savedProduct = await response.json();

      if (editingId) {
        setProducts(products.map(p => p.id === editingId ? savedProduct : p));
      } else {
        setProducts([...products, savedProduct]);
      }
      setIsProductModalOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const toggleOrderStatus = async (id) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;

    const nextStatus = order.status === 'Pending' ? 'Processing' : order.status === 'Processing' ? 'Delivered' : 'Pending';
    
    try {
      const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: nextStatus })
      });
      const updatedOrder = await response.json();
      
      setOrders(orders.map(o => o.id === id ? updatedOrder : o));
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // --- Render Helpers ---

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg flex items-center space-x-4">
      <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
        <Icon className={`h-8 w-8 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-800 border-r border-gray-700 flex-shrink-0">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-accent flex items-center gap-2">
            <Squares2X2Icon className="h-6 w-6" />
            Admin Panel
          </h2>
        </div>
        <nav className="p-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Squares2X2Icon },
            { id: 'products', label: 'Products', icon: CubeIcon },
            { id: 'orders', label: 'Orders', icon: ShoppingBagIcon },
            { id: 'users', label: 'Users', icon: UsersIcon },
            { id: 'categories', label: 'Categories', icon: TagIcon },
            { id: 'brands', label: 'Brands', icon: BuildingStorefrontIcon },
            { id: 'carousel', label: 'Carousel', icon: FilmIcon },
            { id: 'discounts', label: 'Discounts', icon: CurrencyDollarIcon },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-primary text-white shadow-md shadow-primary/20' 
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Sales" value={`Rs ${orders.reduce((acc, o) => acc + o.total, 0).toLocaleString()}`} icon={ShoppingBagIcon} color="text-green-400" />
              <StatCard title="Total Orders" value={orders.length} icon={ClipboardDocumentListIcon} color="text-blue-400" />
              <StatCard title="Total Products" value={products.length} icon={CubeIcon} color="text-purple-400" />
              <StatCard title="Total Users" value={users.length} icon={UsersIcon} color="text-orange-400" />
              <StatCard title="Total Categories" value={categories.length} icon={TagIcon} color="text-pink-400" />
              <StatCard title="Total Brands" value={brands.length} icon={BuildingStorefrontIcon} color="text-teal-400" />
              <StatCard title="Active Slides" value={carouselSlides.filter(s => s.isActive).length} icon={FilmIcon} color="text-yellow-400" />
            </div>
            
            {/* Recent Orders Preview */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Recent Orders</h3>
                <button onClick={() => setActiveTab('orders')} className="text-primary hover:text-primary-hover text-sm">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-300">
                  <thead className="bg-gray-700/50 text-gray-400 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3">Order ID</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-700/30">
                        <td className="px-6 py-4">#{order.id}</td>
                        <td className="px-6 py-4">{order.customer}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' ? 'bg-green-900 text-green-300' :
                            order.status === 'Processing' ? 'bg-blue-900 text-blue-300' :
                            'bg-yellow-900 text-yellow-300'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">Rs {order.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products View */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">Products</h1>
              <button 
                onClick={openAddModal}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                Add Product
              </button>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-300">
                  <thead className="bg-gray-700/50 text-gray-400 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3">Product</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Brand</th>
                      <th className="px-6 py-3">Stock</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-700/30">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img src={product.image} alt="" className="h-10 w-10 rounded object-cover bg-gray-900" />
                          <span className="font-medium text-white">{product.name}</span>
                        </td>
                        <td className="px-6 py-4">{product.category}</td>
                        <td className="px-6 py-4">Rs {product.price.toLocaleString()}</td>
                        <td className="px-6 py-4">{product.brand || '-'}</td>
                        <td className="px-6 py-4">{product.stock}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => openEditModal(product)} className="text-blue-400 hover:text-blue-300 p-1"><PencilSquareIcon className="h-5 w-5" /></button>
                          <button onClick={() => handleDeleteProduct(product.id)} className="text-red-400 hover:text-red-300 p-1"><TrashIcon className="h-5 w-5" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders View */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Orders</h1>
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <table className="w-full text-left text-gray-300">
                <thead className="bg-gray-700/50 text-gray-400 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Items</th>
                    <th className="px-6 py-3">Total</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {orders.map((order) => (
                    <Fragment key={order.id}>
                    <tr 
                      className={`hover:bg-gray-700/30 cursor-pointer transition-colors ${expandedOrderId === order.id ? 'bg-gray-700/20' : ''}`}
                      onClick={() => toggleOrderDetails(order.id)}
                    >
                      <td className="px-6 py-4 flex items-center gap-2">
                        <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform ${expandedOrderId === order.id ? 'rotate-180' : ''}`} />
                        #{order.id}
                      </td>
                      <td className="px-6 py-4">{order.date}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4">{order.itemsCount}</td>
                      <td className="px-6 py-4">Rs {order.total.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-900 text-green-300' :
                          order.status === 'Processing' ? 'bg-blue-900 text-blue-300' :
                          'bg-yellow-900 text-yellow-300'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleOrderStatus(order.id); }}
                          className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded border border-gray-600 transition-colors"
                        >
                          Next Status
                        </button>
                      </td>
                    </tr>
                    {expandedOrderId === order.id && (
                      <tr className="bg-gray-800/50">
                        <td colSpan="7" className="px-6 py-4 border-t border-gray-700/50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-bold text-white text-sm mb-3">Order Items</h4>
                              <div className="bg-gray-900/50 rounded-lg p-3 space-y-2">
                                {order.items && order.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between text-sm text-gray-300 border-b border-gray-700 last:border-0 pb-2 last:pb-0">
                                    <div className="flex flex-col">
                                      <span className="font-medium text-white">{item.name}</span>
                                      <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                    </div>
                                    <span>Rs {(item.price * item.quantity).toLocaleString()}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="text-sm text-gray-400 space-y-2">
                              <h4 className="font-bold text-white text-sm mb-3">Shipping & Contact</h4>
                              <div className="bg-gray-900/50 rounded-lg p-3 space-y-2">
                                <p><span className="text-gray-500 block text-xs uppercase">Address</span> {order.address}, {order.city}, {order.postalCode}</p>
                                <div className="grid grid-cols-2 gap-4">
                                  <p><span className="text-gray-500 block text-xs uppercase">Phone</span> {order.phone}</p>
                                  <p><span className="text-gray-500 block text-xs uppercase">Email</span> {order.email}</p>
                                </div>
                                <p><span className="text-gray-500 block text-xs uppercase">Payment Method</span> {order.paymentMethod}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users View */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Customers</h1>
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <table className="w-full text-left text-gray-300">
                <thead className="bg-gray-700/50 text-gray-400 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Joined</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-700/30">
                      <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'Admin' ? 'bg-purple-900 text-purple-300' : 'bg-gray-700 text-gray-300'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDeleteUser(user.id)} className="text-red-400 hover:text-red-300 p-1">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories View */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">Categories</h1>
              <button 
                onClick={() => setIsCategoryModalOpen(true)}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                Add Category
              </button>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <table className="w-full text-left text-gray-300">
                <thead className="bg-gray-700/50 text-gray-400 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Value</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-700/30">
                      <td className="px-6 py-4 font-medium text-white">{category.name}</td>
                      <td className="px-6 py-4">{category.value}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDeleteCategory(category.id)} className="text-red-400 hover:text-red-300 p-1">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Brands View */}
        {activeTab === 'brands' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">Brands</h1>
              <button 
                onClick={openAddBrandModal}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                Add Brand
              </button>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <table className="w-full text-left text-gray-300">
                <thead className="bg-gray-700/50 text-gray-400 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Logo</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Linked Categories</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {brands.map((brand) => (
                    <tr key={brand.id} className="hover:bg-gray-700/30">
                      <td className="px-6 py-4">
                        {brand.image && <img src={brand.image} alt={brand.name} className="h-10 w-10 object-contain bg-white rounded p-1" />}
                      </td>
                      <td className="px-6 py-4 font-medium text-white">{brand.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {brand.categories && brand.categories.map(c => <span key={c.id} className="text-xs bg-gray-700 px-2 py-1 rounded">{c.name}</span>)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => openEditBrandModal(brand)} className="text-blue-400 hover:text-blue-300 p-1"><PencilSquareIcon className="h-5 w-5" /></button>
                        <button onClick={() => handleDeleteBrand(brand.id)} className="text-red-400 hover:text-red-300 p-1">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Carousel View */}
        {activeTab === 'carousel' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">Carousel Slides</h1>
              <button 
                onClick={() => setIsCarouselModalOpen(true)}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                Add Slide
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {carouselSlides.map((slide) => (
                <div key={slide.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden group">
                  <div className="relative aspect-video bg-gray-900">
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button 
                        onClick={() => toggleSlideStatus(slide.id, slide.isActive)}
                        className={`px-4 py-2 rounded-full text-sm font-bold ${slide.isActive ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white'}`}
                      >
                        {slide.isActive ? 'Hide' : 'Show'}
                      </button>
                      <button 
                        onClick={() => handleDeleteSlide(slide.id)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                    {/* Status Badge */}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${slide.isActive ? 'bg-green-500 text-white' : 'bg-gray-500 text-gray-200'}`}>
                        {slide.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{slide.title || 'No Title'}</h3>
                    <p className="text-gray-400 text-sm">{slide.subtitle || 'No Subtitle'}</p>
                  </div>
                </div>
              ))}
              {carouselSlides.length === 0 && (
                <div className="col-span-full text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
                  <FilmIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-300">No slides found</h3>
                  <p className="text-gray-500 mt-2">Add a new slide to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Discounts View */}
        {activeTab === 'discounts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">Manage Discounts</h1>
              <button 
                onClick={handleClearAllDiscounts}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <TrashIcon className="h-5 w-5" />
                Clear All Discounts
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Apply Discount Form */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 h-fit">
                <h2 className="text-xl font-bold text-white mb-6">Apply New Discount</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Discount Percentage (%)</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="100" 
                      value={discountPercentage} 
                      onChange={(e) => setDiscountPercentage(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Apply To</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="discountTarget" 
                          value="all" 
                          checked={discountTarget === 'all'} 
                          onChange={(e) => setDiscountTarget(e.target.value)}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-gray-300">All Products</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="discountTarget" 
                          value="selected" 
                          checked={discountTarget === 'selected'} 
                          onChange={(e) => setDiscountTarget(e.target.value)}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-gray-300">Selected Products</span>
                      </label>
                    </div>
                  </div>

                  {discountTarget === 'selected' && (
                    <div className="border border-gray-600 rounded-lg max-h-60 overflow-y-auto p-2 space-y-1">
                      {products.map(product => (
                        <label key={product.id} className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={selectedProductIds.includes(product.id)}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedProductIds([...selectedProductIds, product.id]);
                              else setSelectedProductIds(selectedProductIds.filter(id => id !== product.id));
                            }}
                            className="rounded border-gray-600 bg-gray-700 text-primary focus:ring-primary"
                          />
                          <span className="text-gray-300 text-sm">{product.name}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  <button 
                    onClick={handleApplyDiscount}
                    className="w-full bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Apply Discount
                  </button>
                </div>
              </div>

              {/* Active Discounts List */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Active Discounts</h2>
                <div className="overflow-y-auto max-h-[600px] pr-2">
                  {products.filter(p => p.discountPercentage > 0).length > 0 ? (
                    <div className="space-y-3">
                      {products.filter(p => p.discountPercentage > 0).map(product => (
                        <div key={product.id} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg border border-gray-600">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt="" className="h-10 w-10 rounded object-cover bg-gray-800" />
                            <div>
                              <p className="font-medium text-white">{product.name}</p>
                              <p className="text-xs text-green-400">{product.discountPercentage}% Off</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-400 line-through">Rs {product.price.toLocaleString()}</p>
                              <p className="text-sm font-bold text-white">Rs {product.salePrice?.toLocaleString()}</p>
                            </div>
                            <button 
                              onClick={() => handleRemoveProductDiscount(product.id)}
                              className="text-gray-400 hover:text-red-400 p-1"
                              title="Remove Discount"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">No active discounts.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Product Modal */}
      <Transition appear show={isProductModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsProductModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-800 p-8 text-left align-middle shadow-2xl transition-all border border-gray-700">
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-white flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                    {editingId ? 'Edit Product' : 'Add Product'}
                    <button onClick={() => setIsProductModalOpen(false)} className="text-gray-400 hover:text-white">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </Dialog.Title>
                  
                  <form onSubmit={handleSaveProduct} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <FormInput 
                          label="Product Name" 
                          id="name" 
                          value={newProduct.name} 
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          placeholder="e.g. VooPoo Drag X"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                        <CustomDropdown 
                          options={categories.map(c => ({ label: c.name, value: c.value }))} 
                          selected={newProduct.category} 
                          setSelected={(val) => setNewProduct({...newProduct, category: val})} 
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Brand</label>
                        <CustomDropdown 
                          options={[
                            { label: 'Select Brand', value: '' },
                            ...brands
                              .filter(b => b.categories.some(c => c.value === newProduct.category || c.name === newProduct.category))
                              .map(b => ({ label: b.name, value: b.name }))
                          ]} 
                          selected={newProduct.brand} 
                          setSelected={(val) => setNewProduct({...newProduct, brand: val})} 
                        />
                        {newProduct.category && brands.filter(b => b.categories.some(c => c.value === newProduct.category || c.name === newProduct.category)).length === 0 && (
                          <p className="text-xs text-yellow-500 mt-1">No brands linked to this category.</p>
                        )}
                      </div>

                      <FormInput 
                        label="Colours (comma separated)" 
                        id="colors" 
                        value={newProduct.colors} 
                        onChange={(e) => setNewProduct({...newProduct, colors: e.target.value})}
                        placeholder="Red, Blue, Green"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <FormInput 
                        label="Price (Rs)" 
                        id="price" 
                        type="number"
                        value={newProduct.price} 
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        placeholder="0"
                      />
                      <FormInput 
                        label="Stock" 
                        id="stock" 
                        type="number"
                        value={newProduct.stock} 
                        onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                      <textarea
                        id="description"
                        rows={3}
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        className="checkout-input"
                        placeholder="Detailed product description..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Product Images</label>
                      
                      {/* Upload Area */}
                      <div className="flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10 hover:bg-gray-700/30 transition-colors relative">
                        <div className="text-center">
                          <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" />
                          <div className="mt-4 flex text-sm leading-6 text-gray-400 justify-center">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-gray-800 font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-hover"
                            >
                              <span>Upload files</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleImageUpload} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>

                      {/* Image Previews */}
                      {newProduct.images.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-4">
                          {newProduct.images.map((img, index) => (
                            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
                              <img src={img} alt={`Product ${index}`} className="h-full w-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <XMarkIcon className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-700">
                      <button
                        type="button"
                        onClick={() => setIsProductModalOpen(false)}
                        className="rounded-md border border-gray-600 bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 focus:outline-none"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md border border-transparent bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        {editingId ? 'Save Changes' : 'Add Product'}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Add Category Modal */}
      <Transition appear show={isCategoryModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsCategoryModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all border border-gray-700">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white flex justify-between items-center mb-4">
                    Add New Category
                    <button onClick={() => setIsCategoryModalOpen(false)} className="text-gray-400 hover:text-white">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </Dialog.Title>
                  
                  <form onSubmit={handleAddCategory} className="space-y-4">
                    <FormInput label="Category Name" id="categoryName" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="e.g. Mods" />
                    <div className="mt-6">
                      <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Add Category</button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Add Brand Modal */}
      <Transition appear show={isBrandModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsBrandModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all border border-gray-700">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white flex justify-between items-center mb-4">
                    {editingId ? 'Edit Brand' : 'Add New Brand'}
                    <button onClick={() => setIsBrandModalOpen(false)} className="text-gray-400 hover:text-white">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </Dialog.Title>
                  
                  <form onSubmit={handleSaveBrand} className="space-y-4">
                    <FormInput label="Brand Name" id="brandName" value={newBrand.name} onChange={(e) => setNewBrand({...newBrand, name: e.target.value})} placeholder="e.g. VooPoo" />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Brand Logo</label>
                      <input type="file" accept="image/*" onChange={handleBrandImageUpload} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover" />
                      {newBrand.image && <img src={newBrand.image} alt="Preview" className="mt-2 h-16 object-contain bg-white rounded p-1" />}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Link to Categories</label>
                      <div className="space-y-2 max-h-40 overflow-y-auto p-2 border border-gray-700 rounded-md">
                        {categories.map(cat => (
                          <label key={cat.id} className="flex items-center space-x-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={newBrand.categoryIds.includes(cat.id)}
                              onChange={(e) => {
                                if (e.target.checked) setNewBrand({...newBrand, categoryIds: [...newBrand.categoryIds, cat.id]});
                                else setNewBrand({...newBrand, categoryIds: newBrand.categoryIds.filter(id => id !== cat.id)});
                              }}
                              className="rounded border-gray-600 bg-gray-700 text-primary focus:ring-primary" 
                            />
                            <span className="text-gray-300">{cat.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                        {editingId ? 'Save Changes' : 'Add Brand'}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Add Carousel Slide Modal */}
      <Transition appear show={isCarouselModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsCarouselModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all border border-gray-700">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white flex justify-between items-center mb-4">
                    Add New Slide
                    <button onClick={() => setIsCarouselModalOpen(false)} className="text-gray-400 hover:text-white"><XMarkIcon className="h-6 w-6" /></button>
                  </Dialog.Title>
                  <form onSubmit={handleAddSlide} className="space-y-4">
                    <FormInput label="Title" id="slideTitle" value={newSlide.title} onChange={(e) => setNewSlide({...newSlide, title: e.target.value})} placeholder="e.g. New Arrivals" />
                    <FormInput label="Subtitle" id="slideSubtitle" value={newSlide.subtitle} onChange={(e) => setNewSlide({...newSlide, subtitle: e.target.value})} placeholder="e.g. Check out the latest gear" />
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Slide Image</label>
                      <input type="file" accept="image/*" onChange={handleSlideImageUpload} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover" />
                      {newSlide.image && <img src={newSlide.image} alt="Preview" className="mt-2 h-32 w-full object-cover rounded border border-gray-600" />}
                    </div>
                    <div className="mt-6">
                      <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Add Slide</button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AdminPanel;