import mongoose from 'mongoose';
const MONGODB_URI ='mongodb+srv://lalitmodi:OZmbeYS8jHtwynOi@cluster0.aijoy4q.mongodb.net/MMS_DB?retryWrites=true&w=majority'
   const ConnectMongo =async()=>{
       try {
           await mongoose.connect(MONGODB_URI, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
           });
           console.log('Connected to MongoDB Atlas');
       } catch (error) {
           console.error('Error connecting to MongoDB Atlas:', error.message);
       }
}
export default ConnectMongo



