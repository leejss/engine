import { Either, fail, success } from "../Either";
type Primitive = string | number | boolean | null | undefined;
type TargetPrimitive = string | number;

type ValidationResult = Either<TargetPrimitive, string>;
type Rule<T extends TargetPrimitive> = (value: T) => boolean;
type RuleConfig<T extends TargetPrimitive> = Record<string, Rule<T>>;

export const createValidator = <T extends TargetPrimitive>(initialRuleConfig: RuleConfig<T>) => {
  const rules = { ...initialRuleConfig };
  const addRule = (name: string, rule: Rule<T>) => {
    rules[name] = rule;
  };

  const validate = (value: Primitive): ValidationResult => {
    // check type
    if (typeof value !== "string" && typeof value !== "number") {
      return fail("value is not string or number");
    }

    for (const ruleName in rules) {
      const ruleFn = rules[ruleName];
      if (ruleFn === undefined) {
        return fail(`rule ${ruleName} is not defined`);
      }
      if (typeof ruleFn !== "function") {
        return fail(`rule ${ruleName} is not a function`);
      }

      const result = ruleFn(value as T);
      if (!result) {
        return fail(`${ruleName} validation failed`);
      }
    }
    return success(value);
  };

  return {
    addRule,
    validate,
  };
};

// Add optional type
// Result is optional. value or error
