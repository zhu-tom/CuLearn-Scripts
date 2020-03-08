window.onload = () => {
    console.log(window.jQuery);
}

document.addEventListener('DOMContentLoaded', () => {
    $.ajax({
        url: 'https://culearn.carleton.ca/moodle/my/',
        success: (result) => {
            console.log(result);
        }
    });
});