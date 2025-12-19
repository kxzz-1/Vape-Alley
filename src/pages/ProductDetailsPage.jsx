import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { StarIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import FormInput from '../components/FormInput';

const formatPrice = (num) => `Rs ${num.toLocaleString()}`;

const StarRating = ({ rating, reviewCount }) => (
  <div className="flex items-center">
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`h-5 w-5 ${rating > i ? 'text-yellow-400' : 'text-gray-600'}`}
        />
      ))}
    </div>
    <p className="ml-2 text-sm text-gray-400">{rating} ({reviewCount} reviews)</p>
  </div>
);

const ProductDetailsPage = ({ addToCart = () => {} }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [newReview, setNewReview] = useState({ user: '', rating: 5, comment: '' });

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        const [productRes, reviewsRes] = await Promise.all([
          fetch(`http://localhost:3000/api/products/${productId}`),
          fetch(`http://localhost:3000/api/reviews/${productId}`)
        ]);

        if (productRes.ok) {
          const productData = await productRes.json();
          setProduct(productData);
          const initialImage = (productData.images && productData.images.length > 0) ? productData.images[0] : productData.image;
          setActiveImage(initialImage);
          if (productData.colors && productData.colors.length > 0) {
            setSelectedColor(productData.colors[0]);
          }
        }

        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndReviews();
  }, [productId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newReview, productId })
      });
      if (res.ok) {
        const savedReview = await res.json();
        setReviews([savedReview, ...reviews]);
        setNewReview({ user: '', rating: 5, comment: '' });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center text-white">Product not found</div>;

  const images = (product.images && product.images.length > 0) ? product.images : [product.image];
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-accent">Home</Link>
        <ChevronRightIcon className="h-4 w-4 mx-2" />
        <Link to="/products/all" className="hover:text-accent">Products</Link>
        <ChevronRightIcon className="h-4 w-4 mx-2" />
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square rounded-xl bg-gray-900/50 p-4 overflow-hidden shadow-lg">
            <img src={activeImage} alt={product.name} className="w-full h-full object-contain" />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${activeImage === img ? 'border-accent' : 'border-transparent'}`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">{product.name}</h1>
          <div className="mt-3">
            <StarRating rating={averageRating} reviewCount={reviews.length} />
          </div>

          <div className="mt-4">
            <p className="text-3xl text-accent">
              {product.salePrice ? (
                <>
                  <span>{formatPrice(product.salePrice)}</span>
                  <span className="ml-4 text-xl text-gray-500 line-through">{formatPrice(product.price)}</span>
                </>
              ) : (
                formatPrice(product.price)
              )}
            </p>
          </div>

          {/* Variants */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-300">Color</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-sm rounded-full border-2 transition-colors ${selectedColor === color ? 'bg-primary border-primary text-white' : 'border-gray-600 hover:border-accent text-gray-300'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="mt-8 flex items-center gap-x-6">
            {/* Quantity Selector */}
            <div className="flex items-center border border-primary/50 rounded-full">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-accent rounded-l-full hover:bg-primary/20">-</button>
              <span className="px-4 py-2 text-white font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-accent rounded-r-full hover:bg-primary/20">+</button>
            </div>
            <button
              onClick={() => addToCart({ ...product, selectedColor }, quantity)}
              className="flex-1 flex items-center justify-center gap-x-3 py-3 rounded-full bg-primary hover:bg-primary-hover transition-colors text-white font-bold text-lg"
            >
              <ShoppingCartIcon className="h-6 w-6" /> Add to Cart
            </button>
          </div>
          <button className="mt-4 w-full py-3 rounded-full bg-accent hover:bg-opacity-80 transition-colors text-background font-bold text-lg">
            Buy It Now
          </button>
        </div>
      </div>

      {/* Description, Specs, Reviews Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button onClick={() => setActiveTab('description')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-accent text-accent' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}>Description</button>
            <button onClick={() => setActiveTab('reviews')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-accent text-accent' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}>Reviews</button>
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'description' && (
            <div className="prose prose-invert max-w-none text-gray-300">
              <p>{product.description || 'No description available.'}</p>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Review Form */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Write a Review</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput 
                      label="Your Name" 
                      id="reviewUser" 
                      value={newReview.user} 
                      onChange={(e) => setNewReview({...newReview, user: e.target.value})} 
                      placeholder="John Doe"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Rating</label>
                      <select 
                        value={newReview.rating} 
                        onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
                        className="checkout-input"
                      >
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Good</option>
                        <option value="3">3 - Average</option>
                        <option value="2">2 - Poor</option>
                        <option value="1">1 - Terrible</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Review</label>
                    <textarea rows="3" className="checkout-input" placeholder="Share your thoughts..." value={newReview.comment} onChange={(e) => setNewReview({...newReview, comment: e.target.value})} required></textarea>
                  </div>
                  <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-full font-medium transition-colors">Submit Review</button>
                </form>
              </div>

              {/* Reviews List */}
              {reviews.map(review => (
                <div key={review.id} className="flex flex-col sm:flex-row gap-x-6">
                  <div className="flex-shrink-0 mb-4 sm:mb-0">
                    <p className="font-bold text-white">{review.user}</p>
                    <div className="mt-1">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  <div className="text-gray-300">
                    <p>{review.comment}</p>
                  </div>
                </div>
              ))}
              {reviews.length === 0 && <p className="text-gray-400">No reviews yet. Be the first to review!</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
