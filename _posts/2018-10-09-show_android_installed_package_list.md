---
layout: post
title:  "adbコマンドでAndroidデバイスにインストールされているアプリを一覧表示する。"
date:   2018-10-09 16:51:00 +0900
categories: Android
---

## AndroidStudioのadbにパスが通った状態で

### 接続されているAndroidデバイスを表示する。

PCにUSB接続されているAndroidは以下のコマンドで確認できる。 `adb shell` コマンドとか `adb backup` コマンドは接続されているデバイスが1台のみになっていなければ実行できない。

実機ならUSB接続で、エミュレータなら起動しているだけで認識される。
```bash
adb devices
```

### デバイスにインストールされているpackageの一覧を表示
```bash
adb shell pm list package
```

こんな感じで一覧表示される。
```
$ adb shell pm list package
package:com.android.smoketest
package:com.android.cts.priv.ctsshim
package:com.google.android.youtube
package:com.google.android.ext.services
package:com.example.android.livecubes
package:com.android.providers.telephony
package:com.google.android.googlequicksearchbox
package:com.android.providers.calendar
package:com.android.providers.media
package:com.google.android.onetimeinitializer
package:com.google.android.ext.shared
package:com.android.protips
package:com.android.documentsui
package:com.android.externalstorage
package:com.android.htmlviewer
package:com.android.companiondevicemanager
package:com.android.mms.service
package:com.android.providers.downloads
package:com.google.android.apps.messaging
package:com.google.android.configupdater
package:com.android.defcontainer
package:com.android.providers.downloads.ui
package:com.android.vending
package:com.android.pacprocessor
package:com.android.certinstaller
package:com.android.carrierconfig
package:android
package:com.android.contacts
package:com.android.camera2
package:com.google.android.apps.inputmethod.hindi
package:com.android.egg
package:com.android.mtp
package:com.android.backupconfirm
package:com.google.android.deskclock
package:com.android.statementservice
package:com.google.android.gm
package:com.google.android.apps.tachyon
package:com.google.android.setupwizard
package:com.android.providers.settings
package:com.android.sharedstoragebackup
package:com.google.android.music
package:com.android.printspooler
package:com.android.dreams.basic
package:com.android.inputdevices
package:com.google.android.dialer
package:com.android.bips
package:com.twitter.android
package:com.android.sdksetup
package:com.google.android.apps.docs
package:com.google.android.apps.maps
package:com.android.cellbroadcastreceiver
package:com.google.android.webview
package:com.android.server.telecom
package:com.google.android.syncadapters.contacts
package:com.android.keychain
package:com.android.chrome
package:jp.dsy.mobashisyo.debug
package:com.google.android.packageinstaller
package:com.android.emulator.smoketests
package:com.google.android.gms
package:com.google.android.gsf
package:com.google.android.tts
package:com.ustwo.lwp
package:com.android.calllogbackup
package:com.google.android.partnersetup
package:com.google.android.apps.wallpaper.nexus
package:com.google.android.videos
package:com.google.android.apps.nexuslauncher
package:com.example.android.apis
package:com.android.proxyhandler
package:com.breel.geswallpapers
package:org.chromium.webview_shell
package:com.google.android.feedback
package:com.google.android.printservice.recommendation
package:com.google.android.apps.photos
package:com.google.android.calendar
package:com.android.managedprovisioning
package:com.facebook.katana
package:com.android.providers.partnerbookmarks
package:com.android.wallpaper.livepicker
package:com.google.android.backuptransport
package:com.android.storagemanager
package:jp.co.omronsoft.openwnn
package:com.android.bookmarkprovider
package:com.android.settings
package:com.google.android.inputmethod.pinyin
package:com.android.calculator2
package:com.android.gesture.builder
package:com.android.cts.ctsshim
package:com.android.vpndialogs
package:com.google.android.apps.wallpaper
package:com.android.phone
package:com.android.shell
package:com.android.wallpaperbackup
package:com.android.providers.blockednumber
package:com.android.providers.userdictionary
package:com.android.location.fused
package:com.android.systemui
package:com.android.smoketest.tests
package:com.android.customlocale2
package:com.example.android.softkeyboard
package:com.android.development
package:com.android.providers.contacts
package:com.android.captiveportallogin
package:com.android.widgetpreview
package:com.google.android.inputmethod.latin
```

### バックアップとリストア
ちなみにバックアップは

```bash
adb backup -apk -f [filename] [package name]
```
でカレントディレクトリにバックアップファイルが生成される。

バックアップ作成時にパスワードを設定することもできる。

リストアは

```bash
adb restore [package name]
```
