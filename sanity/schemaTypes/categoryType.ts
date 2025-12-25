import { defineField } from "sanity";
import { TagIcon } from "@sanity/icons";

export const categoryType = {
 name: "category",
 title: "Category",
 type: "document",
 icon: TagIcon,
 fields: [
  defineField({
   name: "title",
   type: "string",
   validation: (rule) => [rule.required().error("Category Title is required")],
  }),
  defineField({
   name: "slug",
   type: "slug",
   options: {
    source: "title",
    maxLength: 96,
   },
   validation: (rule) => [rule.required().error("Category Slug is required")],
  }),
  defineField({
   name: "image",
   type: "image",
   options: {
    hotspot: true,
   },
   description: "Category Thumbnail Image",
  }),
 ],
 preview: {
  select: {
   title: "title",
   image: "image",
  },
 },
};
