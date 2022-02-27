Let's create your first documentation site

## Setting up `/docs`

### Hyperdocs cli

Hyperdocs has a tiny cli that helps you initialize your documentation site(basically the folder) and helps you keep the `_sidebar.txt` file updated.

### Install `hyperdocs-cli` as a dev dependency

```bash
npm install --save-dev hyperdocs-cli
```

Alternatively, you can use yarn:

```bash
yarn add --dev hyperdocs-cli
```

### Initializing

```bash
npx hyperdocs-cli init
```

This will create a `docs/` folder with a `_sidebar.txt` file and 3 markdown files. The only required things here are the `_sidebar.txt` and `index.md` files.

- `_sidebar.txt` is the file that defines in which order should the links in sidebar of docs site should be placed.
- `index.md` is the main page of your docs site that will be rendered on `/docs`. You can use `h1` tags in this file.

### Creating new page

```bash
npx hyperdocs-cli new <filename>
```

This creates a new markdown file in `docs/` folder and also updates the `_sidebar.txt` file. To change the order of this file in sidebar, you can just reorder it in `_sidebar.txt`.

## Create an account on Hyperdocs

Visit https://hyperdocs.netlify.app/signup and create a new account. This where you will manage all your documentation sites.

## Create a new site

After creating an account successfully, head over to https://hyperdocs.netlify.app/new and create a new site.

<Callout type='info'>
	The details entered while creating a new site will also be used for SEO purposes. All these can be later changed in site dashboard too.
</Callout>

### Slug

Provide a unique slug for your site. Your docs site will be hosted at `https://hyperdocs.netlify.app/<slug>/docs` (the homepage and blog will be at `https://hyperdocs.netlify.app/<slug>` and `https://hyperdocs.netlify.app/<slug>/blog` respectively).

### Repository link

Make sure the repository is correct and the the repo has a `docs` directory at the root level with markdown files in it.  
If it's a private repository, make sure you add a github token in the site settings in dashboard.

<Callout type='warning'>
	Make sure the the files in the '/docs' directory **have `.md`** extension and not '.mdx'.
</Callout>

## All Done!

And that's it!! Now you can just keep adding new markdown files in the `/docs` directory with the help of `npx hyperdocs-cli new <filename>` and push it to GitHub.

Hyperdocs will automatically update the website and you can see the changes reflect in few minutes.

Using `npx hyperdocs-cli new` is preferred as it creates a new markdown file in the `/docs` directory and automatically updates the `_sidebar.txt` too.

## Next Steps

- [Using react components inside markdown in docs](/hyperdocs/docs/react-components-in-markdown)
- [Adding a blog to your docs](/hyperdocs/docs/blog)
- [Adding analytics, custom styles and more](/hyperdocs/docs/customization)
- [Customizing navbar](/hyperdocs/docs/navbar)
- [Adding footer](/hyperdocs/docs/footer)
