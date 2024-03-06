import { describe, expect, it } from "vitest";
import { isRequired, minMaxLength } from "./rules";

describe("isRequired", () => {
  it("should return a valid response with a non empty string", () => {
    const result = isRequired("test");
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });
  it("should return false with an error message when value is empty", () => {
    const result = isRequired("");
    expect(result.valid).toBe(false);
    expect(result.error).not.toBe(null);
  });
  it("should return false with an error message when value is null", () => {
    const result = isRequired(null);
    expect(result.valid).toBe(false);
    expect(result.error).not.toBe(null);
  });
  it("should return false with an error message when value is an empty array", () => {
    const result = isRequired([]);
    expect(result.valid).toBe(false);
    expect(result.error).not.toBe(null);
  });
  it("should return false with an error message when value is an empty object", () => {
    const result = isRequired({});
    expect(result.valid).toBe(false);
    expect(result.error).not.toBe(null);
  });
});

describe("minMaxLength", () => {
  it("should return a valid response with a string of ten chars", () => {
    const rule = minMaxLength({ min: 1, max: 20 });
    const result = rule("HelloWorld");
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });
  it("should return a valid response if string match the min criteria", () => {
    const rule = minMaxLength({ min: 5, max: 20 });
    const result = rule("tests");
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });
  it("should return a valid response if string match the max criteria", () => {
    const rule = minMaxLength({ min: 5, max: 20 });
    const result = rule("20 caractères précis");
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });
  it("should return a valid response if value is a number", () => {
    const rule = minMaxLength({ min: 1, max: 20 });
    const result = rule(0);
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });
  it("should return an error response if value is undefined", () => {
    const rule = minMaxLength({ min: 0, max: 20 });
    const result = rule(undefined);
    expect(result.valid).toBe(false);
  });
});
