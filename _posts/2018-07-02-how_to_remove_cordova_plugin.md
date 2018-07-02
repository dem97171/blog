---
layout: post
title:  "Cordovaプラグインの消し方"
date:   2018-07-02 11:30:00 +0900
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

でもそしたらネイティブ側に手を加えた分ってどうすんだろ？？？
