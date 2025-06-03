import { asyncHandler } from '../utils/asyncHandler.js'
import { Page } from '../models/page.model.js'

// Controller to get a page by pageId
const getPage = asyncHandler(async (req, res) => {
    const { pageId } = req.params

    try {
        console.log(`Fetching page with routeId: ${pageId}`)
        let doc = await Page.findOne({ routeId: pageId })

        if (!doc) { // If the page does not exist, create a new one with empty content
            doc = await Page.create({ 
                routeId: pageId, 
                content: '', 
                updatedAt: new Date() 
            })
            console.log(`Page with routeId ${pageId} created with empty content.`)
        } else {
            console.log(`Page with routeId ${pageId} found with content:`, doc.content)
        }

        // Return the page document
        res.json(doc)
    } catch (error) {
        console.error('Error in getPage:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// Controller to set/update a page by pageId
const setPage = asyncHandler(async (req, res) => {
    const { pageId } = req.params
    const { cont } = req.body

    try {
        // Normalize content to ensure it's always a string
        const normalizedContent = cont ?? '';

        // Update or create the page document
        const updatedPage = await Page.findOneAndUpdate(
            { routeId: pageId },
            { 
                content: normalizedContent,
                updatedAt: new Date()
            },
            { 
                new: true, 
                upsert: true,
                setDefaultsOnInsert: true
            }
        )

        // Emit the update to all connected clients via Socket.IO
        req.app.get('io').to(pageId).emit('codeUpdate', { 
            content: normalizedContent 
        })

        console.log(`Updated page with routeId ${pageId}, content:`, normalizedContent)
        res.status(200).json(updatedPage)
    } catch (error) {
        console.error('Error in setPage:', error)
        res.status(500).json({ error: 'Failed to update page' })
    }
})

export { getPage, setPage }