Vue.component('menu-item', {
    props: ['menu'],
    template: '<li><a :href="menu.link">{{menu.text}}</a></li>'
})

Vue.component('project-item', {
    props: ['project'],
    template: '\
    <li>\
    <div class="content_item">\
        <a :href="project.link">\
            <img :src="project.icon">\
            <div class="info">\
                <h3>{{project.title}}</h3>\
                <p>{{project.des}}</p>\
            </div>\
            <span class="type">{{project.type}}</span>\
        </a>\
    </div>\
    </li>\
  ',
})

const icons = ["./src/assets/ic_geeknews.png", "./src/assets/ic_launcher.png", "./src/assets/ic_launcher.png", "./src/assets/ic_launcher.png"];
const titles = ["GeekNews v1.3.0", "ENViews v1.0.3", "ECardFlow v1.0.4", "MoeFM v1.0.0"];
const dess = ["A pure reading App based on Material Design + MVP + RxJava + Retrofit + Dagger2 + Realm + Glide",
                "A cool dynamic view library",
                "A custom ViewPager for multiple card flow system. && A layout provide beautiful background effects for ViewPager",
                "A light MusicPlayer build with React Native & Redux for both Android and iOS",
                "Reactive Socket APIs for Android, Java and Kotlin, powered by RxJava2"];
const types = ["Android APP", "Android Lib", "Android Lib", "ReactNative APP", "Java Lib"];
const links = ["https://github.com/codeestX/GeekNews",
                "https://github.com/codeestX/ENViews",
                "https://github.com/codeestX/ECardFlow",
                "https://github.com/codeestX/MoeFM",
                "https://github.com/codeestX/RxSocketClient"];

var contents = new Array(icons.length);
var Color = net.brehaut.Color

var vm = new Vue({
    el: '#container',
    data: function () {
        return {
            scrollPosition: 0,
            items: this.initData(),
            show: false,
            urls: [
                { text: 'SITE', link: 'http://codeest.moe' },
                { text: 'BLOG', link: 'http://blog.codeest.moe'},
                { text: 'GITHUB', link: 'https://github.com/codeestX' },
                { text: 'CONTACT', link: 'https://t.me/codeest' },
                { text: 'ABOUT', link: 'http://me.codeest.moe' }
            ],
            color: {
                red: 0.09,
                green: 0.09,
                blue: 0.11,
                alpha: 1
            },
            tweenedColor: {},
            switchPositionY: 700
        }
    },
    watch: {
        color: function () {
            function animate (time) {
                requestAnimationFrame(animate)
                TWEEN.update(time)
            }
            new TWEEN.Tween(this.tweenedColor)
                .to(this.color, 300)
                .start()
            animate()
        }
    },
    computed: {
        tweenedCSSColor: function () {
            return new Color({
                red: this.tweenedColor.red,
                green: this.tweenedColor.green,
                blue: this.tweenedColor.blue,
                alpha: this.tweenedColor.alpha
            }).toCSS()
        }
    },
    methods: {
        initData: function () {
            for (var i = 0;i < icons.length; i++) {
                contents[i] = {};
                contents[i].icon = icons[i];
                contents[i].title = titles[i];
                contents[i].des = dess[i];
                contents[i].type = types[i];
                contents[i].link = links[i];
            }
            return contents;
        },
        updateScroll: function () {
            this.scrollPosition = window.scrollY;
            if (this.scrollPosition > this.switchPositionY && !this.show) {
                this.show = true;
                this.color = new Color('#f6f6f6').toRGB();
            } else if (this.scrollPosition <= this.switchPositionY && this.show) {
                this.show = false;
                this.color = new Color('#17181d').toRGB();
            }
        },
        beforeEnter: function (el) {
            el.style.opacity = 0
        },
        enter: function (el, done) {
            var delay = el.dataset.index * 260
            setTimeout(function () {
                Velocity(
                    el,
                    { opacity: 1, translateY: '-28px'},
                    { complete: done }
                )
            }, delay)
        },
        leave: function (el, done) {
            var delay = el.dataset.index * 260
            setTimeout(function () {
                Velocity(
                    el,
                    { opacity: 0, translateY: '0px'},
                    { complete: done }
                )
            }, delay)
        }
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
        this.tweenedColor = Object.assign({}, this.color);
        this.switchPositionY = this.$refs.check.offsetTop;
    },
    destroy() {
        window.removeEventListener('scroll', this.updateScroll);
    }
})
