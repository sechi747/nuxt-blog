(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{356:function(n,e){n.exports={attributes:{title:"从零开始在 Ubuntu 上部署 Nuxt 项目",date:"2022/03/24 15:58:00",updated:"2022/03/28 10:05:00",categories:["技术"],tags:["Linux","Nuxt","网站部署"]},html:'<h2>前置工作</h2>\n<p>部署使用的 Ubuntu 版本：Ubuntu 20.04.4 LTS (GNU/Linux 5.4.0-96-generic x86_64)</p>\n<p>整个部署过程我都是使用 root 用户进行操作，所以不会有权限问题，但如果你是使用其他用户进行操作，则需要注意权限问题，适时给命令加上 <code>sudo</code> 前缀</p>\n<h4>安装 npm</h4>\n<p><code>apt install npm</code></p>\n<p><code>npm config set registry https://registry.npmmirror.com</code> 配置国内 npm 镜像</p>\n<h4>安装 n</h4>\n<p><code>npm i -g n</code></p>\n<h4>使用 n 安装 node</h4>\n<p><code>n lts</code>  安装 node 的长期支持版</p>\n<p><code>n 14.17.6</code> 安装特定版本的 node（此处仅做演示，请根据实际需求安装特定的 node 版本）</p>\n<p><code>n</code> 切换当前 node 版本，切换的同时 npm 版本也会改变。可以通过 <code>node -v</code> 查看当前 node 版本</p>\n<h4>安装 pm2</h4>\n<p><code>npm i -g pm2</code></p>\n<h4>安装并配置 git</h4>\n<ol>\n<li>\n<p><code>apt install git</code></p>\n</li>\n<li>\n<pre class="language-bash"><code class="language-bash"><span class="token function">git</span> config --global user.name <span class="token string">\'用户名\'</span>\n<span class="token function">git</span> config --global user.email <span class="token string">\'邮箱\'</span>\n</code></pre>\n</li>\n<li>\n<p><code>ssh-keygen -C \'邮箱\' -t rsa</code>  默认生成目录为 <code>~/.ssh</code></p>\n</li>\n<li>\n<p><code>cat ~/.ssh/id_rsa.pub</code> 复制 ssh key 并将其加入 github 的设置中</p>\n</li>\n</ol>\n<p>单独说一下我遇到的问题：在进行完以上步骤后，我尝试使用 <code>git clone git@github.com:sechi747/nuxt-blog.git </code> 命令拉取我的个人仓库，结果失败了。错误信息如下：</p>\n<pre class="language-bash"><code class="language-bash">kex_exchange_identification: read: Connection reset by peer\nfatal: Could not <span class="token builtin class-name">read</span> from remote repository\n\nPlease <span class="token function">make</span> sure you have the correct access rights\nand the repository exists\n</code></pre>\n<p>尝试了许多种方法进行解决，包括但不限于：重装系统，重新生成 ssh key，根据 github 官方的指南一步一步进行操作等都没有起作用。下面是我最终的解决方法。</p>\n<p>进入到 <code>.ssh</code> 文件夹下，新建 <code>config</code> 文件（如果有就不用建了，直接修改就可以），添加以下配置：</p>\n<pre class="language-shell"><code class="language-shell">Host github.com\nHostname ssh.github.com\nPort <span class="token number">443</span>\nUser <span class="token function">git</span>\n</code></pre>\n<p>然后再进行 <code>git</code> 操作就不会有问题了。造成这个现象的原因暂时不清楚，等有空再细查吧。</p>\n<h4>安装 Nginx</h4>\n<p>此处安装的 Nginx 版本为：nginx/1.18.0 (Ubuntu)</p>\n<ol>\n<li><code>apt install nginx</code> 安装 Nginx</li>\n<li><code>service nginx start</code> 启动 Nginx</li>\n</ol>\n<h4>安装 MySQL</h4>\n<p>其实我的博客项目并不涉及数据库，但是为了熟悉 Linux 操作还是装上吧~</p>\n<p>此处安装的 MySQL 版本为：8.0.28-0ubuntu0.20.04.3 for Linux on x86_64 ((Ubuntu))</p>\n<ol>\n<li><code>apt install mysql-server</code> 安装 MySQL</li>\n<li><code>systemctl status mysql.service</code> 看一下有没有安装成功</li>\n<li><code>mysql -u root -p</code> 因为安装时并没有要求设置密码，所以密码默认为空，直接敲回车就能进入控制台了</li>\n<li><code>use mysql;</code> 切换到 mysql 数据库</li>\n<li><code>alter user \'root\'@\'localhost\' identified with mysql_native_password by \'密码\';</code>  修改 root 账号的密码加密方式和密码，这样就可以在客户端使用密码连接数据库了</li>\n<li><code>grant all on *.* to \'root\'@\'localhost\';</code> 使外网可以访问到数据库</li>\n<li><code>vim /etc/mysql/mysql.conf.d/mysqld.cnf</code> 将里面的<code>bind-address</code> 和 <code>mysqlx-bind-address</code> 修改为 <code>0.0.0.0</code></li>\n<li><code>systemctl restart mysql</code> 重启 MySQL 服务</li>\n</ol>\n<h4>安装 Docker</h4>\n<p>docker 肯定是会用到的，虽然我现在没用到~ 这里直接把官网的安装教程搬过来</p>\n<p>此处安装的 Docker 版本为：20.10.14, build a224086</p>\n<ol>\n<li>安装一些必要的包</li>\n</ol>\n<pre class="language-bash"><code class="language-bash"><span class="token function">apt</span> update\n<span class="token function">apt</span> <span class="token function">install</span> ca-certificates <span class="token function">curl</span> gnupg lsb-release\n</code></pre>\n<ol start="2">\n<li>\n<p>添加 docker 官方的 GPG 密钥<br>\n<code>curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg</code></p>\n</li>\n<li>\n<p>设置稳定版的 docker 仓库</p>\n<pre class="language-shell"><code class="language-shell"><span class="token builtin class-name">echo</span> <span class="token punctuation">\\</span>\n  <span class="token string">"deb [arch=<span class="token variable"><span class="token variable">$(</span>dpkg --print-architecture<span class="token variable">)</span></span> signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \\\n  <span class="token variable"><span class="token variable">$(</span>lsb_release -cs<span class="token variable">)</span></span> stable"</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/apt/sources.list.d/docker.list <span class="token operator">></span> /dev/null\n</code></pre>\n</li>\n<li>\n<p>安装 docker 引擎</p>\n<pre class="language-shell"><code class="language-shell"><span class="token function">apt</span> update\n<span class="token function">apt</span> <span class="token function">install</span> docker-ce docker-ce-cli containerd.io\n</code></pre>\n</li>\n<li>\n<p>验证安装是否成功<br>\n<code>docker run hello-world</code><br>\n由于我们本地是没有 hello-world 这个镜像的，所以会去服务器 pull，如果发现成功运行了 hello-world 镜像，出现了 Hello from Docker 的，那么就算是安装成功啦！</p>\n</li>\n<li>\n<p>配置 docker 镜像加速源</p>\n<pre class="language-shell"><code class="language-shell"><span class="token function">vim</span> /etc/docker/daemon.json\n\n<span class="token comment">#在文件中添加以下内容</span>\n<span class="token punctuation">{</span>\n   <span class="token string">"registry-mirrors"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>\n       <span class="token string">"https://mirror.ccs.tencentyun.com"</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">#添加完成后执行下面的命令重启 docker 服务器</span>\nsystemctl restart <span class="token function">docker</span>\n</code></pre>\n<p>由于 DockerHub 部署在国外，如果直接使用 <code>docker pull</code> 拉取镜像速度会比较慢，所以推荐配置一下 Docker镜像加速源，这里我选择的是腾讯云提供的加速源。</p>\n</li>\n</ol>\n<h2>项目部署</h2>\n<p>经过了上面的一系列准备，终于可以开始正式部署啦！</p>\n<p>nuxt 官网提供了两种部署方式，一种是使用 <code>npm run build &amp; npm run start</code> 进行 ssr 部署，另一种是使用 <code>npm run generate </code> 进行静态应用部署，这里我选择的是 ssr 部署。</p>\n<p>在部署之前，我们需要在项目中增加一些配置。</p>\n<ol>\n<li>\n<p>在 <code>nuxt.config.js</code> 中增加以下配置：</p>\n<pre class="language-js"><code class="language-js">  <span class="token literal-property property">server</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">\'0.0.0.0\'</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token string">\'7070\'</span> <span class="token comment">// 项目运行的端口号。注意：请写一个不容易被占用的端口号</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n</code></pre>\n</li>\n<li>\n<p>在项目的根目录新建一个文件用于 pm2 配置： <code>ecosystem.config.js</code> 并在里面添加以下内容：</p>\n<pre class="language-js"><code class="language-js">module<span class="token punctuation">.</span><span class="token property-access">exports</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token literal-property property">apps</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">\'nuxt-blog\'</span><span class="token punctuation">,</span> <span class="token comment">// pm2 应用进程的名称</span>\n      <span class="token literal-property property">exec_mode</span><span class="token operator">:</span> <span class="token string">\'cluster\'</span><span class="token punctuation">,</span> <span class="token comment">// 应用启动模式，这里选择集群</span>\n      <span class="token literal-property property">instances</span><span class="token operator">:</span> <span class="token string">\'max\'</span><span class="token punctuation">,</span> <span class="token comment">// 应用启动实例个数，这里选择最大，也可以填具体的数量</span>\n      <span class="token literal-property property">script</span><span class="token operator">:</span> <span class="token string">\'./node_modules/nuxt/bin/nuxt.js\'</span><span class="token punctuation">,</span> <span class="token comment">// 启动脚本路径</span>\n      <span class="token literal-property property">args</span><span class="token operator">:</span> <span class="token string">\'start\'</span> <span class="token comment">// 传递给脚本的参数</span>\n      <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">".nuxt"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 监听 .nuxt 文件夹，当里面内容更新时会自动重启应用</span>\n  \t  <span class="token literal-property property">watch_delay</span><span class="token operator">:</span> <span class="token number">1500</span><span class="token punctuation">,</span> <span class="token comment">// 监听延迟</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre>\n</li>\n</ol>\n<p>接下来你需要把自己的项目上传到 github 上，这一步就不再赘述。</p>\n<p>项目上传成功后，我们切回到服务器的终端并进行以下操作：</p>\n<ol>\n<li>\n<p>首先我们要通过 <code>git clone</code> 命令把项目放到服务器端</p>\n<pre class="language-shell"><code class="language-shell"><span class="token comment">#这里我选择在用户目录下新建一个 www 文件夹，并把项目放到里面，文件位置可以自行更改</span>\n<span class="token builtin class-name">cd</span> ~\n<span class="token function">mkdir</span> www\n<span class="token builtin class-name">cd</span> www\n<span class="token function">git</span> clone git@github.com:sechi747/nuxt-blog.git\n</code></pre>\n</li>\n<li>\n<p>项目拉下来之后，需要使用 npm 安装依赖并打包</p>\n<pre class="language-shell"><code class="language-shell"><span class="token builtin class-name">cd</span> nuxt-blog\n<span class="token function">npm</span> i\n<span class="token function">npm</span> run build\n</code></pre>\n</li>\n<li>\n<p>打包完成后，我们就可以使用 pm2 启动项目了</p>\n<pre class="language-shell"><code class="language-shell">pm2 start\n</code></pre>\n</li>\n</ol>\n<p>我们可以通过 <code>pm2 ls</code> 查看当前正在运行的应用状态， <code>pm2 logs</code> 查看日志</p>\n<p>最后，我们只需要配置一下 Nginx 就可以完成部署啦！</p>\n<ol>\n<li><code>vim /etc/nginx/nginx.conf</code> 编辑 Nginx 配置</li>\n<li><code>nginx -s reload </code> 在 Nginx 目录下运行此命令，重新启动 Nginx 服务</li>\n</ol>\n<p>贴出我自己的配置供参考：</p>\n<pre class="language-shell"><code class="language-shell">user www-data<span class="token punctuation">;</span>\nworker_processes auto<span class="token punctuation">;</span>\npid /run/nginx.pid<span class="token punctuation">;</span>\ninclude /etc/nginx/modules-enabled/*.conf<span class="token punctuation">;</span>\n\nevents <span class="token punctuation">{</span>\n        worker_connections <span class="token number">768</span><span class="token punctuation">;</span>\n        <span class="token comment"># multi_accept on;</span>\n<span class="token punctuation">}</span>\n\nhttp <span class="token punctuation">{</span>\n\n        <span class="token comment">##</span>\n        <span class="token comment"># Basic Settings</span>\n        <span class="token comment">##</span>\n\n        sendfile on<span class="token punctuation">;</span>\n        tcp_nopush on<span class="token punctuation">;</span>\n        tcp_nodelay on<span class="token punctuation">;</span>\n        keepalive_timeout <span class="token number">65</span><span class="token punctuation">;</span>\n        types_hash_max_size <span class="token number">2048</span><span class="token punctuation">;</span>\n        <span class="token comment"># server_tokens off;</span>\n\n        <span class="token comment"># server_names_hash_bucket_size 64;</span>\n        <span class="token comment"># server_name_in_redirect off;</span>\n\n        include /etc/nginx/mime.types<span class="token punctuation">;</span>\n        default_type application/octet-stream<span class="token punctuation">;</span>\n\n        <span class="token comment">##</span>\n        <span class="token comment"># SSL Settings</span>\n        <span class="token comment">##</span>\n\n        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3<span class="token punctuation">;</span> <span class="token comment"># Dropping SSLv3, ref: POODLE</span>\n        ssl_prefer_server_ciphers on<span class="token punctuation">;</span>\n\n        <span class="token comment">##</span>\n        <span class="token comment"># Logging Settings</span>\n        <span class="token comment">##</span>\n\n        access_log /var/log/nginx/access.log<span class="token punctuation">;</span>\n        error_log /var/log/nginx/error.log<span class="token punctuation">;</span>\n\n        <span class="token comment">##</span>\n        <span class="token comment"># Gzip Settings</span>\n        <span class="token comment">##</span>\n\n        <span class="token function">gzip</span> on<span class="token punctuation">;</span>\n\n        <span class="token comment"># gzip_vary on;</span>\n        <span class="token comment"># gzip_proxied any;</span>\n        <span class="token comment"># gzip_comp_level 6;</span>\n        <span class="token comment"># gzip_buffers 16 8k;</span>\n        <span class="token comment"># gzip_http_version 1.1;</span>\n        <span class="token comment"># gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;</span>\n\n        <span class="token comment">##</span>\n        <span class="token comment"># Virtual Host Configs</span>\n        <span class="token comment">##</span>\n\t\t\n\t\t<span class="token comment">#注意！下面这两行要注释掉，否则80端口会一直被Nginx占用，导致下面自定义的sever配置不生效。</span>\n        <span class="token comment">#include /etc/nginx/conf.d/*.conf;</span>\n        <span class="token comment">#include /etc/nginx/sites-enabled/*;</span>\n\n        map <span class="token variable">$sent_http_content_type</span> <span class="token variable">$expires</span> <span class="token punctuation">{</span>\n                <span class="token string">"text/html"</span>                 epoch<span class="token punctuation">;</span>\n                <span class="token string">"text/html; charset=utf-8"</span>  epoch<span class="token punctuation">;</span>\n                default                     off<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        upstream webserver <span class="token punctuation">{</span>\n                server <span class="token number">127.0</span>.0.1:7070<span class="token punctuation">;</span> <span class="token comment">#项目的启动地址及端口号</span>\n        <span class="token punctuation">}</span>\n\n        server <span class="token punctuation">{</span>\n                listen          <span class="token number">80</span><span class="token punctuation">;</span>             <span class="token comment"># 监听的端口</span>\n                server_name     http://plantsechi.top<span class="token punctuation">;</span>    <span class="token comment"># 域名</span>\n\n                <span class="token function">gzip</span>            on<span class="token punctuation">;</span>\n                gzip_types      text/plain application/xml text/css application/javascript<span class="token punctuation">;</span>\n                gzip_min_length <span class="token number">1000</span><span class="token punctuation">;</span>\n\n                location / <span class="token punctuation">{</span>\n                        expires <span class="token variable">$expires</span><span class="token punctuation">;</span>\n\n                        proxy_redirect                      off<span class="token punctuation">;</span>\n                        proxy_set_header Host               <span class="token variable">$host</span><span class="token punctuation">;</span>\n                        proxy_set_header X-Real-IP          <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>\n                        proxy_set_header X-Forwarded-For    <span class="token variable">$proxy_add_x_forwarded_for</span><span class="token punctuation">;</span>\n                        proxy_set_header X-Forwarded-Proto  <span class="token variable">$scheme</span><span class="token punctuation">;</span>\n                        proxy_read_timeout          1m<span class="token punctuation">;</span>\n                        proxy_connect_timeout       1m<span class="token punctuation">;</span>\n                        proxy_pass         http://webserver<span class="token punctuation">;</span> <span class="token comment"># 这里要填入上面的upstream</span>\n                <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>完成以上所有步骤后，打开浏览器，输入域名，你就可以看到自己的网站啦~</p>\n<p>虽然已经可以成功访问到网站了，但还是存在以下两个问题：</p>\n<ul>\n<li>网站使用的是 http 协议而不是 https 协议</li>\n<li>更新代码后每次都要手动在服务器端拉取代码并打包</li>\n</ul>\n<p>后续有时间的话会把这两个坑给填上。</p>\n'}}}]);