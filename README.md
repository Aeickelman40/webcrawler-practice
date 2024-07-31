# Simple Web Crawler

This project is a simple web crawler written in JavaScript using Node.js, Axios, and Cheerio. It fetches the HTML content of a given URL, extracts all the links from the page, and stores the last run information in a file.

## Features

- Fetch HTML content from a URL
- Extract links from the HTML and display on the console
- Store the last run time and status in a file

## Prerequisites

- Node.js (version 14 or higher)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/web-crawler.git
   cd web-crawler

   ```

2. Install the dependencies:

   ```bash
    npm install

   ```

3. Run the crawler:

   ```bash
    node crawler.js
   ```

## Output

The crawler will print the following information to the console:

- The last run time and status
- The URL being crawled
- The list of links found on the page

Additionally, the lastRun.txt file will be created/updated with the following information:

- The last run timestamp
- The status of the last run (e.g., "Run within last hour" or "Run successfully")
