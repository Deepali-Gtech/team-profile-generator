const Employee = require("../lib/employee");

describe("Employee Class", () => {
    it("Employee instance", () => {
        const emp = new Employee('Deepali', '123', 'test@test.com');
        expect(emp.name).toBe("Deepali");
        expect(emp.id).toBe("123");
        expect(emp.email).toBe("test@test.com");
      });
    });