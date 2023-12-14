window.onload = async () => {
  // Wait for the "Retrieve Single Blog Metafields" request to complete
  Wized.request.await("Retrieve Single Blog Metafields", async (response) => {
    // Get values of v.blogSeoTitle and v.blogSeoDescription
    const seoTitle = await Wized.data.get("v.blogSeoTitle");
    const seoDescription = await Wized.data.get("v.blogSeoDescription");

    // Set page title and SEO title to the value of v.blogSeoTitle
    document.title = seoTitle; // This sets the page title

    // If you have a meta tag for SEO title, you can set its value too. For instance:
    let titleMetaTag = document.querySelector('meta[name="title"]');
    if (!titleMetaTag) {
      // If the meta tag does not exist, create one
      titleMetaTag = document.createElement("meta");
      titleMetaTag.name = "title";
      document.head.appendChild(titleMetaTag);
    }
    titleMetaTag.content = seoTitle;

    // Set page description and SEO description to the value of v.blogSeoDescription
    let descriptionMetaTag = document.querySelector('meta[name="description"]');
    if (!descriptionMetaTag) {
      // If the meta tag does not exist, create one
      descriptionMetaTag = document.createElement("meta");
      descriptionMetaTag.name = "description";
      document.head.appendChild(descriptionMetaTag);
    }
    descriptionMetaTag.content = seoDescription;

    // You can add more logic here if needed
  });
};
