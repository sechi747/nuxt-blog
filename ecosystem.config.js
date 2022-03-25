module.exports = {
  apps: [
    {
      name: 'nuxt-blog',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      watch: [".nuxt"], // Specify which folder to watch
      watch_delay: 1500, // Specify delay between watch interval
    }
  ]
}
