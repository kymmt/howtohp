---
layout: post
title: Skypeのブラウザ拡張を入れてる人が番号をスタイリングしちゃうのを防ぐ方法
categories:
- CSS
tags: 
- CSS
status: publish
type: post
published: true
meta:
  _thumbnail_id: '1005'
  _edit_last: '2'
  dsq_thread_id: '1218100260'
author:
  login: kohei
  email: contact@koheiyamamoto.me
  display_name: kymmt
  first_name: Kohei
  last_name: Yamamoto
---
ブラウザでSkypeの拡張を入れている人は勝手に電話番号がハイライトされてスカイプアイコンが表示されたりしちゃうので、それを防ぐ方法。

今はたぶんスカイプツールバーなるものがなくなって[クリックコール](http://www.skype.com/ja/download-skype/click-to-call)というツールに変わってると思うのですが、下記のCSSで対応できるようです。  

※ブラウザ拡張が手に入らなくて確認できませんでした。

Firefoxに関してはレンダリングが300倍遅くなるという理由でBANされたようですね。  

~~~ css
span.skype_pnh_container {
    display: none !important;
}

span.skype_pnh_print_container {
    display: inline !important;
}
~~~

クリックコールツールの場合は、以下のメタタグをhead内に記述するだけです。こちらに関しては確認済みです。  

~~~ html
<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE">
~~~

## 参考サイト

* [H5BP FAQ](https://github.com/h5bp/html5-boilerplate/blob/master/doc/faq.md)
