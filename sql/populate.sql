CREATE TABLE product (
    id serial PRIMARY KEY,
    name VARCHAR (255),
    description TEXT,
    price DECIMAL (10, 2),
    img VARCHAR (255)
);

INSERT INTO product (name, description, price, img)
VALUES
    ('Coke', 'Best-selling soft drink', 1.99, 'coke.jpg'),
    ('Sprite', 'Crisp, refreshing and clean-tasting', 1.50, 'sprite.jpg'),
    ('Pepsi', 'Second best-selling soft drink', 1.79, 'pepsi.jpg'),
    ('Fanta', 'Sparkling orange drink', 2.10, 'fanta.jpg'),
    ('Guinness', 'Malty sweetness and hoppy bitterness', 5.99, 'guinness.jpg');
