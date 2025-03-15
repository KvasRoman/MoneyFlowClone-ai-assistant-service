export const transactionPrompt = (message: string) => `*"Convert the given input into a structured JSON format following this pattern:

Input: 'pizza 10 $'
Output: { "commandName": "create transaction", "payload": { "description": "pizza", "amount": -10, "currency": "USD" } }

Rules:
Default currency is UAH
Extract the description, amount, and currency from the input.
Convert '$' to "USD", '€' to "EUR", and '£' to "GBP".
Ensure valid JSON syntax.
Response only with JSON object.
Generate a JSON output for the following input: ${message}"*`