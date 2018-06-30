---
layout: post
title:  "Cordovaプラグインのインストール方法いろいろ"
date:   2018-04-16 20:00:00 +0900
categories: Cordova
---

オプションは[公式リファレンスを参照](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/#cordova-plugin-command)。

#### cordova pluginからインストール
```bash
cordova plugin add cordova-plugin-fcm
```
普通はこれでいい。

#### githubリポジトリからインストール
```bash
cordova plugin add https://github.com/fechanique/cordova-plugin-fcm
```
cordova plginは更新されていないのもあるので、誰かがForkした方のプラグインをインストールする時など。

#### ローカルからインストール
```bash
cordova plugin add ../cordova-plugin/cordova-plugin-fcm
```
自作のプラグインとか、修正が必要なプラグインをcloneして直しながらとか。
