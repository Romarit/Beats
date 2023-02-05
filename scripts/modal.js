$('.form').submit(e => {
    e.preventDefault();

    $.fansybox.open({
        src: "#modal",
        type: "inline"
    })
});