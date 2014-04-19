---
layout: post
title: リニューアルしてたらなんとなくWordpressの作業の流れが固まってきた。(下準備編)
categories:
- Other
tags:
- Wordpress
status: publish
type: post
published: true
meta:
  _edit_last: '2'
  _thumbnail_id: '750'
  dsq_thread_id: '647476166'
author:
  login: kohei
  email: contact@koheiyamamoto.me
  display_name: kymmt
  first_name: Kohei
  last_name: Yamamoto
---

これでデザインを変えたのは4回目になります。  
このブログは2007年にはじめて5年目になるのに、記事数が30にも満たないという、えげつないペースでの更新頻度ですが、裏側は結構いじってます。


リニューアルするにあたって、Jykellを使おうかと思ったんですが、サーバー乗り換えなきゃいけないっぽかったので、今回もWordpressでいきました。


今回の作業で、自分のやり方が固まってきたので、こんな感じで作業してますってのを書いてみます。  
もっとこうすればいいのにってのがあれば、突っ込んでもらえると助かります。


<section markdown="block">
# まずは下準備

1. [ローカルサーバーの設定](#server)
2. [Gitでバージョン管理](#git)
3. [ファイル転送様コマンドのエイリアスの作成](#rsync)

</section>
<section id="server" markdown="block">
## 1.ローカルサーバーの設定

この辺は前にも書いたことあるので、省略しますが、ローカルのサーバーでWordpressが動くようにしときます。  
自分の環境はApache+MySQLの組み合わせです。メールの設定なんかはスルーしてます。

</section>
<section id="git" markdown="block">
## 2.Gitでバージョン管理

とりあえず、コーディング前の準備としてGitで管理するようにします。  
なんかあったとき用ですね。これもローカルだけの管理なので、HDDが死んだらアウトです。

~~~ bash
git init
~~~

次に.gitignoreファイルを作成します。githubにWordpress用の.gitignoreファイルが公開されてるので、それを参考にいらないものを記述します。


[github / Wordpress.gitignore](https://github.com/github/gitignore/blob/master/Wordpress.gitignore)

### .gitignore

~~~ bash
#sass
.sass-cache/

#mac
.DS_Store

#win
Thumbs.db

#dreamweaver

_notes/
dwsync.xml

wp-*.php
xmlrpc.php
wp-admin/
wp-includes/
wp-content/plugins/　#追記
wp-content/uploads/
wp-content/blogs.dir/
wp-content/upgrade/*
wp-content/backup-db/*
wp-content/advanced-cache.php
wp-content/wp-cache-config.php
wp-content/cache/*
wp-content/cache/supercache/*
sitemap.xml
sitemap.xml.gz
readme.html
license.txt
~~~

ここで、wp-content/plugins/を追記したのは、プラグイン内のファイルでwp-\*.phpにマッチしちゃうファイルが結構あって、コンフリクトしちゃうので、めんどくさいからプラグインも無視するようにしました。  
本番とテストでプラグインは別々になっちゃいますけど、どうせ設定なんかはそれぞれ管理画面からやらなきゃいけないので、まいっかってことで分けるようにしました。

これを使えば、基本的にはテーマディレクトリ以下のみが無視されないようになります。

</section>

<section id="rsync" markdown="block">
## 3.ファイル転送用コマンドのエイリアス作成

ファイルの転送もコマンドでできるようにします。GUIのFTPクライアントは使いません。  
いくつか方法はあると思いますが、自分はRsyncコマンドを使います。オプションやら色々設定すると長すぎて毎回入力するのはキツイのでエイリアスを作って簡単に覚えれるようにしときます。


このサイトはさくらのサーバーで運用してるので、下記の様なコマンドを.bashrcに記述しておきます。


~~~ bash
alias synchowtohp="rsync -avvrh --update --exclude-from ~/work/howtohp/.gitignore  --delete -e ssh ~/work/howtohp/ ユーザー名@サーバー名.sakura.ne.jp:~/www/"
~~~

`~/work/howtohp/`の部分は自分のローカル環境のWordpressのルートディレクトリになります。


`--exclude-from`オプションで、先ほど記述した.gitignoreを利用してるので、.gitignoreに記述してるファイルは無視されます。.gitigrenoreとrsyncでexcludeするファイルの記述ルールは少し違いますが、ここでは、共通して利用できる形で.gitignoreを記述してます。

これで、synchowtohpと打つだけで同期がとれます。

### Rsyncコマンドの参考サイト

* [ はじめてrsyncを使う方が知っておきたい6つのルール](http://www.itmedia.co.jp/enterprise/articles/0804/21/news013.html)
* [UNIXの部屋 コマンド検索: rsync](http://x68000.q-e-d.net/~68user/unix/pickup?rsync)
</section>

最後の流れまで全部一気に書こうと思ってたけど、長くなりすぎるので、とりあえず下準備編として今回はこのへんで。

