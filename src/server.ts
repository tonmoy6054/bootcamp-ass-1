import 'module-alias/register'
import mongoose from 'mongoose'

import app from './app'
import config from './app/config/index'

async function main() {
  try {
    await mongoose.connect(config.database_url)
    console.log('Connected to MongoDB')

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

main()
