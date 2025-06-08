import openai
from openai import AzureOpenAI
import os
from dotenv import load_dotenv
import logging

class AzureOpenAIService:
    def __init__(self):
        load_dotenv()
        try:
            self.client = AzureOpenAI(
                api_key=os.getenv("AZURE_OPENAI_API_KEY"),
                api_version="2024-02-15-preview",  # Update this to your API version
                azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
            )
            self.model_name = os.getenv("AZURE_OPENAI_MODEL_NAME", "gpt-4")
        except Exception as e:
            logging.error(f"Failed to initialize Azure OpenAI client: {str(e)}")
            raise

    async def get_legal_response(self, conversation_history, user_input):
        try:
            messages = [
                {
                    "role": "system", 
                    "content": """You are an expert legal assistant focusing on Indian law. 
                    Provide clear, accurate legal guidance based on the context."""
                }
            ]
            
            # Add conversation history
            for msg in conversation_history:
                messages.append({
                    "role": "user" if len(messages) % 2 == 1 else "assistant",
                    "content": msg
                })
            
            # Add current user input
            messages.append({"role": "user", "content": user_input})

            response = self.client.chat.completions.create(
                model=self.model_name,
                messages=messages,
                temperature=0.7,
                max_tokens=800,
                top_p=0.95
            )
            return response.choices[0].message.content
        except Exception as e:
            logging.error(f"Azure OpenAI API error: {str(e)}")
            raise