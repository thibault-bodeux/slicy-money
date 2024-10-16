import cleanOrderConfig from 'stylelint-config-clean-order'

const cleanOrder = cleanOrderConfig.rules['order/properties-order']
cleanOrder[1].emptyLineMinimumPropertyThreshold = 9999
cleanOrder[1].emptyLineBeforeUnspecified = 'never'

/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard-scss',
    '@stylistic/stylelint-config',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': cleanOrder,
  },
}
