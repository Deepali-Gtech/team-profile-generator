
class Employee {
    constructor(name, id, email) {
      this.name = name;
      this.id = id;    
      this.email = email; 
    }

    // methods for employee 
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getEmail(){
        return this.email;
    }
    getRole(){
        return "Employee";
    }
 
}
module.exports = Employee;