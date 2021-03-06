const url = 'http://localhost:3000';

$(document).ready(function() {
	$('#test-button').click(() => {
		console.log("I clicked the button!")
	})

	$('#server-button').click(() => {
		console.log("Getting data from the server!")

		$.get(url, (data, status) => {
			console.log('data', data);
			console.log('status', status)
		})
	})
})