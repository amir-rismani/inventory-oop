export default class Utils {
    static displayMessage(message, element, type = 'success') {
        const messageElement = document.querySelector('.alert-message');
        if (messageElement) messageElement.remove();
        const paragraph = document.createElement('p');
        paragraph.textContent = message;
        paragraph.classList.add('alert-message', type === 'error' ? 'text-red-500' : 'text-green-500');
        element.parentNode.insertBefore(paragraph, element);
    }

    static clearInputs(from) {
        const inputs = from.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.value = "";
        });
    }
}