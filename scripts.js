const url = 'http://localhost:3000';

$(document).ready(function() {

	// Get All Students
	$('#btn-get-students').click(() => {
		console.log('Getting all students')

		$.get('http://localhost:3000/students', (res) => {
			console.log('data:', res);
		})

		console.log('This is after the request to get all students!')
	})

	// Get a student
	$('#btn-get-student-by-id').click(() => {
		const id = $('#student-id').val();
		console.log(`Requesting student with id ${id}`);

		$.get(url + `/students/${id}`, (res) => {
			// res is an array!
			const student = Student.fromRow(res[0]);
			console.log('data:', student);
		});

	});

	// Create Student
	$('#btn-create-student').click(() => {
		console.log('Creating a student');

		const name = $('#student-name').val();
		const sex = $('#student-sex').val();
		const student = new Student ('', name, sex);

		console.log(student);

		$.post(url + '/students', student, (res) => {
			console.log("Created ", res)
		});

		
	});

	// Login
	$('#login').click(() => {
		const username = $('#username').val();
		const password = $('#password').val();

		const loginRequest = new LoginRequest(username, password);

		$.post('yourserver/login', loginRequest, (res) => {
			if (res === true) {
				// move one
			} else {
				// show some error
			}
		})

	});

	// Delete Student
	$('#btn-delete-student').click(() => {
		console.log('Deleting a student');
		const id = $('#student-id-delete').val();

		$.ajax({
			url: url + `/students/${id}`,
			type: 'DELETE',
			success: (res) => {
			  console.log('delete response', res)
			},
			error: (err) => {
				console.log('delete error', err)
			}
		});
	});

	// Update a student
	$('#btn-modify-student').click(() => {
		console.log('Modifying a student');

		const name = $('#student-name-put').val();
		const sex = $('#student-sex-put').val();
		const id = $('#student-id-put').val();
		const student = new Student (id, name, sex);

		console.log(student);

		$.ajax({
			url: url + `/students/${id}`,
			type: 'PUT',
			data: student,
			success: (res) => {
			  console.log('put response', res)
			},
			error: (err) => {
				console.log('put error', err)
			}
		});
	});
});