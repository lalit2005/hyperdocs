You can have the documentation site hosted on a custom domain with help of rewrites

<Callout type='warning'>
	This feature still has a slight disadvantage - it's not possible to have **customdomain.com/docs/** yet. Instead one can have **customdomain.com/SLUG/docs**
</Callout>

Replace all `SLUG`s here with the one you created while creating site in hyperdocs dashboard

We can use any service to rewrite all the routes to our documentation site from the custom domain.

Let's use Vercel here

- Create a new repo
- Add your custom domain/subdomain to that repo
- Add a `vercel.json` file with the following content:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    { "source": "/", "destination": "https://hyperdocs.netlify.app/SLUG" },
    {
      "source": "/:path*",
      "destination": "https://hyperdocs.netlify.app/:path*"
    }
  ]
}
```

Now you can access the website from your custom domain.

Eg. https://hyperdocs-proxy.vercel.app/ rewrites to https://hyperdocs.netlify.app/hyperdocs/
