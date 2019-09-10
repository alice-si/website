// Scroll down to anchor

var $page = $('html, body');
$('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
});

// select applications

var aliceManagementItems = document.querySelectorAll('.alice-management-item');
var aliceManagementImages = document.querySelectorAll('.management-image-wrapper');

for (var i = 0; i < aliceManagementItems.length; i++) {
  managementClick(aliceManagementItems[i], aliceManagementImages[i]);
}

function managementClick(aliceManagementItem, aliceManagementImage) {
  aliceManagementItem.addEventListener('click', function() {

    for (var i = 0; i < aliceManagementItems.length; i++) {
      aliceManagementItems[i].classList.remove('active');
      aliceManagementImages[i].classList.remove('active');
    }
    aliceManagementItem.classList.add('active');
    aliceManagementImage.classList.add('active');
  })
}

// dropdown menu

$('.dropdown').click(function () {
  $(this).attr('tabindex', 1).focus();
  $(this).toggleClass('active');
  $(this).find('.dropdown-menu').slideToggle(300);
});

$('.dropdown').focusout(function () {
  $(this).removeClass('active');
  $(this).find('.dropdown-menu').slideUp(300);
});

$('.dropdown .dropdown-menu li').click(function () {
  $(this).parents('.dropdown').find('span').text($(this).text());
  $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
});