var checkStickLong = {
    check: function () {
        var a = this.getWidthNumber($(".stick").css('width'));
        var b = this.getWidthNumber($(".wall").eq(1).css('left')) + this.getWidthNumber($(".wall").eq(1).css('width')) - screenWidth * 0.2;
        var c = this.getWidthNumber($(".wall").eq(1).css('left')) - screenWidth * 0.2;
        if (a < b && a > c) {
            var d = this;
            d.run();
            setTimeout(function () {
                d.getPoint();
                d.getNewWall()
            }, 1100)
        } else if (a > b) {
            clearBind();
            this.getDown()
        } else {
            clearBind();
            this.getDown()
        }
    },
    run: function () {
        $(".stickMan img").attr({
            'src': 'img/stick.gif'
        });
        var a = this.getWidthNumber($(".wall").eq(1).css('left')) + this.getWidthNumber($(".wall").eq(1).css('width')) - screenWidth * 0.2;
        $(".stickMan").animate({
            left: '+=' + a + 'px'
        }, 1000);
        $("body").css('background-position-x', '-' + (point + 1) * 20 + 'px');
        setTimeout(function () {
            $(".stickMan img").attr({
                'src': 'img/stick_stand.png'
            })
        }, 1000)
    },
    getDown: function () {
        $(".stickMan img").attr({
            'src': 'img/stick.gif'
        });
        var a = this;
        $(".stickMan").animate({
            left: '+=' + $(".stick").css('width')
        }, 1000);
        $("body").css('background-position-x', '-' + (point + 1) * 30 + 'px');
        setTimeout(function () {
            $('.stick').css('transform', 'rotate(90deg)');
            $(".stickMan").animate({
                bottom: '-' + $(".stickMan").css('height')
            }, 300)
        }, 1000);
        setTimeout(function () {
            a.showResult()
        }, 1300)
    },
    getPoint: function () {
        point++;
        $(".point").html(point);
        var a = $(".shouji").css("left");
        var b = $("#main").width();
        var c = parseInt(a) - parseInt(b) / 6;
        $(".shouji").animate({
            "left": c + "px"
        }, 1000)
    },
    getNewWall: function () {
        this.setNewWall();
        setTimeout(this.resetWall, 550)
    },
    resetWall: function () {
        addBind();
        $('.wall').eq(0).remove();
        $('.new').eq(0).removeClass('new');
        $('.init').eq(0).removeClass('init')
    },
    getWidthNumber: function (a) {
        if (a) {
            var b = a.substr(0, a.length - 2);
            b = Number(b);
            return b
        }
    },
    setNewWall: function () {
        var a = Math.random() * 55 + 5 + 20;
        var b = Math.random() * Math.min(90 - a, 15) + 5;
        var c = '<div class="wall new init" style="width:' + b + '%;left:100%"></div>';
        $("#main").append(c);
        var d = this.getWidthNumber($(".wall").eq(1).css('left')) + this.getWidthNumber($(".wall").eq(1).css('width')) - screenWidth * 0.2;
        $(".wall").eq(0).animate({
            left: '-=' + d + 'px'
        }, 500);
        $(".wall").eq(1).animate({
            left: '-=' + d + 'px'
        }, 500);
        $(".wall").eq(2).animate({
            left: a + '%'
        }, 500);
        $('.stick').css('transition', '0');
        $(".stick").animate({
            left: '-=' + d + 'px'
        }, 500);
        $(".stickMan").animate({
            left: '-=' + d + 'px'
        }, 500)
    },
    showResult: function () {
        $(".point,.tips").css('display', 'none');
        $(".newPoint").html(point);
        $(".gameOver").css('display', 'block');
        this.setBestPoint()
    },
    setBestPoint: function () {
        var a = window.sessionStorage.getItem('stickManPoint');
        if (!a) {
            a = point;
            window.sessionStorage.setItem('stickManPoint', point)
        } else if (a < point) {
            a = point;
            window.sessionStorage.setItem('stickManPoint', point)
        }
        $(".bestPoint").html(a);
        var b = $('title');
        var c = b.html();
        var d = c.indexOf('-');
        if (d > -1) {
            d += 1;
            c = c.slice(d)
        }
        b.html('我玩到了' + a + '关，你也来试试-' + c);
        // wx.onMenuShareTimeline({
        //     title: document.title,
        //     link: 'http://game.shangbanzu.cc/zhugan/?fx',
        //     imgUrl: 'http://game.shangbanzu.cc/zhugan/img/ico.jpg',
        //     success: function () {
        //         window.location.href = 'http://www.baidu.com'
        //     },
        //     fail: function () {
        //         alert('出错')
        //     },
        //     cancel: function () {
        //         alert("分享失败，可能是网络问题，一会儿再试试？")
        //     }
        // });
        // wx.onMenuShareAppMessage({
        //     title: document.title,
        //     desc: '尼玛这游戏太好玩了，你也来试试看能玩到多少关。',
        //     link: 'http://game.shangbanzu.cc/zhugan/?fx',
        //     imgUrl: 'http://game.shangbanzu.cc/zhugan/img/ico.jpg',
        //     type: '',
        //     dataUrl: '',
        //     success: function () {
        //         window.location.href = 'http://www.baidu.com'
        //     },
        //     fail: function () {
        //         alert('出错')
        //     },
        //     cancel: function () {
        //         alert("分享失败，可能是网络问题，一会儿再试试？")
        //     }
        // })
    }
};