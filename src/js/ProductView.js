import Utils from "./Utils.js";
import Storage from "./Storage.js";
const productTitleInput = document.querySelector('#product-title');
const productQuantityInput = document.querySelector('#product-quantity');
const productCategorySelector = document.querySelector('#product-category');
const addNewProductButton = document.querySelector('#add-new-product');

class ProductView {
    constructor() {
        addNewProductButton.addEventListener('click', event => this.addNewProduct(event));
        this.products = []
    }

    addNewProduct(event) {
        event.preventDefault();
        const title = productTitleInput.value;
        const quantity = productQuantityInput.value;
        const productCategory = productCategorySelector.value;

        if (!title || !quantity || !productCategory) {
            Utils.displayMessage('وارد کردن فیلدها ضروری است', addNewProductButton, 'error');
            return
        }

        Storage.saveProduct({ title, quantity, productCategory });
        Utils.clearInputs(addNewProductButton.closest('form'));
        Utils.displayMessage("محصول جدید ایجاد شد.", addNewProductButton);
        this.setProducts();

    }

    setProducts() {
        this.products = Storage.getAllProducts();
        this.updateProductList();
    }

    updateProductList() {
        let productItems = '';
        this.products.forEach(product => {
            const selectedCategory = Storage.getAllCategories().find(category => category.id == product.productCategory);
            productItems += `
                        <div class="flex justify-between items-center">
                            <span class="text-white">${product.title}</span>
                            <span class="flex justify-center items-center gap-x-2 text-sm">
                                <span>${new Date(product.createDate).toLocaleDateString('fa')}</span>
                                <span class="border border-slate-500 rounded-full px-2 text-slate-500">${selectedCategory.title}</span>
                                <span class="h-5 w-5 flex justify-center items-center bg-slate-300 text-slate-900 rounded-full">${product.quantity}</span>
                                <span class="text-red-500 cursor-pointer" data-id="${product.id}">حذف</span>
                            </span>
                        </div>            
                        `
        });
        const productItemsContainer = document.querySelector('#product-items');
        productItemsContainer.innerHTML = productItems;
    }
}

export default new ProductView();