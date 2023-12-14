import openai
import json
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('OPENAI_API_KEY')


def True_False(prompt):

    openai.api_key = API_KEY
    chat_log = []

    chat_prompt = """
        Generate a true false test with 5 questions from the following prompt:""" + prompt + """ and return a JSON response with the following structure:
        {
        "questions": [
            {
            "question": "",
            "options": ["", ""],
            "correctAnswer": "" # correctAnswer must be EXACT match of one of the options
            },
            {
            "question": "",
            "options": ["", ""],
            "correctAnswer": "" # correctAnswer must be EXACT match of one of the options
            }
        ]
        }"""

    while True:
        # user_notes = prompt
        chat_log.append({
            "role": "user",
            "content": chat_prompt
        })
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=chat_log
        )

        assistant_response = response["choices"][0]['message']['content']
        # print("Chatgpt:", assistant_response.strip(
        #     "\n").strip())  # printing the test
        chat_log.append(
            {"role": "assistant", "content": assistant_response.strip("\n").strip()})
        Testquestions = assistant_response.strip("\n").strip()

        try:
            parsed_json = json.loads(Testquestions)
            return parsed_json  # Return the JSON data
        except json.JSONDecodeError:
            print("error: Could not parse JSON")
            continue


def Fill_Blank(prompt):

    openai.api_key = API_KEY
    chat_log = []

    chat_prompt = """
        Generate a fill-in-the-blank test with 5 questions and blanks from the following prompt:""" + prompt + """ and return a JSON response with the following structure:
        {
        "questions": [
            {
            "question": "",
            "correctAnswer": ""
            },
            {
            "question": "",
            "correctAnswer": ""
            }
        ]
        }"""

    while True:
        # user_notes = prompt
        chat_log.append({
            "role": "user",
            "content": chat_prompt
        })
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=chat_log
        )

        assistant_response = response["choices"][0]['message']['content']
        # print("Chatgpt:", assistant_response.strip(
        #     "\n").strip())  # printing the test
        chat_log.append(
            {"role": "assistant", "content": assistant_response.strip("\n").strip()})
        Testquestions = assistant_response.strip("\n").strip()

        try:
            parsed_json = json.loads(Testquestions)
            return parsed_json  # Return the JSON data
        except json.JSONDecodeError:
            print("error: Could not parse JSON")
            continue


def Matching(prompt):

    openai.api_key = API_KEY
    chat_log = []

    chat_prompt = """
        Generate a matching test with 5 questions and from the following prompt:""" + prompt + """ and return a JSON response with the following structure:
        {
        "questions": [
            {
            "question": "",
            "correctAnswer": "" # The correctAnswer cannot be a Yes or No answer
            },
            {
            "question": "",
            "correctAnswer": "" # The correctAnswer cannot be a Yes or No answer
            }
        ]
        }"""

    while True:
        # user_notes = prompt
        chat_log.append({
            "role": "user",
            "content": chat_prompt
        })
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=chat_log
        )

        assistant_response = response["choices"][0]['message']['content']
        # print("Chatgpt:", assistant_response.strip(
        #     "\n").strip())  # printing the test
        chat_log.append(
            {"role": "assistant", "content": assistant_response.strip("\n").strip()})
        Testquestions = assistant_response.strip("\n").strip()

        try:
            parsed_json = json.loads(Testquestions)
            return parsed_json  # Return the JSON data
        except json.JSONDecodeError:
            print("error: Could not parse JSON")
            continue


def Text_Quest(prompt):

    openai.api_key = API_KEY
    chat_log = []

    chat_prompt = """
        Generate a short response test with 5 questions from the following prompt:""" + prompt + """ and return a JSON response with the following structure:
        {
        "questions": [
            {
            "question": "",
            "correctAnswer"
            },
            {
            "question": "",
            "correctAnswer":
            }
        ]
        }"""

    while True:
        # user_notes = prompt
        chat_log.append({
            "role": "user",
            "content": chat_prompt
        })
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=chat_log
        )

        assistant_response = response["choices"][0]['message']['content']
        # print("Chatgpt:", assistant_response.strip(
        #     "\n").strip())  # printing the test
        chat_log.append(
            {"role": "assistant", "content": assistant_response.strip("\n").strip()})
        Testquestions = assistant_response.strip("\n").strip()

        try:
            parsed_json = json.loads(Testquestions)
            return parsed_json  # Return the JSON data
        except json.JSONDecodeError:
            print("error: Could not parse JSON")
            continue


