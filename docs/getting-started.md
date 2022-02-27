Let's create your first documentation site

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

And that's it!! Now you can just keep adding new markdown files in the `/docs` directory and Hyperdocs will automatically update the website.

## Next Steps

- [Using react components inside markdown in docs](/docs/react-components-in-markdown)
- [Adding a blog to your docs](/docs/blog)
- [Adding analytics, custom styles and more](/docs/customization)
- [Customizing navbar](/docs/navbar)
- [Adding footer](/docs/footer)
