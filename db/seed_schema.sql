drop table if exists wishlists_products;
drop table if exists wishlists;
drop table if exists subcategories;
drop table if exists product_categories;
drop table if exists categories;
drop table if exists product_labels;
drop table if exists label_values;
drop table if exists label_attributes;
drop table if exists product_images;
drop table if exists users;
drop table if exists products;


create table products(
    product_id serial primary key not null,
    price decimal not null, 
    description varchar(1000) not null,
    name varchar(100) not null
  );


create table users(
    user_id serial primary key not null,
    email varchar(100) not null,
    password varchar(1000) not null
  );

create table product_images(
    product_images_id serial primary key not null,
    product_id references products(product_id),
    url text not null
  );

create table categories(
    category_id serial primary key not null,
    category_name varchar(100)
);

create table products_cataegories(
  products_categoriesz_id serial primary key not null,
  product_id int references products(product_id),
  category_id int references categories(category_id)
);

create table subcategories(
  subcategory_id serial primary key not null,
  parent_id int references categories(category_id),
  child_id int references categories(category_id)
);

create table wishlists(
  wishlist_id serial primary key not null,
  user_id int references users(user_id)
  name varchar(100)
);

create table wishlists_products(
  wishlists_products_id serial primary key not null,
  product_id int references products(product_id),
  qty int
);

create table label_attributes(
  label_attribute_id serial primary key not null,
  type varchar(255)
);

create table lable_values(
  label_value_id serial primary key not null,
  value varchar(255),
  lable_attribute_id int references label_attributes(lable_attribute_id)
);

create table product_labels(
  product_label_id serial primary key not null,
  product_id int references products(product_id),
  label_attribute_id int

)