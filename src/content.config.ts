import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const colorEntry = z.object({
  name: z.string(),
  role: z.enum([
    'background',
    'surface',
    'text',
    'muted',
    'border',
    'accent',
    'accent-secondary',
    'highlight',
    'other',
  ]),
  hex: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/),
});

const gradientEntry = z.object({
  name: z.string(),
  from: z.string(),
  to: z.string(),
  angle: z.number().optional(),
});

const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
  }),
});

const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    toc: z.boolean().default(false),
    order: z.number().optional(),
    sidebar: z.string().optional(),
  }),
});

const resources = defineCollection({
  loader: glob({ base: './src/content/resources', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    type: z.enum(['ui', 'icons', 'npm', 'service', 'tool', 'template', 'article']),
    category: z.enum([
      'auth',
      'database',
      'backend',
      'storage',
      'email',
      'payments',
      'observability',
      'ai',
      'styling',
      'utils',
    ]),
    stack: z.array(z.string()).default([]),
    status: z.enum(['bookmarked', 'tried', 'using', 'deprecated']),
    discoveredFrom: z.string().optional(),
    discoveredAt: z.coerce.date(),
    npm: z.string().optional(),
    github: z.string().optional(),
    pricing: z.enum(['free', 'freemium', 'paid', 'oss']).optional(),
    tags: z.array(z.string()).default([]),
    searchKeywords: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

/** 发现的开源仓库 / 开源产品（非个人作品、非 npm/SaaS 资源条） */
const discoveries = defineCollection({
  loader: glob({ base: './src/content/discoveries', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    github: z.string().url(),
    stack: z.array(z.string()).default([]),
    status: z.enum(['bookmarked', 'tried', 'using', 'deprecated']),
    discoveredFrom: z.string().optional(),
    discoveredAt: z.coerce.date(),
    /** 作品介绍、演示视频等 */
    introUrl: z.string().url().optional(),
    license: z.string().optional(),
    tags: z.array(z.string()).default([]),
    searchKeywords: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    github: z.string().url(),
    /** 列表卡片封面图 */
    cover: z.string().url(),
    coverAlt: z.string().optional(),
    downloadUrl: z.string().url().optional(),
    stack: z.array(z.string()).default([]),
    status: z.enum(['active', 'maintenance', 'archived']).default('active'),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const palettes = defineCollection({
  loader: glob({ base: './src/content/palettes', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string(),
    description: z.string(),
    style: z.enum(['light', 'dark', 'mixed']),
    format: z.enum(['css-variables', 'tailwind', 'other']),
    discoveredFrom: z.string().optional(),
    /** 数据来源 URL（署名与免责，必填） */
    sourceUrl: z.string().url(),
    /** 来源标题，用于页面展示；缺省可用 discoveredFrom */
    sourceTitle: z.string().optional(),
    /** 原文作者或发布者（如公众号名） */
    sourceAuthor: z.string().optional(),
    /** 作者主页/公众号链接；缺省则仅展示作者名 */
    sourceAuthorUrl: z.string().url().optional(),
    discoveredAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    searchKeywords: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    colors: z.array(colorEntry),
    gradients: z.array(gradientEntry).optional(),
    usage: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  }),
});

export const collections = { notes, docs, resources, projects, discoveries, palettes };
