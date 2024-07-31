const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

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

// Function to get the last run information from a file
function getLastRunInfo() {
    const filePath = path.join(__dirname, 'lastRun.txt');
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        const [lastRunTime, status, ...links] = data.split('\n');
        return { lastRunTime: new Date(lastRunTime), status, links };
    }
    return null;
}

// Function to update the last run information in a file
function updateLastRunInfo(status, links) {
    const filePath = path.join(__dirname, 'lastRun.txt');
    const now = new Date().toISOString();
    const data = `${now}\n${status}\n${links.join('\n')}`;
    fs.writeFileSync(filePath, data, 'utf8');
}

// Function to check if the crawler has been run within the last hour
function hasRunWithinLastHour(lastRunTime) {
    if (!lastRunTime) {
        return false;
    }
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return lastRunTime >= oneHourAgo;
}

// Main function to start the crawling process
async function crawl(url) {
    const lastRunInfo = getLastRunInfo();
    const lastRunTime = lastRunInfo ? lastRunInfo.lastRunTime : null;
    const runWithinLastHour = hasRunWithinLastHour(lastRunTime);


    console.log(`Crawling URL: ${url}`);
    const html = await fetchHTML(url);
    const links = extractLinks(html);
    console.log(`Found ${links.length} links:`);
    links.forEach(link => console.log(link));
    updateLastRunInfo('Run successfully', links);

    if (runWithinLastHour) {
        updateLastRunInfo('Run within last hour', []);
        return
    }
}

// Start crawling from a specific URL
const startURL = 'https://alex-eickelman.vercel.app/';

// Get and display the last run information
const lastRunInfo = getLastRunInfo();
if (lastRunInfo) {
    console.log(`Last run time: ${lastRunInfo.lastRunTime}`);
    console.log(`Status: ${lastRunInfo.status}`);
} else {
    console.log('This is the first run.');
}

crawl(startURL).catch(console.error);
