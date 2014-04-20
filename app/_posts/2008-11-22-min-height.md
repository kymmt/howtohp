---
layout: post
title: CSSで最低の高さを実現する。
tags:
- CSS
author:
  login: admin
  email: info@howtohp.com
---
最低の高さを持たせるっていうのは、色んなデザインをコーディングしてたら、かなりの確率で出会う場面なんですが、IE6でmin-heightが使えなかったり、IE7ではheightで指定した値を超えても、自動的に広がってくれないので、色んなやり方があると思うんですが、自分のやり方をメモっておきます。

# CSS Sample

~~~ css
/*------------------------------------------------
500pxの最低の高さ
-------------------------------------------------*/
#hoge {
	min-height:500px;
	height:auto !important;
	height:500px;
}
~~~

たった3行で、ほぼ、すべてのブラウザで最低の高さを持たせることができます。

## SASSでmixinを作った場合

~~~ scss
@mixin min-height($val) {
    min-height:$val;
    height:auto !important;
    height:$val;
}

#hoge {
    @include min-height(500px);
}

/* Compassの場合 */
@import "compass/utilities/general/min"
#hoge {
    @include min-height(500px);
}
~~~
