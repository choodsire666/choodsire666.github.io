// 0.12.0及以上版本用法
const { matterMarkdownAdapter, request } = require('@elog/cli')

/**
 * 自定义文档插件
 * @param {DocDetail} doc doc的类型定义为 DocDetail
 * @param {ImageClient} imageClient 图床下载器，可用于图片上传
 * @return {Promise<DocDetail>} 返回处理后的文档对象
 */
const format = async (doc, imageClient) => {
  const cover = doc.properties.cover
  // 将 cover 字段中的 notion 图片下载到本地
  if (imageClient)  {
    // 只有启用图床平台image.enable=true时，imageClient才能用，否则请自行实现图片上传
    const url = ''
    if (cover) {
      url = await imageClient.uploadImageFromUrl(cover, doc)
    } else {
      let res = await request('https://www.dmoe.cc/random.php?return=json')
      if (res.code === 200) {
        url = res.imgurl
      } else {
        url = ''
      }
    }
    // cover链接替换为本地图片
    doc.properties.cover = url
  }
  doc.body = matterMarkdownAdapter(doc);
  return doc;
};

module.exports = {
  format,
};