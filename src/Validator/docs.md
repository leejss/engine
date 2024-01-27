
# Creating a Validator

- Rule: Function that check the value and then returns a boolean value
- Validate: Returns success or failure of the validation
- How to add validator to the handler ?

```ts

const validator = createValidator(rules)
const onChange = ( value: string ) => {
  const result = validate(value)
  if (result.type === "fail") {}
  else {}
}

```
