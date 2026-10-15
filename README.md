# Business Craft

Marketing website for Business Craft.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4. Requires Node.js 20.9+.

```sh
npm install
npm run dev      # http://localhost:3000
npm run check    # lint + typecheck
npm run build
npm run start
```

## Environment variables

All optional; see [`.env.example`](.env.example). Values are read at build time, so redeploy after changing them.

- `SITE_URL`
- `CONTACT_EMAIL`, `CONTACT_PHONE`, `CONTACT_WHATSAPP`
- `CONTACT_WEBHOOK_URL`, `WEB3FORMS_ACCESS_KEY` (server only)
- `SOCIAL_LINKEDIN_URL`, `SOCIAL_INSTAGRAM_URL`, `SOCIAL_FACEBOOK_URL`, `SOCIAL_X_URL`

## Deployment

Deploy to Vercel or any Node.js host running `npm run build && npm run start`. Set `SITE_URL` only in production so preview deployments stay out of search.
