-- Verify blog:adding-roles on pg

BEGIN;

SELECT * FROM "role" WHERE "label" = 'admin';

ROLLBACK;
