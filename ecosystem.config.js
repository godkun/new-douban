module.exports = {
  apps: [{
    name: '',
    script: './start.js',
    watch: false,
    env: {
      COMMON_VARIBLE: true,
      NODE_ENV: 'developement'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy: {
    production: {
      user: 'godkun',
      host: 'xxxx',
      ref: 'origin/master',
      repo: 'xxxxx.git',
      path: '/www/godkun/production',
      ssh_options: 'xxxxxxxxxxx',
      'pre-deploy': 'git fetch',
      'post-deploy': 'source $HOME/.zshrc && yarn install && yarn build && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
}
