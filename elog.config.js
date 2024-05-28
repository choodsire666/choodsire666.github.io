module.exports = {
  write: {
    platform: 'yuque-pwd',
    yuque: {
      token: process.env.YUQUE_TOKEN,
      login: process.env.YUQUE_LOGIN,
      repo: process.env.YUQUE_REPO,
      baseUrl: 'https://www.yuque.com/api/v2',
      onlyPublic: false,
      onlyPublished: true,
    },
    'yuque-pwd': {
      username: process.env.YUQUE_USERNAME,
      password: process.env.YUQUE_PASSWORD,
      login: process.env.YUQUE_LOGIN,
      repo: process.env.YUQUE_REPO,
      onlyPublic: false,
      onlyPublished: true,
    },
    notion: {
      token: process.env.NOTION_TOKEN,
      databaseId: process.env.NOTION_DATABASE_ID,
      filter: false, // {property: 'status', select: {equals: '已发布'}}
    }
  },
  deploy: {
    platform: 'local',
    local: {
      outputDir: './source/_posts/yuque',
      filename: 'title',
      format: 'matter-markdown',
      catalog: true,
      formatExt: 'elog.format.js',
      // frontMatter: {
      //   enable: true,
      //   include: ["title",
      //     "date",
      //     "updated",
      //     "urlname",
      //     "tags",
      //     "categories",
      //     "keywords",
      //     "description",
      //     "top_img",
      //     "comments",
      //     "cover",
      //     "toc",
      //     "toc_number",
      //     "toc_style_simple",
      //     "copyright",
      //     "copyright_author",
      //     "copyright_author_href",
      //     "copyright_url",
      //     "copyright_info",
      //     "mathjax",
      //     "katex",
      //     "aplayer",
      //     "highlight_shrink",
      //     "aside",
      //     "swiper_index",
      //     "top_group_index",
      //     "background"], // 只输出include包含的属性
      //   exclude: [
      //     "author"
      //   ], // 不输出exclude包含的属性
      // }
    }
  },
  image: {
    enable: true,
    platform: 'github',
    enableForExt: true,
    plugin: './github.js',
    local: {
      outputDir: './docs/images',
      prefixKey: '/images',
      pathFollowDoc: false,
    },
    oss: {
      secretId: process.env.OSS_SECRET_ID,
      secretKey: process.env.OSS_SECRET_KEY,
      bucket: process.env.OSS_BUCKET,
      region: process.env.OSS_REGION,
      host: process.env.OSS_HOST,
      prefixKey: '',
    },
    cos: {
      secretId: process.env.COS_SECRET_ID,
      secretKey: process.env.COS_SECRET_KEY,
      bucket: process.env.COS_BUCKET,
      region: process.env.COS_REGION,
      host: process.env.COS_HOST,
      prefixKey: '',
    },
    qiniu: {
      secretId: process.env.QINIU_SECRET_ID,
      secretKey: process.env.QINIU_SECRET_KEY,
      bucket: process.env.QINIU_BUCKET,
      region: process.env.QINIU_REGION,
      host: process.env.QINIU_HOST,
      prefixKey: '',
    },
    upyun: {
      user: process.env.UPYUN_USER,
      password: process.env.UPYUN_PASSWORD,
      bucket: process.env.UPYUN_BUCKET,
      host: process.env.UPYUN_HOST,
      prefixKey: '',
    },
    github: {
      token: process.env.GITHUB_TOKEN,
      user: process.env.ELOG_GITHUB_USER,
      repo: process.env.ELOG_GITHUB_REPO,
      prefixKey: '',
      branch: 'main',
      host: '',      
      secretExt: '', // 可选
    }
  }
}
