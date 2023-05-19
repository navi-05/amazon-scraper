import express from 'express'
import axios from 'axios'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.json("Welcome"))

// Get product details
app.get('/product/:productId', async(req, res) => {
    const { productId } = req.params
    const { api_key } = req.query;

    try {
        const { data } = await axios.get(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})

// Get product reviews
app.get('/product/:productId/reviews', async(req, res) => {
    const { productId } = req.params
    const { api_key } = req.query;

    try {
        const { data } = await axios.get(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})

// Get product offers
app.get('/product/:productId/offers', async(req, res) => {
    const { productId } = req.params
    const { api_key } = req.query;

    try {
        const { data } = await axios.get(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})

// Get search results
app.get(`/search/:searchQuery`, async(req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        const { data } = await axios.get(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})

app.listen(PORT, () => console.log(`Server connected on ${PORT}`))