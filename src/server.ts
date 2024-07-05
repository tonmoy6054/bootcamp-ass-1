import mongoose from 'mongoose'
import config from './app/config'
import app from './app'

async function main() {
  try {
    mongoose.connect(config.database_url)
    console.log('Connected to MongoDB')

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

main()
