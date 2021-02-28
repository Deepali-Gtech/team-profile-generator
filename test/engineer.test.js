const Engineer = require("../lib/engineer");

describe("Engineer Class", () => {
    it("Engineer instance", () => {
        const engg = new Engineer('Deepali', '123', 'test@test.com', 'deepali-github');
        expect(engg.name).toBe("Deepali");
        expect(engg.id).toBe("123");
        expect(engg.email).toBe("test@test.com");
        expect(engg.github).toBe("deepali-github");
      });
    });