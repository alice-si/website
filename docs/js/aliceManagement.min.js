var aliceManagementItems = document.querySelectorAll('.alice-management-item');
var aliceManagementImages = document.querySelectorAll('.management-image-wrapper');

// OnClick behaviour
function onManagementClick(index) {
  var aliceManagementItem = aliceManagementItems[index];
  var aliceManagementImage = aliceManagementImages[index];

  for (var i = 0; i < aliceManagementItems.length; i++) {
    aliceManagementItems[i].classList.remove('active');
    aliceManagementImages[i].classList.remove('active');
  }
  aliceManagementItem.classList.add('active');
  aliceManagementImage.classList.add('active');
}

// Automated clicking
var curManagementIndex = 0;
var clickerInterval = setInterval(function() {
  onManagementClick(curManagementIndex);
  curManagementIndex = (curManagementIndex + 1) % aliceManagementItems.length;
}, 3000);

// Manual clicking handling
for (let i = 0; i < aliceManagementItems.length; i++) {
  var aliceManagementItem = aliceManagementItems[i];
  aliceManagementItem.addEventListener('click', function () {
    clearInterval(clickerInterval);
    onManagementClick(i);
  });
}