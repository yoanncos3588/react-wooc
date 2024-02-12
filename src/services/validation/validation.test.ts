import { describe, expect, it } from "vitest";
import { isRequired, minMaxLength } from "./rules";
import validation from "./validation";

const objKO = {
  name: "Luke",
  weight: 90,
  age: undefined,
  country: "USA",
};

const objOK = {
  name: "Bob",
  weight: 79,
  age: 22,
  country: "FR",
};

const objMissingData = {
  name: "Ben",
  age: 19,
};

const objOutOfRules = {
  country: "FR",
};

const rules = {
  name: [isRequired, minMaxLength({ min: 2, max: 20 })],
  weight: [isRequired],
  age: [isRequired],
};

describe("test validData function", () => {
  it("should return true", () => {
    const result = validation.validData(objOK, rules);
    expect(result).toBe(true);
  });
  it("should return false", () => {
    const result = validation.validData(objKO, rules);
    expect(result).toBe(false);
  });
  it("should return false if no rules key match the data obj keys", () => {
    const result = validation.validData(objOutOfRules, rules);
    expect(result).toBe(false);
  });
  it("should return false if object is empty", () => {
    const result = validation.validData({}, rules);
    expect(result).toBe(false);
  });
  it("should return false if data is not an object", () => {
    const result = validation.validData("Hello this fail", rules);
    expect(result).toBe(false);
  });
  it("should return false if data is missing a key", () => {
    const result = validation.validData(objMissingData, rules);
    expect(result).toBe(false);
  });
});

describe("test validInput function", () => {
  it("should return true", () => {
    const result = validation.validInput(objOK.name, rules.name);
    expect(result.valid).toBe(true);
    expect(result.error).toBe(undefined);
  });
  it("should return true if rules is an empty array", () => {
    const result = validation.validInput(objOK.name, []);
    expect(result.valid).toBe(true);
    expect(result.error).toBe(undefined);
  });
  it("should stop if an error is found", () => {
    const result = validation.validInput("", rules.name);
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Obligatoire");
  });
});
