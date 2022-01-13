-- Verify blog:init on pg

BEGIN;

SELECT "id" FROM "user" WHERE FALSE;
SELECT "id" FROM "role" WHERE FALSE;
SELECT "id" FROM "post" WHERE FALSE;
SELECT "id" FROM "category" WHERE FALSE;
SELECT "id" FROM "comment" WHERE FALSE;


SELECT "user"."id" 
FROM "user" 
JOIN "user_has_post" ON "user_has_post"."user_id" = "user"."id"
JOIN "post" ON "user_has_post"."post_id" = "post"."id"
JOIN "user_has_category" ON "user_has_category"."user_id" = "user"."id"
JOIN "category" ON "user_has_category"."category_id" = "category"."id"
WHERE FALSE;

ROLLBACK;
