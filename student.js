class Student {
	constructor(id, name, sex) {
		this.id = id;
		this.name = name;
		this.sex = sex;
	}

    static fromRow(row) {
        return new Student(row.id, row.name, row.sex);
    }

	static thisBelongsToTheClass(message) {
		console.log(`This is the message: ${message}`);
	}

	toString() {
		return `Id [${this.id}] Name [${this.name}] Sex [${this.sex}]`;
	}

	favoriteFood(food) {
		return `My name is ${this.name} and my favorite food is ${food}`; 
	}
}
