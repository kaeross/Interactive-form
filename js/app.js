const firstText = $('#name');
const firstFieldset = $('fieldset:first');
const regExpName = /\w\s\w/g;
const nameLabel = $('label[for="name"]');
const emailText = $('input[type="email"]');
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
const emailLabel = $('label[for="mail"]');
const jobRoleSelect = $('#title');
const paymentField = $('#payment');
const otherTextField = $('#other-title');
const allCheckBoxes = $('input[type=checkbox]');	
const jsFrameworks = $('input[name=js-frameworks]');
const jsLibs = $('input[name=js-libs]');
const express = $('input[name=express]');
const node = $('input[name=node]');
const mainConference = $('input[name=all]');
const buildTools = $('input[name=build-tools]');
const npm = $('input[name=npm]');
const cardNumber = $('#cc-num');
const zipCode = $('#zip');
const cvv = $('#cvv');


/**********************************************************
JOB ROLE FUNCTION - show or hide other-title text field
**********************************************************/

function otherText() {
	if (jobRoleSelect.val() != "other") {
		otherTextField.hide();
	} else if (jobRoleSelect.val() === "other")  {
		otherTextField.show();
		otherTextField.focus();
	}
}

/**************************************************************************************************************
TSHIRT INFO SECTION 
For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu
**************************************************************************************************************/

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

/********************
ACTIVITIES FUNCTIONS
*********************/

/******************************************
Activities - disable conflicting activities
*******************************************/

function disableConflictingActivities() {

	//function disables checkbox if an activity with a conflicting activity is selected
	function disableCheckbox(matchingCheck1, matchingCheck2) {
		if(matchingCheck1.is(':checked') === true) {
			matchingCheck2.prop('checked',false);
			matchingCheck2.prop('disabled', true);
		} else if (matchingCheck1.is(':checked') === false) {
			matchingCheck2.prop('disabled', false);
		}		
	}
	disableCheckbox(jsFrameworks, express);
	disableCheckbox(express, jsFrameworks);
	disableCheckbox(jsLibs, node);
	disableCheckbox(node, jsLibs);
}

/**********************************
Activities - display running total
**********************************/

function activitiesTotal() {
	$('.total').remove();
	function getTotal() {
		let runningTotal = 0;
		//if mainConference is selected running total +$200
		if(mainConference.is(':checked')) {
			runningTotal += 200;
		} 
		function plus100(checkbox){
			if(checkbox.is(':checked')) {
				runningTotal += 100;
			} 
		}
		plus100(node);
		plus100(npm);
		plus100(jsFrameworks);
		plus100(jsLibs);
		plus100(express);
		plus100(buildTools);

		return runningTotal;
	}
	const getTotalvalue = getTotal();
	//create total section and append to activies fieldset
	let totalDiv = '<h3 class="total">Total: $';
	totalDiv += getTotalvalue;
	totalDiv += '</h3>';
	$('.activities').append(totalDiv);
}

/**************************************************************************
PAYMENTS - Toggle payment method visability according to payment selected
***************************************************************************/

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

