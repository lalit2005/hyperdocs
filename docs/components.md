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

## Badges

A badge is a visual indicator for to draw attention of the user. Eg. A new feature, a new update, in beta, etc.

Hyperdocs provides a ready-to-use badge component that you can use in docs and blogs.

<Badge color="green">Beta</Badge>

```jsx
// default color is green
<Badge color='green | red | blue | yellow'>Beta</Badge>
```

Switch the dark/light theme to see the 2 different variants of the badges.

<Accordion title="All available badges">
	<Badge color="red">Alpha</Badge>
	<Badge color="green">Beta</Badge>
	<Badge color="blue">Gamma</Badge>
	<Badge color="yellow">Delta</Badge>
</Accordion>

## Accordions

<Accordion
  title="Hi there">
Hello world 👋
</Accordion>

```jsx
<Accordion title='Hi there'>Hello world 👋</Accordion>
```

## Loom video embed

[Loom](https://loom.com) let's you easily embed videos in webpages.  
But the embed can decrease the lighthouse score and affects the speed of the page.

And that's why Hyperdocs provides a component
that helps you embed loom videos without affecting the loading of the page.

<Loom url="https://www.loom.com/share/64bb8c253a5d4cdabbc5ac4db92df606" title="Hyperdocs Intro" />

```tsx
<Loom url='LOOM-VIDEO-URL' title='TITLE' />
```

<Callout type="warning">
  **LOOM-VIDEO-URL** is the url that you find in the address bar of the browser in Loom's dashboard, not the embedding URL that Loom provides. Hyperdocs auto-generates the embed link from the regular URL(*https://loom.com/share/video-id*)
</Callout>

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

<Callout type="info">
You can use different templates to use different frontend frameworks.
Here's the list of all of them:
- "angular" | "react" | "react-ts" | "vanilla" | "vanilla-ts" | "vue" | "vue3" | "svelte"

Visit [this](https://sandpack.codesandbox.io/docs/getting-started/custom-content#templates) page for more info.

</Callout>

NPM dependencies are supported too! You can use it to demo your component library!

## Custom JSX

<CustomComponent>
	<button
		style={{
      backgroundColor: '#73e9c1',
      borderRadius: '20px',
      color: 'black',
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
    onClick={() => alert('Hi there')}
  >
    Click me
  </button>
</CustomComponent>
```

`CustomComponent` is just a wrapper div with classname `not-prose`. It's used to prevent the styles from tailwind typography plugin.

## Grids

The `Grid` component is used to display cards in the beginning of your docs that helps the user navigate to the main parts of the documentation.

```tsx
<Grid
  items={[
    {
      title: 'Introduction',
      description: 'Get started with Hyperdocs and build your first docs site',
      color: 'blue',
      customColor: string,
      link: string,
    },
  ]}
/>
```

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

You can also use markdown in the description field.

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
  show
>
  <span>Just push to GitHub and it&apos;s done.</span>
</RoughNotation>
```

Hyperdocs just exposes the `RoughNotation` component. So you can use all the features of it in your docs.
