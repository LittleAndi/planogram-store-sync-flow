
// Mock data for stores
export const mockStores = Array.from({ length: 75 }, (_, i) => {
  const storeId = `S-${(i + 1).toString().padStart(3, '0')}`;
  const categories = ['Small', 'Medium', 'Large', 'Flagship'];
  const regions = ['North Region', 'South Region', 'East Region', 'West Region', 'Central Region'];
  const storeNames = [
    'Downtown Store', 'Mall Location', 'Airport Shop', 'Suburban Branch', 'City Center',
    'Westside Plaza', 'Eastgate Mall', 'Northpark Store', 'Southview Branch', 'Metro Station',
    'Riverside Plaza', 'Highland Center', 'Valley Store', 'Crossroads Mall', 'Parkside Shop',
    'Uptown Branch', 'Midtown Center', 'Lakeside Store', 'Hillcrest Mall', 'Beacon Plaza',
    'Gateway Store', 'Capitol Branch', 'University Shop', 'Medical Center', 'Tech District',
    'Historic Quarter', 'Financial District', 'Arts District', 'Sports Complex', 'Convention Center'
  ];
  
  const baseName = storeNames[i % storeNames.length];
  const storeName = i >= storeNames.length ? `${baseName} ${Math.floor(i / storeNames.length) + 1}` : baseName;
  
  return {
    id: storeId,
    name: storeName,
    category: categories[i % categories.length],
    region: regions[i % regions.length],
    address: `${100 + i} Main Street, ${storeName.split(' ')[0]} City`,
    manager: `Manager ${String.fromCharCode(65 + (i % 26))}`,
    openDate: new Date(2020 + (i % 5), (i % 12), 1 + (i % 28)).toISOString().split('T')[0]
  };
});

// Mock data for products
export const mockProducts = Array.from({ length: 150 }, (_, i) => {
  const productNames = [
    'Coca-Cola 12oz', 'Pepsi 12oz', 'Sprite 12oz', 'Orange Crush', 'Dr Pepper',
    'Lays Original Chips', 'Doritos Nacho', 'Cheetos Puffs', 'Fritos Corn Chips', 'Pringles Original',
    'Snickers Bar', 'Kit Kat', 'Twix', 'Reese\'s Cups', 'M&Ms Peanut',
    'Wonder Bread', 'Skippy Peanut Butter', 'Jif Peanut Butter', 'Welch\'s Jelly', 'Heinz Ketchup',
    'Tide Detergent', 'Downy Fabric Softener', 'Bounty Paper Towels', 'Charmin Toilet Paper', 'Kleenex Tissues',
    'Colgate Toothpaste', 'Crest Toothpaste', 'Listerine Mouthwash', 'Head & Shoulders Shampoo', 'Pantene Shampoo',
    'Apple iPhone Case', 'Samsung Charger', 'Bluetooth Headphones', 'Phone Screen Protector', 'Car Charger',
    'Nike Running Shoes', 'Adidas Sneakers', 'Under Armour T-Shirt', 'Levi\'s Jeans', 'Champion Hoodie',
    'Tylenol Pain Relief', 'Advil Ibuprofen', 'Band-Aid Bandages', 'Neosporin Cream', 'Vitamin C Tablets'
  ];
  
  const brands = [
    'Coca-Cola', 'PepsiCo', 'Frito-Lay', 'Mars', 'Hershey\'s', 'Wonder', 'Skippy', 'Jif', 'Welch\'s', 'Heinz',
    'Procter & Gamble', 'Colgate', 'Johnson & Johnson', 'Nike', 'Adidas', 'Under Armour', 'Levi\'s', 'Champion'
  ];
  
  const categories = [
    'Beverages', 'Snacks', 'Candy', 'Bread & Bakery', 'Condiments', 'Household', 'Personal Care', 
    'Electronics', 'Apparel', 'Health & Wellness'
  ];
  
  return {
    id: `PRD-${(i + 1).toString().padStart(4, '0')}`,
    name: productNames[i % productNames.length],
    brand: brands[i % brands.length],
    category: categories[i % categories.length],
    sku: `SKU${(i + 1).toString().padStart(6, '0')}`,
    price: parseFloat((Math.random() * 50 + 1).toFixed(2))
  };
});

