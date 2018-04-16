---
layout: post
title:  "google home notifierセットアップメモ"
date:   2018-04-16 20:00:00 +0900
categories: CentOS
---

## 概要
google homeに任意のテキスト情報をしゃべらせることができる[google-home-notifier](https://github.com/noelportugal/google-home-notifier)だが、npmでインストールするとソースが古いため、いくつか修正が必要だった。

忘れそうなので記録に残しておく。

ラズパイは持ってないので余っているCentOS7のノートPCを使用した。

## node.jsのインストール
省略。

## npmのインストール
省略。

## google-home-notifierのインストール
google-home-notifierには依存パッケージがあるため、yumでインストールしておく。
```
# yum install avahi-compat-libdns_sd-devel
```

google-home-notifierをインストールする。
```
$ npm init
$ npm install google-home-notifier --save-dev
```

[google-home-notifier](https://github.com/noelportugal/google-home-notifier)のREADME.mdに従い、brower.jsを修正する。
```
$ vi node_modules/mdns/lib/browser.js
```

```javascript
Browser.defaultResolverSequence = [
  rst.DNSServiceResolve(), 'DNSServiceGetAddrInfo' in dns_sd ? rst.DNSServiceGetAddrInfo() : rst.getaddrinfo()
, rst.makeAddressesUnique()
];

And change to:

Browser.defaultResolverSequence = [
  rst.DNSServiceResolve(), 'DNSServiceGetAddrInfo' in dns_sd ? rst.DNSServiceGetAddrInfo() : rst.getaddrinfo({families:[4]})
, rst.makeAddressesUnique()
];
```

google-home-notifierの言語設定が不十分なので、以下を修正する。
```bash
$ vi node_modules/google-home-notifier/google-home-notifier.js
```

```javascript
var ip = function(ip) {
  deviceAddress = ip;
  return this;
}

And change to:

var ip = function(ip, lang = 'en') {
  deviceAddress = ip;
  language = lang;
  return this;
}
```

## テストプログラムを作成して実行
以下のプログラムを作成する。
```bash
$ vi test.js
```
```javascript
var googlehome = require('google-home-notifier');
var language = 'ja'; // if not set 'us' language will be used

// googlehome.device('device name', language); // Change to your Google Home name
// or if you know your Google Home IP
googlehome.ip('192.168.0.20', language);

googlehome.notify('超ッ！、超ッ！、超気持ちイイィーーーッ、名言だものォォォォォーーーッ', function(res) {
  console.log(res);
});

```

作成したプログラムを実行する。
```bash
$ node test.js
```

しゃべった。

## まとめ
以上でgoogle-home-notifierにしゃべらせることができた。

ただavahi周りに不備があるようで、google homeのデバイス名でしゃべらせることができない。（Warningが出ている）今回はIPアドレス指定でごまかしたので、修正方法が分かれば追記する。
