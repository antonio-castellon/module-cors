# @acastellon/cors

CORS filter for Node Express Application.

## Install

```bash
npm install @acastellon/cors
```

## Usage

```js
const corsMod = require('@acastellon/cors')('./whitelist');
corsMod.enableCORS(app);
```

The whitelist file should contain one allowed origin per line (e.g. https://example.com). Origin check allows undefined (server-side) and matches exact.

**Note:** Whitelist is read synchronously at module load time.

## API

### `enableCORS(app: ExpressApplication): void`

Applies two middlewares:
1. Custom header setter (expose, allow headers for auth/cors, methods, credentials).
2. `cors()` from the 'cors' package, configured with origin whitelist check + credentials.

- **Parameters**: `app` - An express app (will call app.use twice).
- **Side effects**: Mutates the app by adding middleware. Reads whitelist file at construction time.
- **Errors**: Will call next(err) with 'Not allowed by CORS' for disallowed origins.

## License

MIT
