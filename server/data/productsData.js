// [] - יש להשלים תוכן ראשוני
const products = [
    /* {
        name: "", 
        description: "", 
        price: 0, // 
        discountPercentage: 0, 
        stockQuantity: 0, 
        link: "", 
        picture: { url: "", alt: "" }, 
        colors: [],
        flavors: [],
        category: "",
    }, */
    {
        name: "מוצר ראשון", 
        description: "ולא האחרון", 
        price: 0, // 
        discountPercentage: 10, 
        stockQuantity: 5, 
        link: "", 
        picture: { url: "", alt: "" }, 
        colors: ["blue", "black", "white"],
        flavors: ["grapes", "apple", "orange"],
        category: "motivation",
    },
    {
        name: "אבקת חלבון ISOLATE", 
        description: "אבקת החלבון הנמכרת ביותר בעולם", 
        price: 300, // 
        discountPercentage: 10, 
        stockQuantity: 55, 
        link: "", 
        picture: { url: "https://www.pic.com/proteinpowder", alt: "חלבון" }, 
        colors: [],
        flavors: ["vanilla", "chocolade", "coffee", "banana", "strawberry"],
        category: "nutrition",
    },
]

module.exports = products;