import { promises as fs } from 'fs';
import { globby } from 'globby';
import grayMatter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import strip from 'strip-markdown';

(async function () {
  const srcDir = path.join(process.cwd(), 'src');
  const publicDir = path.join(process.cwd(), 'public');
  const contentDir = path.join(srcDir, 'content/post');
  const contentFilePattern = path.join(contentDir, '*.mdx');
  const indexFile = path.join(publicDir, 'search-index.json');

  const contentFilePaths = await globby([contentFilePattern]);

  const getIndex = (data, content) => {
    const { title, slug, draft } = data;

    if (draft) return Promise.resolve(null);

    return new Promise((resolve, reject) => {
      remark()
        .use(strip, {
          remove: ['link', 'linkReference', 'image', 'imageReference'],
        })
        .process(content)
        .then((file) => {
          resolve({
            slug,
            title,
            body: String(file).replaceAll('\\.', '.'),
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  if (contentFilePaths.length) {
    const files = await Promise.all(
      contentFilePaths.map((filePath) => fs.readFile(filePath, 'utf8')),
    );

    const index = await Promise.all(
      files.map((file) => {
        const { data, content } = grayMatter(file);
        return getIndex(data, content);
      }),
    );

    await fs.writeFile(indexFile, JSON.stringify(index.filter(Boolean)));

    console.log(
      `Indexed ${index.length} documents from ${contentDir} to ${indexFile}`,
    );
  }
})();
