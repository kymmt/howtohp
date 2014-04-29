---
layout: post
title: 今更ながら、text-shadowを色々試してみる。
tags: []
meta:
  _edit_last: '2'
  dsq_thread_id: '547706360'
author:
  email: info@howtohp.com 
  display_name: kymmt
---
もう正直出尽くしてると思いますが、一応メモというか勉強用に試してみた。

* [インセット](#inset)
* [ラインアート](#line-art)
* [リアルな影](#real-shadow)
* [アウトライン](#outline)
* [ネオン](#neon)

<section id="inset" markdown="block">
# インセット

背景より少し暗い色の影を付けてるとそれっぽくなりますね。  
ただ、フォントによっては、イマイチな感じになりそうです。

~~~ css
.sample {
    text-shadow:0 -2px 2px #777;
}
~~~

<div style="width:540px;margin:0 auto;border:1px solid;#ccc;background:#666;">
<p style="text-align:center;padding:15px 0;font-weight:bold;text-shadow:0px -2px 2px #777;font-size:300%;margin:0;">INSET</p>
</div>

</section>

<section id="line-art" markdown="block">
# ラインアート

二重の影を置いて、若干立体的にも見える感じのエフェクトです。  
box-shadowでも同じようにできるのかも。

~~~ css
.sample {
    text-shadow:3px 3px 0px #fff, 4px 4px 0px #777;
}
~~~

<div style="width:540px;margin:0 auto;border:1px solid;#ccc;">
<p style="text-align:center;padding:15px 0;color:#777;font-weight:bold;text-shadow:3px 3px 0px #fff,4px 4px 0px #777;font-size:300%;margin:0;">LINE ART</p>
</div>

</section>
<section id="real-shadow" markdown="block">
# リアルな影

リアルな影っぽい文字を書くときのエフェクト。  
使う事あるかどうかわかりませんけど。

~~~ css
.sample {
    color:transparent;
    text-shadow:0 0 10px #333;
}
~~~

<div style="width:540px;margin:0 auto;border:1px solid;#ccc;">
<p style="text-align:center;padding:15px 0;color:transparent;font-weight:bold;text-shadow:0 0 10px #333;font-size:300%;margin:0;">SHADOW</p>
</div>

</section>

<section id="outline" markdown="block">
# アウトライン

上下左右の四方向に影を配置して、縁取る!  
ただ、文字色と背景色を同じにしてしまうのは良くないですね。

~~~ css
.sample {
    color:#fff;
    text-shadow:1px 0 #333,
    0 1px #333,
    -1px 0 #333,
    0 -1px #333;
}
~~~

<div style="width:540px;margin:0 auto;border:1px solid;#ccc;">
<p style="color:#fff;text-align:center;padding:15px 0;font-weight:bold;text-shadow:1px 0 #333,0 0 #333, -1px 0 #333, 0 -1px #333;font-size:300%;margin:0;">OUTLINE</p>
</div>
</section>

<section id="neon" markdown="block">
# ネオン

~~~ css
.sample {
    text-shadow:0 0 10px #fff,
    0 0 20px #fff,
    0 0 30px #fff,
    0 0 40px #99ff00,
    0 0 50px #99ff00,
    0 0 60px #99ff00,
    0 0 100px #99ff00;
}
~~~

<div style="width:540px;margin:0 auto;background:#000;">
<p style="color:#fff;text-align:center;padding:15px 0;font-weight:bold;text-shadow:0 0 10px #fff,0 0 20px #fff, 0 0 30px #fff, 0 0 40px #99ff00, 0 0 50px #99ff00, 0 0 100px #99ff00;font-size:300%;margin:0;">NEON</p>
</div>
</section>
