---
layout: post
title: CSSのベンダープレフィックスをいい感じに追加してくれるPrefixrが便利そう。
categories:
- WebSite
tags:
- CSS
status: publish
type: post
published: true
meta:
  _edit_last: '2'
  dsq_thread_id: '547705941'
author:
  login: kohei
  email: contact@koheiyamamoto.me
  display_name: kymmt
  first_name: Kohei
  last_name: Yamamoto
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
