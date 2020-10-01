CREATE TABLE restaurants(id INTEGER PRIMARY KEY,name TEXT);
CREATE TABLE menus(id INTEGER PRIMARY KEY, name TEXT, restaurants_id INTEGER);
CREATE TABLE items(id INTEGER PRIMARY KEY, name TEXT, price FLOAT, menus_id INTEGER);

INSERT INTO restaurants(name) VALUES('McDonalds');
INSERT INTO restaurants(name) VALUES('KFC');
INSERT INTO restaurants(name) VALUES('BurgerKing');
INSERT INTO restaurants(name) VALUES('Hees');

SELECT id, name FROM restaurants;
UPDATE restaurants SET name = 'WOK' WHERE id = 3;
INSERT INTO menus(name, restaurants_id) VALUES('McBreakfast', 4);
INSERT INTO menus(name, restaurants_id) VALUES('McAllDay', 4);
INSERT INTO menus(name, restaurants_id) VALUES('Chinese Meat', 1);
INSERT INTO menus(name, restaurants_id) VALUES('Chinese Vegetarian', 1);
INSERT INTO menus(name, restaurants_id) VALUES('KingBreakfast', 2);
INSERT INTO menus(name, restaurants_id) VALUES('KingAllDay', 2);
INSERT INTO menus(name, restaurants_id) VALUES('WokNoodles', 3);
INSERT INTO menus(name, restaurants_id) VALUES('WokRice', 3);

INSERT INTO items(name, price, menus_id) VALUES('BigMac', 5, 2);
INSERT INTO items(name, price, menus_id) VALUES('ChickenNuggets', 4, 2);
INSERT INTO items(name, price, menus_id) VALUES('McMuffins', 3, 1);
INSERT INTO items(name, price, menus_id) VALUES('McFlurry', 1, 2);
INSERT INTO items(name, price, menus_id) VALUES('McFlurry', 1, 1);
INSERT INTO items(name, price, menus_id) VALUES('20 Piece Bucket', 14, 6);
INSERT INTO items(name, price, menus_id) VALUES('10 Piece Bucket', 9, 6);
INSERT INTO items(name, price, menus_id) VALUES('Popcorn Chicken', 6, 6);
INSERT INTO items(name, price, menus_id) VALUES('Chicken and Egg', 5, 5);
INSERT INTO items(name, price, menus_id) VALUES('Beef In Sauce', 6, 3);
INSERT INTO items(name, price, menus_id) VALUES('Sweet and Sour Chicken', 5, 3);
INSERT INTO items(name, price, menus_id) VALUES('Fried Noodles', 4, 4);
INSERT INTO items(name, price, menus_id) VALUES('Fried Vegatables', 2, 4);
INSERT INTO items(name, price, menus_id) VALUES('Noodles with beef', 6, 7);
INSERT INTO items(name, price, menus_id) VALUES('Noodles with chicken', 6, 7);
INSERT INTO items(name, price, menus_id) VALUES('Rice with Chicken', 5, 8);
INSERT INTO items(name, price, menus_id) VALUES('Rice with Vegetables', 4, 8);

DELETE FROM restaurants WHERE id = 1;
SELECT id, name FROM restaurants;
UPDATE restaurants SET id=1 WHERE id=5;
INSERT INTO restaurants(name) VALUES('McDonalds');
SELECT * FROM restaurants JOIN menus ON restaurants.id = menus.restaurants_id;
ALTER TABLE items ADD menus_id INTEGER;
INSERT INTO items(name, price, menu_id) VALUES('Tuna Melt', 3.50, 2);
SELECT * FROM restaurants JOIN menus ON restaurants.id = menus.restaurants_id JOIN items ON menus.id=items.menu_id;
SELECT menus.name, SUM(items.price) FROM menus JOIN items ON menus.id=items.menus_id;
SELECT SUM(items.price) FROM items GROUP BY menus.name;
SELECT menus.name, COUNT(items.id) FROM menus JOIN items ON menus.id=items.menus_id;
SELECT restaurants.name, COUNT(menus.id) FROM restaurants JOIN menus ON restaurants.id=menus.restaurants_id GROUP BY restaurants.name;
SELECT SUM(items.price) FROM items JOIN menus ON menus.id=items.menus_id WHERE menus_id=2
SELECT menus.name, SUM(items.price) FROM menus JOIN items ON menus.id=items.menus_id GROUP BY menus.name;
SELECT restaurants.name, menus.name, items.name FROM restaurants JOIN menus ON restaurants.id=menus.restaurants_id JOIN items ON menus.id=items.menus_id WHERE restaurants.id=3;