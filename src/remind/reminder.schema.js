import mongoose from 'mongoose';
import { Stream } from 'stream';

const reminderSchema = mongoose.Schema({
    createdAt: {            
        type: Date,
        default: Date.now
      },
    reminderDate: {type: Date, required:true},
    userId: {type: String, required:true},
    task: {type: String, required:true},
});

reminderSchema.set('toJSON', { getters: true, versionKey: false });

const Reminder = mongoose.model('Reminder', reminderSchema);

export default Reminder;
