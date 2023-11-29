function showContent(contentId, clickedButton) {
    console.log(clickedButton);
    var contentSections = document.querySelectorAll('.content');
    contentSections.forEach(function(section) {
        section.style.display = 'none';
    });

    var selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }

    var buttons = document.querySelectorAll('.header-button');
    buttons.forEach(function(button) {
        button.classList.remove('selected');
    });

    if (clickedButton) {
        clickedButton.classList.add('selected');
    }
}