
// sidebar
const menuItems = document.querySelectorAll('.menu-item');

// Messages
const messageNotification = document.querySelector('#message-notifications');
const Messages = document.querySelector('.messages')
const Message = document.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

// Theme
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');

// Font sizes
const fontsizes=document.querySelectorAll('.choose-size span');

// root
var root = document.querySelector(':root');

// color 
const colorPallete=document.querySelectorAll('.choose-color span')

// background
const bg1 = document.querySelector('.bg-1');
const bg2 = document.querySelector('.bg-2');
const bg3 = document.querySelector('.bg-3');


// REMOVE ACTIVE CLASS FROM MENU ITEMS
const changeActiveClass = () => {
	menuItems.forEach(item => {
		item.classList.remove('active');
	})
}
menuItems.forEach(item => {
	item.addEventListener('click', () => {
		changeActiveClass();
		item.classList.add('active');
		if (item.id != 'notifications') {
			document.querySelector('.notification-popup')
				.style.display = 'none';
		}
		else {
			document.querySelector('.notification-popup').style.display = 'block';
			document.querySelector('#notifications .notification-count').style.display = 'none';
		}
	})
})

// =============== MESSAGES ================
// search in chats
const searchMessage = () => {
	const val = messageSearch.value.toLowerCase();
	// console.log(val);
	Message.forEach(chat=> {
		let name = chat.querySelector('h5').textContent.toLowerCase();
		if (name.indexOf(val) != -1) {
			chat.style.display = 'flex';
		}
		else {
			chat.style.display = 'none';
		}
	})
}

// ======== SEARCH MESSAGE ===========
messageSearch.addEventListener('keyup', searchMessage);

messageNotification.addEventListener('click', () => {
	Messages.style.boxShadow = '0 0 1rem var(--color-primary)';
	messageNotification.querySelector('.notification-count').style.display = 'none';

	setTimeout(() => {
		Messages.style.boxShadow = 'none';
	},2000)
})


// THEME CUSTOMIZATION /THEME DIPLAY

const closeThemeModal = (e) => {
	if (e.target.classList.contains('customize-theme')) {
		themeModal.style.display ='none';
	}
}

// close modal 
themeModal.addEventListener('click', closeThemeModal);

// open the modal
const openThemeModal = () => {
	themeModal.style.display ='grid';
}
theme.addEventListener('click', openThemeModal);

// ================ FONTS ======================

// remove active class from spans or font size selector
const removeSizeSelector = () => {
	fontsizes.forEach(size => {
		size.classList.remove('active');
	})
}


fontsizes.forEach(size => {
	
	size.addEventListener('click', () => {
		removeSizeSelector();
	let Fontsize;
	size.classList.toggle('active');
		
		if (size.classList.contains('font-size-1')) {
			console.log('clicked');
			Fontsize = '10px';
			root.style.setProperty('--sticky-top-right', '5.4rem')
			root.style.setProperty('--sticky-top-left','5.4rem')
		}
		else if (size.classList.contains('font-size-2')) {
			Fontsize = '13px';
			root.style.setProperty('--sticky-top-right', '5.4rem')
			root.style.setProperty('--sticky-top-left','-7rem')
		}
		else if (size.classList.contains('font-size-3')) {
			Fontsize = '16px';
			root.style.setProperty('--sticky-top-right', '2rem')
			root.style.setProperty('--sticky-top-left','-17rem')
		}
		else if (size.classList.contains('font-size-4')) {
			Fontsize = '19px';
			root.style.setProperty('--sticky-top-right', '-5rem')
			root.style.setProperty('--sticky-top-left','-25rem')
		}
		else if (size.classList.contains('font-size-5')) {
			Fontsize = '22px';
			root.style.setProperty('--sticky-top-right', '-12rem')
			root.style.setProperty('--sticky-top-left','-35rem')
		}
		// change the font size of the root html
	document.querySelector('html').style.fontSize =Fontsize;
	})

	
})

// remove color highlight
const changeActiveClasscolor = () => {
	colorPallete.forEach(colorPicker => {
		colorPicker.classList.remove('active');
	})
}

// change color primary

colorPallete.forEach(color => {
	color.addEventListener('click', () => {
		let primary;
		// remove color highlight
		changeActiveClasscolor();
	

		if (color.classList.contains('color-1')) {
			primaryHue = 252;
		}
		else if (color.classList.contains('color-2')) {
			primaryHue = 52;
		}
		else if (color.classList.contains('color-3')) {
			primaryHue =352;
		}
		else if (color.classList.contains('color-4')) {
			primaryHue = 152;
		}
		else if (color.classList.contains('color-5')) {
			primaryHue = 202;
		}
		color.classList.add('active');

		root.style.setProperty('--primary-color-hue', primaryHue);
	})
})

// ============= BACKGROUND ==============

// BACKGROUND VALUES
let lightcolorlightness;
let darkcolorlightness;
let whitecolorlightness;

const changeBG = () => {
	root.style.setProperty('--light-color-lightness', lightcolorlightness);
	root.style.setProperty('--dark-color-lightness', darkcolorlightness);
	root.style.setProperty('--white-color-lightness', whitecolorlightness);
}

bg1.addEventListener('click', () => {
	// darkcolorlightness = '95%';
	// whitecolorlightness = '20%';
	// lightcolorlightness = '15%';

	//add class active
	bg1.classList.add('active');

	//remove class active
	bg2.classList.remove('active');
	bg3.classList.remove('active');
	
	// remove customize function
	window.location.reload();
})

bg2.addEventListener('click', () => {
	darkcolorlightness = '95%';
	whitecolorlightness = '20%';
	lightcolorlightness = '15%';

	//add class active
	bg2.classList.add('active');

	//remove class active
	bg1.classList.remove('active');
	bg3.classList.remove('active');
	changeBG();
})

bg3.addEventListener('click', () => {
	darkcolorlightness = '95%';
	whitecolorlightness = '10%';
	lightcolorlightness = '0%';

	//add class active
	bg3.classList.add('active');

	//remove class active
	bg1.classList.remove('active');
	bg2.classList.remove('active');
	changeBG();
})