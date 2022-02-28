Here's all the components you can use in your markdown files while using Hyperdocs:

## Callouts

<Callout type="info">
  This is an *info callout*
</Callout>
  
<Callout type="tip">
  Here's a tip!
</Callout>

<Callout type="success">
  This is a *success callout*
</Callout>

<Callout type="warning">
  This is a *warning callout*
</Callout>

<Callout type="danger">
  This is a *danger callout*
</Callout>

```jsx
<Callout type='info | tip | success | warning | danger'>
  This is an **info callout**
</Callout>
```

Just use the type attribute to set the type of the callout.

## Tooltips

<Tooltip content="Hi there, nice to meet you">Hover me</Tooltip> to show tooltips in docs.

```jsx
<Tooltip content="Hi there, nice to meet you">Hover me</Tooltip> to show tooltips in docs.
```

This is how you use tooltips in your docs.

## Accordions

<Accordion
  title="Hi there">
Hello world 👋
</Accordion>

```jsx
<Accordion title='Hi there'>Hello world 👋</Accordion>
```

## Sandpack

[Sandpack](https://sandpack.codesandbox.io) from CodeSandbox. Hyperdocs just exposes the `Sandpack` component from it so that you can use everything out of it.

<Sandpack
template="react"
files={{
    "/App.js": `import Rm from 'react-markdown'
import {Tooltip} from 'react-tiny-tooltip'
export default function App() {
  return (
    <div>
          <Rm>Hello *world*. **Wassup**</Rm>
          <Tooltip content="Hey there">Hover me 🙌</Tooltip>
    </div>
  )
}`,
  }}
customSetup={{
    dependencies: {
      react: "17.0.2",
      "react-dom": "17.0.2",
      "react-scripts": "4.0.0",
      "react-markdown": "8.0.0",
      "react-tiny-tooltip": "*"
    },
  }}
/>

<Accordion title="Here's the code for it">
	```jsx
<Sandpack
  template="react"
  files={{
    "/App.js": `import Rm from 'react-markdown'
import {Tooltip} from 'react-tiny-tooltip'
export default function App() {
  return (
    <div>
          <Rm>Hello *world*. **Wassup**</Rm>
          <Tooltip content="Hey there">Hover me 🙌</Tooltip>
    </div>
  )
}`,
  }}
  customSetup={{
    dependencies: {
      react: "17.0.2",
      "react-dom": "17.0.2",
      "react-scripts": "4.0.0",
      "react-markdown": "8.0.0",
      "react-tiny-tooltip": "*"
    },
  }}
/>
```
</Accordion>

NPM dependencies are supported too! You can use it to demo your component library!

<Callout type="info">
You can use different templates to use different frontend frameworks.
Here's the list of all of them:
- "angular" | "react" | "react-ts" | "vanilla" | "vanilla-ts" | "vue" | "vue3" | "svelte"

Visit [this](https://sandpack.codesandbox.io/docs/getting-started/custom-content#templates) page for more info.

</Callout>

## Custom JSX

<CustomComponent>
	<button
		style={{
      backgroundColor: '#73e9c1',
      borderRadius: '20px',
      color: '#fff',
      padding: '10px',
    }}
 onClick={() => alert('Hi there')}>
 	Click me
	</button>
</CustomComponent>

```jsx
<CustomComponent>
  <button
    style={{
      backgroundColor: '#73e9c1',
      borderRadius: '10px',
      color: 'black',
      padding: '10px',
    }}
    onClick={() => alert('Hi there')}>
    Click me
  </button>
</CustomComponent>
```

`CustomComponent` is just a wrapper div with classname `not-prose`. It's used to prevent the styles from tailwind typography plugin.

## Grids

The `Grid` component is used to display cards in the beginning of your docs that helps the user navigate to the main parts of the documentation.

<Grid
items={[
{title: "Introduction", description: "Get started with Hyperdocs and build your first docs site", color: "blue"},
{title: "Quickstart", description: "Create your first documentation site in less than a minute", color: "green"},
{title: "How it works", description: "How Hyperdocs works behind the scenes", color: "teal"},
{title: "Migration guide", description: "Move your docs site to Hyperdocs and simplify your docs setup", color: "gray"},
{title: "Migration guide", description: "Move your docs site to Hyperdocs and simplify your docs setup", color: "orange"},
{title: "Migration guide", description: "Move your docs site to Hyperdocs and simplify your docs setup", color: "purple"},
{title: "Migration guide", description: "Move your docs site to Hyperdocs and simplify your docs setup", color: "cyan"},
{title: "Migration guide", description: "Move your docs site to Hyperdocs and simplify your docs setup", color: "yellow"},
]}
/>

<Accordion title="Here's the code for it">
	```jsx
<Grid
  items={[
    {
      title: 'Introduction',
      description: 'Get started with Hyperdocs and build your first docs site',
      color: 'blue',
    },
    {
      title: 'Quickstart',
      description: 'Create your first documentation site in less than a minute',
      color: 'green',
    },
    {
      title: 'How it works',
      description: 'How Hyperdocs works behind the scenes',
      color: 'teal',
    },
    {
      title: 'Migration guide',
      description:
        'Move your docs site to Hyperdocs and simplify your docs setup',
      color: 'gray',
    },
    {
      title: 'Migration guide',
      description:
        'Move your docs site to Hyperdocs and simplify your docs setup',
      color: 'orange',
    },
    {
      title: 'Migration guide',
      description:
        'Move your docs site to Hyperdocs and simplify your docs setup',
      color: 'purple',
    },
    {
      title: 'Migration guide',
      description:
        'Move your docs site to Hyperdocs and simplify your docs setup',
      color: 'cyan',
    },
    {
      title: 'Migration guide',
      description:
        'Move your docs site to Hyperdocs and simplify your docs setup',
      color: 'yellow',
    },
  ]}
/>
```
</Accordion>

## Icons

You can use any of the [Feather icons](https://feathericons.com) in your docs.

Icons <Icons.CheckCircle className="inline-block" />

Hyperdocs exposes all the icons from the Feather icons library.

```jsx
<Icons.CheckCircle className='inline-block' />
```

## Head

`<Head>` is just the `next/head` component. You can use it to add meta tags, scripts, styles, etc. specific to a page.

If you want to add anything to `head` in all the pages, add it from the _Snippets Injection_ tab in Hyperdocs dashboard.

## Highlight

You can highlight any part of text with [RoughNotation](https://www.npmjs.com/package/react-rough-notation)

<RoughNotation
	type='underline'
	strokeWidth={2}
	animationDuration={2000}
	color='rgb(129 140 248)'
	animate
	show>
<span>Just push to GitHub and it&apos;s done.</span>
</RoughNotation>

```jsx
<RoughNotation
  type='underline'
  strokeWidth={2}
  animationDuration={2000}
  color='rgb(129 140 248)'
  animate
  show>
  <span>Just push to GitHub and it&apos;s done.</span>
</RoughNotation>
```

Hyperdocs just exposes the `RoughNotation` component. So you can use all the features of it in your docs.
