---
layout: post
title: VistaにデュアルブートでUbuntuを簡単インストール
tags:
- Linux
- Ubuntu
- Windows
meta:
  dsq_thread_id: '552203689'
author:
  email: info@howtohp.com
  display_name: kymmt
---

なんかややこしそうだと思ったのですが、めちゃめちゃ簡単でした。

まずは、Ubuntuのダウンロード。

下記のサイトから、CDイメージファイルをダウンロードします。
[Ubuntu Desktop 日本語 Remix CDのダウンロード](http://www.ubuntulinux.jp/products/JA-Localized/download)
ダウンロードしたファイルをCDに焼きます。


焼いたCDをそのままWindows上で実行させます。
すると、Ubuntuで使用するHDDの領域やら、言語やらを聞かれるので、Japanese、要領は最大の30GBにしておきます。


以上でインストールは完了です。
PCを再起動すると、Windowが立ち上がる前に、Windowsを立ち上げるか、Ubuntuを立ち上げるかの選択画面が出れば成功です。

デスクトップはこんな感じです。

![Ubuntu](http://howtohp.com/wp/wp-content/uploads/2008/12/ubuntu-desktop1.png)

※インストーラーCDをWindows上ではなく、ブート時に起動させるてもインストール出来ますが、デュアルブートの設定や、HDDのパーティションの区切りなども必要になってくるので、勉強用であれば、上記の方法がお勧めです。

アンインストールはWindowsのプログラムの追加と削除から行えます。

※Ubuntu Desktop 日本語 Remix CDではなくてもいいんでしょうが、日本語化の手間がはぶけます。入力から設定しないといけないので、日本語入力なしの状態からでは調べるのも大変です。
