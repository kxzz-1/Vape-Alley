import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StarIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

// --- Sample Data (In a real app, this would be fetched from an API) ---
const sampleProduct = {
  id: 1,
  name: 'VooPoo Argus G3',
  images: ['/argus-g3.png', '/carousel1.jpg', '/carousel2.jpg', '/carousel3.jpg'],
  price: 9000,
  salePrice: 8099,
  rating: 4.5,
  reviewCount: 117,
  description:
    'The VooPoo Argus G3 is the latest in the acclaimed Argus series, offering a sleek design, powerful performance, and a long-lasting battery. Perfect for both beginners and experienced vapers, it delivers exceptional flavor and vapor production with its advanced GENE.AI chipset.',
  variants: [
    { type: 'Color', options: ['Satin Blue', 'Space Grey', 'Racing Green', 'Gloss Black'] },
    { type: 'Style', options: ['Standard', 'Limited Edition'] },
  ],
  specifications: [
    { name: 'Output Power', value: '5-30W' },
    { name: 'Battery', value: '1000mAh (Built-in)' },
    { name: 'Pod Capacity', value: '2ml' },
    { name: 'Charging', value: 'USB Type-C' },
    { name: 'Material', value: 'Zinc Alloy + PCTG' },
  ],
  reviews: [
    { id: 1, author: 'Ali R.', rating: 5, text: 'Amazing device! The flavor is top-notch and the battery lasts all day. Highly recommended.' },
    { id: 2, author: 'Fatima K.', rating: 4, text: 'Solid build quality and looks great. A bit heavier than my last pod, but worth it for the performance.' },
    { id: 3, author: 'Saad M.', rating: 5, text: 'Best pod system I have ever owned. The adjustable wattage is a game-changer.' },
  ],
};

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
  const product = sampleProduct; // Fetch product by productId in a real app

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [activeTab, setActiveTab] = useState('description');

  const handleVariantSelect = (type, option) => {
    setSelectedVariants(prev => ({ ...prev, [type]: option }));
  };

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
          <div className="grid grid-cols-4 gap-4 mt-4">
            {product.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${activeImage === img ? 'border-accent' : 'border-transparent'}`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">{product.name}</h1>
          <div className="mt-3">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
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
          <div className="mt-8 space-y-6">
            {product.variants.map(variant => (
              <div key={variant.type}>
                <h3 className="text-sm font-medium text-gray-300">{variant.type}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {variant.options.map(option => (
                    <button
                      key={option}
                      onClick={() => handleVariantSelect(variant.type, option)}
                      className={`px-4 py-2 text-sm rounded-full border-2 transition-colors ${selectedVariants[variant.type] === option ? 'bg-primary border-primary text-white' : 'border-gray-600 hover:border-accent text-gray-300'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quantity & Actions */}
          <div className="mt-8 flex items-center gap-x-6">
            {/* Quantity Selector */}
            <div className="flex items-center border border-primary/50 rounded-full">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-accent rounded-l-full hover:bg-primary/20">-</button>
              <span className="px-4 py-2 text-white font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-accent rounded-r-full hover:bg-primary/20">+</button>
            </div>
            <button
              onClick={() => addToCart(product, quantity)}
              className="flex-1 flex items-center justify-center gap-x-3 py-3 rounded-full bg-primary hover:bg-primary-hover transition-colors text-white font-bold text-lg"
            >
              <ShoppingCartIcon className="h-6 w-6" /> Add to Cart
            </button>
          </div>
          <Link to="/checkout">
            <button className="mt-4 w-full py-3 rounded-full bg-accent hover:bg-opacity-80 transition-colors text-background font-bold text-lg">
              Buy It Now
            </button>
          </Link>
        </div>
      </div>

      {/* Description, Specs, Reviews Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button onClick={() => setActiveTab('description')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-accent text-accent' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}>Description</button>
            <button onClick={() => setActiveTab('specs')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'specs' ? 'border-accent text-accent' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}>Specifications</button>
            <button onClick={() => setActiveTab('reviews')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-accent text-accent' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}>Reviews</button>
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'description' && (
            <div className="prose prose-invert max-w-none text-gray-300">
              <p>{product.description}</p>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="flow-root">
              <dl className="-my-3 divide-y divide-gray-700 text-sm">
                {product.specifications.map(spec => (
                  <div key={spec.name} className="grid grid-cols-3 gap-4 py-3">
                    <dt className="font-medium text-gray-300">{spec.name}</dt>
                    <dd className="col-span-2 text-gray-400">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {product.reviews.map(review => (
                <div key={review.id} className="flex flex-col sm:flex-row gap-x-6">
                  <div className="flex-shrink-0 mb-4 sm:mb-0">
                    <p className="font-bold text-white">{review.author}</p>
                    <div className="mt-1">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  <div className="text-gray-300">
                    <p>{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
