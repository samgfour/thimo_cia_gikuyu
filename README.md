# Thimo cia Gikuyu

A community project for collecting and preserving Gikuyu proverbs.

## Project purpose

This project keeps a living archive of Gikuyu wisdom by collecting proverbs from families, elders, communities, and contributors.

## Repository structure

- `add_proverb.py` — command-line tool for adding proverbs to `thimo.csv`.
- `index.html` — project landing page and frontend showcase.
- `api/submit-proverb.js` — serverless endpoint that creates a GitHub issue from a web submission.
- `.github/ISSUE_TEMPLATE/proverb.yml` — structured issue form for proverb submissions.

## How to contribute

### 1. Local script contribution

Run the Python script in the project folder:

```bash
python add_proverb.py
```

This appends each proverb to `thimo.csv`.

### 2. Web submission (demo/local flow)

The homepage accepts a proverb and saves it in the browser for local demo purposes only. It does not overwrite the repository's existing proverb data.

### 3. GitHub issue submission

Use the issue template at `.github/ISSUE_TEMPLATE/proverb.yml` to submit a proverb as a reviewed GitHub issue.

This is the recommended route for keeping contributions reviewable and safe.

## Open source

This project is open source and community-driven. Contributions are welcome.

## Important note

The frontend does not delete or rewrite the existing proverb list. It simply provides a safe way to gather and review new submissions without touching the current data set.
