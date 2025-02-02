var text = document.getElementsByTagName("h1")[0].innerText
// 获取页面中第一个<h1>标签元素
// innerText🦦获取该<h1>标签内文本内容，将其存储在变量text中
console.log(text)
// 在控制台输出该文本内容
document.getElementsByTagName("h1")[0].innerHTML = ""
// 将该<h1>标签内容清空，为后续插入新内容做准备

var spans = []
for (var i = 0; i < text.length; i++) {
    var span = document.createElement("span")
    // 创建新的<span>标签元素
    span.innerText = text[i]
    // 将文本中的每个字符依次赋值给<span>标签的文本内容
    document.getElementsByTagName("h1")[0].appendChild(span)
    // 将每个<span>标签元素插入到第一个<h1>标签内
    spans.push(span)
    // 将每个<span>标签元素存储在数组spans中，方便后续操作
}

function light() {
    for (var i = 0; i < spans.length; i++) {
        var span = spans[i]
        var color = "hsl(" + (Math.random() * 360 | 0) + "deg,50%,50%)"
        // 生成一个0到360之间的随机整数，用于生成随机的HSL颜色值
        span.style.color = "white"
        // 将<span>标签的文本颜色设置为白色
        if (Math.random() < 0.3) {
            span.style.color = "rgba(255,255,255,0.3)"
        }
        // 有30%概率将<span>标签的文本颜色设置为半透明白色

        span.style.textShadow = "0 0 5px " + color + ",0 0 10px " + color + ",0 0 20px " + color + ""
        // 为<span>标签添加文本阴影效果，阴影颜色为随机生成的颜色
        span.style.fontSize = Math.random() * 3 + 7 + "vw"
        // 将<span>标签的字体大小设置为7到10vw之间的随机值
    }
}

setInterval(light, 1000)
// 每隔1秒（1000毫秒）调用一次light()函数，从而实现灯光闪烁效果
var canvas = document.getElementById("canvas")
// 获取页面中id为"canvas"的canvas元素
canvas.width = window.innerWidth
canvas.height = window.innerHeight
// 将canvas元素设置为浏览器窗口的内部宽度和高度
var ctx = canvas.getContext("2d")
// 获取canvas元素的2D绘图上下文
var fireworksArray = []
// 创建一个空数组fireworksArray用于存储烟花对象
var particlesArray = []
// 创建一个空数组particlesArray用于存储粒子对象
class Particle {
// 构造函数，用于初始化粒子对象的属性
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.c = color
        // x坐标、y坐标、颜色
        this.vx = (0.5 - Math.random()) * 100
        this.vy = (0.5 - Math.random()) * 100
        // 粒子在x或y方向上的速度，取值范围在 -50 到 50 之间
        this.c = color
        // 粒子的颜色（重复赋值）
        this.age = Math.random() * 100 | 0
        // 粒子的寿命，取值范围在 0 到 99 之间的整数
    }
    update() {
    // 更新粒子的位置和状态
        this.x += this.vx / 20
        this.y += this.vy / 20
        // 更新粒子的x/Y坐标，根据x/y方向的速度进行移动
        this.vy++
        // 增加粒子在 y 方向上的速度，模拟重力效果
            this.age--
            // 减少粒子的寿命
    }
    draw() {
    // 绘制粒子
        ctx.globalAlpha = 1
        // 设置全局透明度为 1
        ctx.beginPath()
        // 开始一个新的路径
        ctx.fillStyle = this.c
        // 设置填充颜色为粒子的颜色
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
        // 绘制一个以粒子坐标为中心，半径为 1 的圆形
        ctx.fill()
        // 填充圆形
    }
}


