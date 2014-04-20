---
layout: post
title: Dreamweaverのコードヒントでwidowsプロパティ等を出ないようにする。
categories:
- CSS
- Tools
tags:
- Dreamweaver
meta:
  dsq_thread_id: '547691519'
author:
  email: info@howtohp.com
  display_name: kymmt
---
たぶん多くのひとがイラっとしていると思うのですが、DreamweaverでCSSを書いていると幅を指定しようとして、widthを入力しようとして、コードヒントに慣れすぎて、`wi`ぐらいまで入力して、確定してしまい、widthを入れようとしてるのに、widowsが出てしまい、`widt`まで入力しないと、widthとしてコード補完してくれません。

# コードヒントを修正するファイル

コードヒントを編集するには、自分の場合(Windows Vista)、  
`C:\Program Files\Adobe\Adobe Dreamweaver CS3\configuration\CodeHints`  
の中に、CodeHints.xmlというXMLファイルがあり、CS3の場合、5589行目あたりから、補完に出てくるプロパティがずらずらっとかかれてます。そのうち必要のないものをコメントアウトするだけで、補完に出てこなくなります。

# Widowsとは

ちなみに、widowsプロパティは、印刷用のページで、改ページした後、次のページで最低何行表示させるかというものを指定するためのプロパティで、指定の仕方は以下のようになります。

~~~ css
p.sample {
    widows:3;
}
~~~
