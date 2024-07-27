# Monitro SDK 

This is the official sdk for [monitro.dev](https://monitro.dev)
Currently this package is in beta, so expect breaking changes.
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

const monitro = new Monitro('my-service', 'api-key' , { hookExceptions: true, dev: false })

monitro.info('Info Event', 'this is a detailed info message')
monitro.warn('Warning Event', 'this is a detailed warning message')
monitro.error('Error Event', 'this is a detailed error message')
```


Read the docs for more information [documentation](https://monitro.dev/docs)