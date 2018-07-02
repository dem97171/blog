---
layout: post
title:  "Cordovaプラグインの消し方"
date:   2018-07-02 11:31:00 +0900
categories: Cordova
---

## Cordova上から削除するコマンド
```bash
cordova plugin rm [プラグイン名]
```

これでCordova上からは消える。が、

* `Cordova plugin add [プラグイン名]` したときは `platform/android` 配下のコードが勝手に書き換わる。
* `Cordova plugin rm [プラグイン名]` したときは `platform/android` の変更分は削除されずに残る。


ので結局 `platform/android` 配下は手動で削除しなくてはいけない。

プラットフォーム丸ごと削除して作り直すのが早い。

## ネイティブ側に手を加えた分の管理

[androidのプロジェクト](https://github.com/apache/cordova-android)をforkしてオリジナルのプラットフォームを作るのが良さそう。

`cordova platform add android` じゃなくて `cordova platform add ../platform_dir_path` とか `cordova platform add https://giturl` とかでplatformを追加できる。

gradleのバージョンとかもそのままだと古くて怒られるし、AndroidStudioも使ってplatformは自分で管理するのがベターな感じかな。
