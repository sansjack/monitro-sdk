# monitro sdk

This is the offical sdk for monitro.dev

## Installation

```bash
npm install monitro
```
```bash
bun add monitro
```
```bash
bun add monitro
```
## Usage

```js
import { Monitro } from 'monitro'

const monitro = new Monitro('my-service', 'my-api-key')

monitro.info('Info Event', 'this is a detailed info message')
monitro.warn('Warning Event', 'this is a detailed warning message')
monitro.error('Error Event', 'this is a detailed error message')
```


want to know more? check out the [documentation](https://monitro.dev/docs)