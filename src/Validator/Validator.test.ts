import { describe, it, expect } from "vitest";
import { createValidator } from "./Validator"; // Update with the correct path

describe("createValidator", () => {
  it("validates string correctly", () => {
    const validator = createValidator({
      isString: (value) => typeof value === "string",
    });

    const result = validator.validate("Test String");
    expect(result.type).toBe("success");
    expect(result.value).toBe("Test String");
  });

  it("fails for non-string value", () => {
    const validator = createValidator({
      isString: (value) => typeof value === "string",
    });

    const result = validator.validate(42);
    expect(result.type).toBe("fail");
    expect(result.error).toBe("value is not string or number");
  });

  it("validates multiple rules", () => {
    const validator = createValidator({
      isString: (value) => typeof value === "string",
      isShort: (value) => typeof value === "string" && value.length <= 5,
    });

    const validResult = validator.validate("Test");
    expect(validResult.type).toBe("success");

    const invalidResult = validator.validate("Too long string");
    expect(invalidResult.type).toBe("fail");
    expect(invalidResult.error).toBe("isShort validation failed");
  });

  it("handles undefined rule", () => {
    const validator = createValidator({});
    validator.addRule("isNumber", undefined);

    const result = validator.validate(42);
    expect(result.type).toBe("fail");
    expect(result.error).toBe("rule isNumber is not defined");
  });

  // More tests can be added to cover different scenarios and edge cases
});
