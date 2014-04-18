---
layout: post
title: HTMLを送ると対応したCSSを返してくれるbear CSS
categories:
- WebSite
tags:
- CSS
status: publish
type: post
published: true
meta:
  _edit_last: '2'
  _thumbnail_id: '429'
  dsq_thread_id: '560096954'
  _wp_old_slug: convert-htmltocss-bear_cs
author:
  login: kohei
  email: contact@koheiyamamoto.me
  display_name: kymmt
  first_name: Kohei
  last_name: Yamamoto
---
これは、いままでなかった新しいサービスなんじゃないでしょうか。HTMLファイルを送ると、IDやClassを書いたCSSファイルを用意してくれるウェブサービスです。

[bear css](http://bearcss.com/)

試しに、適当に書いたHTMLを送ってみました。

## HTMLファイル

~~~ html
<div id="header-container">
    <div id="header">
    </div>
</div>
<div id="main-container">
    <div id="main">
        <div id="contents">
        </div>
        <div id="sidebar">
        </div>
    </div>
</div>
<div id="footer-container">
    <footer id="footer">
    </footer>
</div>
~~~

## CSS 
~~~ css
html { 


 } 

body { 


 } 


/*******************************************************************
LAYOUT
*******************************************************************/

div { 


 } 

#header-container { 


 } 

#header { 


 } 

#main-container { 


 } 

#main { 


 } 

#contents { 


 } 

#sidebar { 


 } 

#footer-container { 


 } 

footer { 


 } 

#footer { 


 }
~~~

うーん。フッターだけ変な感じになっちゃってますね。  
初期セットとしては必要ないかもしれませんが、HTMLをいじらずにCSSだけで新しくしなきゃいけない状況とかがあったら、便利なのかもしれません。
