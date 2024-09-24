$(function () {
    // 풀페이지 스크롤
    const lenis = new Lenis({
        duration: 1.5,
    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ----- scrollTrigger -----
    // sc-home
    const homeBg = $(".sc-home .group-bg img");
    const homeWord = $(".sc-home .word-item");
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    gsap.set([homeWord[1], homeWord[2]], { yPercent: 70 });

    homeBg.each((idx, el) => {
        const nextidx = (idx + 1) % homeBg.length;
        tl.to(el, { opacity: 0, delay: 2.5 }, `opa${idx}`)
            .to(homeBg[nextidx], { opacity: 1, delay: 2.5 }, `opa${idx}`)
            .to(homeWord[idx], { opacity: 0, yPercent: 70, delay: 2.5 }, `opa${idx}`)
            .to(homeWord[nextidx], { opacity: 1, yPercent: 0, delay: 2.5 }, `opa${idx}`);
    });
gsap.to(".sc-home", {
    borderBottomLeftRadius: "50px",
    borderBottomRightRadius: "50px",
    scrollTrigger: {
        trigger: ".sc-home",
        start: "0% 0%",
        end: "100% 50%",
        scrub: 0,
    },
});

    // sc-products
gsap.to(".sc-products .group-prod", {
    x: function () {
        return -$(".sc-products .group-prod").innerWidth() + $(window).innerWidth() * 0.8;
    },
    ease: "none",
    scrollTrigger: {
        trigger: ".sc-products",
        start: `0+=${$(window).innerHeight() / 4} 0%`,
        end: "100% 100%",
        scrub: 2,
        invalidateOnRefresh: true,
    },
});

    // sc-collection
    const collectionTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".sc-collection",
            start: "0% 100%",
            end: "100% 100%",
            scrub: 1,
            invalidateOnRefresh: true,
        },
    });
    collectionTl
        .to(".sc-collection .content1 .left span", { xPercent: 70 }, "a")
        .to(".sc-collection .content1 .right span", { xPercent: -70 }, "a")
        .to(".sc-collection .inner", { "--toStart": "100%", "--toEnd": "0%", duration: 1.2, ease: "none" }, "<60%")
        .to(".sc-collection .content2", 0.5, { opacity: 1 }, "b")
        .to(".sc-collection .inner", { "--opacity": 0.5 }, "b")
        .to(
            ".gauge-wrap",
            {
                opacity: 1,
                onStart: () => {
                    $("body").addClass("dark");
                },
                onReverseComplete: () => {
                    $("body").removeClass("dark");
                },
            },
            "b"
        );

    // sc-collabo
    gsap.to(".needle-wrap", {
        rotate: 270,
        scrollTrigger: {
            trigger: ".sc-collabo",
            start: `0%-=${$(window).innerHeight()} 0%`,
            end: "100% 100%",
            scrub: 1,
            ease:'none',
            onUpdate: function (self) {
                const progress = Math.round(self.progress * 3000).toLocaleString();
                $("#coll-gauge").text(`DEPTH GAUGE ${progress}PX`);
            },
            onLeave: function () {
                gsap.set(".gauge-wrap", { position: "absolute" });
            },
            onEnterBack: function () {
                gsap.set(".gauge-wrap", { position: "fixed" });
            },
        },
    });

    // sc-style
    ScrollTrigger.create({
        trigger: ".sc-style",
        start: "0% 70%",
        end: "100% 100%",
        onEnter: function () {
            $("body").removeClass("dark");
            gsap.to(".sc-style .group-title", {
                opacity: 1,
                yPercent: -70,
            });
        },
        onLeaveBack: function () {
            $("body").addClass("dark");
        },
    });

    // sc-questions
    const questItem = $(".quest-item button");
    const answerItem = $(".answer-wrap");
    questItem.each(function (idx, el) {
        $(el).click(function () {
            const height = answerItem.eq(idx).innerHeight();
            const answer = $(".answer").eq(idx);
            answer.toggleClass("on");
            gsap.set(answer, { height: answer.hasClass("on") ? height : 0 });
        });
    });
});
