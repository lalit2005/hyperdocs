import * as z from 'zod';

export const newSiteSchema = z.object({
  repoLink: z
    .string()
    .url('Please enter a valid URL')
    .regex(
      /^https:\/\/github.com\/[^/]+\/[^/]+$/,
      'Please enter a valid GitHub repo URL'
    ),
  siteName: z
    .string()
    .min(1, "Please enter a site name that's more than a character")
    .max(100, "Please enter a site name that's less than 100 characters"),
  siteDescription: z
    .string()
    .min(1, "Please enter a description that's more than a character")
    .max(150, "Please enter a description that's less than 150 characters"),
  ogImageUrl: z.string().url('Please enter a valid URL'),
});