// Generate sample attributes for planograms
const generatePlanogramAttributes = () => {
  const attributes = [];
  const attributeTypes = [
    'Target Demographic', 'Seasonality', 'Promotion Type', 'Brand Focus', 'Price Point',
    'Category Mix', 'Shelf Utilization', 'Visual Theme', 'Traffic Pattern', 'Store Format'
  ];
  
  const values = {
    'Target Demographic': ['Young Adults', 'Families', 'Seniors', 'Professionals', 'Students'],
    'Seasonality': ['Spring', 'Summer', 'Fall', 'Winter', 'Holiday'],
    'Promotion Type': ['BOGO', 'Percentage Off', 'Bundle Deal', 'Clearance', 'New Product'],
    'Brand Focus': ['Premium', 'Value', 'Organic', 'Local', 'National'],
    'Price Point': ['Economy', 'Mid-Range', 'Premium', 'Luxury', 'Mixed'],
    'Category Mix': ['Single Category', 'Cross Category', 'Complementary', 'Seasonal Mix', 'Trending'],
    'Shelf Utilization': ['High Density', 'Standard', 'Spacious', 'Eye Level Focus', 'Full Height'],
    'Visual Theme': ['Colorful', 'Minimalist', 'Brand Focused', 'Category Grouped', 'Price Focused'],
    'Traffic Pattern': ['High Traffic', 'Medium Traffic', 'Low Traffic', 'End Cap', 'Corner'],
    'Store Format': ['Compact', 'Standard', 'Large Format', 'Express', 'Flagship']
  };
  
  // Generate 5-8 random attributes
  const numAttributes = 5 + Math.floor(Math.random() * 4);
  const selectedTypes = attributeTypes.sort(() => 0.5 - Math.random()).slice(0, numAttributes);
  
  selectedTypes.forEach(type => {
    const possibleValues = values[type];
    const value = possibleValues[Math.floor(Math.random() * possibleValues.length)];
    attributes.push({ description: type, value });
  });
  
  return attributes;
};

// Mock data for planograms with new structure
export const mockPlanograms = Array.from({ length: 30 }, (_, i) => {
  const planogramId = `P-${(12345 + i).toString()}`;
  const planogramNames = [
    'Summer Drinks Display', 'Winter Fashion Layout', 'Electronics Corner', 'Health & Beauty',
    'Snacks & Confectionery', 'Fresh Produce', 'Frozen Foods', 'Bakery Section',
    'Pharmacy Corner', 'Baby Care', 'Pet Supplies', 'Home & Garden', 'Sports Equipment',
    'Books & Magazines', 'Automotive', 'Seasonal Items', 'Holiday Decorations',
    'Back to School', 'Travel Essentials', 'Office Supplies', 'Personal Care',
    'Clothing & Accessories', 'Footwear Display', 'Jewelry Counter', 'Mobile Accessories',
    'Gaming Zone', 'Toy Section', 'Kitchen Appliances', 'Outdoor Gear', 'Fitness Equipment'
  ];
  
  const categories = ['Food & Beverage', 'Personal Care', 'Electronics', 'Apparel', 'Home & Garden', 'Health & Wellness'];
  const sizes = ['Small', 'Medium', 'Large', 'Extra Large'];
  const statuses = ['Live', 'Pending', 'Other', 'Historic'];
  
  const effectiveFromDate = new Date(2025, 0 + (i % 12), 1 + (i % 28));
  const effectiveToDate = new Date(2025, 6 + (i % 6), 1 + (i % 28));
  
  return {
    id: planogramId,
    version: `${Math.floor(i / 10) + 1}.${(i % 10) + 1}`,
    name: planogramNames[i],
    category: categories[i % categories.length],
    size: sizes[i % sizes.length],
    width: 120 + (i % 5) * 30, // 120-240 cm
    height: 180 + (i % 3) * 20, // 180-220 cm
    depth: 40 + (i % 2) * 20, // 40-60 cm
    effectiveDateFrom: effectiveFromDate.toISOString().split('T')[0],
    effectiveDateTo: effectiveToDate.toISOString().split('T')[0],
    status: statuses[i % statuses.length],
    dbStatus: i % 5, // 0-4 representing different database statuses
    attributes: generatePlanogramAttributes(),
    shelfId: `SH-${(1000 + i).toString()}`,
    shelfLocationId: `LOC-${(2000 + i).toString()}`,
    shelfX: 10 + (i % 10) * 5,
    shelfY: 20 + (i % 8) * 10,
    shelfZ: 0 + (i % 3) * 5,
    description: `Optimized layout for ${planogramNames[i].toLowerCase()} featuring strategic product positioning and improved customer flow.`,
    createdDate: new Date(2025, (i % 12), 1 + (i % 28)).toISOString().split('T')[0],
    imageUrl: `https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop&auto=format`,
    positionIds: Array.from({ length: 8 + (i % 5) }, (_, j) => `POS-${i.toString().padStart(3, '0')}-${j.toString().padStart(3, '0')}`)
  };
});

