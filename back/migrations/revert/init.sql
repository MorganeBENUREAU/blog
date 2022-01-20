-- Revert blog:init from pg

BEGIN;

DROP TABLE "post_has_category" CASCADE;

DROP TABLE "user_has_post" CASCADE;

DROP TABLE "comment" CASCADE;

DROP TABLE "category" CASCADE;

DROP TABLE "post" CASCADE;

DROP TABLE "user" CASCADE;

DROP TABLE "role" CASCADE;

DROP DOMAIN email CASCADE;

COMMIT;
