module.exports = function(eleventyConfig) {
    // copy static assets
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/assets");

    // watch for changes
    eleventyConfig.addWatchTarget("src/css/");

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
