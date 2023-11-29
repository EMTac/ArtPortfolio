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

function openPopup(event) {
    if (event.target.tagName === 'IMG') {
        var imageUrl = event.target.src;
        var image = new Image();

        image.onload = function() {
            var viewportWidth = window.innerWidth;
            var viewportHeight = window.innerHeight;
            var imageWidth = image.width;
            var imageHeight = image.height;

            var maxImageWidth = viewportWidth * 0.9;
            var maxImageHeight = viewportHeight * 0.9;

            if (imageWidth / maxImageWidth > imageHeight / maxImageHeight) {
                document.getElementById('popup-image').style.width = '90%';
                document.getElementById('popup-image').style.height = 'auto';
            } else {
                document.getElementById('popup-image').style.width = 'auto';
                document.getElementById('popup-image').style.height = '90%';
            }

            document.getElementById('popup-image').src = imageUrl;

            document.getElementById('popup').style.display = 'flex';
            document.getElementById('controls').style.display = 'flex';
            document.getElementById('close').style.display = 'flex';
        };

        image.src = imageUrl;
        document.body.style.overflow = 'hidden';
    }
}

function closePopup() {
    var popup = document.getElementById('popup');
    var image = document.getElementById('popup-image');
    var controls = document.getElementById('controls');
    var close = document.getElementById('close');

    popup.style.display = 'none';
    image.style.transform = 'translate(0, 0)';
    controls.style.display = 'none';
    close.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function adjustImageSize(action) {
    var image = document.getElementById('popup-image');

    var currentWidth = image.width;
    var currentHeight = image.height;

    var percentageChange = 2;

    var multiplier = action === 'enlarge' ? (1 * percentageChange) : (1 / percentageChange);

    var newWidth = currentWidth * multiplier;
    var newHeight = currentHeight * multiplier;

    image.style.width = newWidth + 'px';
    image.style.height = newHeight + 'px';
}

var isDragging = false;
var startX, startY, initialX, initialY;

function handleMouseDown(e) {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    var image = document.getElementById('popup-image');
    var style = getComputedStyle(image);
    
    var transformMatrix = new DOMMatrix(style.transform);
    initialX = transformMatrix.e;
    initialY = transformMatrix.f;

    document.getElementById('popup').classList.add('dragging');
}

function handleMouseMove(e) {
    if (!isDragging) return;
    var newX = e.clientX;
    var newY = e.clientY;

    var offsetX = newX - startX;
    var offsetY = newY - startY;

    var image = document.getElementById('popup-image');
    image.style.transform = 'translate(' + (initialX + offsetX) + 'px, ' + (initialY + offsetY) + 'px)';
}

function handleMouseUp() {
    isDragging = false;
    document.getElementById('popup').classList.remove('dragging');
}

document.getElementById('popup').addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

function toggleImage(container, isHovered) {
    var stillImage = container.querySelector('.still-image');
    var animatedGif = container.querySelector('.animated-gif');
    var gifLabel = container.querySelector('.gif-label');

    if (isHovered) {
        stillImage.style.display = 'none';
        gifLabel.style.display = 'none';
        animatedGif.style.display = 'block';
    } else {
        stillImage.style.display = 'block';
        gifLabel.style.display = 'block';
        animatedGif.style.display = 'none';
    }
}
