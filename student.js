class Student {
	constructor(id, name, sex) {
		this.id = id;
		this.name = name;
		this.sex = sex;
	}

    static fromRow(row) {
        return new Student(row.id, row.name, row.sex);
    }

	toString() {
		console.log(`Id [${id}] Name [${name}] Sex [${sex}]`)
	}
}