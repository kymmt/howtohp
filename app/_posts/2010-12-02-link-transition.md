---
layout: post
title: CSSのTransitionでリンクのホバー時のアクションを全部一気にさりげなくふわっとさせる方法
categories:
- CSS
tags:
- CSS3
meta:
  dsq_thread_id: '547706489'
author:
  email: info@howtohp.com 
  display_name: kymmt
---
前からtransition使ってみたかったけど、使う機会がなかったので、ブログをMTからWPに移行した際にリンクを全部ふわっとさせることにした。

やり方は、ものっそい簡単で、CSSでaにアニメーションだけ定義して、全部継承させます。

### CSS

~~~ css
a {
	-webkit-transition:0.3s ease;
	-webkit-transition-property:opacity,border,color,background;

	-moz-transition:0.3s ease;
	-moz-transition-property:opacity,border,color,background;

	-o-transition:0.3s ease;
	-o-transition-property:opacity,border,color,background;
	
	transition:0.3s ease;
	transition-property:opacity,border,color,background;
}
~~~

上記のコードを見てもらうと分かるとおり、使うプロパティはたった2種類で、`transition`プロパティのショートハンドで、アニメーション時間と、アニメーションの種類を設定。  
そして、hoverに指定されているプロパティの`opacity`,`border`,`color`,`background`などに変化を付けることが多いので、この4つを指定しておくと、それらがhoverで切り替わる場合、アニメーションが適用されます。

※Firefoxは4から対応のようです。
