export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title:
      'ระบบลงทะเบียนกิจกรรมชุมนุมออนไลน์ โรงเรียนวิสุทธรังษี จังหวัดกาญจนบุรี',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/images/logo.svg' }],
    script: [
      {
        src: '/js/bootstrap.bundle.min.js',
      },
    ],
    bodyAttrs: {
      class:
        'bg-fixed bg-center bg-no-repeat bg-cover bg-body',
    },
  },
  loading: '~/components/loading.vue',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    '@/assets/css/adminlte.min.css',
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css',
  ],

  serverMiddleware: [
    '~/api/auth',
    '~/api/getpass',
    '~/api/club',
    '~/api/students',
    '~/api/info',
    // '~/api/recaptcha',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxt/postcss8'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'bootstrap-vue/nuxt',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/dotenv',
    [
      '@nuxtjs/recaptcha',
      {
        siteKey: process.env.RECAPTCHA_SITE_KEY,
        version: 2,
        // size: 'invisible',
        // language:"en"
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true,
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token.accessToken',
        },
      },
      localRefresh: {
        scheme: 'refresh',
        token: {
          property: 'token.accessToken',
          maxAge: 15,
        },
        refreshToken: {
          property: 'token.refreshToken',
          data: 'refreshToken',
          maxAge: false,
        },
      },
    },
  },
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false, // Or `bvCSS: false`
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
