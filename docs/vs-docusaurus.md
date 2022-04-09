Docusaurus is a static site generator that helps you generate a documentation site for your project.
It was introduced by Facebook about 3 years ago and is very popular.

And it's obvious that it will have more number of features than this <Tooltip content="as of 28 feb 2022">30 days old</Tooltip> project - Hyperdocs.  
However Hyperdocs comes with various features that helps you ship documentation much faster than Docusaurus such as prebuilt components.

Docusaurus uses MDX under the hood to inject JSX inside your markdown files. And that's what Hyperdocs does too but with some advantages.

Let's see how does Hyperdocs differs from Docusaurus.

## Setup

To setup Docusaurus, you will need to install the docusaraus package and provide config for sidebar, navbar and more to it.

With Hyperdocs, you will just have to have a `docs` folder with markdown files. And also the two Hyperdocs specific files - `_sidebar.txt` and `index.md` are optional.

## Config

With Docusaurus, you will have to maintain a `docusaurus.config.js` file. This is where you will be able to configure the whole site.

You will also have to deal with plugins, babel config(optional) and much more in this file.

But with Hyperdocs, there's **no requirement of config files**. All it asks you is for a `_sidebar.txt`(yes a basic text file) file and an `index.md` file. **And both of them are optional**.

## MDX

Docusaurus let's you write JSX inside your markdown files. And that's what Hyperdocs does too.

But in Docusaurus you will have to build all the components to use in your markdown files.  
Hyperdocs provides you with many prebuilt components that can increase your productivity and time by preventing you to decide on whether to use 2.5px or 2.6px border radius for that tooltip component.

Here's some of the available components:

- Tooltips
- Callouts
- Sandpack component - let's you add live code editor inside documentation for your component library, etc..
- Accordions
- RoughNotation - Let's you highlight pieces of text
- Icons
- And much more...

You can view the documentation for it [here](/hyperdocs/docs/components)

## Workflow

So you made a typo in your markdown file. And you want to fix it.

### With Docusaurus

- Fix it
- Push it to GitHub
- Netlify or Vercel will build it that takes approx. 3-4 minutes
- You will see the new version of your page once it's deployed

With Hyperdocs, you will not have to worry about all this

### With Hyperdocs

- Fix it
- Push it to GitHub

And that's all you have to do!!!

Once it's pushed, you will be able to see the new version of your page hosted on edge on Netlify in the next periodic regeneration.

All thanks to Next.js ISR feature.

There's nothing that you have to worry about except for the content.

## Feedbacks

Hyperdocs provides a built-in feedback system for your documentation.

Every docs get a feedback widget that helps you gather feedback from your users. You can view all the feedbacks in the Hyperdocs dashboard.

Docusaurus has no feedback system yet and it is not easy to add one in the docs.

## Blog

A blog for a project is where you notify your users about new releases, event and updates such as a funding round, etc..

With Hyperdocs, you write, edit and publish blog posts all from the dashboard. This has a great advantage.

Imagine you want to write a blog post about the next release and save it as a draft to release it later.

With Docusaurus, you can push it to the repo by mistake and it will be available for your users to read.

You don't want that to happen.

With Hyperdocs, you can write the blog post and save it as draft in dashboard. Publish it only when you feel it's done.

## Deployment

When using Docusaurus, you will have to take care of deployment yourself.

You should setup deployment on hosting providers such as Netlify or Vercel by yourself.

But with Hyperdocs, there's no concept of deployment.

You just update that markdown file in `docs/` folder and spend time on adding new features to your product instead of worrying about documentation CI/CD processes.
