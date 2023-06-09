import json
from transformers import pipeline

model = pipeline(
    "text-classification",
    model="badmatr11x/distilroberta-base-offensive-hateful-speech-text-multiclassification",
)


def app():
    # Get user input
    try:
        user_input = str(input("Enter Speech Here: "))
    except:
        raise IOError("There is some problem reading text from the console.")

    # Classify the text using the Huggingface model
    if user_input:
        result = model(user_input)
    else:
        print("No User Input is Provided.")

    # Write the result to a JSON file
    with open("result.json", "w") as f:
        json.dump(result, f)


if __name__ == "__main__":
    app()
