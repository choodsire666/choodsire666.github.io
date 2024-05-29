// 0.12.0及以上版本用法
const { matterMarkdownAdapter, out, request, getPicBufferFromURL} = require('@elog/cli')
const { GithubClient } = require('./github')

/**
 * 自定义文档插件
 * @param {DocDetail} doc doc的类型定义为 DocDetail
 * @param {ImageClient} imageClient 图床下载器，可用于图片上传
 * @return {Promise<DocDetail>} 返回处理后的文档对象
 */
const format = async (doc, imageClient) => {
  let title = doc.properties.title
  out.info(title + "封面图片替换")
  let cover = doc.properties.cover

  // cover不存在
  if (!cover) {
    out.info(title + "不存在封面图片！")    
    let res = await request('https://www.dmoe.cc/random.php?return=json')
    if (res.data.code === '200') {
      const buffer = await getPicBufferFromURL(res.data.imgurl)      
      let newUrl = await imageClient.ctx.uploadImg(buffer, 'cover.jpg', doc)
      if (newUrl) {
        out.info('上传成功', newUrl)
        doc.properties.cover = newUrl    
      } else {
        out.warning('上传失败：' + 'cover.jpg' + ' 请检查图床配置')
      }
    } else {
      out.warning('获取失败：' + 'https://www.dmoe.cc/random.php?return=json' + ' 请检查网络连接')
    } 
  } else if (imageClient) {
    // 只有启用图床平台image.enable=true时，imageClient才能用，否则请自行实现图片上传
    const url = await imageClient.uploadImageFromUrl(cover, doc)
    // cover链接替换为本地图片
    doc.properties.cover = url
  }  

  if (doc.properties.cover) {
    out.info(title + "封面图片替换成功")
  } else {
    out.info(title + "封面图片替换失败")
  }

  doc.body = matterMarkdownAdapter(doc);
  return doc;
};

module.exports = {
  format,
};