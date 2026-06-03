# @acastellon/cors

CORS filter for Node Express Application.

## Install

```bash
npm install @acastellon/cors
```

## Usage

```js
const cors = require('@acastellon/cors')('./whitelist');
cors.enableCORS(app);
```

Whitelist file: one origin per line (e.g. https://example.com)

**Note:** Reading whitelist at load time (sync). For production consider dynamic reload.

## License

MIT
