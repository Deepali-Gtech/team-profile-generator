const Employee = require("./employee");
class Intern extends Employee {
    constructor(name, id, email, school) {
      super(name, id, email);
      this.school = school;
    
    }

    // method getSchool() getRole() 
    getSchool(){
        return this.school;
    }
    //override
    getRole(){
        return "Intern";
    }
}  
module.exports = Intern;
