const url = 'http://localhost:3000';
const _studentIdKey = 'studentId';

// let x = 2;
// console.log('x', x);
// const y = 4;
// console.log('y', y);
// x = 3;
// console.log('x', x);
// y = 5;
// console.log('y', y);

// Arrays
// let cars = ["Saab", "Volvo", "BMW"];

// console.log(cars.includes("Ferrari"));
// console.log(cars.includes("BMW"));

// cars.forEach((car) => console.log(`I like ${car}`));

// for (let i = 0; i < cars.length; i++) {
// 	const car = cars[i];
// 	console.log(`I like ${car}`);
// }

// Strings

let string1 = "Hello World!";
let string2 = new String("Hi there!");
let student1 = new Student(123, 'Patricia', 'F');

// console.log(string1.toUpperCase());
// console.log(string2.toUpperCase());
// console.log(student1.toUpperCase());

// console.log(student1.favoriteFood('Pizza'));
// console.log(string1.favoriteFood('Hotdog'));
// console.log(string2.favoriteFood('Meatballs'));


$(document).ready(() => {

	// Get All Students
	$('#btn-get-students').click(() =>  {
		console.log('Getting all students')

		console.log("This is before the request")
		$.get('http://localhost:3000/students', (response) => {
			console.log("This is when I get the response");
			console.log('data:', response);

			const students = [];

			// const anmol = new Student(100, 'Anmol', 'F');
			// const rich = new Student(120, 'Rich', 'M');

			// const returnFromFunction = anmol.favoriteFood('indian food!');
			// console.log(returnFromFunction);

			// console.log(rich.favoriteFood('pizza'));

			for (let i = 0; i < response.length; i++) {
				const element = response[i];
				const student = new Student(
					element.id,
					element.name,
					element.sex
				);

				students.push(student);

				console.log(students[i]);
			}
		})

		console.log('This is after the request to get all students!')
	})

	// Get a student by id
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

		if (name.length < 2) {
			alert("name is too short!");
			return;
		}

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

	// CRUD operations
	// Create	Read 	Update	 	Delete
	// Post		Get		Put			Delete	

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

	// Go To Profile With Local Storage
	$('#btn-profile-student-storage').click(() => {
		const id = $('#student-id-profile').val();
		console.log(`Setting up local storage for student ${id}.`);

		// Get the local storage object, and set id
		window.localStorage.setItem(_studentIdKey, id);
		window.localStorage.setItem("another key", "some value");

		window.location.href = `profile.html?id=${id}`
	});
});


function getStudentFromStorage() {
	const idFromStorage =  window.localStorage.getItem(_studentIdKey);
	console.log(idFromStorage);

	const params = this.getUrlVars();
	console.log(params['id']);

	$.get(url + `/students/${idFromStorage}`, (res) => {
		//const student = Student.fromRow(res[0]);
		const student = new Student(
			res[0].id,
			res[0].name,
			res[0].sex
		);
		$('#student-info').text(student.toString())
	});
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}