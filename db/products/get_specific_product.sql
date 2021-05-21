select * from products
from products left join product_images
on products.product_id = product_images.product_id
where name like %${query}%