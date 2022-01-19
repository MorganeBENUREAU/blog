BEGIN;

INSERT INTO "user" ("firstname", "lastname", "email", "password", "role_id") VALUES
('Admin', 'test','admin@monblog.io', '$2a$12$UNDFj3MhhKk7wIyRBkbEtuKN6F7NoVHy7Xx8tRWi6q5LWoxvQNfoy', 1),
('User', 'test','user@monblog.io', '$2a$12$xfJWfMwlEIQe1fJxf0tli.S.6WpIdQmbt2rYKRijYMns9L/yeCRhu', 2);

INSERT INTO "post" ("title", "content") VALUES 
('Je suis un post', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer velit eros, viverra ac quam eget, porta condimentum leo. Cras placerat lectus sed turpis auctor efficitur. Mauris rhoncus posuere porta. Curabitur volutpat lectus dolor, ac ultrices justo condimentum non. Etiam dictum, neque ac placerat suscipit, magna libero vestibulum mi, pulvinar porttitor tellus lectus et mi. Duis vulputate laoreet dui id aliquam. Donec ullamcorper velit tortor, id volutpat nunc molestie nec. Vivamus mollis dolor vel erat bibendum dapibus. Quisque ullamcorper quam eu dolor finibus, a viverra magna efficitur. Etiam posuere facilisis risus, a euismod nunc sagittis id. Cras tincidunt, velit non hendrerit hendrerit, tellus nisi cursus justo, vel porta tortor augue non sapien. Maecenas dui neque, eleifend vel sodales vel, ornare in justo. Curabitur at malesuada ipsum. Nullam tincidunt odio mollis nunc mattis fermentum. Phasellus nisi orci, lobortis sit amet lorem et, bibendum sodales sapien.');

INSERT INTO "category" ("label") VALUES 
('général'), ('technologies');

INSERT INTO "comment" ("comment", "post_id", "user_id") VALUES 
('boooouuuh', 1, 2);

INSERT INTO "user_has_post" ("user_id", "post_id") VALUES 
(2, 1);

INSERT INTO "post_has_category" ("post_id", "category_id") VALUES 
(1, 1);


COMMIT;