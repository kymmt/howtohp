---
layout: post
title: HTML5のplaceholder属性で、表示される文字色を変更する方法
categories:
- CSS
tags:
- HTML5
meta:
  dsq_thread_id: '556478748'
author:
  email: info@howtohp.com 
  display_name: kymmt
---
デザインをそろそろ変えようと思って、リニューアル作業をしてたらつまづいてしまったので、メモ。

<section markdown="block">
# input要素のplaceholderにスタイルを適用させる

~~~ css
/*for Webkit*/
input::-webkit-input-placeholder {
    color:    #999;
}

/*for Firefox*/
input:-moz-placeholder {
    color:    #999;
}
~~~
</section>

<section markdown="block">
# inputとtextarea両方に適用させる

~~~ css
::-webkit-input-placeholder {
    color:    #999;
}
:-moz-placeholder {
    color:    #999;
}
~~~

今のとこWebkitとFirefoxしかプレイスホルダーのスタイリングに対応していないようです。
</section>

<section markdown="block">
# Mixin

text-shadowとかも効くんですが、とりあえず色だけかえるためのSCSSでmixinにしてみるとこんなかんじになります。

~~~ scss
@mixin placeholder-color($color) {
     &amp;:-moz-placeholder {
         color:$color;
     }
     &amp;::-webkit-input-placeholder {
         color:$color;
     }
 }

//使い方
input {
    @include placeholder-color(#aaa);
}
textarea {
    @include placeholder-color(#ccc);
}
~~~
</section>

HTML5、CSS3の対応がちょっとずつされてきて、互換性の問題がだんだんひどくなってきましたね。

去年の2011年6月にCSS2.1がやっとRecommendationになった所だから、モジュール化されて、モジュール毎の勧告となった今でも、Color、NamespaceとSelectorしか勧告に至ってないんですよね。いつまでかかるやら。

逆に、Selectorがもう勧告になっちゃってるから、placeholder用のセレクターはLevel 4までまたないといけないって事ですね。

ソース:現状のステータスが一覧で見れるページ  
[http://www.w3.org/Style/CSS/current-work.en.html](http://www.w3.org/Style/CSS/current-work.en.html)
