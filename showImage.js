const target = document.body;
const config = { attributes: true, childList:true, subtree: true, attributeFilter: [ "div"]};

const instagram = 'https://www.instagram.com'
var image = '';

$(document).on('click', 'a', function() {
	var exist = $(this).find('img').length;
	if (exist == 1) {
		image = $(this).attr('href');
	}
});

function hideLogin() {
	var login = $('div[class*=" "][role="presentation"]').has("a[href^='/accounts/'][href*='signup/']");
	if (login.length == 1) {
		$(login).css('display', 'none')
		$(document.body).css('overflow', 'scroll')
	}
}

function redirectToPage() {
	if (image == '') {
		return;
	}
	
	observer.disconnect();
	window.location.href = instagram + image;
}

const callback = function(mutationsList, observer) {
	for(const mutation of mutationsList) {
		hideLogin();
		redirectToPage();
	}
}

const observer = new MutationObserver(callback);
observer.observe(target, config);
