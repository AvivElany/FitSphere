const bcrypt = require('bcryptjs');

// [V]
const users = [
    /* {
        email: '',
        password: bcrypt.hashSync('fitness01!', 10),
        name: {
            first: "אביב",
            middle: " ",
            last: "אילני"
        },
        gender: "",
        age: "",
        address: {
            country: "ישראל",
            city: "בת ים",
            street: "בלפור",
            houseNumber: 2
        },
        weight: {
            startingWeight: '',
            currentWeight: '',
            targetWeight: '',
        },
        height: "",
        bodyFat: {
            startingBodyFat: '',
            currentBodyFat: '',
            targetBodyFat: ''
        },
        targets: "",
        menu: {
            breakfast: '',
            lunch: '',
            dinner: '',
            snacks: '',
            additionalInstructions: ''
        },
        workout: {
            back: '',
            chest: '',
            biceps: '',
            abs: '',
            legs: '',
            shoulders: '',
            backHand: '',
            cardio: ''
        },
        cart: {
            productID: '',
            name: '',
            price: '',
            quantity: ''
        },
        likes: [{title: "", id: ""}],
        messages: {
            sander: '',
            title: '',
            content: '',
            isRead: false,
            createAt: ''
        },
        phone: '',
        image: {
                url: "",
                alt: ""
            },
        isManager: false,
        isTrainer: false, 
        isPremium: false,
        isDeleted: false, 
        timestamps: true,
    }, */
    
    {
        email: 'manager1@example.com',
        password: bcrypt.hashSync('fitness01!', 10),
        name: { first: "דניאל", middle: " ", last: "כהן" },
        gender: "זכר",
        age: 35,
        address: { country: "ישראל", city: "תל אביב", street: "אבן גבירול", houseNumber: 25 },
        weight: { startingWeight: 80, currentWeight: 78, targetWeight: 75 },
        height: 180,
        bodyFat: { startingBodyFat: 20, currentBodyFat: 18, targetBodyFat: 15 },
        targets: "שיפור סיבולת וכוח",
        menu: { breakfast: "יוגורט עם גרנולה", lunch: "עוף עם אורז", dinner: "סלט ירקות", snacks: "פירות יבשים", additionalInstructions: "" },
        workout: { back: "חתירה", chest: "לחיצת חזה", biceps: "כפיפות מרפקים", abs: "קרנצ'ים", legs: "סקוואטים", shoulders: "לחיצת כתפיים", backHand: "פשיטת מרפקים", cardio: "ריצה" },
        cart: {
            productID: '',
            name: '',
            price: '',
            quantity: ''
        },
        likes: [{title: "", id: ""}],
        messages: {
            sander: '',
            title: '',
            content: '',
            isRead: false,
            createAt: ''
        },
        phone: "050-1234567",
        image: { url: "", alt: "" },
        isManager: true,
        isTrainer: false,
        isPremium: false,
        isDeleted: false,
        timestamps: true,
    },
    {
        email: 'manager2@example.com',
        password: bcrypt.hashSync('fitness01!', 10),
        name: { first: "מיכל", middle: " ", last: "לוי" },
        gender: "נקבה",
        age: 40,
        address: { country: "ישראל", city: "חיפה", street: "הרצל", houseNumber: 5 },
        weight: { startingWeight: 65, currentWeight: 63, targetWeight: 60 },
        height: 165,
        bodyFat: { startingBodyFat: 25, currentBodyFat: 22, targetBodyFat: 20 },
        targets: "שיפור כוח וגמישות",
        menu: { breakfast: "טוסט עם אבוקדו", lunch: "פסטה עם עוף", dinner: "סלט טונה", snacks: "אגוזים ושקדים", additionalInstructions: "" },
        workout: { back: "מתח", chest: "לחיצת חזה", biceps: "כפיפות מרפקים", abs: "פלנק", legs: "לאנג'ים", shoulders: "הרמות צדדיות", backHand: "לחיצה צרפתית", cardio: "שחייה" },
        cart: {
            productID: '',
            name: '',
            price: '',
            quantity: ''
        },
        likes: [{title: "", id: ""}],
        messages: {
            sander: '',
            title: '',
            content: '',
            isRead: false,
            createAt: ''
        },
        phone: "052-9876543",
        image: { url: "", alt: "" },
        isManager: true,
        isTrainer: false,
        isPremium: false,
        isDeleted: false,
        timestamps: true,
    },
    {
        email: 'trainer1@example.com',
        password: bcrypt.hashSync('fitness01!', 10),
        name: { first: "אורן", middle: " ", last: "מלכה" },
        gender: "זכר",
        age: 28,
        address: { country: "ישראל", city: "ירושלים", street: "יפו", houseNumber: 10 },
        weight: { startingWeight: 90, currentWeight: 85, targetWeight: 80 },
        height: 185,
        bodyFat: { startingBodyFat: 30, currentBodyFat: 25, targetBodyFat: 20 },
        targets: "חיטוב",
        menu: { breakfast: "שיבולת שועל עם חלב", lunch: "סטייק עם תפוחי אדמה", dinner: "מרק ירקות", snacks: "בר חלבון", additionalInstructions: "" },
        workout: { back: "מתח", chest: "לחיצת חזה", biceps: "כפיפות מרפקים", abs: "פלאנק", legs: "סקוואטים", shoulders: "לחיצת כתפיים", backHand: "פשיטות מרפקים", cardio: "ריצה" },
        cart: {
            productID: '',
            name: '',
            price: '',
            quantity: ''
        },
        likes: [{title: "", id: ""}],
        messages: {
            sander: '',
            title: '',
            content: '',
            isRead: false,
            createAt: ''
        },
        phone: "053-4567890",
        image: { url: "", alt: "" },
        isManager: false,
        isTrainer: true,
        isPremium: false,
        isDeleted: false,
        timestamps: true,
    },
    {
        email: 'trainer2@example.com',
        password: bcrypt.hashSync('fitness01!', 10),
        name: { first: "נועה", middle: " ", last: "כהן" },
        gender: "נקבה",
        age: 32,
        address: { country: "ישראל", city: "רעננה", street: "המייסדים", houseNumber: 12 },
        weight: { startingWeight: 70, currentWeight: 68, targetWeight: 65 },
        height: 170,
        bodyFat: { startingBodyFat: 28, currentBodyFat: 24, targetBodyFat: 22 },
        targets: "חיזוק השרירים",
        menu: { breakfast: "לחם מלא עם גבינה", lunch: "קוסקוס עם ירקות", dinner: "שקשוקה", snacks: "פירות טריים", additionalInstructions: "" },
        workout: { back: "חתירה", chest: "לחיצת חזה", biceps: "כפיפות מרפקים", abs: "קרנצ'ים", legs: "סקוואטים", shoulders: "לחיצת כתפיים", backHand: "פשיטות מרפקים", cardio: "רכיבה על אופניים" },
        cart: {
            productID: '',
            name: '',
            price: '',
            quantity: ''
        },
        likes: [{title: "", id: ""}],
        messages: {
            sander: '',
            title: '',
            content: '',
            isRead: false,
            createAt: ''
        },
        phone: "054-7654321",
        image: { url: "", alt: "" },
        isManager: false,
        isTrainer: true,
        isPremium: false,
        isDeleted: false,
        timestamps: true,
    },
    {
        email: 'trainer3@example.com',
        password: bcrypt.hashSync('fitness01!', 10),
        name: { first: "רועי", middle: " ", last: "בן דוד" },
        gender: "זכר",
        age: 29,
        address: { country: "ישראל", city: "באר שבע", street: "שדרות רגר", houseNumber: 3 },
        weight: { startingWeight: 95, currentWeight: 88, targetWeight: 85 },
        height: 190,
        bodyFat: { startingBodyFat: 32, currentBodyFat: 26, targetBodyFat: 22 },
        targets: "חיטוב וכוח",
        menu: { breakfast: "שיבולת שועל", lunch: "עוף ואורז", dinner: "סלט ירקות", snacks: "שייק חלבון", additionalInstructions: "" },
        workout: { back: "מתח", chest: "לחיצת חזה", biceps: "כפיפות מרפקים", abs: "פלאנק", legs: "לאנג'ים", shoulders: "לחיצת כתפיים", backHand: "פשיטות מרפקים", cardio: "ריצה" },
        cart: {
            productID: '',
            name: '',
            price: '',
            quantity: ''
        },
        likes: [{title: "", id: ""}],
        messages: {
            sander: '',
            title: '',
            content: '',
            isRead: false,
            createAt: ''
        },
        phone: "055-6789012",
        image: { url: "", alt: "" },
        isManager: false,
        isTrainer: true,
        isPremium: false,
        isDeleted: false,
        timestamps: true,
    },
    {
        email: 'trainee1@example.com',
        password: bcrypt.hashSync('fitness01!', 10),
        name: { first: "אביגיל", middle: " ", last: "שמש" },
        gender: "נקבה",
        age: 27,
        address: { country: "ישראל", city: "כפר סבא", street: "ויצמן", houseNumber: 7 },
        weight: { startingWeight: 68, currentWeight: 66, targetWeight: 63 },
        height: 165,
        bodyFat: { startingBodyFat: 22, currentBodyFat: 20, targetBodyFat: 18 },
        targets: "ירידה במשקל",
        menu: { breakfast: "גרנולה עם יוגורט", lunch: "עוף עם אורז", dinner: "סלט ירקות", snacks: "אגוזים", additionalInstructions: "" },
        workout: { back: "מתח", chest: "לחיצת חזה", biceps: "כפיפות מרפקים", abs: "קרנצ'ים", legs: "סקוואטים", shoulders: "לחיצת כתפיים", backHand: "פשיטות מרפקים", cardio: "ריצה" },
        cart: {
            productID: '',
            name: '',
            price: '',
            quantity: ''
        },
        likes: [{title: "", id: ""}],
        messages: {
            sander: '',
            title: '',
            content: '',
            isRead: false,
            createAt: ''
        },
        phone: "052-1234567",
        image: { url: "", alt: "" },
        isManager: false,
        isTrainer: false,
        isPremium: false,
        isDeleted: false,
        timestamps: true,
    },
    {
        email: 'trainee2@example.com',
        password: bcrypt.hashSync('fitness01!', 10),
        name: { first: "גיא", middle: " ", last: "ליבוביץ'" },
        gender: "זכר",
        age: 25,
        address: { country: "ישראל", city: "הרצליה", street: "בן גוריון", houseNumber: 20 },
        weight: { startingWeight: 75, currentWeight: 74, targetWeight: 70 },
        height: 175,
        bodyFat: { startingBodyFat: 18, currentBodyFat: 16, targetBodyFat: 14 },
        targets: "שיפור כוח וסיבולת",
        menu: { breakfast: "חביתה עם ירקות", lunch: "שניצל עם פסטה", dinner: "סלט ירקות", snacks: "שייק חלבון", additionalInstructions: "" },
        workout: { back: "חתירה", chest: "לחיצת חזה", biceps: "כפיפות מרפקים", abs: "קרנצ'ים", legs: "סקוואטים", shoulders: "לחיצת כתפיים", backHand: "פשיטות מרפקים", cardio: "רכיבה על אופניים" },
        cart: {
            productID: '',
            name: '',
            price: '',
            quantity: ''
        },
        likes: [{title: "", id: ""}],
        messages: {
            sander: '',
            title: '',
            content: '',
            isRead: false,
            createAt: ''
        },
        phone: "053-9876543",
        image: { url: "", alt: "" },
        isManager: false,
        isTrainer: false,
        isPremium: false,
        isDeleted: false,
        timestamps: true,
    },
    {
        email: 'trainee3@example.com',
        password: bcrypt.hashSync('fitness01!', 10),
        name: { first: "תומר", middle: " ", last: "יוסף" },
        gender: "זכר",
        age: 30,
        address: { country: "ישראל", city: "פתח תקווה", street: "רוטשילד", houseNumber: 15 },
        weight: { startingWeight: 85, currentWeight: 83, targetWeight: 80 },
        height: 180,
        bodyFat: { startingBodyFat: 20, currentBodyFat: 18, targetBodyFat: 15 },
        targets: "חיזוק השרירים",
        menu: { breakfast: "טוסט עם גבינה", lunch: "קוסקוס עם ירקות", dinner: "שקשוקה", snacks: "פירות יבשים", additionalInstructions: "" },
        workout: { back: "חתירה", chest: "לחיצת חזה", biceps: "כפיפות מרפקים", abs: "פלאנק", legs: "לאנג'ים", shoulders: "לחיצת כתפיים", backHand: "פשיטות מרפקים", cardio: "ריצה" },
        cart: {
            productID: '',
            name: '',
            price: '',
            quantity: ''
        },
        likes: [{title: "", id: ""}],
        messages: {
            sander: '',
            title: '',
            content: '',
            isRead: false,
            createAt: ''
        },
        phone: "054-6543210",
        image: { url: "", alt: "" },
        isManager: false,
        isTrainer: false,
        isPremium: false,
        isDeleted: false,
        timestamps: true,
    },
    {
        email: 'trainee4@example.com',
        password: bcrypt.hashSync('fitness01!', 10),
        name: { first: "עומר", middle: " ", last: "אבוטבול" },
        gender: "זכר",
        age: 23,
        address: { country: "ישראל", city: "אשקלון", street: "בן צבי", houseNumber: 8 },
        weight: { startingWeight: 70, currentWeight: 68, targetWeight: 65 },
        height: 172,
        bodyFat: { startingBodyFat: 15, currentBodyFat: 13, targetBodyFat: 10 },
        targets: "ירידה במשקל",
        menu: { breakfast: "יוגורט עם גרנולה", lunch: "עוף עם ירקות", dinner: "סלט טונה", snacks: "אגוזים ושקדים", additionalInstructions: "" },
        workout: { back: "מתח", chest: "לחיצת חזה", biceps: "כפיפות מרפקים", abs: "פלאנק", legs: "סקוואטים", shoulders: "לחיצת כתפיים", backHand: "פשיטות מרפקים", cardio: "שחייה" },
        cart: {
            productID: '',
            name: '',
            price: '',
            quantity: ''
        },
        likes: [{title: "", id: ""}],
        messages: {
            sander: '',
            title: '',
            content: '',
            isRead: false,
            createAt: ''
        },
        phone: "055-3210987",
        image: { url: "", alt: "" },
        isManager: false,
        isTrainer: false,
        isPremium: false,
        isDeleted: false,
        timestamps: true,
    },
    {
        email: 'trainee5@example.com',
        password: bcrypt.hashSync('fitness01!', 10),
        name: { first: "עדי", middle: " ", last: "משה" },
        gender: "נקבה",
        age: 29,
        address: { country: "ישראל", city: "רמת גן", street: "ז'בוטינסקי", houseNumber: 50 },
        weight: { startingWeight: 60, currentWeight: 58, targetWeight: 55 },
        height: 165,
        bodyFat: { startingBodyFat: 22, currentBodyFat: 20, targetBodyFat: 18 },
        targets: "חיזוק סיבולת לב ריאה",
        menu: { breakfast: "חביתה עם ירקות", lunch: "קוסקוס עם ירקות", dinner: "סלט ירקות", snacks: "פירות טריים", additionalInstructions: "" },
        workout: { back: "חתירה", chest: "לחיצת חזה", biceps: "כפיפות מרפקים", abs: "פלאנק", legs: "לאנג'ים", shoulders: "לחיצת כתפיים", backHand: "פשיטות מרפקים", cardio: "ריצה" },
        cart: {
            productID: '',
            name: '',
            price: '',
            quantity: ''
        },
        likes: [{title: "", id: ""}],
        messages: {
            sander: '',
            title: '',
            content: '',
            isRead: false,
            createAt: ''
        },
        phone: "056-7890123",
        image: { url: "", alt: "" },
        isManager: false,
        isTrainer: false,
        isPremium: false,
        isDeleted: false,
        timestamps: true,
    },
];
    
module.exports = users;