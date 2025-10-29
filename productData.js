// In a real app, this data would come from an API
export const allProducts = [
  // Devices
  { id: 1, name: 'VooPoo Argus G3', price: 9000, salePrice: 8099, image: '/argus-g3.png', category: 'Devices' },
  { id: 2, name: 'Uwell Caliburn G3', price: 8999, image: '/caliburn-g3.jpg', category: 'Devices' },
  { id: 3, name: 'OXVA Xlim SQ', price: 10629, salePrice: 9699, image: '/xlim-sq.png', category: 'Devices' },
  { id: 4, name: 'Oxva Xlim Pro', price: 8700, salePrice: 7830, image: '/xlim-pro.jpg', category: 'Devices' },
  { id: 5, name: 'VooPoo Argus G3 (New)', price: 3599, image: '/g3new.png', category: 'Devices' },
  { id: 6, name: 'Oxva Xlim Go', price: 4999, salePrice: 4499, image: '/oxva-xlim-go-pod-vape-kit-black.png', category: 'Devices' },
  { id: 7, name: 'Oxva Xlim Pro 2', price: 9999, salePrice: 8999, image: '/Oxva-xlim-pro-2-pod-vape-kit-Platinum-Black.png', category: 'Devices' },
  { id: 8, name: 'Oxva Nexlim Go', price: 6999, salePrice: 6299, image: '/Silky-Coffee-OXVA-Nexlim-Go.png', category: 'Devices' },

  // E-Juices
  { id: 9, name: 'DripDown Strawberry Milkshake', price: 1999, image: '/dripdown_Strawberry_Milkshake.png', category: 'E-Juices' },
  { id: 10, name: 'DripDown Vanilla Custurd', price: 2199, salePrice: 1899, image: '/dripdown_Vanilla_Custard.png', category: 'E-Juices' },
  { id: 11, name: 'Tokyo Super Cool Dragon Fruit Blackcurrant', price: 2499, image: '/Tokyo-Super-Cool-Dragon-Fruit-Blackcurrant.png', category: 'E-Juices' },
  { id: 12, name: 'Tokyo Super Cool Dragon Fruit Kiwi', price: 2499, salePrice: 2199, image: '/Tokyo-Super-Cool-Dragon-Fruit-kiwi.png', category: 'E-Juices' },
  { id: 13, name: 'UK Salts Iced Passion Fruit Lychee', price: 1599, image: '/UK_Salts_Iced_Passion_Fruit_Lychee.png', category: 'E-Juices' },
  { id: 14, name: 'UK Salts Iced Passion Fruit Mango', price: 1599, salePrice: 1399, image: '/UK_Salts_Iced_Passion_Fruit_Mango.png', category: 'E-Juices' },
  { id: 15, name: 'Vgod Apple Bomb', price: 1999, image: '/vgod_Apple-Bomb.png', category: 'E-Juices' },
  { id: 16, name: 'Vgod Lush Ice', price: 1999, salePrice: 1799, image: '/vgod_Lush-Ice-12mg.png', category: 'E-Juices' },

  // Disposables
  { id: 17, name: 'Elf Bar Watermelon 2000 puffs', price: 1599, image: '/elfbar_2000_watermelon.png', category: 'Disposables' },
  { id: 18, name: 'Elf Bar Blueberry 13000 puffs', price: 2499, salePrice: 2299, image: '/elfbar_13000_blueberry.png', category: 'Disposables' },
  { id: 19, name: 'Elf Bar Watermelon 13000 puffs', price: 2499, image: '/elfbar_13000_watermelon.png', category: 'Disposables' },
  { id: 20, name: 'Elf Bar Grape Ice 20000 puffs', price: 1599, salePrice: 1399, image: '/elfbar_20000_grapeice.png', category: 'Disposables' },
  { id: 21, name: 'IVG Rainbow 3000 puffs', price: 1299, image: '/ivg_3000_rainbow.png', category: 'Disposables' },
  { id: 22, name: 'IVG Red Apple 3000 puffs', price: 1299, salePrice: 1199, image: '/ivg_3000_redapple.png', category: 'Disposables' },
  { id: 23, name: 'IVG Berry Lemonade 6000 puffs', price: 1299, image: '/ivg_6000_beery_lemonade.png', category: 'Disposables' },
  { id: 24, name: 'IVG Blackcurrant Lemonade 6000 puffs', price: 1299, salePrice: 1199, image: '/ivg_6000_blackcurrant lemonade.png', category: 'Disposables' },

  // Accessories
  { id: 25, name: 'Replacement Coils', price: 999, image: 'https://via.placeholder.com/400x400/ffff00/000000?text=Coils', category: 'Accessories' },
];

export const productMap = new Map(allProducts.map(p => [p.id, p]));

export const categories = ['All', ...new Set(allProducts.map(p => p.category))];