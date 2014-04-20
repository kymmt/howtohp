---
layout: post
title: Macユーザーなら覚えといた方がいいTerminalの便利なコマンド
categories:
- Tools
tags:
- Mac
meta:
  dsq_thread_id: '1231581618'
author:
  email: info@howtohp.com 
  display_name: kymmt
---
CompassやらGruntやらでコマンドラインツールを使う機会も増えてきてる今日このごろだと思うのですが、ターミナル上でVim使ってる私は、色々便利すぎてシェルが使えないWindowsでの作業は苦痛になってしまってます。

その中でもよく使うもの、かつインストール不要で使えるものを紹介します。

<section id="index" markdown="block">

* [開く](#open) 
* [クイックルック](#qlmanage)
* [htpasswdの作成](#htpasswd)
* [クリップボードへコピー](#pbcopy)
* [シャットダウン](#shutdown)
* [メモリを解放](#purge)
* [前回のコマンドを実行](#ex)
* [発音させる](#say)
* [辞書を開く](#dict)
</section>

<section id="open" markdown="block">
## 開く

### open

~~~ bash
open .
~~~

現在いるディレクトリをファインダーで開く。  
openするとファイルに応じて紐付けられているアプリで開いてくれます。  
URLだったらデフォルトのブラウザ、音楽ファイルならiTunesみたいに

~~~ bash
open -a safari http://google.com
~~~

みたいにアプリを指定することも可能
</section>

<section id="qlmanage" markdown="block">
## クイックルック

### qlmanage

~~~ bash
qlmanage -p 画像ファイル名
~~~

openで画像を開こうとするとデフォルトだとPreviewが開くので、結構起動が重いです。   
これで開くとQuickLookが開いてくれるので軽いです。

</section>

<section id="htpasswd" markdown="block">
## htpasswdの作成

### htpasswd

.htpasswdを作成する

Web関係やってたらステージング環境にベーシック認証かけることもあるので、覚えとくと便利。

~~~ bash
htpasswd -c .htpasswd ユーザー名
~~~

-cでcreateって事なんでファイルを生成するには必須です。コマンド入力後パスワード聞かれるので、入力してエンターでおｋ。
</section>

<section id="pbcopy" markdown="block">
## クリップボードにコピー

### pbcopy

~~~ bash
pbcopy < ~/.ssh/id_rsa.pub
~~~

こんな感じでSSHキーを求められるgithubなんかでいちいち開いてコピーしなくてもクリップボードに入れてくれます。
</section>

<section id="shutdown" markdown="block">
## シャットダウン

### shutdown

~~~ bash
shutdown now #電源切ってくれます。  
shutdown -r now #再起動
~~~

</section>
<section id="purge" markdown="block">
## メモリを解放

### purge

~~~ bash
sudo purge
~~~

強制的にディスクキャッシュを追放する。結果メモリを開放してくれる。  
※Marvericksからsudoが必要になりました。
</section>
<section id="ex" markdown="block">
## 前回のコマンドを実行

### !!

~~~ bash
!!
~~~

前回打ったコマンドと同じものを実行。
</section>

<section id="say" markdown="block">
## 発音させる

### Say

入力した文字列をしゃべってくれます。  
日本語は無理っぽい

発音を確認したいときとかによく使ってます。pluralize(複数形にする)コマンドとかも欲しい。

~~~ bash
say 文字列
~~~

英語の発音でなんとなく知りたい時に言わせてみる、ファイル内の文字列を延々と読ませる事も可能  
声を変える事も可能　自分の環境ではデフォルトはAlexという男性でした。

~~~ bash
say -v Vicki omg
~~~

omgに関しては、ちゃんとoh my Godと言います。  
他にも対応してるアクロニムあるかもしれませんがomgしかわからなかった。  
wtfと言わせてみようとしたけど、普通にダブリューティーエフって言いました。そらそーか。  
(個人的にはVickiの声が一番セクスィーかなと。)
</section>

<section id="dict" markdown="block">
## 辞書を開く

~~~ bash
open dict:///検索文字列
~~~

普通にopenコマンドで辞書開くんですが、これだとめんどくさいので.bashrcなり.zshrcに以下の様に書いておきます。

~~~ text
".zshrc  
dict () { open dict:///"$@" ; }
~~~

こう書いておけばdictコマンドで辞書を開くことができます。

~~~ bash
dict search
~~~

設定で表示される辞書を変更できるんですが、ここに[URBAN DICTIONARY](http://www.urbandictionary.com/)を追加してほしい。  
誰かなんとかしてくれないかな。
</section>
<section id="outro" markdown="block">
以上、いくつか挙げてみましたがどうでしょう。今回は最初から入ってる奴だけを紹介してみましたが、zsh使ってるなら[oh-my-szh](https://github.com/robbyrussell/oh-my-zsh)なんかもオススメです。
</section>
