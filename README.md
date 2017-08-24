# :ear: WordPress Plugin Info
Get Plugin Info via WordPress API. Read more: https://codex.wordpress.org/WordPress.org_API

# Install
```bash
# NPM
npm install wp-plugin-info --save

# yarn
yarn add wp-plugin-info
```

# Usage
Syntax: `info(slug, [options])`

## Example
```javascript
const pluginInfo = require('wp-plugin-info')

pluginInfo.all('woocommerce', {
  fields: ['author', 'dowloaded', 'versions']
}).then(result => {
  console.log(result)
}).catch(err => {
  console.log(err)
})
```

### Methods

#### `all(slug: String, options?: Object)`
Get all information

#### `version(slug: String)`
Get latest version

#### `versions(slug: String)`
Get all versions with download links

#### `versionsRaw(slug: String)`
Get all versions without download links

#### `author(slug: String)`
Get plugin's author

### Options

#### `fields:Array`

# License
MIT © [oknoorap](https://github.com/oknoorap)