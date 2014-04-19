$ ->
    $('a').each ->
        a = new RegExp('/' + window.location.host + '/')

        if !a.test(this.href)
            $(this).click (event) ->
                event.preventDefault()
                event.stopPropagation()
                window.open(this.href, '_blank')

