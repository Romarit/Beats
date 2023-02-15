const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu-item");

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = sectionEq => {
    const position = sectionEq * -100;

    if (isNaN(position)) {
        console.error("Передано неверное значение в countSectionPosition");
        return 0;
    }
    return position;
};

const changeMenuSection = sectionEq => {
    const currentSection = sections.eq(sectionEq);
}

const resetActiveClassForItem = (items, itemsEq, activeClass) => {
    items.eq(itemsEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = sectionEq => {
    if (inScroll === false) {
        inScroll = true;
        const position = countSectionPosition(sectionEq);

        changeMenuSection(sectionEq);

        display.css({
            transform: `translateY(${position}%)`
        });

        resetActiveClassForItem(sections, sectionEq, "active");
        // sections.eq(sectionEq).addClass("active").siblings().removeClass("active");



        setTimeout(() => {
            inScroll = false;

            resetActiveClassForItem(menuItems, sectionEq, ".fixed-menu__item--active");

            sideMenu.find(".fixed-menu__item").eq(sectionEq).addClass("fixed-menu__item--active").siblings().removeClass("fixed-menu__item--active");
        }, 1300);
    }
};

const scrollViewport = direction => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction === "next" && nextSection.length) {
        performTransition(nextSection.index())
    }
    if (direction === "prev" && prevSection.length) {
        performTransition(prevSection.index())
    }
}

$(window).on("wheel", event => {
    const deltaY = event.originalEvent.deltaY;

    if (deltaY > 0) {
    // next
        scrollViewport("next");
    }

    if (deltaY < 0) {
    // prev
        scrollViewport("prev")   ;
    }
})

$(window).on("keydown", event =>{

    const tagName = event.target.tagName.toLowerCase();

    if (tagName !== "input" && tagName !== "textarea") {
        switch (event.keyCode) {
            case 38: //prev
                scrollViewport("prev");
                break;

            case 40: //next
                scrollViewport("next");
                break;
        }
    }

});

$("[data-scroll-to]").click(event => {
    event.preventDefault();

    const $this = $(event.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    performTransition(reqSection.index());
})