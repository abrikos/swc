import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - kayako',
    title: 'kayako',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  ssr: false,
  target: 'static',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/axios.client.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/auth-next'
  ],

  router: {
    middleware: ['auth']
  },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js',
        name: 'English'
      },
      {
        code: 'ru',
        name: 'Русский',
        file: 'ru.js',
      }
    ],
    strategy: 'no_prefix',
    defaultLocale: 'en',
    lazy: true,
    langDir: 'lang/',
  },
  auth: {
    redirect: {
      login: '/user/login',
      logout: '/user/login',
      callback: '/user/login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/api/auth/login",
            method: "post",
            propertyName: "token"
          },
          user: {
            url: "/api/auth/user",
            method: "get",
            propertyName: "token"
          },
          logout: true
        }
      }
    }
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
