// Function to transform content into HTML based on the structure provided
function transformContentToHTML(data) {
  let html = "";

  data.children.forEach((child) => {
    switch (child.type) {
      case "heading":
        // Convert heading data to HTML
        html += `<h${child.level}>${child.value}</h${child.level}>`;
        break;
      case "list":
        // Determine list type: unordered or ordered
        let listType = child.listType === "unordered" ? "ul" : "ol";
        html += "<" + listType + ">";
        child.children.forEach((listItem) => {
          html += "<li>";
          listItem.children.forEach((item) => {
            if (item.type === "text") {
              html += item.value;
            } else if (item.type === "heading") {
              // Support for nested headings inside lists
              html += `<h${item.level}>${item.children[0].value}</h${item.level}>`;
            }
          });
          html += "</li>";
        });
        html += "</" + listType + ">";
        break;
    }
  });

  return html;
}

window.onload = async () => {
  // Wait for the "Get Product Details" request to be executed
  Wized.request.await("Get Product Details", async (response) => {
    // Extract the "At a glance" details and transform into HTML
    let atAGlanceDataValue = await Wized.data.get(
      "r.19.d.data.data.productByHandle.metafields.edges[1].node.value"
    );
    let atAGlanceData = JSON.parse(atAGlanceDataValue);
    let glanceHtml = transformContentToHTML(atAGlanceData);

    // Populate the transformed HTML into targeted elements
    let glanceTargetElements = document.querySelectorAll(
      '[wized="product_at_a_glance"], [wized="product_at_a_glance_2"]'
    );
    glanceTargetElements.forEach((element) => {
      element.innerHTML = glanceHtml;
    });

    // Extract the "Plant preferences" details and transform into HTML
    let plantPreferencesDataValue = await Wized.data.get(
      "r.19.d.data.data.productByHandle.metafields.edges[0].node.value"
    );
    let plantPreferencesData = JSON.parse(plantPreferencesDataValue);
    let preferencesHtml = transformContentToHTML(plantPreferencesData);

    // Populate the transformed HTML into targeted elements
    let preferencesTargetElements = document.querySelectorAll(
      '[wized="product_plant_preferences"], [wized="product_plant_preferences_2"]'
    );
    preferencesTargetElements.forEach((element) => {
      element.innerHTML = preferencesHtml;
    });
  });

  // Wait for the "Retrieve Single Blog Metafields" request to complete
  Wized.request.await("Get Product Details", async (response) => {
    // Fetch values for SEO title and description
    const seoTitle = await Wized.data.get("v.productSeoTitle");
    const seoDescription = await Wized.data.get("v.productSeoDescription");

    // Update the document title with the SEO title
    document.title = seoTitle;

    // Update or create the meta tag for SEO title
    let titleMetaTag = document.querySelector('meta[name="title"]');
    if (!titleMetaTag) {
      // If the meta tag does not exist, create one
      titleMetaTag = document.createElement("meta");
      titleMetaTag.name = "title";
      document.head.appendChild(titleMetaTag);
    }
    titleMetaTag.content = seoTitle;

    // Update or create the meta tag for SEO description
    let descriptionMetaTag = document.querySelector('meta[name="description"]');
    if (!descriptionMetaTag) {
      // If the meta tag does not exist, create one
      descriptionMetaTag = document.createElement("meta");
      descriptionMetaTag.name = "description";
      document.head.appendChild(descriptionMetaTag);
    }
    descriptionMetaTag.content = seoDescription;
  });
};
