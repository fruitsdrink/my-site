/** 站点级配置 */
export const SITE = {
  title: '墨栈',
  titleAccent: '墨',
  description: 'Node 开发与学习记录 · 笔记 / 文档 / 作品 / 资源 / 配色',
  lang: 'zh-CN',
  homeFeedLimit: 15,
  author: 'fruitsdrink',
  social: [
    {
      label: 'GitHub',
      href: 'https://github.com/fruitsdrink',
      icon: 'github',
    },
  ],
} as const;

export type SocialIcon = 'github';

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}
