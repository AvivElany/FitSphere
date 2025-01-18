/*
============================================
============================================
            **** WARNING ****
  RUNNING THIS SCRIPT WILL DELETE AND\OR
  OVERWRITE YOUR DATABASE !!!!!!!
============================================
============================================
*/

// Database
const connectDB = require('./config/db')

// Modals
const Ads = require('./models/Ads')
const Facts = require('./models/Facts')
const Users = require('./models/Users')
const Content = require('./models/Contents')
const Products = require('./models/Products')
const Articles = require('./models/Articles')

// Data
const ads = require('./data/adsData')
const users = require('./data/usersData')
const facts = require('./data/factsData')
const content = require('./data/contentData')
const products = require('./data/productsData')
const articles = require('./data/articlesData')

// Seed all data
const seedAll = async () => {
  console.log('\nDatabase seeding started...');

  try {
    // Seed users
    // delete all existing cards
    await Users.deleteMany();
      // insert seed cards
    const insertedUsers = await Users.insertMany(users);
    console.log(`  [i] Inserted ${insertedUsers.length} users`);

    // Seed contents
    await Content.deleteMany();
    const insertedContents = await Content.insertMany(content);
    console.log(`  [i] Inserted ${insertedContents.length} contents`);

    // Seed articles
    await Articles.deleteMany();
    const insertedArticles = await Articles.insertMany(articles);
    console.log(`  [i] Inserted ${insertedArticles.length} articles`);

    // Seed ads
    await Ads.deleteMany();
    const insertedAds = await Ads.insertMany(ads);
    console.log(`  [i] Inserted ${insertedAds.length} ads`);

    // Seed products
    await Products.deleteMany();
    const insertedProducts = await Products.insertMany(products); 
    console.log(`  [i] Inserted ${insertedProducts.length} products`);

    // Seed facts
    await Facts.deleteMany();
    const insertedFacts = await Facts.insertMany(facts); 
    console.log(`  [i] Inserted ${insertedFacts.length} facts`);

    console.log('[v] Completed successfully');
    process.exit(0);
  } catch (e) {
    console.log('[x] Seeding error');
    console.log(e.message);
    process.exit(1);
  }
}

// Connect to database
connectDB().then(() => {
  seedAll();
});
