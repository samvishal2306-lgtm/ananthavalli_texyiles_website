import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Setup default products file path
const productsFilePath = path.join(__dirname, 'public', 'products.json');
const uploadsDirPath = path.join(__dirname, 'public', 'uploads');

// Ensure public and uploads directory exist
if (!fs.existsSync(path.join(__dirname, 'public'))) {
  fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
}
if (!fs.existsSync(uploadsDirPath)) {
  fs.mkdirSync(uploadsDirPath, { recursive: true });
}

// Default products list
const defaultProducts = [
  {
    "id": "1",
    "title": "Bridal Wedding Saree",
    "category": "sarees",
    "categoryLabel": "Wedding Sarees",
    "rating": 4.8,
    "reviewsCount": 89,
    "originalPrice": 12000,
    "currentPrice": 8500,
    "tag": "Hot",
    "discount": "29% OFF",
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
    "description": "Exquisite hand-woven pure silk bridal saree with intricate golden zari work, traditional motifs, and a rich pallu. Perfect for weddings and auspicious occasions.",
    "features": ["100% Pure Silk", "Zari Border", "Include Blouse Piece", "Dry Clean Only"]
  },
  {
    "id": "2",
    "title": "Pure Soft Silk Saree",
    "category": "sarees",
    "categoryLabel": "Soft Silk Sarees",
    "rating": 4.7,
    "reviewsCount": 156,
    "originalPrice": 5000,
    "currentPrice": 3800,
    "tag": "Sale",
    "discount": "24% OFF",
    "image": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
    "description": "Lightweight and comfortable soft silk saree featuring elegant floral patterns and modern border styling. Ideal for festivals and social gatherings.",
    "features": ["Soft Silk Blend", "Easy to Drape", "Contrast Pallu", "Hand Wash Recommended"]
  },
  {
    "id": "3",
    "title": "Bridal Lehenga Set",
    "category": "womens-wear",
    "categoryLabel": "Lehenga",
    "rating": 4.9,
    "reviewsCount": 45,
    "originalPrice": 5000,
    "currentPrice": 3500,
    "tag": "Hot",
    "discount": "30% OFF",
    "image": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
    "description": "A gorgeous semi-stitched bridal lehenga choli set adorned with heavy embroidery, sequins, and stone work, paired with a matching net dupatta.",
    "features": ["Premium Velvet Base", "Heavy Embroidery", "Matching Net Dupatta", "Customizable Fit"]
  },
  {
    "id": "4",
    "title": "Traditional Veshti & Shirt",
    "category": "mens-wear",
    "categoryLabel": "Veshti & Shirt",
    "rating": 4.6,
    "reviewsCount": 134,
    "originalPrice": 2200,
    "currentPrice": 1500,
    "tag": "Hot",
    "discount": "32% OFF",
    "image": "https://images.unsplash.com/photo-1605784401368-5af1d9d6c4dc?auto=format&fit=crop&q=80&w=600",
    "description": "Classic South Indian cotton veshti with a gold zari border, paired with a matching cream silk-mix formal shirt. Ideal for festivals and weddings.",
    "features": ["Pure Cotton Veshti", "Gold Zari Border", "Premium Silk-Mix Shirt", "Standard Fit"]
  },
  {
    "id": "5",
    "title": "Kanjivaram Silk Saree",
    "category": "sarees",
    "categoryLabel": "Pattu Sarees",
    "rating": 4.8,
    "reviewsCount": 124,
    "originalPrice": 6000,
    "currentPrice": 4500,
    "tag": "Hot",
    "discount": "25% OFF",
    "image": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600&id=saree5",
    "description": "A traditional Kanjivaram pattu saree woven with fine silk threads and pure gold-plated zari. Features traditional temple border motifs.",
    "features": ["Certified Kanjivaram Silk", "Heavy Temple Border", "Rich Brocade Pallu", "Silk Mark Certified"]
  },
  {
    "id": "6",
    "title": "Designer Party Saree",
    "category": "womens-wear",
    "categoryLabel": "Designer Sarees",
    "rating": 4.7,
    "reviewsCount": 73,
    "originalPrice": 3500,
    "currentPrice": 2200,
    "tag": "New",
    "discount": "37% OFF",
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600&id=saree6",
    "description": "Georgette designer saree featuring beautiful sequin borders and dynamic color shading. Perfect for evening parties and receptions.",
    "features": ["Flowy Georgette Fabric", "All-Over Sequin Border", "Includes Unstitched Blouse", "Gentle Dry Clean"]
  },
  {
    "id": "7",
    "title": "Anarkali Suit",
    "category": "womens-wear",
    "categoryLabel": "Anarkali",
    "rating": 4.5,
    "reviewsCount": 62,
    "originalPrice": 2500,
    "currentPrice": 1800,
    "tag": "Hot",
    "discount": "28% OFF",
    "image": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600&id=anarkali",
    "description": "Elegant floor-length Anarkali salwar suit with detailed zari embroidery on the yoke and cuffs. Paired with churidar pants and a dupatta.",
    "features": ["Premium Rayon Fabric", "Zari Embroidery Yoke", "Dupatta Included", "Machine Washable"]
  },
  {
    "id": "8",
    "title": "Formal Cotton Shirt",
    "category": "mens-wear",
    "categoryLabel": "Shirts",
    "rating": 4.4,
    "reviewsCount": 189,
    "originalPrice": 1200,
    "currentPrice": 850,
    "tag": "New",
    "discount": "29% OFF",
    "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600",
    "description": "Premium pure cotton slim-fit formal shirt. Features a structured collar, single cuffs, and breathable fabric, ideal for office and formal events.",
    "features": ["100% Breathable Cotton", "Slim Fit Design", "Easy-Iron Finish", "Machine Washable"]
  },
  {
    "id": "9",
    "title": "Kids Silk Pavadai Satini",
    "category": "kids-wear",
    "categoryLabel": "Pavadai",
    "rating": 4.9,
    "reviewsCount": 38,
    "originalPrice": 2000,
    "currentPrice": 1350,
    "tag": "Sale",
    "discount": "32% OFF",
    "image": "https://www.bing.com/images/search?view=detailV2&ccid=%2fQ3HkE4E&id=272E8A56DC7914E0799EC7EEE5C246D6F7F0284B&thid=OIP._Q3HkE4Eye7iD4qEB90hLQHaHa&mediaurl=https%3a%2f%2fae01.alicdn.com%2fkf%2fHTB1LjfvRVXXXXaWXpXXq6xXFXXXo%2f2016-Summer-New-Kids-Clothes-Baby-Girls-Princess-Dress-Floral-Short-Sleeve-Children-Clothing-Bow-Voile.jpg&exph=1600&expw=1600&q=kids+wear&FORM=IRPRST&ck=90B4E7ECC45183B1250EC7F02A6F2633&selectedIndex=21&itb=0",
    "description": "Traditional South Indian pattu pavadai (lehenga choli) for girls. Made with soft silk-blend fabric that is gentle on skin, featuring bright festive colors.",
    "features": ["Soft Silk Blend", "Cotton Inner Lining", "Traditional Border", "Adjustable Drawstring"]
  },
  {
    "id": "10",
    "title": "Kids Cotton Kurta Pyjama",
    "category": "kids-wear",
    "categoryLabel": "Kurta Pyjama",
    "rating": 4.7,
    "reviewsCount": 54,
    "originalPrice": 1500,
    "currentPrice": 999,
    "tag": "New",
    "discount": "33% OFF",
    "image": "https://images.unsplash.com/photo-1519689680058-324335c77ebe?auto=format&fit=crop&q=80&w=600",
    "description": "Comfortable and breathable pure cotton kurta pyjama set for boys. Features elegant wooden button details and a comfortable elastic waistband pyjama.",
    "features": ["100% Organic Cotton", "Comfortable Fit", "Elastic Pyjama Waist", "Vibrant Indigo Dye"]
  }
,
  {
      "id": "11",
      "title": "Banarasi Brocade Saree",
      "category": "sarees",
      "categoryLabel": "Banarasi Silk",
      "rating": 4.7,
      "reviewsCount": 34,
      "originalPrice": 5800,
      "currentPrice": 4200,
      "tag": "",
      "discount": "28% OFF",
      "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600&id=banarasi",
      "description": "Luxury Banarasi silk saree woven with fine silver brocade, featuring traditional paisley border motifs and a rich pallu.",
      "features": [
          "Pure Banarasi Silk",
          "Silver Brocade Work",
          "Silk Mark Certified",
          "Dry Clean Only"
      ]
  },
  {
      "id": "12",
      "title": "Kanchi Cotton Handloom Saree",
      "category": "sarees",
      "categoryLabel": "Cotton Sarees",
      "rating": 4.5,
      "reviewsCount": 26,
      "originalPrice": 2500,
      "currentPrice": 1800,
      "tag": "",
      "discount": "28% OFF",
      "image": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600&id=kanchicotton",
      "description": "Lightweight and breathable handloom cotton saree woven in Kanchipuram. Embellished with a simple gold thread border.",
      "features": [
          "100% Handloom Cotton",
          "Breathable Material",
          "Gold Border",
          "Hand Wash Recommended"
      ]
  },
  {
      "id": "13",
      "title": "Copper Zari Designer Silk Saree",
      "category": "sarees",
      "categoryLabel": "Pattu Sarees",
      "rating": 4.9,
      "reviewsCount": 18,
      "originalPrice": 9500,
      "currentPrice": 7200,
      "tag": "New",
      "discount": "24% OFF",
      "image": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600&id=copperzari",
      "description": "Ultra-modern pure silk saree woven with trending antique copper zari detailing, presenting a unique matte metallic look.",
      "features": [
          "Pure Silk",
          "Antique Copper Zari",
          "Matte Metallic Finish",
          "Dry Clean Only"
      ]
  },
  {
      "id": "14",
      "title": "Heavy Embroidered Georgette Anarkali",
      "category": "womens-wear",
      "categoryLabel": "Anarkali",
      "rating": 4.6,
      "reviewsCount": 29,
      "originalPrice": 4000,
      "currentPrice": 2800,
      "tag": "",
      "discount": "30% OFF",
      "image": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600&id=georgetteanarkali",
      "description": "Premium georgette Anarkali suit featuring heavy chikankari thread embroidery and mirror work on the body and sleeves.",
      "features": [
          "Georgette Fabric",
          "Chikankari Threadwork",
          "Full Lining Included",
          "Dry Clean Recommended"
      ]
  },
  {
      "id": "15",
      "title": "Silk Bandhani Gown",
      "category": "womens-wear",
      "categoryLabel": "Gowns",
      "rating": 4.4,
      "reviewsCount": 22,
      "originalPrice": 3500,
      "currentPrice": 2400,
      "tag": "Sale",
      "discount": "31% OFF",
      "image": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600&id=bandhani",
      "description": "Flowy traditional Bandhani printed silk gown with a gold foil border and a beautiful matching georgette dupatta.",
      "features": [
          "Art Silk Fabric",
          "Traditional Bandhani Print",
          "Gold Foil Border",
          "Comfortable Fit"
      ]
  },
  {
      "id": "16",
      "title": "Floral Designer Kurti Set",
      "category": "womens-wear",
      "categoryLabel": "Kurtis",
      "rating": 4.5,
      "reviewsCount": 51,
      "originalPrice": 1800,
      "currentPrice": 1200,
      "tag": "New",
      "discount": "33% OFF",
      "image": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600&id=kurti",
      "description": "Pure cotton daily-wear kurti set with pastel floral prints, paired with matching straight-fit pants and a light mulmul dupatta.",
      "features": [
          "100% Pure Cotton",
          "Floral Print",
          "Straight-Fit Pants",
          "Machine Washable"
      ]
  },
  {
      "id": "17",
      "title": "Premium Silk Kurta Pyjama",
      "category": "mens-wear",
      "categoryLabel": "Kurta Pyjama",
      "rating": 4.7,
      "reviewsCount": 48,
      "originalPrice": 3000,
      "currentPrice": 2100,
      "tag": "",
      "discount": "30% OFF",
      "image": "https://images.unsplash.com/photo-1605784401368-5af1d9d6c4dc?auto=format&fit=crop&q=80&w=600&id=kurta",
      "description": "Elegant art silk kurta pyjama set with delicate thread embroidery on the collar and button placket. Ideal for wedding receptions.",
      "features": [
          "Dupion Art Silk",
          "Threadwork Collar",
          "Matching Churidar Pyjama",
          "Dry Clean Recommended"
      ]
  },
  {
      "id": "18",
      "title": "Pure Linen Formal Shirt",
      "category": "mens-wear",
      "categoryLabel": "Shirts",
      "rating": 4.6,
      "reviewsCount": 39,
      "originalPrice": 2000,
      "currentPrice": 1400,
      "tag": "New",
      "discount": "30% OFF",
      "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600&id=linen",
      "description": "High-grade 100% pure linen formal shirt in pastel blue. Naturally breathable, lightweight, and perfect for tropical climates.",
      "features": [
          "100% Pure Linen",
          "Pastel Shades",
          "Regular Fit",
          "Machine Washable"
      ]
  },
  {
      "id": "19",
      "title": "Designer Sherwani Set",
      "category": "mens-wear",
      "categoryLabel": "Sherwanis",
      "rating": 4.8,
      "reviewsCount": 15,
      "originalPrice": 7800,
      "currentPrice": 5500,
      "tag": "Hot",
      "discount": "29% OFF",
      "image": "https://images.unsplash.com/photo-1605784401368-5af1d9d6c4dc?auto=format&fit=crop&q=80&w=600&id=sherwani",
      "description": "Royal wedding sherwani made from heavy jacquard fabric, featuring intricate hand embroidery on the collar and a matching stole.",
      "features": [
          "Luxury Jacquard Fabric",
          "Hand Embroidered Collar",
          "Includes Matching Stole",
          "Dry Clean Only"
      ]
  },
  {
      "id": "20",
      "title": "Girls Net Designer Frock",
      "category": "kids-wear",
      "categoryLabel": "Frocks",
      "rating": 4.4,
      "reviewsCount": 27,
      "originalPrice": 1600,
      "currentPrice": 1100,
      "tag": "",
      "discount": "31% OFF",
      "image": "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=600&id=frock",
      "description": "Beautiful multi-layered net designer frock for girls with soft satin lining and sequin sash detail. Ideal for birthdays and parties.",
      "features": [
          "Soft Multi-Layer Net",
          "Satin Sash Detail",
          "Cotton Inner Lining",
          "Hand Wash Only"
      ]
  },
  {
      "id": "21",
      "title": "Boys Jacquard Sherwani Set",
      "category": "kids-wear",
      "categoryLabel": "Sherwani",
      "rating": 4.8,
      "reviewsCount": 19,
      "originalPrice": 2400,
      "currentPrice": 1650,
      "tag": "Hot",
      "discount": "31% OFF",
      "image": "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=600&id=kidssherwani",
      "description": "Stunning ethnic jacquard sherwani set for boys with shiny buttons and contrast pyjama pants. Perfect for family celebrations.",
      "features": [
          "Premium Jacquard",
          "Ethnic Style Buttons",
          "Contrast Pants",
          "Gentle Dry Clean"
      ]
  }
];