def Essay(prompt):

    openai.api_key = API_KEY
    chat_log = []

    chat_prompt = """
        Generate a short response test with 5 questions from the following prompt:""" + prompt + """ and return a JSON response with the following structure:
        {
        "questions": [
            {
            "question": "",
            "correctAnswer"
            },
            {
            "question": "",
            "correctAnswer":
            }
        ]
        }"""

    while True:
        # user_notes = prompt
        chat_log.append({
            "role": "user",
            "content": chat_prompt
        })
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=chat_log
        )

        assistant_response = response["choices"][0]['message']['content']
        # print("Chatgpt:", assistant_response.strip(
        #     "\n").strip())  # printing the test
        chat_log.append(
            {"role": "assistant", "content": assistant_response.strip("\n").strip()})
        Testquestions = assistant_response.strip("\n").strip()

        try:
            parsed_json = json.loads(Testquestions)
            return parsed_json  # Return the JSON data
        except json.JSONDecodeError:
            print("error: Could not parse JSON")
            continue


def Generate(prompt):

    openai.api_key = API_KEY
    chat_log = []

    chat_prompt = """
        Generate a multiple choice test with 5 questions from the following prompt:""" + prompt + """ and return a JSON response with the following structure:
        {
        "questions": [
            {
            "question": "",
            "options": ["", "", "", ""],
            "correctAnswer": "" # correctAnswer must be EXACT match of one of the options
            },
            {
            "question": "",
            "options": ["", "", "", ""],
            "correctAnswer": "" # correctAnswer must be EXACT match of one of the options
            }
        ]
        }"""

    while True:
        # user_notes = prompt
        chat_log.append({
            "role": "user",
            "content": chat_prompt
        })
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=chat_log
        )

        assistant_response = response["choices"][0]['message']['content']
        # print("Chatgpt:", assistant_response.strip(
        #     "\n").strip())  # printing the test
        chat_log.append(
            {"role": "assistant", "content": assistant_response.strip("\n").strip()})
        Testquestions = assistant_response.strip("\n").strip()

        try:
            parsed_json = json.loads(Testquestions)
            return parsed_json  # Return the JSON data
        except json.JSONDecodeError:
            print("error: Could not parse JSON")
            continue


def Grade(submission):

    openai.api_key = API_KEY
    chat_log = []

    chat_prompt = """
        Grade the following submission:""" + submission + """ and return the results in a JSON response with the following structure:
        {
        "questions": [
            {
            "question": "",
            "correctAnswer": "",
            "is_correct": , # if the correctAnswer is similar to the submittedAnswer, then True, else False
            "submittedAnswer": "",
            },
            {
            "question": "",
            "correctAnswer": "",
            "is_correct": , # if the correctAnswer is similar to the submittedAnswer, then True, else False
            "submittedAnswer": "",
            },
        }"""

    user_message = chat_prompt
    # Truncate to fit within the context length
    user_message = user_message[:4096]

    # Add the user message to the chat log
    chat_log.append({"role": "user", "content": user_message})

    while True:
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=chat_log
            )

            # print("log_response:", response)

            assistant_response = response["choices"][0]['message']['content']

            # Add the assistant's response to the chat log
            chat_log.append(
                {"role": "assistant", "content": assistant_response})

            test_feedback = assistant_response.strip("\n").strip()

            try:
                parsed_json = json.loads(test_feedback)
                # Return the JSON data
                return parsed_json
            except json.JSONDecodeError:
                print("error: Could not parse JSON")
                continue
                # Handle the JSON parsing error as needed
        except openai.error.OpenAIError as e:
            print("OpenAI API Error:", e)
            continue
