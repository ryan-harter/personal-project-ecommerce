# Personal Project - Nerdy E-commerce site

## MVP

- users should be able to find products
- users should be able to purchase products - stripe? - 
- users should be able to register, login, delete, logout of an account - done
- users should be able to have a cart - frontend doneish
- users should be able to add items to a wishlist





## ICEBOX

- admin can add items to store
- users should be able to post an item for sale on the stores marketplace
- share products - sms, email, socials
- fully responsive design, mobile and desktop
- contact us form
- product ratings/reviews
- products users put up for sale can be set price or auction with time limit
- live stream data / May be better to do user messaging? message boards where people can arrange barter/trade of items/services.


### Dependencies

- axios
- express
- massive
- express-session
- redux 
- react-redux 
- redux-promise-middleware
- redux devtools
- react-router-dom
- bcryptjs
- dotenv
- stripe?
- socketio?


### Tables 
products
```SQL
  create table products(
    product_id serial primary key not null,
    price decimal not null, 
    description varchar(1000) not null,
    name varchar(100) not null
  );
```
users
```SQL
  create table users(
    user_id serial primary key not null,
    email varchar(100) not null,
    password varchar(1000) not null
  );
```
<!-- tags
```SQL
  create table tags(
    tag_id serial primary key not null,
    tag_name varchar(100)
     
  )
```

product_tags
```SQL
  create table product_tags(
    product_tags_id serial primary key not null,
    product_id references products(product_id),
    tag_id references tags(tag_id)
  )
``` -->

product_images
```SQL
  create table product_images(
    product_images_id serial primary key not null,
    product_id references products(product_id),
    url text not null
  );
```

categories
```SQL
create table categories(
  id serial primary key not null,
  category_name varchar(100)
);
```

products_categories
```SQL
create table products_cataegories(
  products_categories id serial primary key not null,
  product_id references products(product_id),
  category_id references categories(category_id)
);
```

wishlists
```SQL
create table wishlists(
  wishlist_id serial primary key not null,
  user_id references user(user_id)
  name varchar(100)
);
```

wishlists_products
```SQL
create table wishlists_products(
  wishlists_products_id serial primary key,
  product_id references products(product_id),
  qty int
);
```