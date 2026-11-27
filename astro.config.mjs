// Sách web tĩnh "Kinh tế từ số 0". Mỗi trang là một thư mục trong src/trang/, build ra /trang/<slug>/.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://khanhnhanbk.github.io',
  base: '/kinh-te-tu-so-0',
  trailingSlash: 'ignore',
});
