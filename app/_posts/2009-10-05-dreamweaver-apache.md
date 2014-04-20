---
layout: post
title: DreamweaverとApacheを連携して、テスト環境の構築
categories:
- Tools
tags:
- Apache
- Dreamweaver
meta:
  dsq_thread_id: '547653436'
author:
  email: info@howtohp.com
  display_name: kymmt
---

サイトの構築をしていると、テスト環境がやっぱりあった方が楽ですよね。  
用意された物があればそれを使えばいいんですが、なければ自分で作るしかありません。  
でも、できれば、出来るだけ本番環境に近い環境でないとテスト環境としてあまり意味がないので、Apacheでバーチャルホストの機能を利用して、サイト毎にちゃんとドキュメントルートを分ける方法を紹介したいと思います。

<section id="index" markdown="block">
# 手順

1. [Apacheのインストール](#section-1)
2. [Dreamweaverのサイトの定義でテストサーバーの設定](#section-2)
3. [Apacheの設定](#section-3)
4. [Windosのhostファイルの編集](#section-4)
5. [Dreamweaverと同期をとって確認](#section-5)

</section>
<section id="section-1" markdown="block">
# 1.Apacheのインストール

[Download - The Apache HTTP Server Project](http://httpd.apache.org/download.cgi)←のサイトからWindowsの方は、Win32 Binaryのリンクからダウンロードして、インストールは、基本的にはNextを押していくだけで、OKです。メールアドレスの入力欄があるところだけ、自分のメールアドレスを入れていけばおｋでしょう。


詳しいインストール方法は<a href="http://howtohp.com/tools/windows-apache.html">WindowsにApacheをインストール</a>のエントリーを参考にしてください。

</section>
<section id="section-2" markdown="block">
# 2.Dreamweaverのサイトの定義でテストサーバーの設定

<figure><img src="http://howtohp.com/wp/wp-content/uploads/2009/10/site_definition.gif" alt="" title="サイトの定義" width="500" height="416" class="aligncenter size-full wp-image-145" /></figure>

ここで、テストサーバーの設定で、サーバーモデルをPHP MySQL、アクセスをローカル/ネットワークテストサーバーフォルダを、<strong>C:\Program Files\Apache Software Foundation\Apache2.2\htdocs</strong>の中に、サイト用のフォルダ(半角英数ならなんでもいい)を作成し、作成したフォルダを指定。  
URL接頭辞には、自分がテストに使用したいURLを入力(インターネット上に存在しないURL)。

</section>
<section id="section-3" markdown="block">
# 3.Apacheの設定


C:\Program Files\Apache Software Foundation\Apache2.2\confの中のhttpd.confをテキストエディタで開きます。

~~~ apacheconf
# Virtual hosts
#Include conf/extra/httpd-vhosts.conf
~~~

上記のvhostsで検索して、二行目の#コメントをはずします。

~~~ apacheconf
# Virtual hosts
Include conf/extra/httpd-vhosts.conf
~~~

これで、バーチャルホストの設定が別ファイルとしてインクルードされます。


インクルードしたvhosts.confがC:\Program Files\Apache Software Foundation\Apache2.2\conf\extraの中にありますので、それをテキストエディタで開きます。


その中の、下記の部分の設定を変更します。

~~~ apacheconf
<VirtualHost *:80>
ServerAdmin webmaster@dummy-host.Windows.home
DocumentRoot "C:/Program Files/Apache Software Foundation/Apache2.2/docs/dummy-host.Windows.home"
ServerName dummy-host.Windows.home
ServerAlias www.dummy-host.Windows.home
ErrorLog "logs/dummy-host.Windows.home-error.log"
CustomLog "logs/dummy-host.Windows.home-access.log" common
</VirtualHost>
~~~

ServerAdminは、サーバー管理者のメールアドレスに変更。  
DocumentRootは、先ほど、htdocsに作成したサイト用のフォルダのパスに変更。  
ServerNameは、Dreamweaverで設定した、URL接頭辞に変更。  
ServerAliasはとりあえず今回は使いませんので、削除。  
ErrorLogは、エラーログ用のファイルの保存先に変更を入力。存在しなければ自動的に作成します。  
CustomLogには、アクセスログ用のファイルの保存先に変更。存在しなければ自動的に作成します。

自分の場合、以下のようになります。

~~~ apacheconf
<VirtualHost *:80>
ServerAdmin info@howtohp.com
DocumentRoot "C:\Program Files\Apache Software Foundation\Apache2.2\htdocs\howtohp.com"
ServerName local.howtohp.com
ErrorLog "logs/howtohp.error.log"
CustomLog "logs/howtohp.access.log" common
</VirtualHost>
~~~

これで、Apacheの設定は完了ですので、Apacheを再起動します。リスタートは、すべてのプログラム→Apache HTTP Server 2.2→Control Apache Server→Restartで再起動します。  
この時に、コマンドラインの画面が一瞬だけ表示され、そのまま消えれば成功です。  
消えずに、エラーメッセージが出れば、設定ファイルに何かエラーがありますので、エラーメッセージを参考に修正しましょう。

</section>
<section id="section-4" markdown="block">
# 4.Windosのhostファイルの編集

次に、、<strong>C:\Windows\System32\drivers\etc</strong>の中にある<strong>host</strong>という拡張子のないファイルを開き、下記のコードに1行先ほどURL接頭辞にしたURLを追記します。

~~~ apacheconf
127.0.0.1       localhost
127.0.0.1       local.howtohp.com
~~~
</section>
<section id="section-5" markdown="block">
# 5.Dreamweaverと同期をとって確認


最後に、Dreamweaverで、ローカルとテストサーバーを同期をとります。

<figure>
<img src="http://howtohp.com/wp/wp-content/uploads/2009/10/dreamweaver-apache_2.gif" alt="" title="DWで同期" width="231" height="216" class="alignleft size-full wp-image-147" /></figure>

これで、開きたいファイルをDreamweaver上で開いて、<kbd>F12</kbd>、もしくは、URL接頭辞に入力したURLを直接入力し、表示されれば、成功です。


慣れれば、5分もかからないので、覚えておいた方がいいかと。

</section>
