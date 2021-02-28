const Manager = require("../lib/manager");

describe("Manager Class", () => {
    it("Manager instance", () => {
        const mngr = new Manager('Deepali', '123', 'test@test.com', '9797979797');
        expect(mngr.name).toBe("Deepali");
        expect(mngr.id).toBe("123");
        expect(mngr.email).toBe("test@test.com");
        expect(mngr.officeNumber).toBe("9797979797");
      });
    });