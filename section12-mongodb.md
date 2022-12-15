# Section 12 Working with NoSQL & Using MongoDB

1. What is MongoDB?
2. Relations in NoSQL
<!--  -->
3. Setting Up MongoDB
4. Installing the MongoDB Driver
5. Creating the Database Connection
6. Finishing the Database Connection
7. Using the Database Connection
<!--  -->
8. Creating Products
9. Understanding the MongoDB Compass
10. Fetching All Products
11. Fetching a Single Product
12. Making the "Edit" & "Delete" Buttons Work Again
13. Working on the Product Model to Edit our Product
14. Finishing the "Update Product" Code
15. One Note About Updating Products
16. Deleting Products
17. Fixing the "Add Product" Functionality
<!--  -->
18. Creating New Users
19. Storing the User in our Database
20. Working on Cart Items & Orders
21. Adding the "Add to Cart" Functionality
22. Storing Multiple Products in the Cart
23. Displaying the Cart Items
24. Fixing a Bug
25. Deleting Cart Items
<!--  -->
26. Adding an Order
27. Adding Relational Order Data
28. Getting Orders
29. Removing Deleted Items From the Cart

## MongoDB

### Data

The name MongoDB stems from the word **humongous**. It was built for large scale applications to quickly query data, store data and interact with data. The core philosophy is **schemaless**, meaning the data don't have to have the same structure. This gives flexibility for your application to grow and to change its data requirements over time.

- **Database**: Shop
- **Collections**: Users, Orders
- **Documents**: `{ name: 'Max', age: 29 }`, `{ name: 'Manu' }`

MongoDB uses json (javascript object notation) to store data in collections. The javascript objects can have nested (embedded) object and array with them. With such flexibilty and structure, relations are also managed differently from SQL.

### Relations

It is normal to have duplicated data in MongoDB. For example, an order entry can hold a copy of the user entry. Instead of matching data by ID in SQL, you depict a relation by embedding data into other documents. Therefore, you still have to merge two documents manually.

When merging, you only copy the information that is important in the context of another document. For example, an order entry only hold a partial copy of the user entry. This allows you to fetch all orders without having to fetch and merge all users. You store and query data in the format you need it without a lot of merging. This makes NoSQL fast and efficient.

However, other than **embedded documents**, you can still depict relations with **references**. There are cases where you have too much data duplication and manipulation that embedded documents is not ideal. For example, storing favourite books for every customer. A lot of customers might have the same favourite books and these books might change very often. In such a scenario, it would be easier to have two collections with references and marge them when needed.

### Characteristics

- No data scheme
- Fewer data relations
  - Embedded documents
  - References

## Concepts

- ?

## Codes

```

```

## Useful Resources

- [Link](URL)
