
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

// Mock data for planograms
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
  
  const lifecycles = ['Prepared', 'Planned', 'Executed', 'Phased Out'];
  const sizeVariants = ['XS', 'S', 'M', 'L', 'XL'];
  
  return {
    id: planogramId,
    name: planogramNames[i],
    description: `Optimized layout for ${planogramNames[i].toLowerCase()} featuring strategic product positioning and improved customer flow.`,
    createdDate: new Date(2025, (i % 12), 1 + (i % 28)).toISOString().split('T')[0],
    version: `${Math.floor(i / 10) + 1}.${(i % 10) + 1}`,
    sizeVariants: sizeVariants.slice(0, 3 + (i % 3)), // Each planogram has 3-5 size variants
    lifecycle: lifecycles[i % lifecycles.length]
  };
});

// Generate assignments (planogram-store mappings)
export const mockAssignments = Array.from({ length: 150 }, (_, i) => {
  const store = mockStores[i % mockStores.length];
  const planogram = mockPlanograms[i % mockPlanograms.length];
  const lifecycles = ['Prepared', 'Planned', 'Executed', 'Phased Out'];
  const assignedBy = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown', 'Lisa Davis', 'Tom Anderson', 'Emily Taylor'];
  const sizeVariant = planogram.sizeVariants[i % planogram.sizeVariants.length];
  
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
