-- ================================================
-- BYTE TECH BD - DEMO SEED DATA
-- ⚠️ This is DEMO DATA for development/testing only
-- ================================================

-- Insert demo products (requires categories and brands to exist)
-- Run AFTER the initial schema migration

DO $$
DECLARE
  cat_new_laptops UUID;
  cat_used_laptops UUID;
  cat_desktop UUID;
  cat_gaming UUID;
  cat_components UUID;
  cat_accessories UUID;
  brand_dell UUID;
  brand_hp UUID;
  brand_lenovo UUID;
  brand_asus UUID;
  brand_acer UUID;
  brand_msi UUID;
  brand_apple UUID;
  brand_corsair UUID;
  brand_logitech UUID;
  p_id UUID;
BEGIN
  -- Get category IDs
  SELECT id INTO cat_new_laptops FROM public.categories WHERE slug = 'new-laptops';
  SELECT id INTO cat_used_laptops FROM public.categories WHERE slug = 'used-laptops';
  SELECT id INTO cat_desktop FROM public.categories WHERE slug = 'desktop-pcs';
  SELECT id INTO cat_gaming FROM public.categories WHERE slug = 'gaming-pcs';
  SELECT id INTO cat_components FROM public.categories WHERE slug = 'pc-components';
  SELECT id INTO cat_accessories FROM public.categories WHERE slug = 'accessories';

  -- Get brand IDs
  SELECT id INTO brand_dell FROM public.brands WHERE slug = 'dell';
  SELECT id INTO brand_hp FROM public.brands WHERE slug = 'hp';
  SELECT id INTO brand_lenovo FROM public.brands WHERE slug = 'lenovo';
  SELECT id INTO brand_asus FROM public.brands WHERE slug = 'asus';
  SELECT id INTO brand_acer FROM public.brands WHERE slug = 'acer';
  SELECT id INTO brand_msi FROM public.brands WHERE slug = 'msi';
  SELECT id INTO brand_apple FROM public.brands WHERE slug = 'apple';
  SELECT id INTO brand_corsair FROM public.brands WHERE slug = 'corsair';
  SELECT id INTO brand_logitech FROM public.brands WHERE slug = 'logitech';

  -- ========== NEW LAPTOPS ==========

  -- Dell Inspiron 15
  INSERT INTO public.products (name, slug, sku, description, short_description, category_id, brand_id, price, discounted_price, stock_quantity, condition, is_featured, is_published)
  VALUES ('Dell Inspiron 15 3520', 'dell-inspiron-15-3520', 'DI15-3520-001',
    'The Dell Inspiron 15 3520 is a versatile laptop perfect for everyday computing, office work, and entertainment. Featuring the latest Intel processor and ample storage, it delivers reliable performance in a sleek design. [DEMO DATA]',
    'Versatile 15.6" laptop for everyday computing',
    cat_new_laptops, brand_dell, 62000, 58500, 15, 'new', true, true)
  RETURNING id INTO p_id;

  INSERT INTO public.product_specifications (product_id, spec_key, spec_value, sort_order) VALUES
    (p_id, 'Processor', 'Intel Core i5-1235U (12th Gen)', 1),
    (p_id, 'RAM', '8GB DDR4 3200MHz', 2),
    (p_id, 'Storage', '512GB NVMe SSD', 3),
    (p_id, 'Display', '15.6" FHD (1920x1080) Anti-Glare', 4),
    (p_id, 'Graphics', 'Intel Iris Xe Graphics', 5),
    (p_id, 'Battery', '41Wh, up to 7 hours', 6),
    (p_id, 'OS', 'Windows 11 Home', 7),
    (p_id, 'Weight', '1.65 kg', 8);

  -- HP Pavilion 14
  INSERT INTO public.products (name, slug, sku, description, short_description, category_id, brand_id, price, discounted_price, stock_quantity, condition, is_featured, is_published)
  VALUES ('HP Pavilion 14-dv2000', 'hp-pavilion-14-dv2000', 'HP-PAV14-001',
    'Slim and stylish, the HP Pavilion 14 combines portability with performance. Its vibrant display and long battery life make it ideal for students and professionals on the go. [DEMO DATA]',
    'Slim 14" laptop for students and professionals',
    cat_new_laptops, brand_hp, 72000, NULL, 10, 'new', true, true)
  RETURNING id INTO p_id;

  INSERT INTO public.product_specifications (product_id, spec_key, spec_value, sort_order) VALUES
    (p_id, 'Processor', 'Intel Core i7-1255U (12th Gen)', 1),
    (p_id, 'RAM', '16GB DDR4 3200MHz', 2),
    (p_id, 'Storage', '512GB PCIe NVMe SSD', 3),
    (p_id, 'Display', '14" FHD IPS (1920x1080)', 4),
    (p_id, 'Graphics', 'Intel Iris Xe Graphics', 5),
    (p_id, 'Battery', '43Wh, up to 8.5 hours', 6),
    (p_id, 'OS', 'Windows 11 Home', 7),
    (p_id, 'Weight', '1.41 kg', 8);

  -- Lenovo IdeaPad Slim 3
  INSERT INTO public.products (name, slug, sku, description, short_description, category_id, brand_id, price, discounted_price, stock_quantity, condition, is_featured, is_published)
  VALUES ('Lenovo IdeaPad Slim 3 15IRU8', 'lenovo-ideapad-slim-3-15iru8', 'LEN-IPS3-001',
    'The Lenovo IdeaPad Slim 3 offers excellent value with its powerful processor and lightweight design. Perfect for daily productivity and entertainment needs. [DEMO DATA]',
    'Lightweight 15.6" laptop with excellent value',
    cat_new_laptops, brand_lenovo, 55000, 51000, 20, 'new', false, true)
  RETURNING id INTO p_id;

  INSERT INTO public.product_specifications (product_id, spec_key, spec_value, sort_order) VALUES
    (p_id, 'Processor', 'Intel Core i5-1335U (13th Gen)', 1),
    (p_id, 'RAM', '8GB DDR4 3200MHz', 2),
    (p_id, 'Storage', '256GB NVMe SSD', 3),
    (p_id, 'Display', '15.6" FHD (1920x1080) TN', 4),
    (p_id, 'Graphics', 'Intel UHD Graphics', 5),
    (p_id, 'Battery', '38Wh, up to 7 hours', 6),
    (p_id, 'OS', 'Windows 11 Home', 7),
    (p_id, 'Weight', '1.62 kg', 8);

  -- ASUS VivoBook 15
  INSERT INTO public.products (name, slug, sku, description, short_description, category_id, brand_id, price, stock_quantity, condition, is_featured, is_published)
  VALUES ('ASUS VivoBook 15 X1504ZA', 'asus-vivobook-15-x1504za', 'ASUS-VB15-001',
    'The ASUS VivoBook 15 delivers a perfect blend of performance and portability with its ErgoLift hinge design and NanoEdge display. [DEMO DATA]',
    'Performance-focused 15.6" everyday laptop',
    cat_new_laptops, brand_asus, 59000, 12, 'new', false, true)
  RETURNING id INTO p_id;

  INSERT INTO public.product_specifications (product_id, spec_key, spec_value, sort_order) VALUES
    (p_id, 'Processor', 'Intel Core i5-1240P (12th Gen)', 1),
    (p_id, 'RAM', '8GB DDR4', 2),
    (p_id, 'Storage', '512GB SSD', 3),
    (p_id, 'Display', '15.6" FHD NanoEdge', 4),
    (p_id, 'Graphics', 'Intel Iris Xe', 5),
    (p_id, 'Battery', '42Wh', 6);

  -- ========== USED LAPTOPS ==========

  -- Used ThinkPad
  INSERT INTO public.products (name, slug, sku, description, short_description, category_id, brand_id, price, discounted_price, stock_quantity, condition, condition_grade, condition_notes, battery_health, testing_notes, warranty_info, is_featured, is_published)
  VALUES ('Lenovo ThinkPad T480 (Used)', 'lenovo-thinkpad-t480-used', 'LEN-T480-U001',
    'Well-maintained Lenovo ThinkPad T480 in excellent condition. This business-class laptop has been thoroughly tested and cleaned. Ideal for professionals and students looking for a reliable workhorse. [DEMO DATA]',
    'Business-class used laptop in excellent condition',
    cat_used_laptops, brand_lenovo, 35000, 32000, 5, 'used', 'A', 'Minor cosmetic wear on palm rest, screen in perfect condition', '82%', 'All ports tested and working. Keyboard and trackpad in excellent condition. No dead pixels.', '3-month Byte Tech BD warranty', true, true)
  RETURNING id INTO p_id;

  INSERT INTO public.product_specifications (product_id, spec_key, spec_value, sort_order) VALUES
    (p_id, 'Processor', 'Intel Core i5-8350U (8th Gen)', 1),
    (p_id, 'RAM', '16GB DDR4', 2),
    (p_id, 'Storage', '256GB SSD', 3),
    (p_id, 'Display', '14" FHD IPS (1920x1080)', 4),
    (p_id, 'Graphics', 'Intel UHD 620', 5),
    (p_id, 'Battery', 'Dual battery system', 6);

  -- Used HP EliteBook
  INSERT INTO public.products (name, slug, sku, description, short_description, category_id, brand_id, price, stock_quantity, condition, condition_grade, condition_notes, battery_health, testing_notes, warranty_info, defects, is_published)
  VALUES ('HP EliteBook 840 G5 (Used)', 'hp-elitebook-840-g5-used', 'HP-EB840-U001',
    'HP EliteBook 840 G5 in good condition. Premium build quality with aluminum chassis. Tested and ready for use. [DEMO DATA]',
    'Premium business laptop in good condition',
    cat_used_laptops, brand_hp, 28000, 3, 'used', 'B+', 'Light scratches on lid, keyboard slightly worn', '75%', 'All functions working correctly. WiFi, Bluetooth, webcam all tested.', '2-month Byte Tech BD warranty', 'Small dent on bottom-left corner of lid (cosmetic only)', true)
  RETURNING id INTO p_id;

  INSERT INTO public.product_specifications (product_id, spec_key, spec_value, sort_order) VALUES
    (p_id, 'Processor', 'Intel Core i5-8250U (8th Gen)', 1),
    (p_id, 'RAM', '8GB DDR4', 2),
    (p_id, 'Storage', '256GB SSD', 3),
    (p_id, 'Display', '14" FHD (1920x1080)', 4),
    (p_id, 'Graphics', 'Intel UHD 620', 5);

  -- Used Dell Latitude
  INSERT INTO public.products (name, slug, sku, description, short_description, category_id, brand_id, price, stock_quantity, condition, condition_grade, condition_notes, battery_health, testing_notes, warranty_info, is_published)
  VALUES ('Dell Latitude 5490 (Used)', 'dell-latitude-5490-used', 'DELL-L5490-U001',
    'Dell Latitude 5490 in excellent condition. Enterprise-grade laptop with robust build quality and security features. [DEMO DATA]',
    'Enterprise-grade used laptop, excellent condition',
    cat_used_laptops, brand_dell, 30000, 4, 'used', 'A+', 'Near-mint condition, barely used', '90%', 'Thoroughly tested. Fingerprint reader working. All ports functional.', '3-month Byte Tech BD warranty', true)
  RETURNING id INTO p_id;

  INSERT INTO public.product_specifications (product_id, spec_key, spec_value, sort_order) VALUES
    (p_id, 'Processor', 'Intel Core i7-8650U (8th Gen)', 1),
    (p_id, 'RAM', '16GB DDR4', 2),
    (p_id, 'Storage', '512GB SSD', 3),
    (p_id, 'Display', '14" FHD IPS', 4),
    (p_id, 'Graphics', 'Intel UHD 620', 5);

  -- ========== DESKTOP PCs ==========

  INSERT INTO public.products (name, slug, sku, description, short_description, category_id, brand_id, price, discounted_price, stock_quantity, condition, is_featured, is_published)
  VALUES ('Byte Tech Office Pro Desktop', 'byte-tech-office-pro', 'BT-OFPRO-001',
    'Custom-built office desktop PC by Byte Tech BD. Designed for productivity, multitasking, and reliability. Comes with 1-year warranty and free assembly. [DEMO DATA]',
    'Custom office desktop for productivity',
    cat_desktop, NULL, 45000, 42000, 8, 'new', true, true)
  RETURNING id INTO p_id;

  INSERT INTO public.product_specifications (product_id, spec_key, spec_value, sort_order) VALUES
    (p_id, 'Processor', 'Intel Core i5-12400 (12th Gen)', 1),
    (p_id, 'RAM', '16GB DDR4 3200MHz', 2),
    (p_id, 'Storage', '256GB NVMe SSD + 1TB HDD', 3),
    (p_id, 'Graphics', 'Intel UHD 730', 4),
    (p_id, 'Motherboard', 'Gigabyte H610M', 5),
    (p_id, 'PSU', '450W 80+ Bronze', 6),
    (p_id, 'Case', 'Mid-Tower ATX with tempered glass', 7);

  -- ========== GAMING PCs ==========

  INSERT INTO public.products (name, slug, sku, description, short_description, category_id, brand_id, price, discounted_price, stock_quantity, condition, is_featured, is_published)
  VALUES ('MSI Katana 15 B13VFK', 'msi-katana-15-b13vfk', 'MSI-KAT15-001',
    'The MSI Katana 15 is a powerful gaming laptop featuring NVIDIA RTX 4060 graphics and a 144Hz display. Dominate every game with incredible performance and immersive visuals. [DEMO DATA]',
    'Powerful gaming laptop with RTX 4060',
    cat_gaming, brand_msi, 125000, 118000, 6, 'new', true, true)
  RETURNING id INTO p_id;

  INSERT INTO public.product_specifications (product_id, spec_key, spec_value, sort_order) VALUES
    (p_id, 'Processor', 'Intel Core i7-13620H (13th Gen)', 1),
    (p_id, 'RAM', '16GB DDR5 4800MHz', 2),
    (p_id, 'Storage', '512GB NVMe SSD', 3),
    (p_id, 'Display', '15.6" FHD 144Hz IPS', 4),
    (p_id, 'Graphics', 'NVIDIA GeForce RTX 4060 8GB', 5),
    (p_id, 'Battery', '53.5Wh', 6),
    (p_id, 'OS', 'Windows 11 Home', 7);

  INSERT INTO public.products (name, slug, sku, description, short_description, category_id, brand_id, price, stock_quantity, condition, is_featured, is_published)
  VALUES ('ASUS TUF Gaming F15 FX507', 'asus-tuf-gaming-f15-fx507', 'ASUS-TUF15-001',
    'Built tough for serious gaming. The ASUS TUF Gaming F15 features military-grade durability, powerful specs, and advanced cooling for marathon gaming sessions. [DEMO DATA]',
    'Durable gaming laptop with military-grade build',
    cat_gaming, brand_asus, 105000, 8, 'new', false, true)
  RETURNING id INTO p_id;

  INSERT INTO public.product_specifications (product_id, spec_key, spec_value, sort_order) VALUES
    (p_id, 'Processor', 'Intel Core i5-12500H (12th Gen)', 1),
    (p_id, 'RAM', '16GB DDR4 3200MHz', 2),
    (p_id, 'Storage', '512GB PCIe SSD', 3),
    (p_id, 'Display', '15.6" FHD 144Hz', 4),
    (p_id, 'Graphics', 'NVIDIA GeForce RTX 4050 6GB', 5),
    (p_id, 'Battery', '56Wh', 6);

  -- Byte Tech Gaming Desktop
  INSERT INTO public.products (name, slug, sku, description, short_description, category_id, brand_id, price, discounted_price, stock_quantity, condition, is_featured, is_published)
  VALUES ('Byte Tech Storm Gaming PC', 'byte-tech-storm-gaming-pc', 'BT-STORM-001',
    'Ultimate custom gaming desktop by Byte Tech BD. Built with premium components for 1440p gaming excellence. RGB lighting, liquid cooling, and a premium tempered glass case. [DEMO DATA]',
    'Custom gaming desktop for 1440p gaming',
    cat_gaming, NULL, 175000, 165000, 3, 'new', true, true)
  RETURNING id INTO p_id;

  INSERT INTO public.product_specifications (product_id, spec_key, spec_value, sort_order) VALUES
    (p_id, 'Processor', 'AMD Ryzen 7 7700X', 1),
    (p_id, 'RAM', '32GB DDR5 5600MHz', 2),
    (p_id, 'Storage', '1TB NVMe Gen4 SSD', 3),
    (p_id, 'Graphics', 'NVIDIA GeForce RTX 4070 12GB', 4),
    (p_id, 'Motherboard', 'ASUS TUF Gaming B650-PLUS', 5),
    (p_id, 'PSU', '750W 80+ Gold Fully Modular', 6),
    (p_id, 'Cooling', '240mm AIO Liquid Cooler', 7),
    (p_id, 'Case', 'NZXT H5 Flow RGB', 8);

  -- ========== PC COMPONENTS ==========

  INSERT INTO public.products (name, slug, sku, description, short_description, category_id, brand_id, price, discounted_price, stock_quantity, condition, is_published)
  VALUES ('Corsair Vengeance LPX 16GB DDR4', 'corsair-vengeance-lpx-16gb-ddr4', 'COR-VEN16-001',
    'High-performance DDR4 memory designed for overclocking. XMP 2.0 support for automatic overclocking. [DEMO DATA]',
    '16GB (2x8GB) DDR4 3200MHz RAM Kit',
    cat_components, brand_corsair, 5500, 4800, 25, 'new', true)
  RETURNING id INTO p_id;

  INSERT INTO public.product_specifications (product_id, spec_key, spec_value, sort_order) VALUES
    (p_id, 'Type', 'DDR4', 1),
    (p_id, 'Speed', '3200MHz', 2),
    (p_id, 'Capacity', '16GB (2x8GB)', 3),
    (p_id, 'Latency', 'CL16', 4);

  INSERT INTO public.products (name, slug, sku, description, short_description, category_id, brand_id, price, stock_quantity, condition, is_published)
  VALUES ('Samsung 970 EVO Plus 500GB NVMe SSD', 'samsung-970-evo-plus-500gb', 'SAM-970E-500',
    'Blazing-fast NVMe SSD with read speeds up to 3,500MB/s. Perfect for OS drive and frequently used applications. [DEMO DATA]',
    '500GB NVMe M.2 SSD',
    cat_components, NULL, 6200, 18, 'new', true)
  RETURNING id INTO p_id;

  INSERT INTO public.product_specifications (product_id, spec_key, spec_value, sort_order) VALUES
    (p_id, 'Capacity', '500GB', 1),
    (p_id, 'Interface', 'PCIe Gen 3.0 x4 NVMe', 2),
    (p_id, 'Read Speed', 'Up to 3,500 MB/s', 3),
    (p_id, 'Write Speed', 'Up to 3,200 MB/s', 4);

  -- ========== ACCESSORIES ==========

  INSERT INTO public.products (name, slug, sku, description, short_description, category_id, brand_id, price, discounted_price, stock_quantity, condition, is_published)
  VALUES ('Logitech MX Master 3S Wireless Mouse', 'logitech-mx-master-3s', 'LOG-MXM3S-001',
    'The ultimate productivity mouse with 8K DPI tracking, quiet clicks, and USB-C quick charging. Works on any surface including glass. [DEMO DATA]',
    'Premium wireless productivity mouse',
    cat_accessories, brand_logitech, 9500, 8800, 12, 'new', true)
  RETURNING id INTO p_id;

  INSERT INTO public.product_specifications (product_id, spec_key, spec_value, sort_order) VALUES
    (p_id, 'Sensor', '8K DPI Darkfield', 1),
    (p_id, 'Connectivity', 'Bluetooth + USB Receiver', 2),
    (p_id, 'Battery', 'Up to 70 days, USB-C charging', 3);

  INSERT INTO public.products (name, slug, sku, description, short_description, category_id, brand_id, price, stock_quantity, condition, is_published)
  VALUES ('Targus CityLite 15.6" Laptop Bag', 'targus-citylite-laptop-bag', 'TAR-CL156-001',
    'Slim, professional laptop bag with padded compartment for laptops up to 15.6". Multiple pockets for accessories and documents. [DEMO DATA]',
    'Professional 15.6" laptop carrying bag',
    cat_accessories, NULL, 2500, 30, 'new', true)
  RETURNING id INTO p_id;

  -- ========== DEMO COUPONS ==========

  INSERT INTO public.coupons (code, description, discount_type, discount_value, min_order_amount, max_discount_amount, is_active) VALUES
    ('WELCOME10', '[DEMO] 10% off on first order', 'percentage', 10, 2000, 5000, true),
    ('SAVE500', '[DEMO] Flat ৳500 off on orders above ৳5000', 'fixed', 500, 5000, NULL, true)
  ON CONFLICT (code) DO NOTHING;

  -- ========== DEMO BANNERS ==========

  INSERT INTO public.banners (title, subtitle, image_url, link_url, sort_order, is_active) VALUES
    ('Welcome to Byte Tech BD', 'Your Trusted Source for Laptops & PCs in Bangladesh', '/images/banners/hero-banner.jpg', '/products', 1, true),
    ('Used Laptops Starting from ৳15,000', 'Quality Tested & Warranty Included', '/images/banners/used-laptops-banner.jpg', '/products?category=used-laptops', 2, true),
    ('Custom Gaming PC Builds', 'Build Your Dream Gaming Setup', '/images/banners/gaming-banner.jpg', '/products?category=gaming-pcs', 3, true)
  ON CONFLICT DO NOTHING;

END $$;
