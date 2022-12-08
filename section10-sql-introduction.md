# Section 10 SQL Introduction

1. Choosing a Database
2. NoSQL Introduction
3. Comparing SQL and NoSQL
<!--  -->
4. Setting Up MySQL
5. Connecting Our App to the SQL Database
6. Basic SQL & Creating a Table
7. Retrieving Data
8. Fetching Products
9. Fetching Products - Time to Practice
10. Inserting Data into the Database
11. Fetching a Single Product with the "where" Condition

## Database

Our goal is to store data and make it easily and efficiently accessible. Database is quicker than accessing a file especially as the data grows. We can opt for a SQL database (e.g. MySQL) or a NoSQL database (e.g. MongoDB).

## SQL (Structured Query Language) Database

- Data Schema: all data in a table has to fit the schema
  - Table
  - Field (col)
  - Record (row)
  - Type (number or string)
- Data Relations: tables are connected
  - One-to-One
  - One-to-Many
  - Many-to-Many
- Query
  - Keywords
  - Parameters

## NoSQL Database

- No Data Schema: no structure required
  - Collections
  - Documents
- No Data Relations: duplication over relation

In the NoSQL world, there is no real relations, instead, data can be duplicated. We don't connect the data through some ID or behind the scenes setup relation, instead, we simply duplicate data needed in different collections. That means if that data changes, we have to update it in multiple places. This gives us the huge advantage when retrieving data, as we don't have to join multiple tables together, which can lead to long and difficult code and impact performance.

## Horizontal vs Vertical Scaling

In **horizontal scaling**, we add more servers. The advantage is we can do this infinitely by buying new servers, but we also need some process that merges different servers together.

In **vertical scaling**, we increase the capacity of exisitng servers by adding more CPU or memory. This is logistically easier, but you have a physical limit for a single machine.

## Comparsion

|                    | SQL                                         | NoSQL                                      |
|--------------------|---------------------------------------------|--------------------------------------------|
| Schema             | True                                        | False                                      |
| Relation           | Necessary                                   | No or very few                             |
| Sharing            | Distributed across multiple tables          | Duplicated across different collections    |
| Horizontal Scaling | Difficult or impossible                     | Possible                                   |
| Vertical Scaling   | Possible                                    | Possible                                   |
| Usage              | Limited for frequent read and write queries | Performant for mass read and write queries |

## Concepts

- SQL
- NoSQL
- Horizontal Scaling
- Vertical Scaling
- Connection Pool

## Codes

```

```

## Useful Resources

- [SQL Tutorial](https://www.w3schools.com/sql/)
- [Node MySQL Package](https://github.com/sidorares/node-mysql2)
