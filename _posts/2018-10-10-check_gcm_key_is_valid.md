---
layout: post
title:  "GCMのAPIキーがvalidかどうかを確認する。"
date:   2018-10-10 13:11:00 +0900
categories: android
---

# GCMのAPIキーがvalidかどうかを確認する。

[Implementing an HTTP Connection Server  |  Cloud Messaging  |  Google Developers](https://developers.google.com/cloud-messaging/http#checkAPIkey)

確認用のシェルスクリプトを作成する。

```bash:cehckGcmKeyValid.sh
#!/bin/sh
server_key=AndroidGCMAPIKey
curl --header "Authorization: key=$server_key" \
 --header Content-Type:"application/json" \
 https://gcm-http.googleapis.com/gcm/send \
 -d "{\"registration_ids\":[\"ABC\"]}" \
 -w '%{http_code}\n'

```

server_keyに取得したAPIKeyをセットして実行。

status code 200 が返ってくれば正常。（registration_idsが適当でも200でfalseの結果が返る。）
