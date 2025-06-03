import mongoose from 'mongoose'

// Define the schema for a page document
const pageSchema = new mongoose.Schema({
    routeId: {
        type: String,
        required: true,// Ensure routeId is required
        unique: true,// Ensure routeId is unique
        trim: true // Remove whitespace from both ends
    },
    content: {
        type: String,
        default: '' // Default to empty string
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Set default to current date/time
        expires: 86400 // Document expires after 24 hours
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
})

// Update the updatedAt timestamp before saving
pageSchema.pre('save', function (next) {
    // Set the updatedAt field to the current date/time
    this.updatedAt = new Date();
    next();
})

// Export the Page model
export const Page = mongoose.model('Page', pageSchema)


