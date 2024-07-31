import axios from "axios";
import * as cheerio from "cheerio";

// Function to fetch the HTML content of a webpage
async function fetchHTML(url: string): Promise<string> {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(`Error fetching the URL: ${url}`);
    throw error;
  }
}

// Function to extract links from the HTML content
function extractLinks(html: string): string[] {
  const $ = cheerio.load(html);
  const links: string[] = [];
  $("a").each((_, element) => {
    const href = $(element).attr("href");
    if (href) {
      links.push(href);
    }
  });
  return links;
}

// Main function to start the crawling process
async function crawl(url: string): Promise<void> {
  console.log(`Crawling URL: ${url}`);
  const html = await fetchHTML(url);
  const links = extractLinks(html);
  console.log(`Found ${links.length} links:`);
  links.forEach((link) => console.log(link));
}

// Start crawling from a specific URL
const startURL = "https://example.com";
crawl(startURL).catch(console.error);
