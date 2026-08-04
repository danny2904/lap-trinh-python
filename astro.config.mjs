import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://danny2904.github.io',
  base: '/tin11-web-giao-trinh',
  integrations: [
    starlight({
      title: 'Giáo trình Tin học 11',
      description: 'Website giáo trình mẫu viết bằng Markdown, triển khai bằng GitHub Pages.',
      defaultLocale: 'vi',
      locales: {
        root: {
          label: 'Tiếng Việt',
          lang: 'vi',
        },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/danny2904/tin11-web-giao-trinh',
        },
      ],
      sidebar: [
        {
          label: 'Bắt đầu',
          items: [
            { label: 'Trang chủ', slug: 'index' },
            { label: 'Cách học', slug: 'bat-dau/cach-hoc' },
          ],
        },
        {
          label: 'Phần 1. Nền tảng',
          items: [
            { label: 'Bài 1. Tổng quan CSDL', slug: 'phan-1/bai-01' },
            { label: 'Bài 2. Bảng và khóa', slug: 'phan-1/bai-02' },
            { label: 'Bài 3. Truy vấn dữ liệu', slug: 'phan-1/bai-03' },
          ],
        },
        {
          label: 'Phần 2. Thực hành',
          items: [
            { label: 'Bài 4. Thiết kế biểu mẫu', slug: 'phan-2/bai-04' },
            { label: 'Bài 5. Báo cáo dữ liệu', slug: 'phan-2/bai-05' },
            { label: 'Bài 6. Dự án nhỏ', slug: 'phan-2/bai-06' },
          ],
        },
        {
          label: 'Kiểm tra & phụ lục',
          items: [
            { label: 'Bài kiểm tra mẫu', slug: 'kiem-tra/bai-kiem-tra-mau' },
            { label: 'Phụ lục', slug: 'phu-luc' },
          ],
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});
