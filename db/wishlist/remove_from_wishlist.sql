delete from wishlists_products
where product_id = ${id}

returning *;