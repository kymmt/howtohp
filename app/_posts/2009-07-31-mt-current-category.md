---
layout: post
title: MTでカテゴリーナビの所属しているカテゴリのみ条件分岐する
categories:
- MovableType
tags:
- MovableType
status: publish
type: post
published: true
meta:
  dsq_thread_id: '547652283'
author:
  email: info@howtohp.com 
  display_name: kymmt
---

Movable Type(以下MT）でブログなどのウェブサイトを制作していると、ユーザビリティを上げるため、ナビゲーションの現在いるページの部分をハイライトさせて表示させるデザインにすることが多くあると思います。

しかし、<abbr title="Movable Type">MT</abbr>を使用してカテゴリー一覧を表示させると、その中の一部に対して、特別なidを付けるのは普通の<abbr title="Movable Type">MT</abbr>タグだけでは、難しかったのですが、最近、やっと方法がわかったので、メモしておきます。


# 一階層目までのカテゴリーリストを表示する場合

まず、現在の開いているページのカテゴリーを取得するのですが、ここでMTSetVarBlockタグを使い、変数として、用意しておきます。

このサイトの場合は、変数を用意する場合、すべて一ヶ所にまとめていた方が分かりやすいので、ヘッダーテンプレートのDTDより前にまとめて記述します。


以下がソースです。

~~~ html
<mt:IfArchiveType archive_type="Individual">
<mt:SetVarBlock name="category_label"><$mt:CategoryLabel$></mt:SetVarBlock>
</mt:IfArchiveType>
<mt:IfArchiveType archive_type="Category">
<mt:SetVarBlock name="category_label"><$mt:CategoryLabel$></mt:SetVarBlock>
</mt:IfArchiveType>
~~~

ここでは、mt:IfArchiveType を使用して、個別ページと、カテゴリーアーカイブページで変数を利用するように条件分岐しています。<br />
ここで、分岐しておかないと、すべてのテンプレートに挿入される場合、カテゴリーが存在しないトップページなどで利用できないので、再構築の際にエラーがでます。


個別ページとカテゴリーページのテンプレートに挿入すれば、分岐しなくても問題ないような気もしますが、未確認ですので、どなたか確認された方は報告頂ければありがたいです。


次に、本題のカテゴリーナビの部分ですが、MTTopLevelCategoriesかMTSubCategoriesを使用して一覧を表示していると思うのですが、その中で、もう一度、現在表示しているページのカテゴリーを変数として定義し、カテゴリー一覧を表示している中で現在表示しているカテゴリーと一致するものだけ分岐します。


以下がulで一覧を括った場合のソースです。

~~~ html
<ul>
<mt:TopLevelCategories>
<mt:SetVarBlock name="category_label2"><$MTCategoryLabel$></mt:SetVarBlock>
<mt:If name="category_label2" eq="$category_label">
    <li id="current"><a href="<$mt:CategoryArchiveLink$>"<mt:IfNonEmpty tag="MTCategoryDescription"> title="<$mt:CategoryDescription$>"</mt:IfNonEmpty>><$mt:CategoryLabel$></a></li>
<mt:Else>
    <li><a href="<$mt:CategoryArchiveLink$>"<mt:IfNonEmpty tag="mt:CategoryDescription"> title="<$mt:CategoryDescription$>"</mt:IfNonEmpty>><$mt:CategoryLabel$></a></li>
</mt:If>
</mt:TopLevelCategories>
</ul>
~~~

上記では、トップレベルのカテゴリーのみを分岐して、表示しているカテゴリーのliタグにid="current"を付けている例です。

# 二階層目までのカテゴリーリストを表示する場合

最近、仕事で、二階層目までのサブカテゴリーをハイライトし、所属している親カテゴリーにも別のidを付けてハイライトする必要があったので、以下にソースを晒しておきます。


まずは、変数宣言部分のソース

~~~ html
<mt:IfArchiveType archive_type="Individual">
<mt:SetVarBlock name="category_label"><$MTCategoryLabel$></mt:SetVarBlock>
<mt:SetVarBlock name="top_category_label2"><mt:TopLevelParent><$MTCategoryLabel$></mt:TopLevelParent></mt:SetVarBlock>
</mt:IfArchiveType>
<mt:IfArchiveType archive_type="Category">
<mt:SetVarBlock name="category_label"><$MTCategoryLabel$></mt:SetVarBlock>
</mt:IfArchiveType>
~~~

先ほどのトップレベルカテゴリーのみの場合と違うのは、現在表示しているカテゴリーの親カテゴリーを変数として定義します。以下がソースです。

~~~ html
<mt:SetVarBlock name="top_category_label2"><mt:TopLevelParent><$MTCategoryLabel$>
~~~

上記の部分で、親カテゴリーを定義しておきます。  
これは、二階層目まで限定です。三階層目までいくと、ひとつ上のカテゴリではなく、一番上のカテゴリーを取得するので、分岐ができません。


次にカテゴリー一覧部分のソースです。

~~~ html
<mt:TopLevelCategories>
<mt:SetVarBlock name="top_category_label2"><mt:TopLevelParent><$MTCategoryLabel$></MTTopLevelParent></mt:SetVarBlock>
<mt:SubCatIsFirst><ul<mt:HasNoParentCategory> id="localNavi"</mt:HasNoParentCategory>></mt:SubCatIsFirst>
<mt:if name="top_category_label2" eq="$top_category_label">
    <li id="current"><a href="<$MTCategoryArchiveLink$>"><mt:IfCategory><$MTCategoryLabel$></mt:IfCategory></a>
        <mt:SubCategories>
        <mt:SetVarBlock name="category_label2"><$MTCategoryLabel$></mt:SetVarBlock>
        <mt:SubCatIsFirst><ul></mt:SubCatIsFirst>
        <mt:If name="category_label2" eq="$category_label">
            <li id="sub_current"><a href="<$MTCategoryArchiveLink$>"><mt:IfCategory><$MTCategoryLabel$></mt:IfCategory></a></li>
        <mt:Else>
            <li><a href="<$mt:CategoryArchiveLink$>"><$MTCategoryLabel$></a><mt:SubCatsRecurse></li>
        </mt:If>
        <mt:SubCatIsLast></ul></mt:SubCatIsLast>
        </mt:SubCategories>
    </li>
<MTElse>
    <li><a href="<$mt:CategoryArchiveLink$>"><$MTCategoryLabel$></a><mt:SubCatsRecurse></li>
</mt:if>
<mt:SubCatIsLast></ul></mt:SubCatIsLast>
</mt:TopLevelCategories>
~~~

上記のソースで構築すると以下のようなhtmlが吐き出されます。

~~~ html
<ul id="localNavi">
    <li><a href="#">親カテゴリー1</a>
        <ul>
            <li><a href="#">サブカテゴリー1</a></li>
            <li><a href="#">サブカテゴリー2</a></li>
            <li><a href="#">サブカテゴリー3</a></li>
        </ul>
    </li>
    <li id="current"><a href="#">所属している親カテゴリー2</a>
        <ul>
            <li><a href="#">サブカテゴリー1</a></li>
            <li id="sub_current"><a href="#">所属しているサブカテゴリー2</a></li>
            <li><a href="#">サブカテゴリー3</a></li>
        </ul>
    </li>
    <li><a href="#">親カテゴリー3</a>
        <ul>
            <li><a href="#">サブカテゴリー1</a></li>
            <li><a href="#">サブカテゴリー2</a></li>
            <li><a href="#">サブカテゴリー3</a></li>
        </ul>
    </li>
</ul>
~~~

これで、所属しているカテゴリーのみ別のスタイルを効かせることができるので、あとはCSSでハイライトさせる用のスタイルを書けばOKです。