// Load products helper
const loadProducts = () => {
  if (!fs.existsSync(productsFilePath)) {
    fs.writeFileSync(productsFilePath, JSON.stringify(defaultProducts, null, 2), 'utf-8');
    return defaultProducts;
  }
  try {
    const raw = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error parsing products.json, resetting to default products.");
    return defaultProducts;
  }
};

// Save products helper
const saveProducts = (prods) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(prods, null, 2), 'utf-8');
};

// Setup Multer Storage for file uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDirPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'product-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only images (jpeg, jpg, png, gif, webp) are allowed."));
  }
});

// Admin Authentication Middleware
const requireAdmin = (req, res, next) => {
  const passcode = req.headers['x-admin-passcode'];
  if (passcode === 'admin2004') {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized. Invalid admin passcode.' });
  }
};

// Routes
// 1. Get products
app.get('/api/products', (req, res) => {
  const prods = loadProducts();
  res.json(prods);
});

// 2. Add product
app.post('/api/products', requireAdmin, (req, res) => {
  const prods = loadProducts();
  const newProduct = req.body;
  
  if (!newProduct.id) {
    newProduct.id = String(Date.now());
  }
  
  prods.push(newProduct);
  saveProducts(prods);
  res.status(201).json(newProduct);
});

// 3. Edit product
app.put('/api/products/:id', requireAdmin, (req, res) => {
  const prods = loadProducts();
  const { id } = req.params;
  const updatedProduct = req.body;
  
  const index = prods.findIndex(p => p.id === id);
  if (index !== -1) {
    prods[index] = { ...prods[index], ...updatedProduct };
    saveProducts(prods);
    res.json(prods[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// 4. Delete product
app.delete('/api/products/:id', requireAdmin, (req, res) => {
  const prods = loadProducts();
  const { id } = req.params;
  
  const filtered = prods.filter(p => p.id !== id);
  if (filtered.length !== prods.length) {
    saveProducts(filtered);
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// 5. Reset catalog
app.post('/api/products/reset', requireAdmin, (req, res) => {
  saveProducts(defaultProducts);
  res.json({ message: 'Catalog reset to defaults' });
});

// 6. Upload Image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }
  // Return the path relative to Vite proxy (Vite dev server will proxy this, or we serve /uploads statically)
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ fileUrl });
});

// Serve uploads folder as static files
app.use('/uploads', express.static(uploadsDirPath));

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
