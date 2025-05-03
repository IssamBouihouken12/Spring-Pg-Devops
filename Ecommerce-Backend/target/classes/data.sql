-- Données Customer
INSERT INTO customer (customer_id, nom, region) VALUES (1, 'Ali', 'Casablanca');
INSERT INTO customer (customer_id, nom, region) VALUES (2, 'Sara', 'Rabat');

-- Données DimDate
INSERT INTO dim_date (date_id, date_complete, annee, mois, nom_mois, trimestre, jour_semaine)
VALUES (20250419, '2025-04-19', 2025, 4, 'Avril', 2, 'Samedi');

-- Exemple de produit (si tu n'en as pas)
INSERT INTO product (product_id, product_name, category, unit_price)
VALUES (1, 'Stylo Bleu', 'Papeterie', 5.5);
