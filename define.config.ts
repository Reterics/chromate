import { spawnSync } from 'node:child_process'
import packageJson from './package.json'

const gitCommit = spawnSync('git', ['rev-parse', '--short', 'HEAD'])
  .stdout.toString()
  .trim()


// Don't forget to add your added variables to vite-env.d.ts also!

// These variables are available in your Vue components and will be replaced by their values at build time.
// These will be compiled into your app. Don't store secrets here!

export const defineViteConfig = {
  __VERSION__: JSON.stringify(packageJson.version),
  __NAME__: JSON.stringify(packageJson.name),
  __DISPLAY_NAME__: JSON.stringify(packageJson.displayName),
  __GIT_COMMIT__: JSON.stringify(gitCommit),
  __GITHUB_URL__: JSON.stringify(packageJson.repository.url),
}
