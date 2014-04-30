---
layout: post
title: HTMLを送ると対応したCSSを返してくれるbear CSS
tags:
- CSS
meta:
  dsq_thread_id: '560096954'
author:
  email: info@howtohp.com 
  display_name: kymmt
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
