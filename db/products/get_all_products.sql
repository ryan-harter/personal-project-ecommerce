select products.*, product_images.*, product_categories.*, categories.*
from products left join product_images
on products.product_id = product_images.product_id;
left join product_categories
on product_categories.product_id = products.product_id
left join categories
on categories.category_id = product_categories.category_id

