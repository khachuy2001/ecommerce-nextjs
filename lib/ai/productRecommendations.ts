import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""
);

export interface Product {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  description?: string;
  category?: string;
  brand?: string;
  status?: string;
  variant?: string;
}

export interface RecommendationRequest {
  userQuery?: string;
  budget?: number;
  category?: string;
  currentProduct?: Product;
  userHistory?: string[];
}

export async function getProductRecommendations(
  products: Product[],
  request: RecommendationRequest
) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const productList = products
    .map(
      (p) =>
        `- ${p.name}: $${p.price}${p.discount ? ` (${p.discount}% off)` : ""} | Category: ${p.category || "General"} | Brand: ${p.brand || "N/A"}`
    )
    .join("\n");

  const systemPrompt = `You are an expert electronics product recommendation specialist for ShopTech. 
Analyze the following products and user preferences to provide personalized recommendations.
Return recommendations as a JSON array with product names and brief reasons why they're recommended.
Be concise and focus on value, features, and user needs.`;

  const userPrompt = `
Available Products:
${productList}

User Request Details:
- Query: ${request.userQuery || "General product recommendation"}
- Budget: ${request.budget ? `$${request.budget}` : "No budget limit"}
- Category Interest: ${request.category || "Any"}
- Currently Viewing: ${request.currentProduct?.name || "None"}
- Purchase History: ${request.userHistory?.join(", ") || "New customer"}

Please recommend 3-5 products that best match the user's needs.
Format as JSON: [{"product": "Product Name", "reason": "Why this is recommended"}]`;

  try {
    const result = await model.generateContent(systemPrompt + "\n\n" + userPrompt);
    const responseText = result.response.text();

    // Extract JSON from response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return [];
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return [];
  }
}

export async function analyzeProductCompare(products: Product[]) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const productList = products
    .map((p) => `${p.name}: $${p.price}, ${p.description || ""}`)
    .join("\n");

  const prompt = `Analyze these products and provide a brief comparison highlighting pros and cons:
${productList}

Return as JSON: {"comparison": "analysis text", "bestValue": "product name", "bestFeatures": "product name"}`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return null;
  } catch (error) {
    console.error("Error analyzing products:", error);
    return null;
  }
}

export async function generateProductSuggestion(userQuery: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `As a ShopTech electronics assistant, help answer this customer query about products:
"${userQuery}"

Provide a helpful, concise response with product suggestions if applicable.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating suggestion:", error);
    return "I'm unable to process that request at the moment.";
  }
}
