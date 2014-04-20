---
layout: post
title: Vimのcss_color.vimをscssファイルにも適用してみた。
categories:
- Tools
tags:
- Vim
meta:
  dsq_thread_id: '755208910'
author:
  email: info@howtohp.com 
  display_name: kymmt
---
むかーしインストールして、CSSファイルで試して動いた！って思ってそのまま放置してたのですが、実は、うまく動いてたのは、最初に試したCSS>ファイルだけで、その後一度も純粋なCSSファイルを触ってなくて、css_color.vimが効いて無いことすら気づいてない状態だったのですが、.vimrc久々にいじってたら、アレってなったので、一応対応してみた。

対応は簡単で、css_color.vimを入れると、`~/.vim/after/syntax/css.vim`ってファイルが出来ると思うのですが、同じ階層にscss.vimってファイルを作って、以下の一行を書くだけです。

~~~ bash
syntax cluster sassCssAttributes add=@cssColors
~~~

RGBとかにも対応してていい感じなんですけど、自分の場合、ターミナル上でVimを動かしてて、ターミナル自体を半透明にさせちゃってたり、SASSの機能で、lightenとかdarkenとか結構使っちゃうので、正直あんまり意味はないっちゃない。

※追記 2012/08/04
css_color.vimを使うとめちゃめちゃ重くなる事が判明したので、はずしました。不自由な事はなにもなかった。
