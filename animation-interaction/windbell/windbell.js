const ORIGINAL_TITLE = "Zhuodi Cai";
const BELL_TITLES = [
    "[:breeze?]",
    "[:bird?]",
    "[:leaf?]",
    "[:petal?]",
    "[:raindrop?]",
    "[:butterfly?]",
    "[:memory?]",
    "[:dream?]",
    "[:whisper?]",
    "[:presence?]",
];

const sound = document.getElementById('windbell-sound');

// 播放结束恢复标题
sound.addEventListener('ended', () => {
    document.title = ORIGINAL_TITLE;
});

function restartGifAnimationAndSound() {
    const gifImage = document.querySelector('.windbell-animation');

    // 获取当前路径
    const currentSrc = gifImage.src;
    const basePath = currentSrc.substring(0, currentSrc.lastIndexOf('/')) + '/';

    // 重新播放 GIF
    gifImage.src = '';
    gifImage.src = basePath + 'windbell.gif';

    // 随机选择一个标题
    const randomTitle = BELL_TITLES[Math.floor(Math.random() * BELL_TITLES.length)];
    document.title = randomTitle;

    // 从头播放音效
    sound.currentTime = 0;
    sound.play();
}

// 划过/点击 GIF 时触发
const windbell = document.querySelector('.windbell-animation');
windbell.addEventListener('mouseover', restartGifAnimationAndSound);
windbell.addEventListener('click', restartGifAnimationAndSound);