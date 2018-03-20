---
layout: post
title:  "tomcatをsystemdに登録する手順"
date:   2018-03-30 10:30:00 +0900
categories: CentOS systemd tomcat
---
# 概要
apache-tomcat公式のtar.gzをダウンロードしてCentOS7のsystemdに登録する手順。

`systemctl restart tomcat` コマンドが正常に実行できるようにする。

## 前提
* OSはCentOS7で確認。
* javaのセットアップについては省略。

## tomcatを準備
公式サイトからダウンロードした[apache-tomcat.tar.gz](http://ftp.jaist.ac.jp/pub/apache/tomcat/tomcat-8/v8.5.24/bin/apache-tomcat-8.5.24.tar.gz)を適当な場所に設置する。
自分は`/opt/tomcat`に設置している。

```bash
# mkdir /opt/tomcat
# cd /opt/tomcat
# tar zxvf apache-tomcat-8.5.24.tar.gz
# ln -s /opt/tomcat/apache-tomcat-8.5.24 latest
```

以下のコマンドを実行してtomcatユーザーを新規作成する。
```bash
# useradd -s /sbin/nologin tomcat
```

tomcatのユニットファイルを`/etc/systemd/system/tomcat.service`に新規作成する。

```
# /etc/systemd/system/tomcat.service
[Unit]
Description=Apache Tomcat Servlet Container
After=syslog.target network.target

[Service]
Type=oneshot
EnvironmentFile=/opt/tomcat/latest/bin/setenv.sh
ExecStart=/opt/tomcat/latest/bin/startup.sh
ExecStop=/opt/tomcat/latest/bin/shutdown_watching.sh
RemainAfterExit=yes
TimeoutSec=90

[Install]
WantedBy=multi-user.target
```

続いてプロセス終了を監視するようにシャットダウンスクリプトを新規作成する。
```bash
#!/bin/sh

# const
TOMCAT_HOME=/opt/tomcat/latest
TOMCAT_USER=tomcat
SHUTDOWN_WAIT=60

# function
tomcat_pid() {
  echo `ps aux | grep org.apache.catalina.startup.Bootstrap | grep -v grep | awk '{ print $2 }'`
}

# shutdown.shでtomcatを停止する。
pid=$(tomcat_pid)
if [ -n "$pid" ]
then
    echo "Stoping Tomcat"
    /bin/su -p -s /bin/sh $TOMCAT_USER $TOMCAT_HOME/bin/shutdown.sh

    # PIDが無くなるまで待機
    let kwait=$SHUTDOWN_WAIT
    count=0;
    until [ `ps -p $pid | grep -c $pid` -eq '0' ] || [ $count -gt $kwait ]
    do
        echo -n -e "\nwaiting for processes to exit";
        sleep 1
        let count=$count+1;
    done

    if [ $count -gt $kwait ]; then
        echo -n -e "\nkilling processes which didn't stop after $SHUTDOWN_WAIT seconds"
        kill $pid
    fi
else
    echo "Tomcat is not running"
    exit 0  # success
fi

exit 0    # success
```

tomcatのユニットファイルを反映させる。
```bash
# systemctl daemon-reload
```

以上でtomcatのsystemd登録は完了。
以下のコマンドが正常に終了することを確認。

```bash
# systemctl restart tomcat
```

以上。
