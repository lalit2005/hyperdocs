![Hyperdocs CLI image](https://user-images.githubusercontent.com/69138026/155907809-058f2355-85b0-4254-803b-e0f59c3af6f6.png)

Hyperdocs provides a handy utility CLI that helps you work with Hyperdocs.

Although it's recommended to use the CLI, you can also create the files manually.

## Installation

You can use

```bash
npx hyperdocs-cli init
```

## Usage

Make sure you run it from the root of your project.

This command just creates a `docs` folder with 4 files in it:

- `index.md` -> This is required. This is the first page(`/docs`) of your docs in the docs website.
- `_sidebar.txt` -> This is required. It defines how the sidebar oh the docs website will look like.
- `getting-started.md` -> This is optional. You may rename it or delete it.
- `introduction.md` -> This is optional. You may rename it or delete it.

## Creating new pages

A file in the `docs` folder is a page in the website.

The file will only appear on the sidebar if it is present in `_sidebar.txt` file.

So, when you create a new page, you should add it to `_sidebar.txt` file. But this can become tedious as the project grows.

Hyperdocs CLI can help you out a lil' bit here.

```bash
npx hyperdocs-cli new page-name
```

Replace `page-name` with the name of the page/file you want to create. This will append the file to `_sidebar.txt` file.

If you would like to place this file somewhere in between in the sidebar, you can just reorder it in the `_sidebar.txt`.

## Help

Use `npx hyperdocs-cli --help` to see the list of commands and their description.
