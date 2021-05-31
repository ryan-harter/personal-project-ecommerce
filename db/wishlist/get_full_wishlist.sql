select wishlists.*, wishlists_products.*, users.*, products.*, product_images.*
from wishlists left join wishlists_products
on wishlists.wishlist_id = wishlists_products.wishlist_id
left join users
on users.user_id = wishlists.user_id
left join products
on products.product_id = wishlists_products.product_id
left join product_images
on product_images.product_id = products.product_id
where wishlists.wishlist_id = ${wishlist_id};