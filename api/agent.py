from config import ai_client

class Agent:
    def __init__(self):
        self.ai_client = ai_client

    def __execute_prompt(self, prompt):
        response = self.ai_client.responses.create(
            model="gpt-4o-mini",
            input=prompt,
        )
        return response.output_text

    def gen_description(self, target_value: str, target_name: str):
        prompt = (
            "You are a cryptocurrency token risk analyzer specialist.\n"
            "You will receive an index with its normalized value.\n"
            "Write and return a short description about the index's status.\n"
            "It always starts with the phrase 'Index Status: '\n"
            "Then it's followed with information about whether the index value is risky for the buyer or not.\n\n"
            "Example response: 'Index Status: liquidity score is low!'\n"
            "Values:\n"
            " risk: risk index (ranges 1-100);\n"
            " liquidity: token liquidity;\n"
            " holders_count: number of token holders;\n"
            " token_age: when the token was created;\n"
            f"Content: name: {target_name}, value: {target_value}"
        )
        description = self.__execute_prompt(prompt)
        return description


    def gen_summary(self, scores):
        prompt = (
            "You are a crypto-currency risk asssesment specialist.\n"
            "Write a summary for risk factors about a certain token based on the index values and risk score provided below"
            "Return only the summary"
            "Maximum 6 sentences, be strict and give some advice to the user about the next steps and what he should evaluate before buying the token."
            f"Data: {scores}"
        )
        description = self.__execute_prompt(prompt)
        return description