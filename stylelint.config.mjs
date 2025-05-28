/* eslint-disable import/no-anonymous-default-export */
export default {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  ignoreFiles: [
    '**/__*.css',
    '**/import.css',
    '**/vendor/**/*.css',
    '**/vendor/*.css',
    '__*.css',
    './**/*.ts',
    './**/*.tsx',
    './**/*.js',
    './**/*.mjs',
    'ios/**/*',
    'android/**/*'
  ],
  plugins: ['stylelint-prettier', 'stylelint-order', 'stylelint-no-unsupported-browser-features'],
  rules: {
    'prettier/prettier': true,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        ignore: ['css-nesting', 'prefers-color-scheme'],
        severity: 'warning'
      }
    ],
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['inside-block'],
        ignore: [
          'after-comment',
          'first-nested',
          'blockless-after-same-name-blockless',
          'blockless-after-blockless'
        ]
      }
    ],
    'alpha-value-notation': [
      'number',
      {
        exceptProperties: ['opacity']
      }
    ],
    'selector-nested-pattern': '&_*',
    'selector-class-pattern':
      '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
    'custom-property-empty-line-before': null,
    'custom-property-pattern': '[a-z].*',
    'block-no-empty': null,
    'color-function-notation': 'legacy',
    'comment-empty-line-before': 'never',
    'declaration-empty-line-before': 'never',
    'function-url-quotes': 'always',
    'hue-degree-notation': 'number',
    'import-notation': 'string',
    'max-nesting-depth': 20,
    'no-descending-specificity': null,
    'property-disallowed-list': ['/^margin-/', '/^padding-/'],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'letter-spacing-range',
          'aspect-ratio',
          'font-range',
          'line-height-range'
        ]
      }
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['/^/']
      }
    ],
    'shorthand-property-no-redundant-values': null,
    'order/order': [
      [
        'declarations',
        {
          type: 'at-rule',
          name: 'mixin'
        },
        {
          type: 'at-rule',
          name: 'media'
        },
        {
          type: 'rule',
          selector: '^&::(before|after)'
        },
        {
          type: 'rule',
          selector: '^&:\\w'
        },
        {
          type: 'rule',
          selector: '^&_'
        },
        {
          type: 'rule',
          selector: '^.'
        }
      ],
      {
        unspecified: 'bottom'
      }
    ],
    'order/properties-order': [
      [
        'width',
        'height',
        'min-width',
        'min-height',
        'max-width',
        'max-height',
        'aspect-ratio',
        'font',
        'font-size',
        'font-range',
        'font-weight',
        'color',
        'text-shadow',
        'text-decoration',
        'text-transform',
        'text-align',
        'text-rendering',
        'white-space',
        'line-height',
        'line-height-range',
        'letter-spacing',
        'background',
        'background-position',
        'background-repeat',
        'background-size',
        'padding',
        'margin',
        'border',
        'border-width',
        'border-color',
        'border-style',
        'border-radius',
        'border-left',
        'border-top',
        'border-right',
        'border-bottom',
        'float',
        'clear',
        'position',
        'overflow',
        'content',
        'display',
        'flex',
        'flex-direction',
        'flex-wrap',
        'flex-flow',
        'order',
        'justify-content',
        'align-items',
        'align-self',
        'align-content',
        'flex-grow',
        'flex-shrink',
        'flex-basis',
        'visibility',
        'box-sizing',
        'box-shadow',
        'left',
        'top',
        'right',
        'bottom',
        'vertical-align',
        'z-index',
        'transform',
        'transition',
        'animation',
        'animation-delay',
        'animation-direction',
        'animation-duration',
        'animation-fill-mode',
        'animation-iteration-count',
        'animation-name',
        'animation-play-state',
        'animation-timing-function',
        'opacity',
        'cursor'
      ]
    ],
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'inside-block-and-after-rule'],
        ignore: ['inside-block']
      }
    ],
    'keyframes-name-pattern': [
      '^([a-z]+)([A-Z]?[a-z]+)+$',
      { message: 'Expected keyframe name to be camelCase' }
    ],
    'declaration-property-value-no-unknown': [
      true,
      {
        ignoreProperties: {
          '/^padding-/': '/.+/',
          '/^margin-/': '/.+/',
          '/^border-/': '/.+/',
          top: '/.+/',
          left: '/.+/',
          right: '/.+/',
          bottom: '/.+/',
          gap: '/.+/',
          '/-gap$/': '/.+/'
        }
      }
    ],
    'function-no-unknown': [true, { ignoreFunctions: ['$', 'fluid'] }],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['import-glob', 'for', 'each', 'mixin', 'define-mixin']
      }
    ]
  }
}
