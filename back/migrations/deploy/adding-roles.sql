-- Deploy blog:adding-roles to pg

BEGIN;

INSERT INTO "role" ("label") VALUES
('admin'),
('user');

COMMIT;
