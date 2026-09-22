import json
import sys
from pathlib import Path

PROVERBS_FILE = Path("kikuyu_proverbs.csv")
PENDING_FILE = Path("pending_proverbs.json")


def save_pending(proverb, description, contribution_type="New proverb"):
    data = []
    if PENDING_FILE.exists():
        try:
            data = json.loads(PENDING_FILE.read_text(encoding="utf-8"))
            if not isinstance(data, list):
                data = []
        except (json.JSONDecodeError, OSError):
            print("Warning: could not read pending entries; starting a new review list.")

    data.append({
        "proverb": proverb,
        "description": description,
        "contribution_type": contribution_type,
        "status": "pending-review",
    })

    PENDING_FILE.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


while True:
    try:
        thimo = input("Andika Thimo Yaku (Add proverb; press Enter to finish):\n").strip()
        if not thimo:
            print("\nThank you for your contribution.")
            sys.exit()

        contribution_type = input(
            "Contribution type: [new/existing] (press Enter for new):\n"
        ).strip().lower()
        if contribution_type not in {"new", "existing", ""}:
            contribution_type = "new"

        description = input(
            "Describe the meaning, context, translation, source, or correction:\n"
        ).strip()

        if not description:
            print("A detailed description is required before a submission can be reviewed.")
            continue

        save_pending(
            thimo,
            description,
            "New proverb" if contribution_type in {"", "new"} else "Description or correction for an existing proverb",
        )

        print("\nProverb submitted for peer review.\n")

    except (OSError, ValueError) as err:
        print("Error:", err)
