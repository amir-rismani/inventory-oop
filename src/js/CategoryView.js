import Storage from "./Storage.js";
import Utils from "./Utils.js";
const titleInput = document.querySelector('#category-title');
const descriptionInput = document.querySelector('#category-description');
const addNewCategoryButton = document.querySelector('#add-new-category');
const closeCategorySectionButton = document.querySelector('#close-category-section');
const showCategorySectionButton = document.querySelector('#show-category-section');
const categorySection = document.querySelector('#category-section');

class CategoryView {
    constructor() {
        showCategorySectionButton.addEventListener('click', this.categorySectionToggler);
        addNewCategoryButton.addEventListener('click', (event) => this.addNewCategory(event));
        closeCategorySectionButton.addEventListener('click', this.categorySectionToggler);
        this.categories = [];
    }

    addNewCategory(event) {
        event.preventDefault();
        const categoryButtonsContainer = document.querySelector('#category-buttons');
        const title = titleInput.value;
        const description = descriptionInput.value;

        if (!title || !description) {
            Utils.displayMessage("ورود عنوان و شرح دسته بندی ضروری است.", categoryButtonsContainer, "error");
            return
        }
        Storage.saveCategory({ title, description });
        Utils.clearInputs(categoryButtonsContainer.closest('form'));
        Utils.displayMessage("دسته بندی جدید ایجاد شد.", categoryButtonsContainer);
        this.setCategories();
        this.categorySectionToggler();
    }

    setCategories() {
        this.categories = Storage.getAllCategories();
        this.updateCategoryList();
    }

    updateCategoryList() {
        let options = '<option value="">انتخاب کنید</option>';
        this.categories.forEach(category => {
            options += `<option value="${category.id}">${category.title}</option>`
        });
        const productCategorySelector = document.querySelector('#product-category');
        productCategorySelector.innerHTML = options;
    }

    getCategoryName(id) {
        const findedCategory = this.categories.find(category => category.id == id);
        return findedCategory.title
    }

    categorySectionToggler() {
        showCategorySectionButton.classList.toggle('hidden');
        categorySection.classList.toggle('hidden');
    }
}

export default new CategoryView();