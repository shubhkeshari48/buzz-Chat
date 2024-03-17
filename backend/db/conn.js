import mongoose from "mongoose";
const connectToMongo=async()=>{
    try {
        await mongoose.connect('mongodb+srv://shubhkesharwani:shubh1234@cluster0.o6c8ayj.mongodb.net/chat-app');
        console.log('connected to mongodb')
    } catch (error) {
        console.log('Error in connection',error.messsage);
    }
}
export default connectToMongo;