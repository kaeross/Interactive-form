const form = $('form'); 
//focus on first text field
const textInput = $('[type=text]');
const firstText = form.children().children().first(textInput);
const jobRoleSelect = $('#title');
const paymentField = $('#payment');
const otherTextField = $('#other-title');

//show or hide other-title text field
function otherText() {
	if (jobRoleSelect.val() != "other") {
		//had originally created text field using javascript but tutor told us to hardcode it to the HTML
		otherTextField.hide();
	//show other-title if selected
	} else if (jobRoleSelect.val() === "other")  {
		otherTextField.show();
		otherTextField.focus();
	}
}

// For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu.
function showHideColor() {
	const colorOption = $('#color > option');
	const jsPuns = colorOption.slice(0,3);
	const heartJS = colorOption.slice(3,6);
	function showHideColorOption (showItem, hideItem) {
		colorOption.hide();
		showItem.show();
		showItem[0].setAttribute('selected', 'selected');
		hideItem.hide();
	}
	if ($('#design').val() === 'Select Theme') {
		$('#colors-js-puns').hide();
	} 
	else {
		$('#colors-js-puns').show();
	}
	if ($('#design').val() === 'js puns')  {
		showHideColorOption(jsPuns, heartJS);
	} else if ($('#design').val() === 'heart js')  {
		showHideColorOption(heartJS, jsPuns);
	}
}

//activities
function findDayTime() {
	const activities = $('.activities > label');
	const matchingAM = /Tuesday 9am-12pm/g;
	const matchingPM = /Tuesday 1pm-4pm/g;
	const amArray = [];
	const pmArray = [];
	//loop over each activities text

	for(let i = 0; i <= activities.length; i +=	1){
		const testAM = matchingAM.test(activities[i].textContent);
		const testPM = matchingPM.test(activities[i].textContent);
		if (testAM === true) {
			console.log(activities[i]);
		}
		if (testPM === true) {
			console.log(activities[i]);
		}	
	}
	//disable checkbox checkbox.prop('disabled', true)
}

/*    PAYMENTS 
	If payment method isn't selected, hide payments   */


function showHidePayment() {
	const paymentVal = $('#payment').val();
	const paymentMethods = paymentField.siblings('div');
	const creditCardMethod = paymentMethods[0];
	const paypalMethod = paymentMethods[1];
	const bitcoinMethod = paymentMethods[2];
	function showHidePaymentDiv (showItem) {
		paymentMethods.hide();
		showItem.style.display = 'block';
	}
	if (paymentVal === 'select_method') {
		paymentMethods.hide();
	} else if (paymentVal === 'credit card') {
		showHidePaymentDiv(creditCardMethod);
		$('#cc-num').focus();
	} else if (paymentVal === 'paypal') {
		showHidePaymentDiv(paypalMethod);
	} else if (paymentVal === 'bitcoin') {
		showHidePaymentDiv(bitcoinMethod);
	}

}

function onChange(object, functionName) {
	object.on('change', function (e) {
		functionName();
	});
}

//on document ready focus on first text input. If other is already selected load other text box
$(document).ready(function() {
	firstText.focus();
	otherText();
	showHideColor();
	showHidePayment();
});

onChange(jobRoleSelect, otherText);
onChange($('#design'), showHideColor);
onChange($('#payment'), showHidePayment);


//form saves to browser for refresh


