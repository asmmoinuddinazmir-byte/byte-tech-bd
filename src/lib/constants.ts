export const SITE_NAME = 'Byte Tech BD';
export const SITE_DESCRIPTION = 'Your trusted source for laptops, desktop PCs, gaming PCs, components, and accessories in Bangladesh.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const STORE_CONTACT = {
  phone: '+880 1700-000000',
  whatsapp: '+880 1700-000000',
  email: 'info@bytetechbd.com',
  address: 'Shop 402, Level 4, Multiplan Center, New Elephant Road, Dhaka-1205, Bangladesh',
  facebook: 'https://facebook.com/bytetechbd',
  instagram: 'https://instagram.com/bytetechbd',
  youtube: 'https://youtube.com',
  googleMaps: 'https://maps.google.com',
  hours: 'Saturday – Thursday: 10:00 AM – 8:30 PM (Friday Closed)',
};

export const CURRENCY = 'BDT';
export const CURRENCY_SYMBOL = '৳';

export const ITEMS_PER_PAGE = 12;
export const ADMIN_ITEMS_PER_PAGE = 20;

export const BD_DISTRICTS = [
  'Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal',
  'Sylhet', 'Rangpur', 'Mymensingh', 'Comilla', 'Gazipur',
  'Narayanganj', 'Narsingdi', 'Manikganj', 'Munshiganj', 'Tangail',
  'Kishoreganj', 'Netrokona', 'Sherpur', 'Jamalpur', 'Faridpur',
  'Gopalganj', 'Madaripur', 'Rajbari', 'Shariatpur',
  "Cox's Bazar", 'Bandarban', 'Rangamati', 'Khagrachari',
  'Brahmanbaria', 'Chandpur', 'Lakshmipur', 'Noakhali', 'Feni',
  'Bogra', 'Joypurhat', 'Naogaon', 'Natore', 'Nawabganj',
  'Pabna', 'Sirajganj', 'Dinajpur', 'Gaibandha', 'Kurigram',
  'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Thakurgaon',
  'Bagerhat', 'Chuadanga', 'Jessore', 'Jhenaidah', 'Kushtia',
  'Magura', 'Meherpur', 'Narail', 'Satkhira',
  'Barguna', 'Bhola', 'Jhalokathi', 'Patuakhali', 'Pirojpur',
  'Habiganj', 'Moulvibazar', 'Sunamganj',
];

export const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'confirmed', label: 'Confirmed', color: 'blue' },
  { value: 'processing', label: 'Processing', color: 'indigo' },
  { value: 'shipped', label: 'Shipped', color: 'purple' },
  { value: 'delivered', label: 'Delivered', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
] as const;

export const PRODUCT_CONDITIONS = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'refurbished', label: 'Refurbished' },
] as const;

export const CONDITION_GRADES = [
  { value: 'A+', label: 'A+ (Like New)', description: 'Virtually indistinguishable from new' },
  { value: 'A', label: 'A (Excellent)', description: 'Minor signs of use, fully functional' },
  { value: 'B+', label: 'B+ (Very Good)', description: 'Light wear, all features working' },
  { value: 'B', label: 'B (Good)', description: 'Moderate wear, fully functional' },
  { value: 'C', label: 'C (Fair)', description: 'Visible wear, functional with noted issues' },
] as const;

export const PAYMENT_METHODS = [
  { value: 'cod', label: 'Cash on Delivery', icon: 'Banknote' },
  { value: 'sslcommerz', label: 'Online Payment (SSLCommerz)', icon: 'CreditCard', disabled: true },
] as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'All Products' },
  { href: '/products?category=new-laptops', label: 'New Laptops' },
  { href: '/products?category=used-laptops', label: 'Used Laptops' },
  { href: '/products?category=desktop-pcs', label: 'Desktop PCs' },
  { href: '/products?category=gaming-pcs', label: 'Gaming PCs' },
  { href: '/products?category=pc-components', label: 'Components' },
  { href: '/products?category=accessories', label: 'Accessories' },
] as const;

export const FOOTER_LINKS = {
  shop: [
    { href: '/products?category=new-laptops', label: 'New Laptops' },
    { href: '/products?category=used-laptops', label: 'Used Laptops' },
    { href: '/products?category=desktop-pcs', label: 'Desktop PCs' },
    { href: '/products?category=gaming-pcs', label: 'Gaming PCs' },
    { href: '/products?category=pc-components', label: 'PC Components' },
    { href: '/products?category=accessories', label: 'Accessories' },
  ],
  support: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/order-tracking', label: 'Track Order' },
    { href: '/policies/shipping', label: 'Shipping Policy' },
    { href: '/policies/returns', label: 'Returns & Refunds' },
  ],
  legal: [
    { href: '/policies/privacy', label: 'Privacy Policy' },
    { href: '/policies/terms', label: 'Terms & Conditions' },
  ],
};

export const SPEC_KEYS = [
  'Processor', 'RAM', 'Storage', 'Display', 'Graphics',
  'Battery', 'OS', 'Weight', 'Motherboard', 'PSU',
  'Case', 'Cooling', 'Type', 'Speed', 'Capacity',
  'Latency', 'Interface', 'Read Speed', 'Write Speed',
  'Sensor', 'Connectivity',
];
