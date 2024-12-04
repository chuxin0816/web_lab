// 导航栏滚动效果
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// “开始探索”按钮点击事件
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.content').scrollIntoView({ behavior: 'smooth' });
});
