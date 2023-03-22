import router from './src/config/router'
import app from '@/app'
import { AppConfig } from '@/AppConfig'

AppConfig.router = router

app.use(router)
app.mount('#app')
