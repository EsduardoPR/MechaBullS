import mongoose from 'mongoose';
import { msgAutoAddUpdateDelete } from '../../ModuleBovino/infrastructure/repositories/msgAutomatically'

export const connectDB = async () => {
    const dbUrl = process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL;
    if(!dbUrl){
        console.log(dbUrl+' DATABASE is not defined in the environment variables')
        process.exit(1);
    }
  try {
    await mongoose.connect(dbUrl)
    const environment = process.env.NODE_ENV === 'test' ? 'TEST' : 'PRODUCCIÓN';
    console.log(`Database connected successfully to ${environment} `);

    msgAutoAddUpdateDelete()
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};