// 烟花管理器
class Firework {
    // 构造函数，用于初始化烟花对象的属性
    constructor() {
        // 将烟花的初始 y 坐标设置为画布的高度，即烟花从画布底部开始
        this.y = canvas.height
        // 随机生成烟花的初始 x 坐标，范围是 0 到画布的宽度
        this.x = Math.random() * canvas.width | 0
        // 计算烟花的初始速度，速度为负值表示烟花向上运动
        this.vel = -(Math.random() * Math.sqrt(canvas.height) / 3 + Math.sqrt(4 * canvas.height) / 2) / 5
        // 随机生成烟花的颜色，使用 HSL 颜色模式
        this.c = "hsl(" + (Math.random() * 360 | 0) + ",100%,60%)"
    }
    // 更新烟花的位置和状态
    update() {
        // 根据速度更新烟花的 y 坐标
        this.y += this.vel
        // 烟花的速度逐渐增加，模拟重力效果
        this.vel += 0.04
        // 当烟花的速度大于等于 0 时，表示烟花到达最高点，开始爆炸
        if (this.vel >= 0) {
            // 生成 200 个粒子，模拟烟花爆炸的效果
            for (var i = 0; i < 200; i++) {
                particlesArray.push(new Particle(this.x, this.y, this.c))
            }
            // 重置烟花的 y 坐标为画布底部
            this.y = canvas.height
            // 重新随机生成烟花的 x 坐标
            this.x = Math.random() * canvas.width | 0
            // 重新计算烟花的速度
            this.vel = -(Math.random() * Math.sqrt(canvas.height) / 3 + Math.sqrt(4 * canvas.height) / 2) / 5
            // 重新随机生成烟花的颜色
            this.c = "hsl(" + (Math.random() * 360 | 0) + ",100%,60%)"
        }
    }
    // 绘制烟花
    draw() {
        // 设置全局透明度为 1
        ctx.globalAlpha = 1
        // 开始绘制路径
        ctx.beginPath()
        // 设置填充颜色为烟花的颜色
        ctx.fillStyle = this.c
        // 绘制一个圆形，表示烟花
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2)
        // 填充圆形
        ctx.fill()
    }
}

// 初始化烟花的函数
function init_fireworks() {
    // 循环的次数根据画布宽度除以200的结果向下取整来确定
    // 用于创建一定数量的烟花对象并添加到烟花数组中
    for (var i = 0; i < (canvas.width / 200 | 0); i++) {
        // 创建一个新的烟花对象并添加到烟花数组 fireworksArray 中
        fireworksArray.push(new Firework());
    }
}
// 调用初始化烟花的函数，开始创建烟花对象
init_fireworks();

// 绘制动画的函数
function draw() {
    // 设置全局透明度为 0.1，用于实现渐变的背景效果
    ctx.globalAlpha = 0.1;
    // 设置填充颜色为黑色
    ctx.fillStyle = "black";
    // 绘制一个黑色的矩形，覆盖整个画布，用于清除之前的绘制内容
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 遍历烟花数组，更新每个烟花的位置并绘制
    for (var i = 0; i < fireworksArray.length; i++) {
        // 更新当前烟花的位置和状态
        fireworksArray[i].update();
        // 绘制当前烟花
        fireworksArray[i].draw();
    }

    // 遍历粒子数组，更新每个粒子的位置并绘制
    for (var i = 0; i < particlesArray.length; i++) {
        // 更新当前粒子的位置和状态
        particlesArray[i].update();
        // 绘制当前粒子
        particlesArray[i].draw();
        // 如果粒子的寿命小于 0，说明粒子已经消失，从粒子数组中移除该粒子
        if (particlesArray[i].age < 0) {
            particlesArray.splice(i, 1);
        }
    }
    // 请求浏览器在下一次重绘之前调用 draw 函数，实现动画效果
    requestAnimationFrame(draw);
}

// 调用绘制函数，开始动画循环
draw();


// 30_0.5🐶
// 获取视频和按钮元素
const video = document.getElementById('fullscreen-video');
const videoButton = document.querySelector('.video-button');

// 点击按钮时全屏播放视频
videoButton.addEventListener('click', () => {
    video.style.display = 'block'; // 显示视频元素
    video.play(); // 播放视频
    bgm.pause(); // 暂停音乐

    // 进入全屏模式
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { // Firefox
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { // Chrome, Safari, Opera
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { // IE/Edge
        video.msRequestFullscreen();
    }
});

// 退出全屏时隐藏视频
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        video.style.display = 'none'; // 隐藏视频元素
        video.pause(); // 暂停视频
        bgm.currentTime = bgm.currentTime; // 保持音乐当前播放时间
        bgm.play(); // 从断点继续播放音乐
    }
});