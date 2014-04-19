---
layout: post
title: CSSのベンダープレフィックスをいい感じに追加してくれるPrefixrが便利そう。
categories:
- WebSite
tags:
- CSS
type: post
meta:
  dsq_thread_id: '547705941'
author:
  email: info@howtohp.com 
  display_name: kymmt
---

CSSのプロパティとかでめんどくさいベンダープレフィックスを自動的に追記してくれるウェブサービス。

[Prefixr](http://prefixr.com/)

~~~ css
/* Before */
.sample {
    border-radius:5px;
}

/* After */
.sample {
    -webkit-border-radius: 5px;
    -khtml-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}
~~~

<div class="youtube-wrapper">
<iframe width="560" height="345" src="http://www.youtube.com/embed/x8va4o4Wl3g" frameborder="0" allowfullscreen></iframe>
</div>

Vimプラグインもあるみたいだけど、何故か自分の環境では動かなかった。  
Sassにこの機能が組み込まれてたら便利なのになー。

prefixrのAPIを呼び出してるっぽいですね。オフライン環境じゃ使えないっぽい。
