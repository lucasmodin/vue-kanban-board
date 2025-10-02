import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({ 
    components, directives,
    theme: {
        defaultTheme: 'kanbanTheme',
        themes: {
            kanbanTheme: {
                dark: false,
                colors: {
                    primary: '#6366F1',
                    secondary: '#22C55E',
                    surface: '#FFFFFF',
                    background: '#F8FAFC'
                }
            }
        }
    }
})


createApp(App).use(vuetify).mount('#app')
