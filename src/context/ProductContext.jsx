import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const defaultProducts = [
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
    "image":" https://i.pinimg.com/736x/8c/69/72/8c697236d584e4025039fd012316a9f0.jpg",
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
    "image": "https://www.taneira.com/dw/image/v2/BKMH_PRD/on/demandware.static/-/Sites-Taneira-product-catalog/default/dwb411a25e/images/Taneira/Catalog/SHG08A01045_1.jpg?sw=1000&sh=1500",
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
    "image": "https://kundansbridalcouture.com/cdn/shop/files/IMG_81261.png?v=1779032542&width=%7Bwidth%7D",
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
    "image": "https://tse2.mm.bing.net/th/id/OIP.Wrb9UxGm-PW1zZkihd5HcAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
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
    "image": "https://th.bing.com/th/id/R.c3ee3b66d3e0653bf47c81faa2bf271b?rik=%2bBSmFOtH%2b29mYA&riu=http%3a%2f%2f5.imimg.com%2fdata5%2fKU%2fMY%2fMY-39097847%2fpure-kanchipuram-silk-sarees.jpg&ehk=WAzUqQ7McfOoqExur%2b0RY83ExXPeDvRUn5sF5q79hhg%3d&risl=&pid=ImgRaw&r=0",
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
    "image": "https://tse1.explicit.bing.net/th/id/OIP.-T7G44npa5ao-jgTcZa78QHaMv?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
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
    "image": "https://www.kollybollyethnics.com/image/catalog/data/04Apr2023/Net-long-Anarkali-suit-in-Pink-colour-1002B.jpg",
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
    "image": "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=600&id=pavadai",
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
    "image": "https://i.pinimg.com/originals/50/12/ba/5012baa9b51f04f01deee7a6e965ef8f.jpg",
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
      "image": "https://assets0.mirraw.com/images/7276132/image_zoom.jpeg?1565184145",
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
      "image": "https://taranginihandloom.com/cdn/shop/files/FullSizeRender_f8690c1c-eb81-4bc8-b01f-4cd07fe7e6ef.jpg?v=1778329289",
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
      "image": "https://assets0.mirraw.com/images/12722943/image_zoom.jpeg?1722334771",
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
      "image": "https://img.faballey.com/images/Product/XKS01533Z/d4.jpg",
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
      "image": "https://tse2.mm.bing.net/th/id/OIP.ZR3nRr5RoPKj-Eg21nYDnAHaI9?r=0&w=846&h=1024&rs=1&pid=ImgDetMain&o=7&rm=3",
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
      "image": "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_75,w_1080/v1/assets/images/2025/NOVEMBER/22/Hk93XNYX_194c8f7451e540a9bb11d6af40dbd067.jpg",
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
      "image": "https://tse1.explicit.bing.net/th/id/OIP.zNxRacyo3ZOJrgwpv6jFNQHaKY?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
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
      "image": "https://i.pinimg.com/originals/30/9d/15/309d15837404b81d44e620a243a28af1.png",
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
      "image": "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/22261274/2023/3/9/b819811c-9eb9-4669-b46a-cea92d58e7611678350700531ManyavarMenEmbroideredArtSilkTraditionalSherwaniSet1.jpg",
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
      "image": "https://5.imimg.com/data5/SELLER/Default/2023/7/327516580/NR/NS/FK/180781643/521-500x500.jpg",
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
      "image": "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/30281647/2024/7/20/5cfd8a7b-0a47-4c5f-a1fc-82da048c57261721456748299BTDEZINESBoysJacquardEmbroideredSherwaniwithKurtaPajamaSet1.jpg",
      "description": "Stunning ethnic jacquard sherwani set for boys with shiny buttons and contrast pyjama pants. Perfect for family celebrations.",
      "features": [
          "Premium Jacquard",
          "Ethnic Style Buttons",
          "Contrast Pants",
          "Gentle Dry Clean"
      ]
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCatalog = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
        localStorage.setItem("at_products", JSON.stringify(data));
        setLoading(false);
        return;
      }
    } catch (e) {
      console.warn("Express backend offline. Using LocalStorage catalog.");
    }
    const cached = localStorage.getItem("at_products");
    if (cached) {
      setProducts(JSON.parse(cached));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem("at_products", JSON.stringify(defaultProducts));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  const saveProduct = async (updatedList, actionType = "POST", prodId = "") => {
    try {
      const isEdit = actionType === "PUT";
      const url = isEdit ? `/api/products/${prodId}` : "/api/products";
      const bodyData = isEdit ? updatedList.find(p => p.id === prodId) : updatedList[updatedList.length - 1];

      const res = await fetch(url, {
        method: actionType,
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": "admin2004"
        },
        body: JSON.stringify(bodyData)
      });
      if (res.ok) {
        const refetch = await fetch("/api/products");
        if (refetch.ok) {
          const syncedData = await refetch.json();
          setProducts(syncedData);
          localStorage.setItem("at_products", JSON.stringify(syncedData));
          return;
        }
      }
    } catch (e) {
      console.warn("Express backend offline. Updating local catalog state.");
    }
    setProducts(updatedList);
    localStorage.setItem("at_products", JSON.stringify(updatedList));
  };

  const deleteProduct = async (prodId) => {
    try {
      const res = await fetch(`/api/products/${prodId}`, {
        method: "DELETE",
        headers: {
          "x-admin-passcode": "admin2004"
        }
      });
      if (res.ok) {
        const refetch = await fetch("/api/products");
        if (refetch.ok) {
          const syncedData = await refetch.json();
          setProducts(syncedData);
          localStorage.setItem("at_products", JSON.stringify(syncedData));
          return;
        }
      }
    } catch (e) {
      console.warn("Express backend offline. Deleting from local catalog state.");
    }
    const updated = products.filter(p => p.id !== prodId);
    setProducts(updated);
    localStorage.setItem("at_products", JSON.stringify(updated));
  };

  const resetCatalog = async () => {
    try {
      const res = await fetch("/api/products/reset", {
        method: "POST",
        headers: {
          "x-admin-passcode": "admin2004"
        }
      });
      if (res.ok) {
        const refetch = await fetch("/api/products");
        if (refetch.ok) {
          const syncedData = await refetch.json();
          setProducts(syncedData);
          localStorage.setItem("at_products", JSON.stringify(syncedData));
          return;
        }
      }
    } catch (e) {
      console.warn("Express backend offline. Resetting local catalog to defaults.");
    }
    setProducts(defaultProducts);
    localStorage.setItem("at_products", JSON.stringify(defaultProducts));
  };
  
  const uploadProductImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        return data.fileUrl; // Return local path like /uploads/product-12345.jpg
      }
    } catch (e) {
      console.warn("Express backend offline. Failed to upload image physically.");
    }
    return null;
  };

  return (
    <ProductContext.Provider value={{ products, loading, saveProduct, deleteProduct, resetCatalog, uploadProductImage }}>
      {children}
    </ProductContext.Provider>
  );
};
