import {Schema, model} from 'mongoose';

const TrackSchema = new Schema({
    id: {type:String, required:true},
    title: {type: String, required:true},
    author: {type: String, required:true},
    year: {type: Number, required:true},
    creationDate: {type: Date, default:Date.now}
})
export default model('Track', TrackSchema);