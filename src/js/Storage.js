categories = [
    {
        id: 1,
        title: 'فرانت اند',
        description: 'برنامه نویسی فرانت اند',
        create_date: '2023-01-01T07:21:16.982Z'
    },
    {
        id: 2,
        title: 'بک اند',
        description: 'برنامه نویسی بک اند',
        create_date: '2022-01-01T07:21:16.982Z'
    }
]
export default class Storage {
    //=============== Categories
    // Get All Categories
    // Save Catrgory
    // =========================
    static getAllCategories() {
        const categories = JSON.parse(localStorage.getItem('categories')) || [];
        const sortedCategories = categories.sort((a, b) => (new Date(a.create_date) > new Date(b.create_date) ? -1 : 1))
        return sortedCategories
    }

    static saveCategory(categoryItem) {
        const categories = this.getAllCategories();
        const findedCategory = categories.find(category => category.id === categoryItem.id);
        if (findedCategory) {
            // Edit Item
            findedCategory.title = categoryItem.title;
            findedCategory.description = categoryItem.description;
            findedProduct.update_date = new Date().toISOString;
        }
        else {
            // Save Item
            categoryItem.id = new Date().getTime();
            categoryItem.create_date = new Date().toISOString;
            categories.push(categoryItem);
        }
        localStorage.setItem('categories', JSON.stringify(categories));
    }

    //================= Products
    // Get All Products
    // Save Product
    // =========================
    static getAllProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const sortedProducts = products.sort((a, b) => (new Date(a.create_date) > new Date(b.create_date) ? -1 : 1));
        return sortedProducts
    }

    static saveProduct(productItem) {
        const products = this.getAllProducts();
        findedProduct = products.find(product => product.id === productItem.id);
        if (findedProduct) {
            // Edit Item
            findedProduct.title = productItem.title;
            findedProduct.description = productItem.description;
            findedProduct.quantity = productItem.description;
            findedProduct.update_date = new Date().toISOString;
        } else {
            // Save Item
            productItem.id = new Date().getTime();
            productItem.create_date = new Date().toISOString;
            products.push(productItem);
        }
        localStorage.setItem('products', JSON.stringify(products));
    }
}