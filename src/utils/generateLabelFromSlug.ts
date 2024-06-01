// Define a function to generate a label from a slug
function generateLabelFromSlug(slug: string): string {
  // Split the slug into words
  const words = slug.split("-");

  // Capitalize each word and join them with a space
  const label = words.map((word) => capitalize(word)).join(" ");

  // Return the generated label
  return label;
}

// Function to capitalize the first letter of a word
function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Export the function for external use
export { generateLabelFromSlug };
