import * as helpers from "./helpers.ts";

test("generatePassword", async () => {
    const password = "test";
    const hash = await helpers.hashPassword(password);
    expect(hash).not.toEqual(password);
    expect(hash.split(".").length).toEqual(2);
});

test("comparePassword", async () => {
    const password = "super_secret";
    const hash = await helpers.hashPassword(password);
    expect(helpers.comparePassword(password, hash)).resolves.toBe(true);
    expect(helpers.comparePassword("fake_password", hash)).resolves.toBe(false);
});

test("makeUrl", () => {
    expect(helpers.makeUrl("http://localhost:3000", "test")).toBe("http://localhost:3000/test");
    expect(helpers.makeUrl("http://localhost:3000/", "test")).toBe("http://localhost:3000/test");
    expect(helpers.makeUrl("http://localhost:3000/", "/test")).toBe("http://localhost:3000/test");
    expect(helpers.makeUrl("http://localhost:3000", "/test")).toBe("http://localhost:3000/test");
    expect(helpers.makeUrl("https://test.domain", "test")).toBe("https://test.domain/test");
    expect(helpers.makeUrl("https://test.domain/", "test")).toBe("https://test.domain/test");
    expect(helpers.makeUrl("https://test.domain/", "/test")).toBe("https://test.domain/test");
    expect(helpers.makeUrl("https://test.domain", "/test")).toBe("https://test.domain/test");
    expect(helpers.makeUrl("test.domain", "/test")).toBe("https://test.domain/test");
})

test("generateCode", () => {
    const code = helpers.generateCode();
    expect(code).toHaveLength(6);
    expect(Number(code)).not.toBeNaN();
})

