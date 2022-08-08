(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{358:function(c,o){c.exports={attributes:{title:"使用 PicGO + 腾讯云COS 搭建自己的图床",date:"2022/03/31 21:28:56",updated:"2022/03/31 21:28:56",categories:["技术"],tags:["图床"]},html:'<p>迫于发现博客不能没有图片，就像西方不能没有耶路撒冷，决定自己搭建一个图床，本来以为会是比较困难的一件事，但是查阅资料之后发现居然意外地简单，感谢大佬们造的轮子。下面以 PicGo 为例搭建一个属于自己的图床。</p>\n<h3>下载并安装 PicGo</h3>\n<p>在这里放上 <a href="https://github.com/Molunerfinn/PicGo">PicGo 的 GitHub 地址</a>，请自行根据系统下载。</p>\n<p><a href="https://picgo.github.io/PicGo-Doc/zh/guide/">PicGo 的官方文档</a> 也放上，方便各位自行查阅。</p>\n<h3>创建存储桶</h3>\n<p>PicGo 支持多个图床，如<code>七牛图床</code>、<code>腾讯云COS</code>、<code>阿里云OSS</code>等，在这里我选择使用<code>腾讯云COS</code> 进行演示。</p>\n<p>首先进入腾讯云的<a href="https://console.cloud.tencent.com/cos/bucket">对象存储控制台</a>，在<code>资源包管理</code>选项卡里可以看到自己的资源包，如果没有话可以根据自己的需求购买，价格相对来说还是比较亲民的，另外新用户会赠送有效期六个月的 50g 容量包。</p>\n<p>购买完成后，进入<code>存储桶列表</code>标签页，在这里我们可以创建存储桶，点击创建存储桶，会出现以下界面：</p>\n<p><img src="https://pic-go-20220331-1301395896.cos.ap-beijing.myqcloud.com/img/image-20220331171659674.png" alt="image-20220331171659674"></p>\n<p>存储桶的所属区域可以根据自身选择，最好选择与服务器在同一区域（如果你的服务器也是腾讯云的话）</p>\n<p>名称的话最好有规律可循，我个人习惯就是<code>用途-时间</code></p>\n<p>访问权限的话需要选择公有读私有写，毕竟这是个图床</p>\n<p>上面几项填完后点击下一步，出现以下界面：</p>\n<p><img src="https://pic-go-20220331-1301395896.cos.ap-beijing.myqcloud.com/img/image-20220331172203030.png" alt="image-20220331172203030"></p>\n<p>版本控制我没有选择打开，因为需要额外收费 XD</p>\n<p>日志存储也没有打开，因为感觉挺没必要，毕竟只是当个图床</p>\n<p>存储桶标签的话就是一个键值对，主要作为管理存储桶的一个标识，这个就随意填上吧</p>\n<p>服务端加密我也没有打开，因为这是一个图床（万能的理由）</p>\n<p>再次点击下一步之后会展示确认页，如果没有问题的话点击创建吧</p>\n<h3>配置图床</h3>\n<p>打开 PicGo，进入腾讯云COS 的设置界面，可以看到以下界面：</p>\n<p><img src="https://pic-go-20220331-1301395896.cos.ap-beijing.myqcloud.com/img/image-20220331172914261.png" alt="image-20220331172914261"></p>\n<p>COS 版本选择 V5</p>\n<p><code>SecretId</code>  <code>SecretKey</code>  <code>APPID</code> 可以到<a href="https://console.cloud.tencent.com/cam/capi">这里</a>来获取</p>\n<p><img src="https://pic-go-20220331-1301395896.cos.ap-beijing.myqcloud.com/img/image-20220331173213939.png" alt="image-20220331173213939"></p>\n<p>存储空间名就是我们先前创建的存储桶的名字</p>\n<p>存储区域则是创建存储桶时选择的区域的编号，比如北京区域的就是 <code>ap-beijing</code>， 具体可以在<a href="https://console.cloud.tencent.com/cos/bucket">这里</a>看到</p>\n<p>存储路径非必填，如果不填的话会把图片默认存储在根目录</p>\n<p>自定义域名我没有填，如果设置的话，PicGo 会以<code>自定义域名+储存路径+上传的图片名</code>的方式返回图片地址</p>\n<p>全部配置完成后点击确定，之后可以选择将腾讯云COS设为默认图床。</p>\n<h3>与 Typora 关联</h3>\n<p>完成以上所有步骤后，我们已经搭建好了图床并可以正常使用啦~</p>\n<p>对我个人而言，图床的作用更多的是在编写 markdown 文件时插入图片使用的，而作为一款非常流行的 markdown 编辑器，Typora 提供了对 PicGO 的支持，经过简单的配置后我们可以更加方便的在 markdown 中插入图片。</p>\n<p>首先，打开 Typora，在左上角点击<code>文件-偏好设置</code>，进入<code>图像</code>设置，并设置以下内容：</p>\n<p><img src="https://pic-go-20220331-1301395896.cos.ap-beijing.myqcloud.com/img/image-20220331210940280.png" alt="image-20220331210940280"></p>\n<p>设置完成后，每次在 markdown 中插入图片时都会自动上传到自己的图床，无需手动上传。配合 <code>Snipaste</code> 简直是太香了~</p>\n<p>至此，我们就完成了一个简单的图床的搭建，粗略地翻阅了一下文档，发现 PicGo 还有许多其他有用的功能和插件，等有时间再去探索吧~</p>\n'}}}]);