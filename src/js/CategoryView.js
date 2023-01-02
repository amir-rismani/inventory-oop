import Storage from "./Storage.js";

const titleInput = document.querySelector('#category-title');
const descriptionInput = document.querySelector('#category-description');
const addNewCategoryButton = document.querySelector('#add-new-category');
const closeCategorySectionButton = document.querySelector('#close-category-section');

class CategoryView {
    constructor() {
        addNewCategoryButton.addEventListener('click', (event) => this.addNewCategory(event));
        this.categories = [];
    }

    addNewCategory(event) {
        event.preventDefault();
        const title = titleInput.value;
        const description = descriptionInput.value;
        if (!title || !description) {
            this.displayMessage("ورود عنوان و شرح دسته بندی ضروری است.", "error");
            return
        }
        Storage.saveCategory({ title, description });
        this.clearInputs();
        this.displayMessage("دسته بندی جدید ایجاد شد.");
        this.setCategories();
        this.updateCategoryList();
    }

    setCategories() {
        this.categories = Storage.getAllCategories();
    }

    updateCategoryList() {
        let options = '<option value="">انتخاب کنید</option>';
        this.categories.forEach(category => {
            options += `<option value="${category.id}">${category.title}</option>`
        });
        const productCategorySelector = document.querySelector('#product-category');
        productCategorySelector.innerHTML = options;
    }

    clearInputs() {
        titleInput.value = "";
        descriptionInput.value = "";
    }

    displayMessage(message, type = 'success') {
        const messageElement = document.querySelector('.alert-message');
        if (messageElement) messageElement.remove();

        const categoryButtonsContainer = document.querySelector('#category-buttons');
        const paragraph = document.createElement('p');
        paragraph.textContent = message;
        paragraph.classList.add('alert-message', type === 'error' ? 'text-red-500' : 'text-green-500');
        categoryButtonsContainer.parentNode.insertBefore(paragraph, categoryButtonsContainer);
    }
}

export default new CategoryView();