import { type Tool, ToolLoopAgent } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { searchProductsTool } from "./tools/search-products";
import { createGetMyOrdersTool } from "./tools/get-my-orders";

interface ShoppingAgentOptions {
 userId: string | null;
}

const baseInstructions = `You are a friendly shopping assistant for a premium furniture store.

## Tools Usage

You have access to tools to help the user.
- **searchProducts**: Search for products by keyword, category, material, etc.
- **getMyOrders**: Check order status and history (authenticated users only).

### Important Rules
- Call the tool ONCE per user query if applicable.
- **Use "category" filter** when user asks for a type of product (chairs, sofas, tables, etc.)
- Use parameters like material, color, price when specified.
- If no results found, suggest broadening the search.
- Be warm and helpful.
- Always include prices in GBP (£).
- Link to products using markdown: [Name](/products/slug)
`;

const ordersInstructions = `

## getMyOrders Tool Usage

- Use this tool when the user asks about their order history or status.
- You can filter by status if mentioned (e.g., "shipped orders").

### Order Status Meanings
- ⏳ Pending - Order received
- ✅ Paid - Payment confirmed
- 📦 Shipped - On its way
- 🎉 Delivered - Successfully delivered
- ❌ Cancelled - Cancelled`;

const notAuthenticatedInstructions = `

## Orders - Not Available
The user is not signed in. If they ask about orders, politely let them know they need to sign in to view their order history. You can say:
"To check your orders, you'll need to sign in first. Click the user icon in the top right to sign in or create an account."`;

/**
 * Creates a shopping agent with tools based on user authentication status
 */
export function createShoppingAgent({ userId }: ShoppingAgentOptions) {
 const isAuthenticated = !!userId;

 // Configure Google AI provider with custom API key
 const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
 });

 // Build instructions based on authentication
 const instructions = isAuthenticated
  ? baseInstructions + ordersInstructions
  : baseInstructions + notAuthenticatedInstructions;

 // Build tools - only include orders tool if authenticated
 const getMyOrdersTool = createGetMyOrdersTool(userId);

 const tools: Record<string, Tool> = {
  searchProducts: searchProductsTool,
 };

 if (getMyOrdersTool) {
  tools.getMyOrders = getMyOrdersTool;
 }

 return new ToolLoopAgent({
  model: google("gemini-2.5-flash"),
  instructions,
  tools,
 });
}
