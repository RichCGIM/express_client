const url = 'http://localhost:3000';

$(document).ready(function() {

	// Get All Students
	$('#btn-get-students').click(() => {
		console.log('Getting all students')
		$.get(url + '/students', (data) => {
			console.log('data:', data);
		})
	})

	// Get All Students
	$('#btn-get-student-by-id').click(() => {
		const id = $('#student-id').val();
		console.log(`Requesting student with id ${id}`);
		$.get(url + `/students/${id}`, (data) => {
			const student = Student.fromRow(data[0]);
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

	// Delete Student
	$('#btn-delete-student').click(() => {
		console.log('Deleting a student');
		const id = $('#student-id-delete').val();
		$.ajax({
			url: url + `/students/${id}`,
			type: 'DELETE',
			success: (data) => {
			  console.log('delete response', data)
			},
			error: (err) => {
				console.log('delete error', err)
			}
		});
	});
});