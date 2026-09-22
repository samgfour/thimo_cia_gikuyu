import json
import sys
from pathlib import Path

PROVERBS_FILE = Path("thimo.csv")
NOTES_FILE = Path("proverb_notes.json")


def save_note(proverb, description):
    notes = {}
    if NOTES_FILE.exists():
        try:
            notes = json.loads(NOTES_FILE.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            print("Warning: could not read existing descriptions; starting a new notes file.")

    notes[proverb] = description
    NOTES_FILE.write_text(
        json.dumps(notes, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


while True:
    try:
        thimo = input("Andika Thimo Yaku (Add proverb; press Enter to finish):\n").strip()
        if not thimo:
            print("\nThank you for your contribution.")
            sys.exit()

        description = input(
            "Describe the meaning, context, translation, or source (optional):\n"
        ).strip()

        with PROVERBS_FILE.open("a", encoding="utf-8") as thimos:
            thimos.write(thimo + "\n")

        if description:
            save_note(thimo, description)

        print("\nThimo updated.\n")

    except (OSError, ValueError) as err:
        print("Error:", err)
