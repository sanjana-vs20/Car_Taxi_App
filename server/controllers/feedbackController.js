import Feedback from "../models/Feedback.js";

export const addFeedback = async (req, res) => {
    try {
        const {rating, comment} = req.body

        const feedback = new Feedback({
            user: req.user._id,
            name: req.user.name,
            image: req.user.image,
            rating,
            comment,
            isApproved: true
        })

        await feedback.save()
        res.json({success: true, message: 'Feedback submitted successfully'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({isApproved: true}).sort({createdAt: -1})
        res.json({success: true, feedbacks})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
