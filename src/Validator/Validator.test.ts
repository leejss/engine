import { describe, it, expect } from "vitest";
import { createValidator } from "./Validator"; // Update with the correct path

describe("createValidator", () => {
  it("validates string correctly", () => {
    const validator = createValidator({
      isString: (value) => typeof value === "string",
    });

    const result = validator.validate("Test String");
    if (result.type === "fail") {
      throw new Error("Validation failed");
    }
    expect(result.type).toBe("success");
    expect(result.value).toBe("Test String");
  });

  it("fails for non-string value", () => {
    const validator = createValidator({
      isString: (value) => typeof value === "string",
    });

    const result = validator.validate(42);
    if (result.type === "success") {
      throw new Error("Validation succeeded");
    }
    expect(result.type).toBe("fail");
    expect(result.error).toBe("isString validation failed");
  });

  it("validates multiple rules", () => {
    const validator = createValidator({
      isString: (value) => typeof value === "string",
      isShort: (value: string) => value.length <= 5,
    });

    const validResult = validator.validate("Test");
    expect(validResult.type).toBe("success");

    const invalidResult = validator.validate("Too long string");
    if (invalidResult.type === "success") {
      throw new Error("Validation succeeded");
    }

    expect(invalidResult.type).toBe("fail");
    expect(invalidResult.error).toBe("isShort validation failed");
  });
});
