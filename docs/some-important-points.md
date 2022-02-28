<Callout type='warning'>
	Since Hyperdocs does not use the standard markdown, it has some edge cases where the rendering can break.
</Callout>

You can avoid these edge cases by avoiding the following:

- Do not start a markdown file with a comment.
- Do not use regular html comments. Use jsx syntax comments instead such as `{/* </button> */}`
- Make sure plain text that resembles a react component is used with backticks wrapped around it. Eg. `<React.Fragment>` <Icons.CheckCircle className='inline-block' />
- Make sure that you don't use react components that are not present [here](/docs/hyperdocs/components)
- Use the playground to test out your markdown code. This can help you find out if you've used some component that's not in the component list.
- When using relative links, use the `/<slug>/docs/` prefix. This is the slug that you entered while creating the site in Hyperdocs dashboard. This can be changed in the dashboard.
- If a `_sidebar.md` file is not present, Hyperdocs will generate and render the sidebar in a random order.
- If `index.md` is not present, Hyperdocs will render the first file from the sidebar.
- It is recommended to use the [`hyperdocs-cli`](https://npm.im/hyperdocs-cli) while creating new markdown files as it helps you keep the `_sidebar.md` file up to date.
- Make sure the `/docs` directory is present in the root of your project.
- Do not use heading 1 in markdown files(`#`) except for the `index.md`. Use heading 2 or 3.
- Make sure, you leave a new line at the end of the file in `_sidebar.md`.
