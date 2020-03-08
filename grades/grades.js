document.addEventListener('DOMContentLoaded', () => {
    console.log(window.jQuery);
    $.ajax({
        url: 'https://culearn.carleton.ca/moodle/my/',
        success: (result) => {
            console.log(result);
        }
    });
});