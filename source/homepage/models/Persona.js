JMVC.models.Persona = function (name, age) {
    this.name = name || 'Federic';
    this.age = age || 4;
    this.hello = function (n) { return 'Hello I`m ' + (n || this.name) + ' and I`m ' + this.age + ' years old'; };
};
