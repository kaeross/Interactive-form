const form = $('form'); 
//focus on first text field
const textInput = $('[type=text]');
const firstText = form.children().children().first(textInput);
const jobRoleSelect = $('#title');
const paymentField = $('#payment');
const otherTextField = $('#other-title');	
const allCheckBoxes = $('input[type=checkbox]');
const jsFrameworks = $('input[name=js-frameworks]');
const jsLibs = $('input[name=js-libs]');
const express = $('input[name=express]');
const mainConference = $('input[name=all]');
const buildTools = $('input[name=build-tools]');
const npm = $('input[name=npm]');


/**********************************************************
JOB ROLE FUNCTION - show or hide other-title text field
**********************************************************/

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
	const getTotal = () => {
		let runningTotal;
		//if mainConference is selected running total +$200
		if()
	};
	//create total section and append to activies fieldset
	let totalDiv = '<h3>Total: ';
	totalDiv += '$100';
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

/****************************************
FUNCTIONS TO BE CALLED ON DOCUMENT READY
****************************************/
$(document).ready(function() {
	firstText.focus();
	otherText();
	showHideColor();
	showHidePayment();
	disableConflictingActivities();
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
//functions to be performed when a change is detected on the form
onChange(jobRoleSelect, otherText);
onChange($('#design'), showHideColor);
onChange($('#payment'), showHidePayment);
onChange((allCheckBoxes), disableConflictingActivities);
onChange((allCheckBoxes), activitiesTotal);

//form saves to browser for refresh


const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;









