const path = require('path')
const fs = require('fs')

// Create symlink for react-refresh
const createReactRefreshSymlink = () => {
  const targetPath = path.resolve(__dirname, 'node_modules/react-refresh')
  const symlinkPath = path.resolve(__dirname, 'src/react-refresh')

  if (!fs.existsSync(symlinkPath)) {
    try {
      fs.symlinkSync(targetPath, symlinkPath, 'junction')
    } catch (error) {
      console.warn('Failed to create symlink:', error)
    }
  }
}

module.exports = {
  babel: {
    presets: [
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
  },
  webpack: {
    configure: (webpackConfig) => {
      // Create the symlink
      createReactRefreshSymlink()

      // Add src/react-refresh to module resolution paths
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        modules: ['node_modules', path.resolve(__dirname, 'src')],
        alias: {
          ...webpackConfig.resolve?.alias,
          'react-refresh': path.resolve(__dirname, 'src/react-refresh'),
        },
      }

      return webpackConfig
    },
  },
}
