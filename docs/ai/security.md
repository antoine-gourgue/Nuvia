# Security Standards

- never trust client input
- validate all external input on the server
- never hardcode secrets
- derive user identity from auth/session, not request payload

Bad:
```ts
const secret = 'my-secret'
```
