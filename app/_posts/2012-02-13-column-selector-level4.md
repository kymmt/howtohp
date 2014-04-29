---
layout: post
title: CSS4で追加されるかもしれないテーブル周りの擬似セレクタについて
tags:
- CSS
meta:
  dsq_thread_id: '574151345'
author:
  email: info@howtohp.com 
  display_name: kymmt
---

CSS3では、:nth-childなんかが追加されて行を特定してマッチさせる事ができるようになったり、:emptyで空の要素を指定できるようになって、かなり便利になったんですが、Level 4ではさらに列をマッチさせることができるようになるっぽいです。


追加されるのはGrid-Structural Selectors(表構造セレクターと訳せばいいのかな？)で以下の三つ。

* [:column(selector-list)](#column) 
* [:nth-column(an+b)](#nth-column)
* [:nth-last-column(an+b)](#nth-last-column)

<section id="column" markdown="block">

# :column(selector-list)

これは引数で指定されたセルエレメントにマッチします。

##サンプル

### HTML

~~~ html
<table>
   <col span="2" />
   <col class="selected" />
   <tr>
       <td>A</td>
       <td>B</td>
       <td>C</td>
   </tr>
   <tr>
       <td span="2">D</td>
       <td>E</td>
   </tr>
   <tr>
       <td>F</td>
       <td span="2">G</td>
   </tr>
</table>
~~~

### CSS

~~~ css
:column(col.selected) {
    background: #bada55;
}
~~~

この場合、CとEとGにスタイルが適用されます。

ここで、`display:table;`とされてるものや、まだWorking Draftの段階のgrid-layoutでの列はマッチするのかという疑問がでてきたので、Working Draftを見てみると下記のように書いてました。

>The :column(selector-list) pseudo-class notation represents a cell element belonging to a column that is represented by the element selected by its argument. 
>
> **Column membership is determined based on the semantics of the document language only: whether and how the elements are presented is not considered.** If a cell element belongs to more than one column, it is represented by a selector indicating any of those columns.
>
<cite>引用:[Selector Level 4 - ‘:column()’ pseudo-class](http://www.w3.org/TR/selectors4/#column-pseudo)</cite>

ざっくり下線部分を訳してみると、**列の集合は、ドキュメント言語のセマンティックスのみに基づいて決定されます。要素がどのように表示されているかは考慮されません。**

翻訳は得意ではないけど、大体こんな感じの意味になるかと思います。

つまりgrid-layoutや、display:tableとかで表っぽく見せても、見た目だけの話だから考慮しませんと捉えれるんじゃないでしょーか。間違ってたらごめんなさい。

実際、CSSで指定されたカラムとマッチさせるにはブラウザー側で、２回CSSを処理しないといけなくなるので、現実的にはなさそうですよね。たぶんそんなのはダメ的なのがCSS 2.1で言われてたきがします。
</section>

<section id="nth-column" markdown="block">

# :nth-column(an+b)

これは、`:nth-child()`と同じ引数を受けつけます。evenやoddも使えます。縦ストライプとか、１列目から4列目までとかそういうのが簡単にできます。
</section>

<section id="nth-last-column" markdown="block">

# :nth-last-column(an+b)

これも、`:nth-last-child`と同じ引数を受けつけます。これを使えばカレンダーの週末の列だけとか、インボイスの小計の列などがサクっと選択できます。

##サンプル

めんどくさいのでHTMLは省略します。

### CSS

~~~ css
:nth-last-column(-n+2) {
    background: red;
    color: white;
}
~~~

こんな感じで後ろから２列が簡単に選択できます。子要素を選択する:nth-childなどと違って列を選択するので、少し毛色は違いますけど、使い方はほぼ同じなので、導入しやすい方じゃないでしょうか。

</section>
<section markdown="block">

# 最後に

まだWorkingDraftの段階なので、将来的に名称が変わったり、削除される可能性もありますけど、これに関しては結構そのままいきそうな気がします。

メーリングリストなんか読んでみると正規表現でのセレクターの話題が出てたり、Chromeの開発者の一人であり、CSS WGのメンバーのTab Atkins Jrさんなんかは、自身のブログでCSSでの変数や、Mixinの仕様を個人的なドラフトとしてブログに書いてたり、CSSはどんどん進化してますね。

実は昔、一度だけW3CのTPACという年に一度の会議に出たことがあるんですが、CSS WGの席で、CSSを良くする事とは、出来る事を増やすという意見で満場一致だったので、今後どんどんプロパティや、機能が増えて複雑化していくことは間違いないようです。

その時、あんまり複雑化するとパフォーマンスはどうするんだ？というような話が出たのですが、誰が言ったのかは覚えてないですが、"そんなもん、開発者の言い訳だ"みたいな一言でバッサリ斬られてたのが印象的でした。

### 参考サイト

<ul>
<li><a href="http://www.w3.org/TR/selectors4/#table-pseudos" class="external">W3C - Selector Level 4</a></li>
<li><a href="http://lists.w3.org/Archives/Public/www-style/2011Jul/0264.html" class="external">メーリングリストでの正規表現でのセレクターのスレ</a>(おまけ)</li>
<li><a href="http://www.xanthir.com/blog/b4AD0" class="external">Tab Atkins Jrさんの個人的な変数のドラフト</a>(おまけ)</li>
</ul>
</section>
