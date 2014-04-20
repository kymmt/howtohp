---
layout: post
title: MacのApacheでヴァーチャルホストを使ってテスト環境の構築
categories:
- Tools
tags:
- Apache
- Mac
meta:
  dsq_thread_id: '547706023'
author:
  email: info@howtohp.com 
  display_name: kymmt
---
Macには元々Apacheが入ってるので、それの使い方と、自分の使い方の紹介。(MAMPは使いません。)  
Windowsでの設定は[DreamweaverとApacheを連携して、テスト環境の構築]({% post_url 2009-10-05-dreamweaver-apache %})の記事が参考になるかもしれません。

<section id="workspace" markdown="block">
# ワークスペースの作成

とりあえず、作業用のディレクトリはサーバー使うにしろ使わないにしろ一箇所にまとめておきたいので、
`/Users/ユーザー名/work`の様に今後ここに色んなサイト用のディレクトリを掘っていく作業場所をつくっておきます。

</section>
<section id="apache" markdown="block">
# サーバー側の設定

## ヴァーチャルホスト設定

Apacheの設定ファイルは、`/etc/apache2/httpd.conf`に書かれています。

設定ファイルはroot権限がないと編集できないので、ターミナルで、`sudo`をつけてvimで編集します。

~~~ bash
sudo vim /etc/apache2/httpd.conf #vimでapacheの設定ファイルを開く

# Virtual hosts
Include /private/etc/apache2/extra/httpd-vhosts.conf #ヴァーチャルホスト用の設定ファイルを読みこむため、行頭の#を削除
~~~

これで、バーチャルホストの設定ファイルが読み込まれるはずです。

## 読み込んだバーチャルホストの設定ファイルの中身を編集

次に先ほどよみこんだ、バーチャルホストの設定ファイルを編集します。

~~~ bash
<virtualhost *:80>
DocumentRoot "/Library/WebServer/Documents/local.howtohp.com"
ServerName local.howtohp.com
ErrorLog "/private/var/log/apache2/local.howtohp.com-error_log"
CustomLog "/private/var/log/apache2/local.howtohp.com-access_log" common
</virtualhost>
~~~

こんな感じが最小の設定になるかと思います。ServerNameはネット上に存在しないアドレスにするよう注意してください。  
今後同じURLのサイトを見れなくなってしまいます。

今回のサンプルでは、`/Library/WebServer/Documents/local.howtohp.com`がドキュメントルートになります。

## hostsファイルの設定

Macのホストファイルは`/etc/hosts`にありますので、これも`sudo`で編集し、先ほどバーチャルホストの設定ファイルにかいた、サーバーネームを追記します。

~~~
127.0.0.1 local.howtohp.com
~~~

これで、http://local.howtohp.comへアクセスしたときにローカルサーバー内の/Library/WebServer/Documents/local.howtohp.comを見に行くようになります。

## Apacheの再起動

Apacheの設定を変更したら、再起動するまで読み込まれないので、以下のコマンドで再起動します。  
ここでもroot権限が必要です。

~~~ bash
apachectl -t #これで設定ファイルがうまくいってるか一応チェック
Syntax OK #これがでたら問題無し。

sudo apachectl restart　#Apacheの再起動
~~~

## ローカルサーバーのディレクトリをワークスペースへシンボリックリンクを貼る。

次に作業用のディレクトリとサーバー内で、いちいち同期するのとかローカル環境ではめんどくさいので、シンボリックリンクを貼っておきます。

~~~ bash
ln -s /Library/WebServer/Documents/local.howtohp.com ~/work/local.howtohp.com
~~~

これで、サーバー内のファイルをワークスペース内で直接編集できますね。完了です。

以前は、rsyncコマンド使っていちいち同期してたんですが、ローカル環境でそんなことやってるのがアホらしくなったので、直接編集することにしました。
</section>
