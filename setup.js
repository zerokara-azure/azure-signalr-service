const client = require('./db.js');

const databaseDefinition = { id: "stocksdb" };
const collectionDefinition = { id: "stocks" };

const setupAndSeedDatabase = async ()  => {

  // Cosmos DBアカウント内にデータベースを作成する
  const { database: db } = await client.databases.createIfNotExists(databaseDefinition);
  console.log('Database created.');

  // データベース内にコレクションを作成する
  const { container } = await db.containers.createIfNotExists(collectionDefinition);
  console.log('Collection created.');

  // サンプルの株価データを登録する（３件）
  await container.items.create({
    "id": "e0eb6e85-176d-4ce6-89ae-1f699aaa0bab",
    "symbol": "ABC",
    "price": "100.00",
    "change": "1.00",
    "changeDirection": "+"
  });

  await container.items.create({
    "id": "ebe2e863-bf84-439a-89f8-39975e7d6766",
    "symbol": "DEF",
    "price": "45.89",
    "change": "1.25",
    "changeDirection": "-"
  });

  await container.items.create({
    "id": "80bc1751-3831-4749-99ea-5c6a63105ae7",
    "symbol": "GHI",
    "price": "156.21",
    "change": "6.81",
    "changeDirection": "+"
  });

  console.log('Seed data added.');
};

setupAndSeedDatabase().catch(err => {
  console.error('Error setting up database:', err);
});