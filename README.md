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

## License

MIT
