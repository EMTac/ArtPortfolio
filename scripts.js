function showContent(contentId, clickedButton) {
    console.log(clickedButton);
    var contentSections = document.querySelectorAll('.content');
    contentSections.forEach(function(section) {
        section.style.display = 'none';
    });

    var selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'flex';
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
        var imageTitle = event.target.getAttribute('data-title');
        var image = new Image();

        document.getElementById('info-button').style.display = 'block';

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
            document.getElementById('popup-title').innerHTML = imageTitle;

            document.getElementById('popup').style.display = 'flex';
            document.getElementById('controls').style.display = 'flex';
            document.getElementById('close').style.display = 'flex';

            countColors(imageUrl);
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

    if (action === 'shrink' && (currentWidth>100 || currentHeight>100)) {
        console.log("shrink")
        var multiplier = (1 / percentageChange)
        var newWidth = currentWidth * multiplier;
        var newHeight = currentHeight * multiplier;

        image.style.width = newWidth + 'px';
        image.style.height = newHeight + 'px';
    } else if (action === 'enlarge' && (currentWidth<10000 || currentHeight<10000)) {
        console.log("enlarge")
        var multiplier = (1 * percentageChange)
        var newWidth = currentWidth * multiplier;
        var newHeight = currentHeight * multiplier;
    
        image.style.width = newWidth + 'px';
        image.style.height = newHeight + 'px';
    } else {}
}

var isDragging = false;
var startX, startY, initialX, initialY;

function handleMouseDown(e) {
    if (e.target.id === 'popup-image') {
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

        image.addEventListener('mousemove', handleMouseMove);
    }
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
    if (isDragging) {
        isDragging = false;
        document.getElementById('popup').classList.remove('dragging');

        var image = document.getElementById('popup-image');
        image.removeEventListener('mousemove', handleMouseMove);
    }
}

document.getElementById('popup-image').addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);

function handleTouchStart(e) {
    if (e.target.id === 'popup-image') {
        e.preventDefault();
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;

        var image = document.getElementById('popup-image');
        var style = getComputedStyle(image);

        var transformMatrix = new DOMMatrix(style.transform);
        initialX = transformMatrix.e;
        initialY = transformMatrix.f;

        document.getElementById('popup').classList.add('dragging');

        image.addEventListener('touchmove', handleTouchMove, { passive: false });
    }
}

function handleTouchMove(e) {
    if (!isDragging) return;
    var newX = e.touches[0].clientX;
    var newY = e.touches[0].clientY;

    var offsetX = newX - startX;
    var offsetY = newY - startY;

    var image = document.getElementById('popup-image');
    image.style.transform = 'translate(' + (initialX + offsetX) + 'px, ' + (initialY + offsetY) + 'px)';
}

function handleTouchEnd() {
    if (isDragging) {
        isDragging = false;
        document.getElementById('popup').classList.remove('dragging');

        var image = document.getElementById('popup-image');
        image.removeEventListener('touchmove', handleTouchMove);
    }
}

document.getElementById('popup-image').addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchend', handleTouchEnd);



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

// function countColors(imageUrl) {
//     var img = new Image();

//     img.onload = function() {
//         var canvas = document.createElement('canvas');
//         var ctx = canvas.getContext('2d');

//         canvas.width = img.width;
//         canvas.height = img.height;

//         ctx.drawImage(img, 0, 0);

//         var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

//         var colorCounts = {};

//         for (var i = 0; i < imageData.length; i += 4) {
//             var color = '#' +
//                 ('00' + imageData[i].toString(16)).slice(-2) +
//                 ('00' + imageData[i + 1].toString(16)).slice(-2) +
//                 ('00' + imageData[i + 2].toString(16)).slice(-2);

//             colorCounts[color] = (colorCounts[color] || 0) + 1;
//         }

//         var existingContainers = document.querySelectorAll('#color-info-container');
//         existingContainers.forEach(function(container) {
//             container.parentNode.removeChild(container);
//         });

//         var colorInfoContainer = document.createElement('div');
//         colorInfoContainer.id = 'color-info-container';

//         colorInfoContainer.innerHTML = '<p>Number of Colors: ' + Object.keys(colorCounts).length + '</p>';
        
//         var hexCodes = Object.keys(colorCounts);
//         hexCodes.forEach(function(hexCode) {
//             var colorSquare = document.createElement('div');
//             colorSquare.className = 'color-square';
//             colorSquare.style.backgroundColor = hexCode;

//             colorInfoContainer.appendChild(colorSquare);
//         });

//         document.getElementById('popup').appendChild(colorInfoContainer);
//     };

//     img.src = imageUrl;
// }

function showInfo() {
    var colorInfoContainer = document.getElementById('color-info-container');
    colorInfoContainer.style.display = colorInfoContainer.style.display === 'none' ? 'flex' : 'none';
}