// Mock data for product positions
export const mockProductPositions = Array.from({ length: 400 }, (_, i) => {
  const planogramIndex = Math.floor(i / 13); // ~13 positions per planogram
  const planogram = mockPlanograms[planogramIndex] || mockPlanograms[0];
  const product = mockProducts[i % mockProducts.length];
  const merchandisingStyles = ['Display', 'Unit', 'Case', 'Tray'];
  
  return {
    id: `POS-${planogramIndex.toString().padStart(3, '0')}-${(i % 13).toString().padStart(3, '0')}`,
    planogramId: planogram.id,
    productId: product.id,
    productName: product.name,
    productBrand: product.brand,
    productCategory: product.category,
    productSku: product.sku,
    productPrice: product.price,
    horizontalFacings: 1 + (i % 4), // 1-4 facings
    verticalFacings: 1 + (i % 3), // 1-3 facings
    depthFacings: 1 + (i % 2), // 1-2 facings
    linear: parseFloat((5 + (i % 20)).toFixed(1)), // 5-25 cm
    width: parseFloat((8 + (i % 15)).toFixed(1)), // 8-23 cm
    depth: parseFloat((12 + (i % 10)).toFixed(1)), // 12-22 cm
    height: parseFloat((15 + (i % 25)).toFixed(1)), // 15-40 cm
    replenishmentMin: 5 + (i % 15), // 5-20 units
    replenishmentMax: 20 + (i % 30), // 20-50 units
    merchandisingStyle: merchandisingStyles[i % merchandisingStyles.length],
    locationX: parseFloat(((i % 10) * 12).toFixed(1)), // 0-108 cm
    locationY: parseFloat(((i % 6) * 30).toFixed(1)), // 0-150 cm
    locationZ: parseFloat(((i % 4) * 15).toFixed(1)) // 0-45 cm
  };
});

// Generate assignments (planogram-store mappings) - ~20 per store
export const mockAssignments = Array.from({ length: 1500 }, (_, i) => {
  const store = mockStores[i % mockStores.length];
  const planogram = mockPlanograms[i % mockPlanograms.length];
  const lifecycles = ['Prepared', 'Planned', 'Executed', 'Phased Out'];
  const assignedBy = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown', 'Lisa Davis', 'Tom Anderson', 'Emily Taylor'];
  const sizeVariants = ['XS', 'S', 'M', 'L', 'XL'];
  const sizeVariant = sizeVariants[i % sizeVariants.length];
  
  return {
    id: i + 1,
    store: store.name,
    storeId: store.id,
    storeCategory: store.category,
    planogramId: planogram.id,
    planogramName: planogram.name,
    sizeVariant,
    lifecycleState: lifecycles[i % lifecycles.length],
    lastUpdated: new Date(2025, 5 + (i % 7), 1 + (i % 28)).toISOString().split('T')[0],
    assignedBy: assignedBy[i % assignedBy.length],
    assignedDate: new Date(2025, 4 + (i % 8), 1 + (i % 28)).toISOString().split('T')[0],
    startDate: new Date(2025, 5 + (i % 8), 1 + (i % 28)).toISOString().split('T')[0],
    endDate: new Date(2025, 8 + (i % 4), 1 + (i % 28)).toISOString().split('T')[0],
    scheduledTransition: i % 3 === 0 ? new Date(2025, 7 + (i % 5), 1 + (i % 28)).toISOString().split('T')[0] : null
  };
});
