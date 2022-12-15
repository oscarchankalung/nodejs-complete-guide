# Section 11 Understanding Sequelize

1. What is Sequelize?
2. Connecting to the Datacase
3. Defining a Model
4. Syncing JS Definitions to the Database
<!--  -->
5. Inserting Data & Creating a Product
6. Finding Row by ID in Sequelize 5
7. Retrieving Data & Finding Products
8. Getting a Single Product with the "where" Condition
9. Fetching Admin Products
10. Updating Products
11. Deleting Products
<!--  -->
12. Creating a User Model
13. Adding a One-To-Many Relationship
14. Creating & Managing a Dummy User
15. Using Magic Association Methods
16. Fetching Related Products
<!--  -->
17. One-To-Many & Many-To-Many Relations
18. Creating & Fetching a Cart
19. Adding New Products to the Cart
20. Adding Existing Products & Retrieving Cart Items
21. Deleting Related Items & Deleting Cart Products
<!--  -->
22. Adding an Order Model
23. Storing CartItems as OrderItems
24. Resetting the Cart & Fetching and Outputting Orders

## Sequelize

Sequelize is a third party package that serves as object relational mapping library. Simply speaking, it automatically translates JavaScript objects into SQL code.

| Object       | Code                        |
|:-------------|:--------------------------- |
| Models       | `class User {}`             |
| Instance     | `const user = User.build()` |
| Queries      | `User.findAll()`            |
| Associations | `User.hasMany(Product)`     |

## Associations

- **One-To-One**: both `hasOne` and `belongsTo`
- **One-To-Many**: both `hasMany` and `belongsTo`
- **Many-To-Many**: two `belongsToMany`

```js
const A = sequelize.define('A', /* ... */);
const B = sequelize.define('B', /* ... */);

A.hasOne(B);
A.belongsTo(B);
A.hasMany(B);
A.belongsToMany(B, { through: 'C' });
```

## Fetching Associations

```js
// Lazy Loading
const awesomeCaptain = await Captain.findOne({
  where: { name: "Jack Sparrow" }
});
const hisShip = await awesomeCaptain.getShip();
```

```js
// Eager Loading
const awesomeCaptain = await Captain.findOne({
  where: { name: "Jack Sparrow" },
  include: Ship
});
```

## Creating with Associations

```js
const Product = sequelize.define('product', /* ... */);
const User = sequelize.define('user', /* ... */);
const Address = sequelize.define('address', /* ... */);

Product.User = Product.belongsTo(User);
User.Addresses = User.hasMany(Address);
```

```js
const product = Product.create(
  { 
    title: 'Chair',
    user: {
      firstName: 'Mick',
      lastName: 'Broadstone',
      addresses: [{
        type: 'home',
        line1: '100 Main St.',
        city: 'Austin',
        state: 'TX',
        zip: '78704'
      }]
    }
  },
  { 
    include: [{ 
      associations: Product.User,
      include: [ User.Addresses ],
    }]
  },
);
```

## Concepts

- SQL
- Sequelize
<!--  -->
- Models
- Instances
- Queries
- Associations
<!--  -->
- Lazy Loading
- Eager Loading

## Codes

```js
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "node-complete",
  "root",
  "ddJZgjRLy987x7n23.2_",
  { dialect: "mysql", host: "localhost" },
);

module.exports = sequelize;
```

## Useful Resources

- [Sequelize Offical Docs](https://sequelize.org/)
