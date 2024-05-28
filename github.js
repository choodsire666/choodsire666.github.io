const { out, request } = require('@elog/cli')

const getSecretExt = async (config) => {
  out.warning('注意', '正在使用密钥拓展点，请遵循密钥拓展点注入规范')
  try {
    // 如果指定了secret拓展点，那么拓展点返回的账号密码信息，将会覆盖elog-config.json中的image信息
    const secretExtPath = path.resolve(process.cwd(), config.secretExt)
    // 拓展点需要暴露getSecret方法
    const { getSecret } = require(secretExtPath)
    const ext = await getSecret()
    config = { ...config, ...ext }
    return config
  } catch (e) {
    out.err(e.message)
    out.err('执行失败', '密钥拓展点执行失败，请检查！')
    process.exit(1)
  }
}

const getImagePathExt = (imagePathExt) => {
  out.warning('注意', '正在使用图片路径拓展点，请遵循拓展点注入规范')
  try {
    const imagePathExtPath = path.resolve(process.cwd(), imagePathExt)
    const { getImagePath } = require(imagePathExtPath)
    return getImagePath
  } catch (e) {
    out.err(e.message)
    out.err('执行失败', '图片路径拓展点执行失败，请检查！')
    process.exit(1)
  }
}

/**
 * 生成路径前缀
 * 固定格式 'prefix/'，开头无需/，结尾需要/，如果没传，则默认为空
 * @param prefix
 */

const formattedPrefix = (prefix) => {
  // 如果没传，则默认为空
  if (!prefix) return ''

  let _prefix = prefix

  // 如果开头无需/
  if (_prefix.startsWith('/')) {
    _prefix = _prefix.slice(1)
  }

  // 如果结尾需要/
  if (!_prefix.endsWith('/')) {
    _prefix = `${_prefix}/`
  }

  return _prefix
}

// Github图床
class GithubClient {
  config = {}
  /** 是否初始化结束 */
  isInit = false

  constructor(config) {
    this.config = config.github
    // for (let prop in this.config.github) {
    //   if (this.config.github.hasOwnProperty(prop)) {
    //     out.info(`${prop}: ${this.config.github[prop]}`)
    //   }
    // }
    // 尝试初始化Github配置
    void this.init()
  }

  async init() {
    if (!this.config.host) {
      out.access('未指定加速域名，将使用默认域名：https://raw.githubusercontent.com')
    } else if (this.config.host?.includes('cdn.jsdelivr.net')) {
      // 如果指定了加速域名
      this.config.host = 'https://cdn.jsdelivr.net'
    }
    // 判断是否开启拓展点
    if (this.config.secretExt) {
      // 如果开了就从拓展点读取
      this.config = await getSecretExt(this.config)
    } else {
      // 如果没开拓展点，就从配置文件/环境变量中读取
      this.config = {
        ...this.config,
        token: this.config.token || process.env.GITHUB_TOKEN,
        user: this.config.user || process.env.ELOG_GITHUB_USER,
        repo: this.config.repo || process.env.ELOG_GITHUB_REPO,
      }
    }
    if (!this.config.token || !this.config.user || !this.config.repo) {
      out.err('缺少Github 配置信息')
      process.exit(-1)
    }
    // 处理prefixKey
    this.config.prefixKey = formattedPrefix(this.config.prefixKey)
    this.isInit = true
  }

  async _fetch(
    fileName,
    options,
    base64File,
  ) {
    if (!this.isInit) {
      await this.init()
    }
    const path = `https://api.github.com/repos/${this.config.user}/${this.config.repo}/contents/${this.config.prefixKey}${fileName}`
    const data = base64File && {
      message: 'Upload by elog',
      branch: this.config.branch || 'master',
      content: base64File,
    }
    const method = options.method
    try {      
      const result = await request(path, {
        data,
        headers: {
          Authorization: `Bearer ${this.config.token}`,
        },
        method,
      })

      if (result.status === 409) {
        out.warning('图片上传失败', '由于github并发问题，图片上传失败')
      } else if (result.status === 200 || result.status === 201) {
        if (this.config.host) {
          return `${this.config.host}/gh/${this.config.user}/${this.config.repo}/${this.config.prefixKey}${fileName}`
        } else if (method === 'GET') {
          return result.data.download_url
        } else {
          return result.data.content.download_url
        }
      } else {
        if (base64File) {
          if (result.data?.message === 'Bad credentials') {
            // token 配置错误
            out.warning(
              '请求失败',
              'Github Token 配置错误，配置文档：https://elog.1874.cool/notion/gvnxobqogetukays#github',
            )
          } else {
            out.warning('请求失败', JSON.stringify(result.data))
          }
        } else {
          out.debug('NOT FOUND', JSON.stringify(result.data))
        }
      }
    } catch (e) {
      if (base64File) {
        out.warning('请求失败', e.message)
        out.debug(e)
      } else {
        out.debug(e)
      }
    }
  }

  /**
   * 检查图床是否已经存在图片，存在则返回url,不存在返回空
   * @param fileName
   */
  async hasImage(fileName) {    
    return await this._fetch(fileName, { method: 'GET' })
  }

  /**
   * 上传图片到图床
   * @param imgBuffer
   * @param fileName
   */
  async uploadImg(imgBuffer, fileName, doc) {
    const base64File = imgBuffer.toString('base64')
    out.info("doc:" + doc.properties.title)
    if (doc) {
      if (doc.properties) {
        if (doc.properties.title) {
          this.config.prefixKey = doc?.properties?.title + "/";
          out.info("prefixKey:" + this.config.prefixKey)
        }
      }
    }

    let exist = await this._fetch(fileName, { method: 'GET' })
    if (exist) {
      return exist;
    }
  
    return this._fetch(fileName, { method: 'PUT' }, base64File)
  }
}

module.exports = GithubClient
