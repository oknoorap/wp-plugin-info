import test from 'ava'
import striptags from 'striptags'
import pluginInfo from './index'

const invalidPluginSlug = pluginInfo.all('bababababa')

test('throws error when slug is invalid', async t => {
  await t.throws(invalidPluginSlug)
})

const woocommerce = pluginInfo.all('woocommerce')

test('valid plugin "woocommerce" is not throws an error and has results', async t => {
  await t.notThrows(woocommerce)
})

test('woocommerce plugin author is "Automattic"', async t => {
  await woocommerce.then(result => {
    t.is(striptags(result.author), 'Automattic')
  }).catch(err => {
    console.log(err)
  })
})
