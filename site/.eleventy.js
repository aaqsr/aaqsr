module.exports = function(eleventyConfig) {

    // Add a filter to process heading IDs without wrapping in sections
    eleventyConfig.addFilter("processHeadingIds", function(content) {
        if (!content) return content;

        // Step 1: Process <h2> tags and add IDs
        content = content.replace(/<h2[^>]*>(.*?)<\/h2>/g, function(match, headingContent) {
            let headingText = headingContent;
            let headingId = '';

            // Look for markdown ID syntax: "Title { #id }"
            const idSyntaxMatch = headingContent.match(/^(.+?)\s*\{\s*#([^}\s]+).*\}$/);
            if (idSyntaxMatch) {
                headingText = idSyntaxMatch[1].trim();
                headingId = idSyntaxMatch[2];
            } else {
                // Check for existing id
                const existingIdMatch = match.match(/id=["']([^"']+)["']/);
                if (existingIdMatch) {
                    headingId = existingIdMatch[1];
                } else {
                    // Generate ID
                    headingId = headingText.toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-');
                }
            }

            return `<h2 id="${headingId}" class="section-title">${headingText}</h2>`;
        });

        // Step 2: Wrap each section (from <h2> to next <h2>)
        const sectionRegex = /(<h2[^>]*>.*?<\/h2>)([\s\S]*?)(?=(<h2[^>]*>.*?<\/h2>)|$)/g;

        return content.replace(sectionRegex, function(match, h2, sectionContent) {
            return `<div class="section">\n${h2}${sectionContent}\n</div>`;
        });
    });

    // copy static assets
    eleventyConfig.addPassthroughCopy("CNAME");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/assets");

    eleventyConfig.addPassthroughCopy({ "src/courses/cs488/report.pdf": "courses/cs488/report.pdf" });

    // copy CSS
    eleventyConfig.addPassthroughCopy({ "src/css": "css" });

    // watch for changes
    eleventyConfig.addWatchTarget("src/css/");

    // watch for Tailwind config changes
    eleventyConfig.addWatchTarget("./tailwind.config.js");

    // set directories
    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            layouts: "_layouts"
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk"
    };
};
