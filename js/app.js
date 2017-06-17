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

//on document ready focus on first text input. If other is already selected load other text box
$(document).ready(function() {
	firstText.focus();
	otherText();
});

//A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
jobRoleSelect.on('change', function (e) {
	otherText();
});
//Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.


    // For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu.

    // If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
    
    // If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
