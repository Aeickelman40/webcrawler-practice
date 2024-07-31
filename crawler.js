const axios = require('axios');
const cheerio = require('cheerio');

// Function to fetch the HTML content of a webpage
async function fetchHTML(url) {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error(`Error fetching the URL: ${url}`);
        throw error;
    }
}

// Function to extract links from the HTML content
function extractLinks(html) {
    const $ = cheerio.load(html);
    const links = [];
    $('a').each((_, element) => {
        const href = $(element).attr('href');
        if (href) {
            links.push(href);
        }
    });
    return links;
}

// Main function to start the crawling process
async function crawl(url) {
    console.log(`Crawling URL: ${url}`);
    const html = await fetchHTML(url);
    const links = extractLinks(html);
    console.log(`Found ${links.length} links:`);
    links.forEach(link => console.log(link));
}

// Start crawling from a specific URL
const startURL = 'https://alex-eickelman.vercel.app/';
crawl(startURL).catch(console.error);
