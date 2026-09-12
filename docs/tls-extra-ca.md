# `certs/isrg-root-yr.pem` 为什么在这

2026-09-12。某些站点（例：`www.latepost.com`）用 Let's Encrypt 的新根 **`ISRG Root YR`** 签发，而 Node 自带的信任库还没有这个根：

```
$ node -e "fetch('https://www.latepost.com/')"
fetch failed | cause: unable to get local issuer certificate
$ curl https://www.latepost.com/           # 200 —— macOS/curl 会自动补下载缺失的根
```

表现是：网页上这个源的卡片取不到内容（现在会显示「这个源这次没取到内容」+ 重试，不再是一直转骨架）。

## 做法

把 `yr.i.lencr.org`（YR1 中间证书里 AIA 指定的 CA Issuers 地址）返回的根证书存成 `certs/isrg-root-yr.pem`，并通过 `NODE_EXTRA_CA_CERTS` 让 Node 信任它：

- `pnpm dev` / `pnpm start` 已在脚本里带上这个环境变量
- 手动跑 node 时：`NODE_EXTRA_CA_CERTS=certs/isrg-root-yr.pem node ...`
- Cloudflare / Vercel 上如果同样报这个错，把 PEM 内容作为环境变量塞进运行时不适用（`NODE_EXTRA_CA_CERTS` 只认文件路径），需要放到部署产物的文件里再指过去

证书内容：`subject CN=Root YR`，`issuer CN=ISRG Root X1`（交叉签名），有效期见 `openssl x509 -in certs/isrg-root-yr.pem -noout -dates`。它只是把公开根加进信任链，**没有关闭任何校验**。
