import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: {type: String, required: true},
    image: {type: String, default: ''},
    rating: {type: Number, required: true, min: 1, max: 5},
    comment: {type: String, required: true},
    isApproved: {type: Boolean, default: false}
},{timestamps: true})

const Feedback = mongoose.model('Feedback', feedbackSchema)

export default Feedback
