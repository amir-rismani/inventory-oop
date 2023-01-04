import Utils from "./Utils.js";
import Storage from "./Storage.js";
const productIdInput = document.querySelector('#product-id');
const productTitleInput = document.querySelector('#product-title');
const productQuantityInput = document.querySelector('#product-quantity');
const productCategorySelector = document.querySelector('#product-category');
const addNewProductButton = document.querySelector('#add-new-product');
const searchInput = document.querySelector('#search');
const sortSelector = document.querySelector('#sort');

class ProductView {
    constructor() {
        addNewProductButton.addEventListener('click', event => this.addNewProduct(event));
        searchInput.addEventListener('input', event => this.search(event));
        sortSelector.addEventListener('change', event => this.sort(event));
        this.products = []
    }

    addNewProduct(event) {
        event.preventDefault();
        const id = productIdInput.value;
        const title = productTitleInput.value;
        const quantity = productQuantityInput.value;
        const productCategory = productCategorySelector.value;

        if (!title || !quantity || !productCategory) {
            Utils.displayMessage('وارد کردن فیلدها ضروری است', addNewProductButton, 'error');
            return
        }

        Storage.saveProduct({ id, title, quantity, productCategory });
        Utils.clearInputs(addNewProductButton.closest('form'));
        Utils.displayMessage(id ? "محصول ویرایش شد." : "محصول جدید ایجاد شد.", addNewProductButton);
        this.setProducts();

    }

    setProducts() {
        this.products = Storage.getAllProducts();
        this.updateProductList(this.products);
    }

    updateProductList(products) {
        let productItems = '';
        if (products.length) {
            products.forEach(product => {
                const selectedCategory = Storage.getAllCategories().find(category => category.id == product.productCategory);
                productItems += `
                            <div class="flex justify-between items-center">
                                <span class="text-white">${product.title}</span>
                                <span class="flex justify-center items-center gap-x-2 text-sm">
                                    <span>${new Date(product.createDate).toLocaleDateString('fa')}</span>
                                    <span class="border border-slate-500 rounded-full px-2 text-slate-500">${selectedCategory.title}</span>
                                    <span class="h-5 w-5 flex justify-center items-center bg-slate-300 text-slate-900 rounded-full">${product.quantity}</span>
                                    <span class="edit-product text-green-500 cursor-pointer" data-id="${product.id}">ویرایش</span>
                                    <span class="remove-product text-red-500 cursor-pointer" data-id="${product.id}">حذف</span>
                                </span>
                            </div>
                            `
            });
        } else {
            productItems += `
                            <div class="flex justify-center items-center text-slate-700">
                                محصولی یافت نشد...
                            </div>
                            `

        }
        const productItemsContainer = document.querySelector('#product-items');
        productItemsContainer.innerHTML = productItems;

        const editProductLinks = [...productItemsContainer.querySelectorAll('.edit-product')];
        editProductLinks.forEach(editProductLinks => editProductLinks.addEventListener('click', event => this.loadProductDetails(event.target.dataset.id)))

        const removeProductLinks = [...productItemsContainer.querySelectorAll('.remove-product')];
        removeProductLinks.forEach(removeProductLinks => removeProductLinks.addEventListener('click', event => this.remove(event.target.dataset.id)))
    }

    search(event) {
        const searchValue = event.target.value.toLowerCase();
        const searchResults = this.products.filter((product) => product.title.toLowerCase().includes(searchValue));
        this.updateProductList(searchResults);
    }

    sort(event) {
        const sortType = event.target.value;
        let sortedProducts = []
        switch (sortType) {
            case "oldest":
                sortedProducts = this.products.sort((a, b) => new Date(a.createDate) < new Date(b.createDate) ? -1 : 1)
                break;
            case "name":
                sortedProducts = this.products.sort((a, b) => a.title < b.title ? -1 : 1)
                break;
            case "edited":
                sortedProducts = this.products.sort((a, b) => new Date(a.updateDate) < new Date(b.updateDate) ? -1 : 1)
                break;
            default:
                sortedProducts = this.products.sort((a, b) => new Date(a.createDate) > new Date(b.createDate) ? -1 : 1)
                break;
        }
        this.updateProductList(sortedProducts);
    }

    remove(productId) {
        Storage.removeProduct(productId);
        this.setProducts();
    }

    loadProductDetails(productId) {
        const products = Storage.getAllProducts();
        const selectedProductItem = products.filter(product => product.id === parseInt(productId))[0];
        productIdInput.value = selectedProductItem.id;
        productTitleInput.value = selectedProductItem.title;
        productQuantityInput.value = selectedProductItem.quantity;
        productCategorySelector.value = selectedProductItem.productCategory;
    }

}

export default new ProductView();