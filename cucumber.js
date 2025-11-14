module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'src/bdd/support/custom-world.ts',
      'src/bdd/support/hooks.ts',
      'src/bdd/steps/**/*.ts'
    ],
    format: ['summary'],
    formatOptions: { snippetInterface: 'async-await' },
    parallel: 0,
    retry: 0,
    timeout: 60000  // 60 segundos para mayor seguridad
  }
} 