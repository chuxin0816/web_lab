function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">关于我们</h3>
            <p className="text-sm">
              在线课程平台致力于为学习者提供优质的在线教育资源，
              帮助每个人实现终身学习的目标。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-white">关于我们</a></li>
              <li><a href="/contact" className="hover:text-white">联系我们</a></li>
              <li><a href="/privacy" className="hover:text-white">隐私政策</a></li>
              <li><a href="/terms" className="hover:text-white">服务条款</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">热门分类</h3>
            <ul className="space-y-2">
              <li><a href="/courses?category=programming" className="hover:text-white">编程开发</a></li>
              <li><a href="/courses?category=design" className="hover:text-white">设计创意</a></li>
              <li><a href="/courses?category=business" className="hover:text-white">商业管理</a></li>
              <li><a href="/courses?category=language" className="hover:text-white">语言学习</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2">
              <li>邮箱: contact@example.com</li>
              <li>电话: 400-123-4567</li>
              <li>地址: 北京市海淀区XX路XX号</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 在线课程平台. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 