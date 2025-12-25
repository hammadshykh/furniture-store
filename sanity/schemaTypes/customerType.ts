import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const customerType = defineType({
 name: "customer",
 title: "Customer",
 type: "document",
 icon: UserIcon,
 groups: [
  { name: "details", title: "Customer Details", default: true },
  { name: "stripe", title: "Stripe" },
 ],
 fields: [
  defineField({
   name: "name",
   title: "Name",
   group: "details",
   type: "string",
   description: "Customer's full name ",
  }),
  defineField({
   name: "email",
   title: "Email",
   type: "string",
   group: "details",
   validation: (rule) => [rule.required().error("Email is required")],
  }),
  defineField({
   name: "clerkUserId",
   type: "string",
   group: "details",
   description: "Clerk user id for authentication",
  }),
  defineField({
   name: "stripeCustomerId",
   type: "string",
   group: "stripe",
   description: "Stripe customer ID for payments",
   validation: (rule) => [
    rule.required().error("Stripe customer ID is required"),
   ],
  }),
  defineField({
   name: "createdAt",
   type: "datetime",
   group: "details",
   description: "Customer created at",
   initialValue: new Date().toISOString(),
  }),
 ],
 preview: {
  select: {
   email: "email",
   name: "name",
   striperCustomerId: "stripeCustomerId",
  },
  prepare: (selection) => {
   const { email, name, striperCustomerId } = selection;
   return {
    title: name ?? email ?? "Unknown Customer",
    subtitle: striperCustomerId
     ? `${email ?? ""} . ${striperCustomerId}`
     : (email ?? "Unknown Customer"),
   };
  },
 },
 orderings: [
  {
   title: "Newest First",
   name: "createdAtDesc",
   by: [{ field: "createdAt", direction: "desc" }],
  },

  {
   title: "Email A-Z",
   name: "emailAsc",
   by: [{ field: "email", direction: "asc" }],
  },
 ],
});
