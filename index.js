const wpEndpointUrl = 'http://api.wordpress.org/plugins/info/1.0/'
const defaultOptions = {
  fields: []
}

const getAll = (slug = '', options = {}) => new Promise((resolve, reject) => {
  const axios = require('axios')

  const opts = Object.assign({}, defaultOptions)
  options = Object.assign(options, opts)

  if (!Array.isArray(options.fields)) {
    options.fields = defaultOptions.fields
  }

  if (slug === '') {
    throw new Error('Plugin slug is empty')
  }

  axios.get(`${wpEndpointUrl}${slug}.json`).then(response => {
    if (response.data === null) {
      reject(new Error('Invalid Plugin Slug'))
    }

    if (options.fields.length > 0) {
      for (const key in response.data) {
        if (Object.prototype.hasOwnProperty.call(response.data, key) && !options.fields.includes(key)) {
          delete response.data[key]
        }
      }
    }

    resolve(response.data)
  }).catch(err => {
    reject(err)
  })
})

const versions = slug => new Promise((resolve, reject) => {
  return getAll(slug, {
    fields: ['versions']
  }).then(result => {
    resolve(result.versions)
  }).catch(err => {
    reject(err)
  })
})

const versionsRaw = slug => new Promise((resolve, reject) => {
  return versions(slug).then(result => {
    resolve(Object.keys(result))
  }).catch(err => reject(err))
})

const latestVersion = slug => new Promise((resolve, reject) => {
  return getAll(slug, {
    fields: ['version']
  }).then(result => {
    resolve(result.version)
  }).catch(err => {
    reject(err)
  })
})

const author = slug => new Promise((resolve, reject) => {
  return getAll(slug, {
    fields: ['author']
  }).then(result => {
    const striptags = require('striptags')
    resolve(striptags(result.author))
  }).catch(err => {
    reject(err)
  })
})

exports.all = getAll
exports.version = latestVersion
exports.versions = versions
exports.versionsRaw = versionsRaw
exports.author = author