/****************
FORM VALIDATION 
*****************/
function invalidField(input) {
	input.addClass('invalid');
	$('button[type=submit]').prop('disabled', true);
}
function validField(input){
	input.removeClass('invalid');
	$('button[type=submit]').prop('disabled', false);
}
//Validate Name Field
function nameValidate(){
	const namePrompt = '<p id="namePrompt" style="color:red">Please enter your full name</p>';
	if(regExpName.test(firstText.val()) === false || firstText.val().length === 0) {
		$('#namePrompt').remove();
		invalidField(firstText);
		$(namePrompt).insertBefore(firstText);
	} else if(regExpName.test(firstText.val()) != false || firstText.val().length > 0) {
		validField(firstText);
		$('#namePrompt').remove();
	}
}
//Validate Email Field
function emailValidate(){
	const emailPrompt = '<p id="emailPrompt" style="color:red">Please enter a valid email address</p>';
	if(emailRegExp.test(emailText.val()) === false || emailText.val().length === 0) {
		$('#emailPrompt').remove();
		invalidField(emailText);
		$(emailPrompt).insertBefore(emailText);
	} else if(emailRegExp.test(emailText.val()) != false || emailText.val().length > 0) {
		validField(emailText);
		$('#emailPrompt').remove();
	}
}
//AT LEAST ONE CHECKBOX SELECTED
function checkCheckboxChecked() {
	const checkboxPrompt = '<p id="checkboxPrompt" style="color:red">Please tick at least one checkbox</p>'
	if (allCheckBoxes.filter($('input:checked')).length === 0) {
		$('#checkboxPrompt').remove();
		$('button[type=submit]').prop('disabled', true);
		$(checkboxPrompt).insertBefore('.activities');
	} else if (allCheckBoxes.filter($('input:checked')).length > 0){
		$('button[type=submit]').prop('disabled', false);
		$('#checkboxPrompt').remove();
	}
}
//CARD NUMBER BETWEEN 13 AND 16
function cardNumberValidation() {
	if (cardNumber.val().length < 13 || cardNumber.val().length > 16) {
		invalidField(cardNumber);
		return false;
	} 
	else if (cardNumber.val().length >= 13 || cardNumber.val().length <= 16) {
		validField(cardNumber);
		return true;
	}
}
//ZIPCODE FIELD 5 DIGIT NUMBER
function zipcodeValidation() {
	if (zipCode.val().length != 5) {
		invalidField(zipCode);
		return false;
	} 
	else if (zipCode.val().length === 5) {
		validField(zipCode);
		return true;
	}
}	
//CVV EXACTLY 3 DIGITS
function cvvValidation() {
	if (cvv.val().length != 3) {
		invalidField(cvv);
		return false;
	} 
	else if (cvv.val().length === 3) {
		validField(cvv);
		return true;
	}
}	

function cardValidation() {
	if (cardNumberValidation() === true && zipcodeValidation() === true && cvvValidation() === true || $('#payment').val() != "credit card")
	{
		return true;
	} else {
		return false;
	}
}


/******************************************
 FUNCTIONS TO BE CALLED WHEN DOCUMENT READY
 ******************************************/
 $(document).ready(function() {
 	firstText.focus();
 	otherText();
 	showHideColor();
 	showHidePayment();
 	
 });

/********************************
 FUNCTIONS TO BE CALLED ON CHANGE
 ********************************/

//function to call functions on change
function onChange(object, functionName) {
	object.on('change', function (e) {
		functionName();
	});
}

//function to call functions on keyup
function onFocusOut(object, functionName) {
	object.on('focusout keyup', function (e) {
		functionName();
	});
}

//functions to be performed when a change is detected on the form
onChange(jobRoleSelect, otherText);
onChange($('#design'), showHideColor);
onChange($('#payment'), showHidePayment);
onChange(allCheckBoxes, disableConflictingActivities);
onChange(allCheckBoxes, activitiesTotal);
onChange(allCheckBoxes, checkCheckboxChecked);


//functions to be performed when a focusout is detected on the form
onFocusOut(firstText, nameValidate);
onFocusOut(emailText, emailValidate);
onFocusOut(cardNumber, cardNumberValidation);
onFocusOut(zipCode, zipcodeValidation);
onFocusOut(cvv, cvvValidation);

//functions to be performed before submit is allowed
$('button').on('click', function(e){
	$('#display-message').remove();
	if (emailText.val().length === 0 || $('#design').val() === 'Select Theme'  ||  allCheckBoxes.filter($('input:checked')).length === 0 || $('#payment').val() === 'select_method' || cardValidation() === false ){
		let displayMessage = "<div id='display-message'>"
		e.preventDefault();
		if (emailText.val().length === 0 ){
			displayMessage += '<p style="color:red;">Your email address is required.</p>';
		}
		if ($('#design').val() === 'Select Theme') {
			displayMessage += '<p style="color:red;">You have not chosen a theme</p>';
		}
		if ( allCheckBoxes.filter($('input:checked')).length === 0 ) {
			displayMessage += '<p style="color:red;">Choose at least 1 checkbox</p>';
		}
		if ($('#payment').val() === 'select_method' ) {
			displayMessage += '<p style="color:red;">Please select a payment method</p>';
		}
		if (cardValidation() === false) {
			displayMessage += '<p style="color:red;">Please check your card details</p>';
		}
		displayMessage += '</div>';
		$(displayMessage).insertBefore('fieldset:first');
		window.scroll({
			top: 0, 
			left: 0, 
			behavior: 'smooth' 
		});
	} else {
		alert('Success! Thank you for submitting this form.');
	}
});









