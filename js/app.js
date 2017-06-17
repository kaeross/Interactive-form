const form = $('form'); 
//focus on first text field
const textInput = $('[type=text]');
const firstText = form.children().children().first(textInput);
const jobRoleSelect = $('#title');

//create text box for 'other' option in select
function otherText() {
	if (jobRoleSelect.val() === "other") {
		const firstFieldset = form.children(':first');
		//create text field
		const otherTextField = document.createElement('input');
		otherTextField.type = 'text';
		otherTextField.setAttribute('id', 'other-title');
		otherTextField.setAttribute('placeholder', 'Your Job Role');
		//append text field below select
		firstFieldset.append(otherTextField);
		otherTextField.focus();
		//remove other text box if not selected
	} else if (jobRoleSelect.val() != "other")  {
		$('#other-title').remove();
	}
}

// For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu.
function showHideColor() {
	const colorOption = $('#color > option');
	const jsPuns = colorOption.slice(0,3);
	const heartJS = colorOption.slice(3,6);
	function showHide(showArray, hideArray) {
		colorOption.hide();
		showArray.show();
		showArray[0].setAttribute('selected', 'selected');
		hideArray.hide();
	}
	if ($('#design').val() === 'Select Theme') {
		$('#colors-js-puns').hide();
	} else {
		$('#colors-js-puns').show();
	}
	if ($('#design').val() === 'js puns')  {
		showHide(jsPuns, heartJS);
	} else if ($('#design').val() === 'heart js')  {
		showHide(heartJS, jsPuns);
	}
}

//activities
function findDayTime() {
	const activities = $('.activities > label');
	const dayAndTime; 
	console.log(day + ' ' + time);

	//disable checkbox checkbox.prop('disabled', true)
}

//on document ready focus on first text input. If other is already selected load other text box
$(document).ready(function() {
	firstText.focus();
	otherText();
	showHideColor();
});

//A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
jobRoleSelect.on('change', function (e) {
	otherText();
});


$('#design').on('change', function(){
	showHideColor();
});


//form saves to browser for refresh

    
   