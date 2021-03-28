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
		return `Id [${this.id}] Name [${this.name}] Sex [${this.sex}]`;
	}
}