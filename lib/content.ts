import fs from "fs";
import path from "path";

/**
 * Reads markdown content for a calculator page
 * @param slug - Calculator slug in format "category-name" (e.g., "finanse-inflacja")
 * @returns Markdown content as string, or null if file doesn't exist
 */
export function getCalculatorContent(slug: string): string | null {
  try {
    const contentPath = path.join(process.cwd(), "content", `${slug}.md`);
    
    if (!fs.existsSync(contentPath)) {
      return null;
    }
    
    const content = fs.readFileSync(contentPath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Error reading content for ${slug}:`, error);
    return null;
  }
}

/**
 * Checks if content file exists for a calculator
 * @param slug - Calculator slug in format "category-name"
 * @returns true if content file exists
 */
export function hasCalculatorContent(slug: string): boolean {
  const contentPath = path.join(process.cwd(), "content", `${slug}.md`);
  return fs.existsSync(contentPath);
}
